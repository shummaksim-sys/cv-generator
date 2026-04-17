/*
 * CraftCV — Editor Page
 * Design: Obsidian Glass — split-panel editor with live preview
 * Left: Multi-step form with glassmorphism panels
 * Right: Live CV preview with template/color controls
 */
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useCVContext } from '@/contexts/CVContext';
import { useTheme } from '@/contexts/ThemeContext';
import { TEMPLATES, SectionKey } from '@/lib/types';
import CVTemplateRenderer from '@/components/CVTemplateRenderer';
import {
  PersonalInfoForm,
  ExperienceForm,
  EducationForm,
  SkillsForm,
  ProjectsForm,
  CertificationsForm,
  LanguagesForm,
} from '@/components/FormSections';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  User, Briefcase, GraduationCap, Code, FolderOpen, Award, Globe,
  Download, Eye, EyeOff, Palette, LayoutTemplate, ArrowLeft,
  Save, RefreshCw, Sun, Moon, FileText, ChevronLeft, ChevronRight,
  GripVertical, Check, Sparkles, Settings
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const STEPS = [
  { id: 'personal', label: 'Personal', icon: User, component: PersonalInfoForm },
  { id: 'experience', label: 'Experience', icon: Briefcase, component: ExperienceForm },
  { id: 'education', label: 'Education', icon: GraduationCap, component: EducationForm },
  { id: 'skills', label: 'Skills', icon: Code, component: SkillsForm },
  { id: 'projects', label: 'Projects', icon: FolderOpen, component: ProjectsForm },
  { id: 'certifications', label: 'Certifications', icon: Award, component: CertificationsForm },
  { id: 'languages', label: 'Languages', icon: Globe, component: LanguagesForm },
];

const ACCENT_COLORS = [
  { value: '#4F46E5', label: 'Indigo' },
  { value: '#1E3A5F', label: 'Navy' },
  { value: '#06B6D4', label: 'Cyan' },
  { value: '#7C3AED', label: 'Violet' },
  { value: '#374151', label: 'Slate' },
  { value: '#DC2626', label: 'Red' },
  { value: '#059669', label: 'Emerald' },
  { value: '#D97706', label: 'Amber' },
];

const SECTION_LABELS: Record<SectionKey, string> = {
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
};

// ===== SORTABLE SECTION ITEM =====
function SortableSectionItem({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 glass-card px-3 py-2 text-sm font-medium"
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors">
        <GripVertical className="w-4 h-4" />
      </button>
      {label}
    </div>
  );
}

export default function Editor() {
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const {
    cvData, selectedTemplate, setSelectedTemplate,
    accentColor, setAccentColor, lastSaved, isSaving,
    resetCV, loadSample, updateSectionOrder,
  } = useCVContext();

  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [activePanel, setActivePanel] = useState<'form' | 'template' | 'order'>('form');
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.55);

  // Load sample if URL param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sample') === 'true') {
      loadSample();
    }
  }, [loadSample]);

  // Responsive preview scale
  useEffect(() => {
    const updateScale = () => {
      const previewContainer = document.getElementById('preview-container');
      if (previewContainer) {
        const containerWidth = previewContainer.clientWidth - 48;
        const containerHeight = previewContainer.clientHeight - 48;
        const scaleByWidth = containerWidth / 794;
        const scaleByHeight = containerHeight / 1123;
        const scale = Math.min(scaleByWidth, scaleByHeight, 0.70);
        setPreviewScale(Math.max(scale, 0.35));
      }
    };
    // Small delay to let layout settle
    const timer = setTimeout(updateScale, 100);
    window.addEventListener('resize', updateScale);
    return () => { clearTimeout(timer); window.removeEventListener('resize', updateScale); };
  }, [showPreview]);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = cvData.sectionOrder.indexOf(active.id as SectionKey);
      const newIndex = cvData.sectionOrder.indexOf(over.id as SectionKey);
      updateSectionOrder(arrayMove(cvData.sectionOrder, oldIndex, newIndex));
    }
  };

  // PDF Export
  const exportPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');

      const element = previewRef.current;
      if (!element) return;

      // Create a clone to avoid modifying the live preview
      const clone = element.cloneNode(true) as HTMLElement;
      document.body.appendChild(clone);
      clone.style.position = 'absolute';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      clone.style.transform = 'none';
      clone.style.width = '794px';
      clone.style.height = '1123px';
      
      // Replace OKLCH colors in the clone with hex equivalents
      const walkDOM = (node: Node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          // Check for OKLCH colors in inline styles and replace with fallback
          if (el.style.backgroundColor && el.style.backgroundColor.includes('oklch')) {
            el.style.backgroundColor = '#ffffff';
          }
          if (el.style.color && el.style.color.includes('oklch')) {
            el.style.color = '#000000';
          }
          if (el.style.borderColor && el.style.borderColor.includes('oklch')) {
            el.style.borderColor = '#cccccc';
          }
        }
        node.childNodes.forEach(walkDOM);
      };
      walkDOM(clone);

      await new Promise(r => setTimeout(r, 150));

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        windowWidth: 794,
      });

      // Clean up the clone
      document.body.removeChild(clone);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      const name = cvData.personal.fullName || 'CV';
      pdf.save(`${name.replace(/\s+/g, '_')}_CV.pdf`);
      toast.success('PDF downloaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [cvData.personal.fullName]);

  const CurrentForm = STEPS[currentStep].component;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ===== TOPBAR ===== */}
      <header className="h-14 glass border-b border-white/5 flex items-center px-4 gap-3 flex-shrink-0 z-40">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="flex items-center gap-2 mx-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <FileText className="w-3 h-3 text-white" />
          </div>
          <span className="font-display font-bold text-sm">CraftCV</span>
        </div>

        <div className="flex-1" />

        {/* Save status */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
          {isSaving ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin" />
              Saving...
            </>
          ) : lastSaved ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="hidden lg:flex w-8 h-8 rounded-lg glass items-center justify-center hover:bg-white/10 transition-colors"
            title={showPreview ? 'Hide preview' : 'Show preview'}
          >
            {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
          <Button
            onClick={exportPDF}
            disabled={isExporting}
            size="sm"
            className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0 shadow-lg shadow-indigo-500/25 h-8 text-xs px-3"
          >
            {isExporting ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span className="ml-1.5 hidden sm:inline">{isExporting ? 'Exporting...' : 'Export PDF'}</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ===== LEFT SIDEBAR: STEP NAVIGATION ===== */}
        <aside className="w-14 lg:w-52 border-r border-white/5 flex-shrink-0 flex flex-col bg-sidebar/50 overflow-y-auto">
          {/* Panel tabs */}
          <div className="p-2 border-b border-white/5 space-y-1">
            {[
              { id: 'form', icon: FileText, label: 'Content' },
              { id: 'template', icon: LayoutTemplate, label: 'Template' },
              { id: 'order', icon: GripVertical, label: 'Order' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id as typeof activePanel)}
                className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  activePanel === tab.id
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Step navigation (form panel) */}
          {activePanel === 'form' && (
            <nav className="p-2 space-y-1 flex-1">
              {STEPS.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(i)}
                  className={`w-full flex items-center gap-2.5 px-2 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    currentStep === i
                      ? 'bg-primary/15 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <step.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden lg:inline">{step.label}</span>
                </button>
              ))}
              <div className="pt-2 border-t border-white/5 space-y-1">
                <button
                  onClick={() => { if (confirm('Load sample CV data?')) loadSample(); }}
                  className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden lg:inline">Load sample</span>
                </button>
                <button
                  onClick={() => { if (confirm('Reset all CV data?')) resetCV(); }}
                  className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden lg:inline">Reset CV</span>
                </button>
              </div>
            </nav>
          )}

          {/* Template panel */}
          {activePanel === 'template' && (
            <div className="p-2 flex-1 overflow-y-auto">
              <div className="space-y-2">
                {TEMPLATES.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full text-left rounded-xl overflow-hidden border-2 transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary shadow-lg shadow-primary/20'
                        : 'border-transparent hover:border-white/20'
                    }`}
                  >
                    <img src={template.preview} alt={template.name} className="w-full aspect-[3/4] object-cover object-top" />
                    <div className="p-2">
                      <div className="text-xs font-semibold">{template.name}</div>
                    </div>
                  </button>
                ))}
              </div>
              {/* Accent color */}
              <div className="mt-4 px-1">
                <div className="text-xs font-medium text-muted-foreground mb-2">Accent Color</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {ACCENT_COLORS.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setAccentColor(color.value)}
                      title={color.label}
                      className={`w-full aspect-square rounded-lg transition-all ${
                        accentColor === color.value ? 'ring-2 ring-white ring-offset-1 ring-offset-background scale-110' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
                <div className="mt-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Custom color</label>
                  <input
                    type="color"
                    value={accentColor}
                    onChange={e => setAccentColor(e.target.value)}
                    className="w-full h-8 rounded-lg cursor-pointer glass-input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section order panel */}
          {activePanel === 'order' && (
            <div className="p-2 flex-1">
              <div className="text-xs text-muted-foreground mb-3 px-1">Drag to reorder sections</div>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={cvData.sectionOrder} strategy={verticalListSortingStrategy}>
                  <div className="space-y-1.5">
                    {cvData.sectionOrder.map(key => (
                      <SortableSectionItem key={key} id={key} label={SECTION_LABELS[key]} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}
        </aside>

        {/* ===== MAIN CONTENT AREA ===== */}
        <div className="flex flex-1 overflow-hidden">
          {/* ===== FORM PANEL ===== */}
          <div className={`${showPreview ? 'w-full lg:w-[420px]' : 'flex-1'} flex-shrink-0 overflow-y-auto border-r border-white/5`}>
            <div className="p-4 lg:p-6">
              {/* Step header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-display font-bold text-lg">{STEPS[currentStep].label}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Step {currentStep + 1} of {STEPS.length}</p>
                </div>
                <div className="flex items-center gap-1">
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentStep(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentStep ? 'w-6 bg-primary' : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Form content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <CurrentForm />
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="text-xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMobilePreview(true)}
                    className="lg:hidden text-xs"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    Preview
                  </Button>
                  {currentStep < STEPS.length - 1 ? (
                    <Button
                      size="sm"
                      onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs"
                    >
                      Next
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={exportPDF}
                      disabled={isExporting}
                      className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-xs"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Export PDF
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ===== PREVIEW PANEL ===== */}
          {showPreview && (
            <div className="hidden lg:flex flex-1 flex-col overflow-hidden bg-muted/20">
              {/* Preview header */}
              <div className="h-10 border-b border-white/5 flex items-center px-4 gap-3 flex-shrink-0">
                <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Live Preview</span>
                <div className="flex-1" />
                <span className="text-xs text-muted-foreground capitalize">{selectedTemplate} template</span>
              </div>

              {/* Preview content */}
              <div
                id="preview-container"
                className="flex-1 overflow-auto p-6 flex justify-center items-start"
              >
                <div
                  style={{
                    width: `${794 * previewScale}px`,
                    height: `${1123 * previewScale}px`,
                    flexShrink: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                >
                  <div
                    ref={previewRef}
                    style={{
                      width: '794px',
                      height: '1123px',
                      transformOrigin: 'top left',
                      transform: `scale(${previewScale})`,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  >
                    <CVTemplateRenderer
                      data={cvData}
                      templateId={selectedTemplate}
                      accentColor={accentColor}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== MOBILE PREVIEW MODAL ===== */}
      <AnimatePresence>
        {showMobilePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col lg:hidden"
          >
            <div className="h-14 flex items-center justify-between px-4 border-b border-white/5">
              <span className="font-display font-semibold text-sm">CV Preview</span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={exportPDF}
                  disabled={isExporting}
                  className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-xs h-8"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Export PDF
                </Button>
                <button
                  onClick={() => setShowMobilePreview(false)}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center"
                >
                  <EyeOff className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 flex justify-center items-start">
              <div
                style={{
                  width: `${794 * 0.42}px`,
                  height: `${1123 * 0.42}px`,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: '794px',
                    height: '1123px',
                    transformOrigin: 'top left',
                    transform: 'scale(0.42)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                >
                  <CVTemplateRenderer
                    data={cvData}
                    templateId={selectedTemplate}
                    accentColor={accentColor}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
