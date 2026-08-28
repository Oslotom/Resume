import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Plus, Trash2 } from 'lucide-react';
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
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
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
            <div className="space-y-6">
              {/* Global Font Sizes */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fontstørrelser</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Navn ({localData.settings?.nameFontSize ?? 26}pt)</label>
                  </div>
                  <input 
                    type="range" min="12" max="48" step="1"
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    value={localData.settings?.nameFontSize ?? 26}
                    onChange={(e) => handleSettingsChange('nameFontSize', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hovedtekst ({localData.settings?.bodyFontSize ?? 7.8}pt)</label>
                  </div>
                  <input 
                    type="range" min="6" max="14" step="0.2"
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    value={localData.settings?.bodyFontSize ?? 7.8}
                    onChange={(e) => handleSettingsChange('bodyFontSize', parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sidefeltbredde ({localData.settings?.sidebarWidth || 35}%)</label>
                </div>
                <input 
                  type="range"
                  min="20"
                  max="50"
                  step="1"
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={localData.settings?.sidebarWidth || 35}
                  onChange={(e) => handleSettingsChange('sidebarWidth', parseInt(e.target.value))}
                />
                <p className="text-[10px] text-slate-400 italic">Juster forholdet mellom det mørke sidefeltet og hovedinnholdet.</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Innholdsmarginer ({localData.settings?.contentPadding ?? 24}px)</label>
                </div>
                <input 
                  type="range"
                  min="20"
                  max="80"
                  step="4"
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={localData.settings?.contentPadding ?? 24}
                  onChange={(e) => handleSettingsChange('contentPadding', parseInt(e.target.value))}
                />
                <p className="text-[10px] text-slate-400 italic">Juster luftigheten i den hvite hovedseksjonen.</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Erfaringskolonne ({localData.settings?.experienceWidth ?? 96}px)</label>
                </div>
                <input 
                  type="range"
                  min="60"
                  max="160"
                  step="4"
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={localData.settings?.experienceWidth ?? 96}
                  onChange={(e) => handleSettingsChange('experienceWidth', parseInt(e.target.value))}
                />
                <p className="text-[10px] text-slate-400 italic">Juster bredden på firma-kolonnen i arbeidserfaring.</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sidefelt-luftighet ({localData.settings?.sidebarPadding ?? 32}px)</label>
                  </div>
                  <input 
                    type="range"
                    min="16"
                    max="64"
                    step="4"
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    value={localData.settings?.sidebarPadding ?? 32}
                    onChange={(e) => handleSettingsChange('sidebarPadding', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Seksjonsavstand ({localData.settings?.sectionSpacing ?? 40}px)</label>
                  </div>
                  <input 
                    type="range"
                    min="20"
                    max="100"
                    step="4"
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    value={localData.settings?.sectionSpacing ?? 40}
                    onChange={(e) => handleSettingsChange('sectionSpacing', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Elementavstand ({localData.settings?.itemSpacing ?? 24}px)</label>
                  </div>
                  <input 
                    type="range"
                    min="8"
                    max="64"
                    step="4"
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    value={localData.settings?.itemSpacing ?? 24}
                    onChange={(e) => handleSettingsChange('itemSpacing', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Topptekst-luftighet ({localData.settings?.headerSpacing ?? 48}px)</label>
                  </div>
                  <input
                    type="range"
                    min="16"
                    max="100"
                    step="4"
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    value={localData.settings?.headerSpacing ?? 48}
                    onChange={(e) => handleSettingsChange('headerSpacing', parseInt(e.target.value))}
                  />
                </div>

                <div
                  className="space-y-4"
                  onMouseEnter={() => onHighlightSetting?.('fieldPadding')}
                  onMouseLeave={() => onHighlightSetting?.(null)}
                >
                  <div className="flex justify-between items-center">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Felt-padding ({localData.settings?.fieldPadding ?? 8}px)</label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    step="2"
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    value={localData.settings?.fieldPadding ?? 8}
                    onChange={(e) => handleSettingsChange('fieldPadding', parseInt(e.target.value))}
                  />
                  <p className="text-[10px] text-slate-400 italic">Juster polstringen rundt hvert redigerbart felt (topptekst, erfaring, ferdigheter osv.).</p>
                </div>
              </div>
            </div>
          )}

          {section === 'personal' && (
            <div className="space-y-6">
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

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fontstørrelser</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Navn ({localData.settings?.nameFontSize ?? 26}pt)</label>
                    <input 
                      type="range" min="12" max="48" step="1"
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.nameFontSize ?? 26}
                      onChange={(e) => handleSettingsChange('nameFontSize', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tittel ({localData.settings?.titleFontSize ?? 9}pt)</label>
                    <input 
                      type="range" min="6" max="18" step="0.5"
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.titleFontSize ?? 9}
                      onChange={(e) => handleSettingsChange('titleFontSize', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === 'experience' && (
            <div className="space-y-8">
                <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-4">
                  <h3 className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest flex items-center gap-2">
                    Seksjonsfont
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-indigo-700/60 uppercase">Overskrift ({localData.settings?.sectionTitleFontSize ?? 11}pt)</label>
                      <input 
                        type="range" min="8" max="20" step="0.5"
                        className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        value={localData.settings?.sectionTitleFontSize ?? 11}
                        onChange={(e) => handleSettingsChange('sectionTitleFontSize', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-indigo-700/60 uppercase">Brødtekst ({localData.settings?.bodyFontSize ?? 7.8}pt)</label>
                      <input 
                        type="range" min="6" max="14" step="0.2"
                        className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        value={localData.settings?.bodyFontSize ?? 7.8}
                        onChange={(e) => handleSettingsChange('bodyFontSize', parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              {localData.experience.map((exp, idx) => (
                <div key={exp.id} className="p-5 bg-slate-50 rounded-2xl relative border border-slate-200">
                  <button 
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-2 right-2 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
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
          )}

          {section === 'skills' && (
            <div className="space-y-6">
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-indigo-700/60 uppercase">Overskrift ({localData.settings?.sidebarTitleFontSize ?? 10}pt)</label>
                    <input 
                      type="range" min="8" max="16" step="0.5"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.sidebarTitleFontSize ?? 10}
                      onChange={(e) => handleSettingsChange('sidebarTitleFontSize', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-indigo-700/60 uppercase">Tekst ({localData.settings?.sidebarBodyFontSize ?? 8.5}pt)</label>
                    <input 
                      type="range" min="6" max="12" step="0.2"
                      className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={localData.settings?.sidebarBodyFontSize ?? 8.5}
                      onChange={(e) => handleSettingsChange('sidebarBodyFontSize', parseFloat(e.target.value))}
                    />
                  </div>
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
