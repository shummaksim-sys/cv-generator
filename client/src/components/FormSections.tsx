/*
 * FormSections — All CV form section components
 * Design: Glassmorphism inputs, smooth transitions
 */
import React, { useState } from 'react';
import { useCVContext } from '@/contexts/CVContext';
import { CVData, WorkExperience, Education, Skill, Project, Certification, Language } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { nanoid } from 'nanoid';
import { motion, AnimatePresence } from 'framer-motion';

// ===== SHARED COMPONENTS =====
function FormField({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

function GlassInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      {...props}
      className="glass-input h-9 text-sm bg-white/5 border-white/10 focus:border-primary/60 focus:ring-primary/20 placeholder:text-muted-foreground/50"
    />
  );
}

function GlassTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Textarea
      {...props}
      className="glass-input text-sm bg-white/5 border-white/10 focus:border-primary/60 focus:ring-primary/20 placeholder:text-muted-foreground/50 min-h-[80px] resize-none"
    />
  );
}

function CollapsibleItem({
  title,
  subtitle,
  onDelete,
  children,
  defaultOpen = false,
}: {
  title: string;
  subtitle?: string;
  onDelete: () => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass-card overflow-hidden drag-item"
    >
      <div
        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground/40 drag-handle flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{title || 'Untitled'}</div>
          {subtitle && <div className="text-xs text-muted-foreground truncate">{subtitle}</div>}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-destructive/15 hover:text-destructive transition-colors text-muted-foreground"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-white/5 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ===== PERSONAL INFO =====
export function PersonalInfoForm() {
  const { cvData, updatePersonal } = useCVContext();
  const p = cvData.personal;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Full Name" required>
          <GlassInput value={p.fullName} onChange={e => updatePersonal({ fullName: e.target.value })} placeholder="Alexandra Chen" />
        </FormField>
        <FormField label="Job Title" required>
          <GlassInput value={p.jobTitle} onChange={e => updatePersonal({ jobTitle: e.target.value })} placeholder="Senior Product Designer" />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Email" required>
          <GlassInput type="email" value={p.email} onChange={e => updatePersonal({ email: e.target.value })} placeholder="alex@email.com" />
        </FormField>
        <FormField label="Phone">
          <GlassInput value={p.phone} onChange={e => updatePersonal({ phone: e.target.value })} placeholder="+1 (555) 000-0000" />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Location">
          <GlassInput value={p.location} onChange={e => updatePersonal({ location: e.target.value })} placeholder="San Francisco, CA" />
        </FormField>
        <FormField label="Website">
          <GlassInput value={p.website} onChange={e => updatePersonal({ website: e.target.value })} placeholder="yoursite.com" />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="LinkedIn">
          <GlassInput value={p.linkedin} onChange={e => updatePersonal({ linkedin: e.target.value })} placeholder="linkedin.com/in/..." />
        </FormField>
        <FormField label="GitHub">
          <GlassInput value={p.github} onChange={e => updatePersonal({ github: e.target.value })} placeholder="github.com/..." />
        </FormField>
      </div>
      <FormField label="Professional Summary">
        <GlassTextarea
          value={p.summary}
          onChange={e => updatePersonal({ summary: e.target.value })}
          placeholder="Write a brief, compelling summary of your professional background and key strengths..."
          className="min-h-[100px]"
        />
      </FormField>
    </div>
  );
}

// ===== WORK EXPERIENCE =====
export function ExperienceForm() {
  const { cvData, updateExperience } = useCVContext();
  const items = cvData.experience;

  const add = () => {
    updateExperience([...items, {
      id: nanoid(), company: '', position: '', location: '',
      startDate: '', endDate: '', current: false, description: '', achievements: [],
    }]);
  };

  const update = (id: string, data: Partial<WorkExperience>) => {
    updateExperience(items.map(item => item.id === id ? { ...item, ...data } : item));
  };

  const remove = (id: string) => {
    updateExperience(items.filter(item => item.id !== id));
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const achievements = [...item.achievements];
    achievements[index] = value;
    update(id, { achievements });
  };

  const addAchievement = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    update(id, { achievements: [...item.achievements, ''] });
  };

  const removeAchievement = (id: string, index: number) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    update(id, { achievements: item.achievements.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {items.map((exp, i) => (
          <CollapsibleItem
            key={exp.id}
            title={exp.position || 'New Position'}
            subtitle={exp.company}
            onDelete={() => remove(exp.id)}
            defaultOpen={i === items.length - 1 && !exp.company}
          >
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Job Title" required>
                <GlassInput value={exp.position} onChange={e => update(exp.id, { position: e.target.value })} placeholder="Senior Designer" />
              </FormField>
              <FormField label="Company" required>
                <GlassInput value={exp.company} onChange={e => update(exp.id, { company: e.target.value })} placeholder="Acme Corp" />
              </FormField>
            </div>
            <FormField label="Location">
              <GlassInput value={exp.location} onChange={e => update(exp.id, { location: e.target.value })} placeholder="New York, NY" />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Start Date">
                <GlassInput type="month" value={exp.startDate} onChange={e => update(exp.id, { startDate: e.target.value })} />
              </FormField>
              <FormField label="End Date">
                <GlassInput type="month" value={exp.endDate} onChange={e => update(exp.id, { endDate: e.target.value })} disabled={exp.current} />
              </FormField>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={exp.current} onCheckedChange={v => update(exp.id, { current: v, endDate: v ? '' : exp.endDate })} />
              <Label className="text-xs text-muted-foreground">Currently working here</Label>
            </div>
            <FormField label="Description">
              <GlassTextarea value={exp.description} onChange={e => update(exp.id, { description: e.target.value })} placeholder="Brief description of your role..." />
            </FormField>
            <div>
              <Label className="text-xs font-medium text-muted-foreground mb-2 block">Key Achievements</Label>
              <div className="space-y-2">
                {exp.achievements.map((a, i) => (
                  <div key={i} className="flex gap-2">
                    <GlassInput value={a} onChange={e => updateAchievement(exp.id, i, e.target.value)} placeholder="Increased revenue by 30%..." className="flex-1" />
                    <button onClick={() => removeAchievement(exp.id, i)} className="w-8 h-9 rounded-md flex items-center justify-center hover:bg-destructive/15 hover:text-destructive text-muted-foreground transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <Button variant="ghost" size="sm" onClick={() => addAchievement(exp.id)} className="w-full h-8 text-xs border border-dashed border-white/10 hover:border-primary/40 hover:bg-primary/5">
                  <Plus className="w-3 h-3 mr-1" /> Add achievement
                </Button>
              </div>
            </div>
          </CollapsibleItem>
        ))}
      </AnimatePresence>
      <Button variant="outline" onClick={add} className="w-full h-10 glass border-white/10 hover:border-primary/40 hover:bg-primary/5 text-sm">
        <Plus className="w-4 h-4 mr-2" /> Add work experience
      </Button>
    </div>
  );
}

// ===== EDUCATION =====
export function EducationForm() {
  const { cvData, updateEducation } = useCVContext();
  const items = cvData.education;

  const add = () => {
    updateEducation([...items, {
      id: nanoid(), institution: '', degree: '', field: '',
      location: '', startDate: '', endDate: '', current: false,
    }]);
  };

  const update = (id: string, data: Partial<Education>) => {
    updateEducation(items.map(item => item.id === id ? { ...item, ...data } : item));
  };

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {items.map((edu, i) => (
          <CollapsibleItem
            key={edu.id}
            title={edu.degree || 'New Degree'}
            subtitle={edu.institution}
            onDelete={() => updateEducation(items.filter(e => e.id !== edu.id))}
            defaultOpen={i === items.length - 1 && !edu.institution}
          >
            <FormField label="Institution" required>
              <GlassInput value={edu.institution} onChange={e => update(edu.id, { institution: e.target.value })} placeholder="Harvard University" />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Degree">
                <GlassInput value={edu.degree} onChange={e => update(edu.id, { degree: e.target.value })} placeholder="Bachelor of Science" />
              </FormField>
              <FormField label="Field of Study">
                <GlassInput value={edu.field} onChange={e => update(edu.id, { field: e.target.value })} placeholder="Computer Science" />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Start Date">
                <GlassInput type="month" value={edu.startDate} onChange={e => update(edu.id, { startDate: e.target.value })} />
              </FormField>
              <FormField label="End Date">
                <GlassInput type="month" value={edu.endDate} onChange={e => update(edu.id, { endDate: e.target.value })} disabled={edu.current} />
              </FormField>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={edu.current} onCheckedChange={v => update(edu.id, { current: v })} />
              <Label className="text-xs text-muted-foreground">Currently studying</Label>
            </div>
            <FormField label="GPA (optional)">
              <GlassInput value={edu.gpa || ''} onChange={e => update(edu.id, { gpa: e.target.value })} placeholder="3.8" />
            </FormField>
          </CollapsibleItem>
        ))}
      </AnimatePresence>
      <Button variant="outline" onClick={add} className="w-full h-10 glass border-white/10 hover:border-primary/40 hover:bg-primary/5 text-sm">
        <Plus className="w-4 h-4 mr-2" /> Add education
      </Button>
    </div>
  );
}

// ===== SKILLS =====
export function SkillsForm() {
  const { cvData, updateSkills } = useCVContext();
  const items = cvData.skills;

  const add = () => {
    updateSkills([...items, { id: nanoid(), name: '', level: 3, category: 'General' }]);
  };

  const update = (id: string, data: Partial<Skill>) => {
    updateSkills(items.map(item => item.id === id ? { ...item, ...data } : item));
  };

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {items.map(skill => (
          <motion.div
            key={skill.id}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 glass-card p-3"
          >
            <GlassInput
              value={skill.name}
              onChange={e => update(skill.id, { name: e.target.value })}
              placeholder="Skill name"
              className="flex-1"
            />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  onClick={() => update(skill.id, { level })}
                  className={`w-6 h-6 rounded-full border transition-all ${
                    level <= skill.level
                      ? 'bg-primary border-primary'
                      : 'border-white/20 hover:border-primary/50'
                  }`}
                />
              ))}
            </div>
            <GlassInput
              value={skill.category}
              onChange={e => update(skill.id, { category: e.target.value })}
              placeholder="Category"
              className="w-28"
            />
            <button
              onClick={() => updateSkills(items.filter(s => s.id !== skill.id))}
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-destructive/15 hover:text-destructive text-muted-foreground transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outline" onClick={add} className="w-full h-10 glass border-white/10 hover:border-primary/40 hover:bg-primary/5 text-sm">
        <Plus className="w-4 h-4 mr-2" /> Add skill
      </Button>
    </div>
  );
}

// ===== PROJECTS =====
export function ProjectsForm() {
  const { cvData, updateProjects } = useCVContext();
  const items = cvData.projects;

  const add = () => {
    updateProjects([...items, {
      id: nanoid(), name: '', description: '', technologies: [],
      startDate: '', endDate: '',
    }]);
  };

  const update = (id: string, data: Partial<Project>) => {
    updateProjects(items.map(item => item.id === id ? { ...item, ...data } : item));
  };

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {items.map((proj, i) => (
          <CollapsibleItem
            key={proj.id}
            title={proj.name || 'New Project'}
            subtitle={proj.technologies.join(', ')}
            onDelete={() => updateProjects(items.filter(p => p.id !== proj.id))}
            defaultOpen={i === items.length - 1 && !proj.name}
          >
            <FormField label="Project Name" required>
              <GlassInput value={proj.name} onChange={e => update(proj.id, { name: e.target.value })} placeholder="My Awesome Project" />
            </FormField>
            <FormField label="Description">
              <GlassTextarea value={proj.description} onChange={e => update(proj.id, { description: e.target.value })} placeholder="What did you build and why?" />
            </FormField>
            <FormField label="Technologies (comma-separated)">
              <GlassInput
                value={proj.technologies.join(', ')}
                onChange={e => update(proj.id, { technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                placeholder="React, TypeScript, Node.js"
              />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="URL">
                <GlassInput value={proj.url || ''} onChange={e => update(proj.id, { url: e.target.value })} placeholder="project.com" />
              </FormField>
              <FormField label="GitHub">
                <GlassInput value={proj.github || ''} onChange={e => update(proj.id, { github: e.target.value })} placeholder="github.com/..." />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Start Date">
                <GlassInput type="month" value={proj.startDate} onChange={e => update(proj.id, { startDate: e.target.value })} />
              </FormField>
              <FormField label="End Date">
                <GlassInput type="month" value={proj.endDate} onChange={e => update(proj.id, { endDate: e.target.value })} />
              </FormField>
            </div>
          </CollapsibleItem>
        ))}
      </AnimatePresence>
      <Button variant="outline" onClick={add} className="w-full h-10 glass border-white/10 hover:border-primary/40 hover:bg-primary/5 text-sm">
        <Plus className="w-4 h-4 mr-2" /> Add project
      </Button>
    </div>
  );
}

// ===== CERTIFICATIONS =====
export function CertificationsForm() {
  const { cvData, updateCertifications } = useCVContext();
  const items = cvData.certifications;

  const add = () => {
    updateCertifications([...items, { id: nanoid(), name: '', issuer: '', date: '' }]);
  };

  const update = (id: string, data: Partial<Certification>) => {
    updateCertifications(items.map(item => item.id === id ? { ...item, ...data } : item));
  };

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {items.map((cert, i) => (
          <CollapsibleItem
            key={cert.id}
            title={cert.name || 'New Certification'}
            subtitle={cert.issuer}
            onDelete={() => updateCertifications(items.filter(c => c.id !== cert.id))}
            defaultOpen={i === items.length - 1 && !cert.name}
          >
            <FormField label="Certification Name" required>
              <GlassInput value={cert.name} onChange={e => update(cert.id, { name: e.target.value })} placeholder="AWS Solutions Architect" />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Issuing Organization">
                <GlassInput value={cert.issuer} onChange={e => update(cert.id, { issuer: e.target.value })} placeholder="Amazon Web Services" />
              </FormField>
              <FormField label="Date Issued">
                <GlassInput type="month" value={cert.date} onChange={e => update(cert.id, { date: e.target.value })} />
              </FormField>
            </div>
            <FormField label="Credential ID (optional)">
              <GlassInput value={cert.credentialId || ''} onChange={e => update(cert.id, { credentialId: e.target.value })} placeholder="ABC-123456" />
            </FormField>
          </CollapsibleItem>
        ))}
      </AnimatePresence>
      <Button variant="outline" onClick={add} className="w-full h-10 glass border-white/10 hover:border-primary/40 hover:bg-primary/5 text-sm">
        <Plus className="w-4 h-4 mr-2" /> Add certification
      </Button>
    </div>
  );
}

// ===== LANGUAGES =====
export function LanguagesForm() {
  const { cvData, updateLanguages } = useCVContext();
  const items = cvData.languages;
  const LEVELS: Language['level'][] = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'];

  const add = () => {
    updateLanguages([...items, { id: nanoid(), name: '', level: 'Intermediate' }]);
  };

  const update = (id: string, data: Partial<Language>) => {
    updateLanguages(items.map(item => item.id === id ? { ...item, ...data } : item));
  };

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {items.map(lang => (
          <motion.div
            key={lang.id}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 glass-card p-3"
          >
            <GlassInput
              value={lang.name}
              onChange={e => update(lang.id, { name: e.target.value })}
              placeholder="Language name"
              className="flex-1"
            />
            <Select value={lang.level} onValueChange={v => update(lang.id, { level: v as Language['level'] })}>
              <SelectTrigger className="w-36 glass-input h-9 text-sm bg-white/5 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map(l => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={() => updateLanguages(items.filter(l => l.id !== lang.id))}
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-destructive/15 hover:text-destructive text-muted-foreground transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outline" onClick={add} className="w-full h-10 glass border-white/10 hover:border-primary/40 hover:bg-primary/5 text-sm">
        <Plus className="w-4 h-4 mr-2" /> Add language
      </Button>
    </div>
  );
}
