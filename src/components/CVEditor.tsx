import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Plus, Trash2, Type, Layout, Maximize, Move, AlignLeft, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { CVData, ExperienceItem, EducationItem, LanguageItem, ProjectItem } from '../types';
import { cn } from '../lib/utils';

interface CVEditorProps {
  section: string | null;
  data: CVData;
  onClose: () => void;
  onSave: (updatedData: CVData) => void;
  onHighlightSetting?: (setting: string | null) => void;
}

export default function CVEditor({ section, data, onClose, onSave, onHighlightSetting }: CVEditorProps) {
  const [localData, setLocalData] = useState<CVData>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  if (!section) return null;

  const handleSettingsChange = (field: string, value: any) => {
    setLocalData({
      ...localData,
      settings: {
        ...(localData.settings || {}),
        [field]: value
      }
    });
  };

  const handlePersonalChange = (field: string, value: string) => {
    const updated = { ...localData };
    if (field === 'location' || field === 'phone' || field === 'email') {
      updated.personal.contact = { ...updated.personal.contact, [field]: value };
    } else {
      (updated.personal as any)[field] = value;
    }
    setLocalData(updated);
  };

  const updateExperience = (id: string, updates: Partial<ExperienceItem>) => {
    const updated = { ...localData };
    updated.experience = updated.experience.map(exp => exp.id === id ? { ...exp, ...updates } : exp);
    setLocalData(updated);
  };

  const addExperience = () => {
    const updated = { ...localData };
    updated.experience.push({
      id: Math.random().toString(36).substr(2, 9),
      company: "Nytt selskap",
      location: "Oslo",
      role: "Rolle",
      period: "2024 - 2025",
      description: "",
      bullets: [""]
    });
    setLocalData(updated);
  };

  const removeExperience = (id: string) => {
    const updated = { ...localData };
    updated.experience = updated.experience.filter(exp => exp.id !== id);
    setLocalData(updated);
  };

  const moveExperience = (id: string, direction: 'up' | 'down') => {
    const updated = { ...localData };
    const index = updated.experience.findIndex(exp => exp.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= updated.experience.length) return;
    
    const tempExperience = [...updated.experience];
    const [movedItem] = tempExperience.splice(index, 1);
    tempExperience.splice(newIndex, 0, movedItem);
    
    setLocalData({ ...updated, experience: tempExperience });
  };

  const updateEducation = (id: string, updates: Partial<EducationItem>) => {
    const updated = { ...localData };
    updated.education = updated.education.map(edu => edu.id === id ? { ...edu, ...updates } : edu);
    setLocalData(updated);
  };

  const addEducation = () => {
    const updated = { ...localData };
    updated.education.push({
      id: Math.random().toString(36).substr(2, 9),
      degree: "Grad",
      school: "Skole",
      period: "2020",
      details: ""
    });
    setLocalData(updated);
  };

  const moveEducation = (id: string, direction: 'up' | 'down') => {
    const updated = { ...localData };
    const index = updated.education.findIndex(e => e.id === id);
    if (index === -1) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= updated.education.length) return;
    const temp = [...updated.education];
    const [item] = temp.splice(index, 1);
    temp.splice(newIndex, 0, item);
    setLocalData({ ...updated, education: temp });
  };

  const updateProjects = (id: string, updates: Partial<ProjectItem>) => {
    const updated = { ...localData };
    updated.projects = updated.projects.map(proj => proj.id === id ? { ...proj, ...updates } : proj);
    setLocalData(updated);
  };

  const addProject = () => {
    const updated = { ...localData };
    updated.projects.push({
      id: Math.random().toString(36).substr(2, 9),
      title: "Nytt prosjekt",
      client: "Kunde",
      description: "",
      bullets: [""]
    });
    setLocalData(updated);
  };

  const removeProject = (id: string) => {
    const updated = { ...localData };
    updated.projects = updated.projects.filter(proj => proj.id !== id);
    setLocalData(updated);
  };

  const moveProject = (id: string, direction: 'up' | 'down') => {
    const updated = { ...localData };
    const index = updated.projects.findIndex(p => p.id === id);
    if (index === -1) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= updated.projects.length) return;
    const temp = [...updated.projects];
    const [item] = temp.splice(index, 1);
    temp.splice(newIndex, 0, item);
    setLocalData({ ...updated, projects: temp });
  };

  const updateSkills = (val: string) => {
    setLocalData({ ...localData, skills: val.split('\n').filter(s => s.trim() !== '') });
  };

  return (
    <div className="print:hidden fixed inset-0 z-50 flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/10"
      />
      
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden border-l border-slate-200"
      >
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
              Seksjonsredigering
            </h2>
          </div>
          <p className="text-xs text-slate-400 uppercase tracking-tighter font-medium">
            Redigerer: {section === 'personal' ? 'Om meg / Info' : 
                         section === 'experience' ? 'Arbeidserfaring' : 
                         section === 'education' ? 'Utdanning' : 
                         section === 'skills' ? 'Ferdigheter' : 
                         section === 'languages' ? 'Språk' : 
                         section === 'projects' ? 'Prosjekter' : 
                         section === 'settings' ? 'Layout-innstillinger' : section}
          </p>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {section === 'settings' && (
            <div className="space-y-8">
              {/* CATEGORY: PAGE & GLOBAL LAYOUT */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <Layout size={14} />
                  </div>
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Global Side & Layout</h3>
                </div>

                <div className="space-y-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                      <span>Total Sidebredde</span>
                      <span className="text-blue-600">{localData.settings?.pageWidth ?? 1000}px</span>
                    </label>
                    <input 
                      type="range" min="600" max="1200" step="20"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                      value={localData.settings?.pageWidth ?? 1000}
                      onChange={(e) => handleSettingsChange('pageWidth', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                        <span>Seksjonsavstand</span>
                        <span className="text-blue-600">{localData.settings?.sectionSpacing ?? 48}px</span>
                      </label>
                      <input 
                        type="range" min="16" max="96" step="4"
                        className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                        value={localData.settings?.sectionSpacing ?? 48}
                        onChange={(e) => handleSettingsChange('sectionSpacing', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                        <span>Felt-padding</span>
                        <span className="text-blue-600">{localData.settings?.fieldPadding ?? 8}px</span>
                      </label>
                      <input
                        type="range" min="0" max="32" step="2"
                        className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                        value={localData.settings?.fieldPadding ?? 8}
                        onChange={(e) => handleSettingsChange('fieldPadding', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CATEGORY: TYPOGRAPHY */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Type size={14} />
                  </div>
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Global Typografi</h3>
                </div>

                <div className="space-y-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Overskrift Font</label>
                      <select 
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        value={localData.settings?.headingFontFamily || 'Inter'}
                        onChange={(e) => handleSettingsChange('headingFontFamily', e.target.value)}
                      >
                        <option value="Inter">Inter</option>
                        <option value="Raleway">Raleway</option>
                        <option value="Playfair Display">Playfair</option>
                        <option value="Plus Jakarta Sans">Jakarta</option>
                        <option value="Outfit">Outfit</option>
                        <option value="EB Garamond">Garamond</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Lora">Lora</option>
                        <option value="Merriweather">Merriweather</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Brødtekst Font</label>
                      <select 
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        value={localData.settings?.bodyFontFamily || 'Inter'}
                        onChange={(e) => handleSettingsChange('bodyFontFamily', e.target.value)}
                      >
                        <option value="Inter">Inter</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Plus Jakarta Sans">Jakarta</option>
                        <option value="Outfit">Outfit</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Lato">Lato</option>
                        <option value="PT Sans">PT Sans</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                        <span>Hovedtekst str.</span>
                        <span className="text-indigo-600">{localData.settings?.bodyFontSize ?? 7.8}pt</span>
                      </label>
                      <input 
                        type="range" min="6" max="14" step="0.2"
                        className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        value={localData.settings?.bodyFontSize ?? 7.8}
                        onChange={(e) => handleSettingsChange('bodyFontSize', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                        <span>Overskrift str.</span>
                        <span className="text-indigo-600">{localData.settings?.sectionTitleFontSize ?? 11}pt</span>
                      </label>
                      <input 
                        type="range" min="8" max="24" step="0.5"
                        className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        value={localData.settings?.sectionTitleFontSize ?? 11}
                        onChange={(e) => handleSettingsChange('sectionTitleFontSize', parseFloat(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                      <span>Linjeavstand</span>
                      <span className="text-indigo-600">{localData.settings?.lineHeight ?? 1.5}</span>
                    </label>
                    <input 
                      type="range" min="1" max="2" step="0.05"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.lineHeight ?? 1.5}
                      onChange={(e) => handleSettingsChange('lineHeight', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === 'personal' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 bg-blue-100 text-blue-700 rounded">
                    <Type size={12} />
                  </div>
                  <h3 className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Typografi & Luft</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Navn Størrelse</span>
                      <span className="text-blue-600">{localData.settings?.nameFontSize ?? 26}pt</span>
                    </label>
                    <input 
                      type="range" min="12" max="48" step="1"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                      value={localData.settings?.nameFontSize ?? 26}
                      onChange={(e) => handleSettingsChange('nameFontSize', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Tittel Størrelse</span>
                      <span className="text-blue-600">{localData.settings?.titleFontSize ?? 9}pt</span>
                    </label>
                    <input 
                      type="range" min="6" max="18" step="0.5"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                      value={localData.settings?.titleFontSize ?? 9}
                      onChange={(e) => handleSettingsChange('titleFontSize', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200/50 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between tracking-wider">
                      <span>Header Topp-luft</span>
                      <span className="text-blue-600">{localData.settings?.headerPaddingTop ?? 64}px</span>
                    </label>
                    <input 
                      type="range" min="0" max="150" step="5"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                      value={localData.settings?.headerPaddingTop ?? 64}
                      onChange={(e) => handleSettingsChange('headerPaddingTop', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between tracking-wider">
                      <span>Kontaktfelt Luft</span>
                      <span className="text-blue-600">{localData.settings?.headerContactGap ?? 24}px</span>
                    </label>
                    <input 
                      type="range" min="8" max="48" step="2"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                      value={localData.settings?.headerContactGap ?? 24}
                      onChange={(e) => handleSettingsChange('headerContactGap', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200/50 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between tracking-wider">
                      <span>Navn til Tittel</span>
                      <span className="text-blue-600">{localData.settings?.nameToTitleSpacing ?? 8}px</span>
                    </label>
                    <input 
                      type="range" min="0" max="40" step="1"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                      value={localData.settings?.nameToTitleSpacing ?? 8}
                      onChange={(e) => handleSettingsChange('nameToTitleSpacing', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between tracking-wider">
                      <span>Tittel til Kontakt</span>
                      <span className="text-blue-600">{localData.settings?.titleToContactSpacing ?? 32}px</span>
                    </label>
                    <input 
                      type="range" min="0" max="80" step="2"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                      value={localData.settings?.titleToContactSpacing ?? 32}
                      onChange={(e) => handleSettingsChange('titleToContactSpacing', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fullt navn</label>
                <input 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  value={localData.personal.name}
                  onChange={(e) => handlePersonalChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tittel</label>
                <input 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  value={localData.personal.title}
                  onChange={(e) => handlePersonalChange('title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Oppsummering</label>
                <textarea 
                  rows={6}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                  value={localData.personal.summary}
                  onChange={(e) => handlePersonalChange('summary', e.target.value)}
                />
              </div>
              

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sted</label>
                  <input 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    value={localData.personal.contact.location}
                    onChange={(e) => handlePersonalChange('location', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Telefon</label>
                  <input 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    value={localData.personal.contact.phone}
                    onChange={(e) => handlePersonalChange('phone', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {section === 'experience' && (
            <div className="space-y-8 pb-10">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 bg-amber-100 text-amber-700 rounded">
                    <Layout size={12} />
                  </div>
                  <h3 className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Layout & Stil</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Overskrift str.</span>
                      <span className="text-amber-600">{localData.settings?.sectionTitleFontSize ?? 11}pt</span>
                    </label>
                    <input 
                      type="range" min="8" max="20" step="0.5"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-amber-600"
                      value={localData.settings?.sectionTitleFontSize ?? 11}
                      onChange={(e) => handleSettingsChange('sectionTitleFontSize', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Brødtekst str.</span>
                      <span className="text-amber-600">{localData.settings?.bodyFontSize ?? 7.8}pt</span>
                    </label>
                    <input 
                      type="range" min="6" max="14" step="0.2"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-amber-600"
                      value={localData.settings?.bodyFontSize ?? 7.8}
                      onChange={(e) => handleSettingsChange('bodyFontSize', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200/50 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between tracking-wider">
                      <span>Tittel-kolonne Bredde</span>
                      <span className="text-amber-600">{localData.settings?.experienceWidth ?? 96}px</span>
                    </label>
                    <input 
                      type="range" min="60" max="300" step="4"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-amber-600"
                      value={localData.settings?.experienceWidth ?? 96}
                      onChange={(e) => handleSettingsChange('experienceWidth', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between tracking-wider">
                      <span>Vertikal avstand</span>
                      <span className="text-amber-600">{localData.settings?.itemSpacing ?? 24}px</span>
                    </label>
                    <input 
                      type="range" min="8" max="64" step="4"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-amber-600"
                      value={localData.settings?.itemSpacing ?? 24}
                      onChange={(e) => handleSettingsChange('itemSpacing', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Arbeidserfaring</h3>
                </div>
                {localData.experience.map((exp, index) => (
                  <div key={exp.id} className="p-5 bg-slate-50 rounded-2xl relative border border-slate-200">
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button 
                        onClick={() => moveExperience(exp.id, 'up')}
                        disabled={index === 0}
                        className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all disabled:opacity-0 disabled:pointer-events-none"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button 
                        onClick={() => moveExperience(exp.id, 'down')}
                        disabled={index === localData.experience.length - 1}
                        className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all disabled:opacity-0 disabled:pointer-events-none"
                      >
                        <ChevronDown size={16} />
                      </button>
                      <button 
                        onClick={() => removeExperience(exp.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input 
                        placeholder="Selskap"
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      />
                      <input 
                        placeholder="Rolle"
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input 
                        placeholder="Periode"
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                        value={exp.period}
                        onChange={(e) => updateExperience(exp.id, { period: e.target.value })}
                      />
                      <input 
                        placeholder="Sted"
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                      />
                    </div>
                    <textarea 
                      rows={3}
                      placeholder="Beskrivelse"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm mb-4 resize-none"
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    />
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kulepunkter (ett per linje)</label>
                      <textarea 
                        rows={4}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono leading-relaxed"
                        value={exp.bullets.join('\n')}
                        onChange={(e) => updateExperience(exp.id, { bullets: e.target.value.split('\n') })}
                      />
                    </div>
                  </div>
                ))}
                <button 
                  onClick={addExperience}
                  className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest"
                >
                  <Plus size={18} />
                  <span>Legg til erfaring</span>
                </button>
              </div>
            </div>
          )}

          {section === 'projects' && (
            <div className="space-y-8 pb-10">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 bg-amber-100 text-amber-700 rounded">
                    <Layout size={12} />
                  </div>
                  <h3 className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Layout & Stil</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Overskrift str.</span>
                      <span className="text-amber-600">{localData.settings?.sectionTitleFontSize ?? 11}pt</span>
                    </label>
                    <input 
                      type="range" min="8" max="20" step="0.5"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-amber-600"
                      value={localData.settings?.sectionTitleFontSize ?? 11}
                      onChange={(e) => handleSettingsChange('sectionTitleFontSize', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Brødtekst str.</span>
                      <span className="text-amber-600">{localData.settings?.bodyFontSize ?? 7.8}pt</span>
                    </label>
                    <input 
                      type="range" min="6" max="14" step="0.2"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-amber-600"
                      value={localData.settings?.bodyFontSize ?? 7.8}
                      onChange={(e) => handleSettingsChange('bodyFontSize', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200/50 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between tracking-wider">
                      <span>Tittel-kolonne Bredde</span>
                      <span className="text-amber-600">{localData.settings?.projectsWidth ?? 180}px</span>
                    </label>
                    <input 
                      type="range" min="100" max="450" step="10"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-amber-600"
                      value={localData.settings?.projectsWidth ?? 180}
                      onChange={(e) => handleSettingsChange('projectsWidth', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between tracking-wider">
                      <span>Vertikal avstand</span>
                      <span className="text-amber-600">{localData.settings?.itemSpacing ?? 24}px</span>
                    </label>
                    <input 
                      type="range" min="8" max="64" step="4"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-amber-600"
                      value={localData.settings?.itemSpacing ?? 24}
                      onChange={(e) => handleSettingsChange('itemSpacing', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between tracking-wider">
                    <span>Beskrivelse Bredde</span>
                    <span className="text-amber-600">{localData.settings?.projectsDescriptionWidth ?? 400}px</span>
                  </label>
                  <input 
                    type="range" min="200" max="600" step="10"
                    className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-amber-600"
                    value={localData.settings?.projectsDescriptionWidth ?? 400}
                    onChange={(e) => handleSettingsChange('projectsDescriptionWidth', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Utvalgte prosjekter</h3>
                </div>
                {localData.projects.map((proj, index) => (
                  <div key={proj.id} className="p-5 bg-slate-50 rounded-2xl relative border border-slate-200">
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button 
                        onClick={() => moveProject(proj.id, 'up')}
                        disabled={index === 0}
                        className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all disabled:opacity-0 disabled:pointer-events-none"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button 
                        onClick={() => moveProject(proj.id, 'down')}
                        disabled={index === localData.projects.length - 1}
                        className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all disabled:opacity-0 disabled:pointer-events-none"
                      >
                        <ChevronDown size={16} />
                      </button>
                      <button 
                        onClick={() => removeProject(proj.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input 
                        placeholder="Prosjektnavn"
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        value={proj.title}
                        onChange={(e) => updateProjects(proj.id, { title: e.target.value })}
                      />
                      <input 
                        placeholder="Kunde"
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        value={proj.client}
                        onChange={(e) => updateProjects(proj.id, { client: e.target.value })}
                      />
                    </div>
                    <textarea 
                      rows={3}
                      placeholder="Beskrivelse"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm mb-4 resize-none"
                      value={proj.description}
                      onChange={(e) => updateProjects(proj.id, { description: e.target.value })}
                    />
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kulepunkter (ett per linje)</label>
                      <textarea 
                        rows={4}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono leading-relaxed"
                        value={proj.bullets.join('\n')}
                        onChange={(e) => updateProjects(proj.id, { bullets: e.target.value.split('\n') })}
                      />
                    </div>
                  </div>
                ))}
                <button 
                  onClick={addProject}
                  className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest"
                >
                  <Plus size={18} />
                  <span>Legg til prosjekt</span>
                </button>
              </div>
            </div>
          )}

          {section === 'skills' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 bg-indigo-100 text-indigo-700 rounded">
                    <Layout size={12} />
                  </div>
                  <h3 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Sidefelt Layout</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Sidefelt Bredde</span>
                      <span className="text-indigo-600">{localData.settings?.sidebarWidth ?? 35}%</span>
                    </label>
                    <input 
                      type="range" min="20" max="50" step="1"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.sidebarWidth ?? 35}
                      onChange={(e) => handleSettingsChange('sidebarWidth', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Overskrift str.</span>
                      <span className="text-indigo-600">{localData.settings?.sidebarTitleFontSize ?? 10}pt</span>
                    </label>
                    <input 
                      type="range" min="8" max="16" step="0.5"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.sidebarTitleFontSize ?? 10}
                      onChange={(e) => handleSettingsChange('sidebarTitleFontSize', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                    <span>Brødtekst str.</span>
                    <span className="text-indigo-600">{localData.settings?.sidebarBodyFontSize ?? 8.5}pt</span>
                  </label>
                  <input 
                    type="range" min="6" max="12" step="0.2"
                    className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    value={localData.settings?.sidebarBodyFontSize ?? 8.5}
                    onChange={(e) => handleSettingsChange('sidebarBodyFontSize', parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ferdigheter (én per linje)</label>
                <textarea 
                  rows={15}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-mono text-xs leading-relaxed transition-all"
                  value={localData.skills.join('\n')}
                  onChange={(e) => updateSkills(e.target.value)}
                />
              </div>
            </div>
          )}

          {section === 'education' && (
            <div className="space-y-8">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 bg-indigo-100 text-indigo-700 rounded">
                    <Layout size={12} />
                  </div>
                  <h3 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Sidefelt Layout</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Sidefelt Bredde</span>
                      <span className="text-indigo-600">{localData.settings?.sidebarWidth ?? 35}%</span>
                    </label>
                    <input 
                      type="range" min="20" max="50" step="1"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.sidebarWidth ?? 35}
                      onChange={(e) => handleSettingsChange('sidebarWidth', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Overskrift str.</span>
                      <span className="text-indigo-600">{localData.settings?.sidebarTitleFontSize ?? 10}pt</span>
                    </label>
                    <input 
                      type="range" min="8" max="16" step="0.5"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.sidebarTitleFontSize ?? 10}
                      onChange={(e) => handleSettingsChange('sidebarTitleFontSize', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {localData.education.map((edu, index) => (
                  <div key={edu.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative">
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button 
                        onClick={() => moveEducation(edu.id, 'up')}
                        disabled={index === 0}
                        className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all disabled:opacity-0 disabled:pointer-events-none"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button 
                        onClick={() => moveEducation(edu.id, 'down')}
                        disabled={index === localData.education.length - 1}
                        className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all disabled:opacity-0 disabled:pointer-events-none"
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        placeholder="Grad / Utdanning"
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      />
                      <input 
                        placeholder="Skole / Universitet"
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        placeholder="Periode (f.eks. 2015 - 2018)"
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                        value={edu.period}
                        onChange={(e) => updateEducation(edu.id, { period: e.target.value })}
                      />
                      <input 
                        placeholder="Detaljer"
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                        value={edu.details}
                        onChange={(e) => updateEducation(edu.id, { details: e.target.value })}
                      />
                    </div>
                  </div>
                ))}
                <button 
                  onClick={addEducation}
                  className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest"
                >
                  <Plus size={18} />
                  <span>Legg til utdanning</span>
                </button>
              </div>
            </div>
          )}

          {section === 'languages' && (
            <div className="space-y-8">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 bg-indigo-100 text-indigo-700 rounded">
                    <Layout size={12} />
                  </div>
                  <h3 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Sidefelt Layout</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Sidefelt Bredde</span>
                      <span className="text-indigo-600">{localData.settings?.sidebarWidth ?? 35}%</span>
                    </label>
                    <input 
                      type="range" min="20" max="50" step="1"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.sidebarWidth ?? 35}
                      onChange={(e) => handleSettingsChange('sidebarWidth', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Overskrift str.</span>
                      <span className="text-indigo-600">{localData.settings?.sidebarTitleFontSize ?? 10}pt</span>
                    </label>
                    <input 
                      type="range" min="8" max="16" step="0.5"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.sidebarTitleFontSize ?? 10}
                      onChange={(e) => handleSettingsChange('sidebarTitleFontSize', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {localData.languages.map((lang, index) => (
                  <div key={index} className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <input 
                      placeholder="Språk"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                      value={lang.name}
                      onChange={(e) => {
                        const newLangs = [...localData.languages];
                        newLangs[index].name = e.target.value;
                        setLocalData({ ...localData, languages: newLangs });
                      }}
                    />
                    <input 
                      placeholder="Nivå"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                      value={lang.level}
                      onChange={(e) => {
                        const newLangs = [...localData.languages];
                        newLangs[index].level = e.target.value;
                        setLocalData({ ...localData, languages: newLangs });
                      }}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => setLocalData({ ...localData, languages: [...localData.languages, { name: '', level: '' }] })}
                  className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest"
                >
                  <Plus size={16} />
                  <span>Legg til språk</span>
                </button>
              </div>
            </div>
          )}

          {section === 'links' && (
            <div className="space-y-8">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 bg-indigo-100 text-indigo-700 rounded">
                    <Layout size={12} />
                  </div>
                  <h3 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Sidefelt Layout</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Sidefelt Bredde</span>
                      <span className="text-indigo-600">{localData.settings?.sidebarWidth ?? 35}%</span>
                    </label>
                    <input 
                      type="range" min="20" max="50" step="1"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.sidebarWidth ?? 35}
                      onChange={(e) => handleSettingsChange('sidebarWidth', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Overskrift str.</span>
                      <span className="text-indigo-600">{localData.settings?.sidebarTitleFontSize ?? 10}pt</span>
                    </label>
                    <input 
                      type="range" min="8" max="16" step="0.5"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.sidebarTitleFontSize ?? 10}
                      onChange={(e) => handleSettingsChange('sidebarTitleFontSize', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {localData.links.map((link, index) => (
                  <div key={index} className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <input 
                      placeholder="Label (f.eks. LinkedIn)"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...localData.links];
                        newLinks[index].label = e.target.value;
                        setLocalData({ ...localData, links: newLinks });
                      }}
                    />
                    <input 
                      placeholder="URL"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...localData.links];
                        newLinks[index].url = e.target.value;
                        setLocalData({ ...localData, links: newLinks });
                      }}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => setLocalData({ ...localData, links: [...localData.links, { label: '', url: '' }] })}
                  className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest"
                >
                  <Plus size={16} />
                  <span>Legg til link</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200 flex gap-3">
          <button 
            onClick={() => onSave(localData)}
            className="flex-1 py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            <Save size={16} />
            Oppdater seksjon
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-400 text-xs font-bold rounded-xl hover:text-slate-600 hover:border-slate-300 transition-all"
          >
            Avbryt
          </button>
        </div>
      </motion.div>
    </div>
  );
}
