import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CVData, DEFAULT_CV_DATA, SectionKey, TemplateId } from '@/lib/types';

interface CVContextType {
  cvData: CVData;
  updatePersonal: (data: Partial<CVData['personal']>) => void;
  updateExperience: (data: CVData['experience']) => void;
  updateEducation: (data: CVData['education']) => void;
  updateSkills: (data: CVData['skills']) => void;
  updateProjects: (data: CVData['projects']) => void;
  updateCertifications: (data: CVData['certifications']) => void;
  updateLanguages: (data: CVData['languages']) => void;
  updateSectionOrder: (order: SectionKey[]) => void;
  selectedTemplate: TemplateId;
  setSelectedTemplate: (id: TemplateId) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  lastSaved: Date | null;
  isSaving: boolean;
  resetCV: () => void;
  loadSample: () => void;
}

const CVContext = createContext<CVContextType | null>(null);

const STORAGE_KEY = 'craftcv_data';
const TEMPLATE_KEY = 'craftcv_template';
const COLOR_KEY = 'craftcv_color';

function loadFromStorage(): CVData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_CV_DATA, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_CV_DATA;
}

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cvData, setCvData] = useState<CVData>(loadFromStorage);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(
    () => (localStorage.getItem(TEMPLATE_KEY) as TemplateId) || 'classic'
  );
  const [accentColor, setAccentColor] = useState<string>(
    () => localStorage.getItem(COLOR_KEY) || '#4F46E5'
  );
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Autosave with debounce
  const scheduleSave = useCallback((data: CVData) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setIsSaving(true);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setLastSaved(new Date());
      } catch {}
      setIsSaving(false);
    }, 800);
  }, []);

  useEffect(() => {
    scheduleSave(cvData);
  }, [cvData, scheduleSave]);

  useEffect(() => {
    localStorage.setItem(TEMPLATE_KEY, selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    localStorage.setItem(COLOR_KEY, accentColor);
  }, [accentColor]);

  const updatePersonal = useCallback((data: Partial<CVData['personal']>) => {
    setCvData(prev => ({ ...prev, personal: { ...prev.personal, ...data } }));
  }, []);

  const updateExperience = useCallback((data: CVData['experience']) => {
    setCvData(prev => ({ ...prev, experience: data }));
  }, []);

  const updateEducation = useCallback((data: CVData['education']) => {
    setCvData(prev => ({ ...prev, education: data }));
  }, []);

  const updateSkills = useCallback((data: CVData['skills']) => {
    setCvData(prev => ({ ...prev, skills: data }));
  }, []);

  const updateProjects = useCallback((data: CVData['projects']) => {
    setCvData(prev => ({ ...prev, projects: data }));
  }, []);

  const updateCertifications = useCallback((data: CVData['certifications']) => {
    setCvData(prev => ({ ...prev, certifications: data }));
  }, []);

  const updateLanguages = useCallback((data: CVData['languages']) => {
    setCvData(prev => ({ ...prev, languages: data }));
  }, []);

  const updateSectionOrder = useCallback((order: SectionKey[]) => {
    setCvData(prev => ({ ...prev, sectionOrder: order }));
  }, []);

  const resetCV = useCallback(() => {
    setCvData(DEFAULT_CV_DATA);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const loadSample = useCallback(async () => {
    const { SAMPLE_CV_DATA } = await import('@/lib/types');
    setCvData(SAMPLE_CV_DATA);
  }, []);

  return (
    <CVContext.Provider value={{
      cvData,
      updatePersonal,
      updateExperience,
      updateEducation,
      updateSkills,
      updateProjects,
      updateCertifications,
      updateLanguages,
      updateSectionOrder,
      selectedTemplate,
      setSelectedTemplate,
      accentColor,
      setAccentColor,
      lastSaved,
      isSaving,
      resetCV,
      loadSample,
    }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCVContext() {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error('useCVContext must be used within CVProvider');
  return ctx;
}
