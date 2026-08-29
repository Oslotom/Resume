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
import { CVTemplate } from './variants';
import CVPreview from './components/CVPreview';
import CVEditor from './components/CVEditor';
import ManagementPage from './components/ManagementPage';
import { cn } from './lib/utils';

export default function App() {
  const [view, setView] = useState<'editor' | 'management'>('editor');

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
      await saveCVVersion(user.uid, name, cvData);
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

  const handleLoadTemplate = (template: CVTemplate) => {
    setCurrentVersion(null);
    setCvData(JSON.parse(JSON.stringify(template.data))); // deep copy
    setView('editor');
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

  if (view === 'management') {
    return (
      <ManagementPage 
        versions={versions}
        currentVersion={currentVersion}
        cvData={cvData}
        onSelectVersion={(v) => {
          handleSelectVersion(v);
          setView('editor');
        }}
        onDeleteVersion={(id) => {
          const del = async () => {
            if (confirm("Er du sikker på at du vil slette denne versjonen?")) {
              await deleteCVVersion(id);
              if (currentVersion?.id === id) {
                setCurrentVersion(null);
                setCvData(initialCVData);
              }
            }
          };
          del();
        }}
        onNewVersion={() => {
          setCurrentVersion(null);
          setCvData(initialCVData);
          setView('editor');
        }}
        onLoadTemplate={handleLoadTemplate}
        onEditLayout={() => {
          setView('editor');
          setEditingSection('settings');
        }}
        onBackToEditor={() => setView('editor')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="print:hidden h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <h1 className="text-xl font-semibold text-slate-900 italic">
              Curriculum<span className="text-indigo-600">Pro</span>
            </h1>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setView('editor')}
              className={cn(
                "px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2",
                view === 'editor' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <FileText size={14} />
              CV Editor
            </button>
            <button 
              onClick={() => setView('management')}
              className={cn(
                "px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2",
                view === 'management' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Layout size={14} />
              Innstillinger & Versjoner
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {currentVersion && (
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-widest border border-indigo-100">
              {currentVersion.name}
            </span>
          )}

          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-medium hover:border-indigo-200 hover:text-indigo-600 transition-all active:scale-95"
          >
            <Download size={16} />
            Last ned som PDF
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
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Logg ut"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* Login button removed */}
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden print:overflow-visible print:block">
        {/* Content View */}
        <div className="flex-1 overflow-y-auto p-12 bg-slate-200/50 scroll-smooth flex justify-center print:overflow-visible print:h-auto print:p-0 print:bg-white print:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[900px] print:max-w-none shadow-2xl print:shadow-none"
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
