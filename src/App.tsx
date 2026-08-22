import React, { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  History,
  Save,
  LogOut,
  LogIn,
  ChevronRight,
  FileText,
  Trash2,
  Clock,
  Layout,
  Download
} from 'lucide-react';
import { onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { auth, signIn, signOut, saveCVVersion, updateCVVersion, deleteCVVersion, db } from './lib/firebase';
import { CVData, CVVersion } from './types';
import { initialCVData } from './initialData';
import CVPreview from './components/CVPreview';
import CVEditor from './components/CVEditor';
import { cn } from './lib/utils';

export default function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [versions, setVersions] = useState<CVVersion[]>([]);
  const [currentVersion, setCurrentVersion] = useState<CVVersion | null>(null);
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'versions'>('preview');
  const [highlightSetting, setHighlightSetting] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (!u) {
        setVersions([]);
        setCurrentVersion(null);
        setCvData(initialCVData);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'cv_versions'),
      where('userId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const v = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CVVersion));
      setVersions(v);
      
      // If we don't have a current version yet, or it's not in the new list, pick the first one
      if (v.length > 0 && !currentVersion) {
        // Only auto-load if it's the first time
        // setCurrentVersion(v[0]);
        // setCvData(v[0].data);
      }
    });

    return unsubscribe;
  }, [user]);

  const handleSaveAsNew = async () => {
    if (!user) {
      alert("Du må logge inn for å lagre versjoner.");
      return;
    }
    const name = prompt("Navn på versjon (f.eks. 'Tech Focus'):");
    if (!name) return;

    setIsSaving(true);
    try {
      const res = await saveCVVersion(user.uid, name, cvData);
      // Optional: automatically select the new version
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!currentVersion) {
      handleSaveAsNew();
      return;
    }

    setIsSaving(true);
    try {
      await updateCVVersion(currentVersion.id, currentVersion.name, cvData);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectVersion = (v: CVVersion) => {
    setCurrentVersion(v);
    setCvData(v.data);
    setActiveTab('preview');
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleDelete = async (e: MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Er du sikker på at du vil slette denne versjonen?")) {
      await deleteCVVersion(id);
      if (currentVersion?.id === id) {
        setCurrentVersion(null);
        setCvData(initialCVData);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="print:hidden h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            C
          </div>
          <h1 className="text-xl font-semibold text-slate-900 italic">
            Curriculum<span className="text-indigo-600">Pro</span>
          </h1>
          {currentVersion && (
            <span className="ml-4 px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-widest border border-indigo-100">
              {currentVersion.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-medium hover:border-indigo-200 hover:text-indigo-600 transition-all active:scale-95"
          >
            <Download size={16} />
            Last ned som PDF122
          </button>

          {user ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium shadow-sm hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
              >
                <Save size={16} />
                {isSaving ? 'Lagrer...' : currentVersion ? 'Lagre endringer' : 'Lagre ny versjon'}
              </button>
              
              <div className="h-8 w-[1px] bg-slate-200 mx-2" />
              
              <div className="flex items-center gap-3">
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                  className="w-8 h-8 rounded-full border"
                  alt="Avatar"
                />
                <button 
                  onClick={signOut}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Logg ut"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <button 
              onClick={signIn}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              <LogIn size={16} />
              Logg inn for å lagre
            </button>
          )}
        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden print:overflow-visible print:block">
        {/* Sidebar */}
        <aside className="print:hidden w-80 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-6 border-b border-slate-200 flex flex-col gap-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kontrollpanel1</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('preview')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all",
                  activeTab === 'preview' ? "bg-white border border-slate-200 text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <Layout size={14} />
                Preview
              </button>
              <button 
                onClick={() => setActiveTab('versions')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all",
                  activeTab === 'versions' ? "bg-white border border-slate-200 text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <History size={14} />
                Versjoner
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === 'versions' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lagrede versjoner</h3>
                   <button 
                    onClick={() => {
                      setCurrentVersion(null);
                      setCvData(initialCVData);
                      setActiveTab('preview');
                    }}
                    className="p-1 hover:bg-white border border-transparent hover:border-slate-200 rounded text-indigo-600 transition-all"
                    title="Ny mal"
                   >
                     <Plus size={16} />
                   </button>
                </div>
                
                {versions.length === 0 ? (
                  <div className="text-center py-12 px-4 space-y-4">
                    <History size={32} className="mx-auto text-slate-200" />
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Ingen lagrede versjoner1.
                    </p>
                  </div>
                ) : (
                  versions.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => handleSelectVersion(v)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all group relative",
                        currentVersion?.id === v.id 
                          ? "bg-white border-indigo-200 shadow-md ring-2 ring-indigo-500/5" 
                          : "bg-slate-100 border-transparent hover:bg-white hover:border-slate-200"
                      )}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className={cn(
                          "font-bold text-sm",
                          currentVersion?.id === v.id ? "text-indigo-900" : "text-slate-600"
                        )}>
                          {v.name}
                        </span>
                        {currentVersion?.id === v.id && (
                          <span className="text-[10px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded uppercase font-bold">Aktiv</span>
                        )}
                        <Trash2 
                          size={14} 
                          className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                          onClick={(e) => handleDelete(e, v.id)}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-2">
                        <Clock size={10} />
                        <span>{v.updatedAt?.toDate().toLocaleDateString()}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Layout</h3>
                  <button 
                    onClick={() => setEditingSection('settings')}
                    className="w-full py-3 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:border-indigo-200 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Layout size={16} />
                    Juster kolonnebredde
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Instruksjoner</h3>
                <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-3">
                  <p className="text-xs text-indigo-900 font-medium leading-relaxed">
                    Klikk på en hvilken som helst seksjon i CV-en til høyre for å begynne redigering.
                  </p>
                  <ul className="text-[10px] text-indigo-600/70 space-y-1">
                    <li className="flex items-center gap-2 font-medium"><ChevronRight size={10} /> Sanntids-1oppdatering</li>
                    <li className="flex items-center gap-2 font-medium"><ChevronRight size={10} /> Automatisk layout</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
          
          <div className="p-6 border-t border-slate-200 bg-slate-50">
             <div className="p-4 bg-indigo-900 rounded-2xl text-white">
                <p className="text-[10px] opacity-80 mb-2 uppercase tracking-widest font-bold">Lagringskapasitet</p>
                <div className="w-full h-1.5 bg-indigo-800 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-indigo-400"></div>
                </div>
                <p className="text-[10px] mt-2 opacity-60">{versions.length} / 20 versjoner brukt</p>
             </div>
          </div>
        </aside>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-200/50 scroll-smooth flex justify-center print:overflow-visible print:h-auto print:p-0 print:bg-white print:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[900px] print:max-w-none"
          >
            <CVPreview
              data={cvData}
              onEditSection={(section) => setEditingSection(section)}
              onUpdateData={(newData) => setCvData(newData)}
              highlightSetting={highlightSetting}
            />
          </motion.div>
        </div>
      </main>

      {/* Editor Modal */}
      <AnimatePresence>
        {editingSection && (
          <CVEditor
            section={editingSection}
            data={cvData}
            onClose={() => {
              setEditingSection(null);
              setHighlightSetting(null);
            }}
            onSave={(updated) => {
              setCvData(updated);
              setEditingSection(null);
              setHighlightSetting(null);
            }}
            onHighlightSetting={setHighlightSetting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
