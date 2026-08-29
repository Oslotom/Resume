import React, { useState, useEffect, MouseEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Save,
  LogOut,
  LogIn,
  FileText,
  Layout,
  Download
} from 'lucide-react';
import { onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { saveCVVersion, updateCVVersion, deleteCVVersion, db } from './lib/firebase';
import { CVData, CVVersion } from './types';
import { initialCVData } from './initialData';
import { CVTemplate } from './variants';
import CVPreview from './components/CVPreview';
import CVEditor from './components/CVEditor';
import ManagementPage from './components/ManagementPage';
import { cn } from './lib/utils';

const LOCAL_USER = {
  uid: 'tom',
  displayName: 'Tom',
  photoURL: 'https://ui-avatars.com/api/?name=Tom+Haugeplass&background=4f46e5&color=fff'
};

const AUTH_KEY = 'cv_auth';

export default function App() {
  const [view, setView] = useState<'editor' | 'management'>('editor');

  const [user, setUser] = useState<{ uid: string; displayName: string; photoURL: string } | null>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === '1' ? LOCAL_USER : null;
    } catch {
      return null;
    }
  });
  const [versions, setVersions] = useState<CVVersion[]>([]);
  const [currentVersion, setCurrentVersion] = useState<CVVersion | null>(null);
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [highlightSetting, setHighlightSetting] = useState<string | null>(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'cv_versions'),
      where('userId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const v = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CVVersion));
        setVersions(v);
      },
      () => {
        // Firestore may require real auth — ignore errors, versions stay local-empty
      }
    );

    return unsubscribe;
  }, [user]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (username.trim().toLowerCase() === 'tom' && password === 'basiri') {
      localStorage.setItem(AUTH_KEY, '1');
      setUser(LOCAL_USER);
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Feil brukernavn eller passord');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    setVersions([]);
    setCurrentVersion(null);
    setCvData(initialCVData);
    setView('editor');
  };

  const handleSaveAsNew = async () => {
    if (!user) return;
    const name = prompt("Navn på versjon (f.eks. 'Entur – Team Automat'):");
    if (!name) return;

    setIsSaving(true);
    try {
      await saveCVVersion(user.uid, name, cvData);
    } catch {
      alert('Kunne ikke lagre til skyen. Sjekk Firebase-regler.');
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
    } catch {
      alert('Kunne ikke lagre til skyen. Sjekk Firebase-regler.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectVersion = (v: CVVersion) => {
    setCurrentVersion(v);
    setCvData(v.data);
  };

  const handleLoadTemplate = (template: CVTemplate) => {
    setCurrentVersion(null);
    setCvData(JSON.parse(JSON.stringify(template.data)));
    setView('editor');
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  // Simple login screen
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-xl p-10 space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-lg shadow-indigo-200">
              C
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Curriculum<span className="text-indigo-600">Pro</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Logg inn for å åpne CV-byggeren
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Brukernavn</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Brukernavn"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Passord</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Passord"
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-xs font-semibold text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98]"
            >
              <LogIn size={18} />
              Logg inn
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

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
              try {
                await deleteCVVersion(id);
              } catch {
                // ignore
              }
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
              src={user.photoURL}
              className="w-8 h-8 rounded-full border"
              alt="Avatar"
            />
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              title="Logg ut"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden print:overflow-visible print:block pb-24">
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

      {/* Floating save bar */}
      <div className="print:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="text-sm text-slate-500 font-medium truncate">
            {currentVersion ? (
              <>
                Aktiv versjon: <span className="text-indigo-700 font-bold">{currentVersion.name}</span>
              </>
            ) : (
              <span>Ulagret mal — lagre for å beholde endringer</span>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:border-indigo-200 hover:text-indigo-600 transition-all"
            >
              <Download size={16} />
              PDF
            </button>
            <button
              onClick={handleSaveAsNew}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-indigo-200 text-indigo-700 rounded-xl text-sm font-semibold hover:bg-indigo-50 transition-all disabled:opacity-50"
            >
              <Plus size={16} />
              Lagre som ny
            </button>
            <button
              onClick={handleUpdate}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
            >
              <Save size={16} />
              {isSaving ? 'Lagrer...' : currentVersion ? 'Lagre endringer' : 'Lagre versjon'}
            </button>
          </div>
        </div>
      </div>

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
