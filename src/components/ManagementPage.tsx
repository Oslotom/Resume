import React from 'react';
import { motion } from 'motion/react';
import { 
  History, 
  Plus, 
  Trash2, 
  Clock, 
  Layout, 
  ChevronRight,
  Database,
  ArrowLeft
} from 'lucide-react';
import { CVVersion, CVData } from '../types';
import { cn } from '../lib/utils';

interface ManagementPageProps {
  versions: CVVersion[];
  currentVersion: CVVersion | null;
  cvData: CVData;
  onSelectVersion: (v: CVVersion) => void;
  onDeleteVersion: (id: string) => void;
  onNewVersion: () => void;
  onEditLayout: () => void;
  onBackToEditor: () => void;
}

const ManagementPage: React.FC<ManagementPageProps> = ({
  versions,
  currentVersion,
  cvData,
  onSelectVersion,
  onDeleteVersion,
  onNewVersion,
  onEditLayout,
  onBackToEditor
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="max-w-6xl mx-auto w-full p-8 space-y-12">
        
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <Layout size={20} />
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Innstillinger & Layout</h1>
            </div>
            <p className="text-slate-500 font-medium">Administrer dine CV-versjoner og globale visningsvalg.</p>
          </div>
          
          <button 
            onClick={onBackToEditor}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
          >
            <ArrowLeft size={18} />
            Tilbake til Editor
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Versions List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                    <History size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Lagrede versjoner</h2>
                </div>
                <button 
                  onClick={onNewVersion}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  <Plus size={16} />
                  Opprett ny mal
                </button>
              </div>

              {versions.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <History size={48} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-slate-500 font-medium italic">Ingen lagrede versjoner ennå.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {versions.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => onSelectVersion(v)}
                      className={cn(
                        "group relative p-6 rounded-2xl border transition-all cursor-pointer",
                        currentVersion?.id === v.id 
                          ? "bg-indigo-50/50 border-indigo-200 ring-2 ring-indigo-500/5" 
                          : "bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md"
                      )}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1">
                          <h3 className={cn(
                            "font-black text-lg tracking-tight",
                            currentVersion?.id === v.id ? "text-indigo-900" : "text-slate-700"
                          )}>
                            {v.name}
                          </h3>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            <Clock size={12} />
                            <span>{v.updatedAt?.toDate().toLocaleDateString()}</span>
                          </div>
                        </div>
                        {currentVersion?.id === v.id ? (
                          <span className="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded-full uppercase font-black tracking-widest">Aktiv</span>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteVersion(v.id);
                            }}
                            className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-600/60 mt-4">
                        <ChevronRight size={14} />
                        Klikk for å laste denne versjonen
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-8">
            {/* Global Layout Card */}
            <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                  <Layout size={18} />
                </div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Global Layout</h2>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Juster kolonnebredde, fonter og andre visuelle elementer som gjelder for hele CV-en.
              </p>
              <button 
                onClick={onEditLayout}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-200"
              >
                <Layout size={18} />
                Juster Layout
              </button>
            </div>

            {/* Storage Capacity Card */}
            <div className="bg-indigo-900 rounded-[32px] p-8 text-white shadow-xl space-y-6">
               <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-indigo-200">
                    <Database size={18} />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-widest">Datalagring</h2>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60">
                    <span>Brukte versjoner</span>
                    <span>{versions.length} / 20</span>
                  </div>
                  <div className="w-full h-2 bg-indigo-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(versions.length / 20) * 100}%` }}
                      className="h-full bg-indigo-400"
                    />
                  </div>
               </div>
               <p className="text-[10px] opacity-60 leading-relaxed font-medium italic">
                 Dine CV-er lagres trygt i skyen og kan nås fra alle enheter.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
