import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  Phone, 
  ChevronDown, 
  MapPin, 
  Zap,
  Globe,
  Edit2,
  Check,
  Image as ImageIcon,
  RotateCcw
} from 'lucide-react';
import { cvData as initialData } from './data';
import { Experience, CVData } from './types';

interface EditableTextProps {
  value: string;
  onSave: (val: string) => void;
  isEditing: boolean;
  className?: string;
  multiline?: boolean;
}

function EditableText({ value, onSave, isEditing, className = "", multiline = false }: EditableTextProps) {
  if (!isEditing) return <span className={className}>{value}</span>;

  return multiline ? (
    <textarea
      className={`w-full p-2 border border-accent/20 rounded bg-accent/5 focus:outline-none focus:ring-1 focus:ring-accent ${className}`}
      value={value}
      onChange={(e) => onSave(e.target.value)}
      rows={4}
    />
  ) : (
    <input
      type="text"
      className={`w-full p-1 border border-accent/20 rounded bg-accent/5 focus:outline-none focus:ring-1 focus:ring-accent ${className}`}
      value={value}
      onChange={(e) => onSave(e.target.value)}
    />
  );
}

function ExperienceItem({ 
  item, 
  isOpen, 
  onClick, 
  isEditing, 
  onUpdate 
}: { 
  item: Experience, 
  isOpen: boolean, 
  onClick: () => void, 
  isEditing: boolean,
  onUpdate: (updated: Experience) => void
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <div className="flex items-start">
        <button 
          onClick={onClick}
          className="flex-1 text-left py-6 flex items-start justify-between group focus:outline-none"
        >
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
              <h3 className="text-xl font-semibold text-brand-primary group-hover:text-accent transition-colors">
                <EditableText 
                  value={item.role} 
                  isEditing={isEditing} 
                  onSave={(val) => onUpdate({ ...item, role: val })} 
                />
              </h3>
              <span className="text-sm font-medium text-gray-500 md:text-right">
                <EditableText 
                  value={item.period} 
                  isEditing={isEditing} 
                  onSave={(val) => onUpdate({ ...item, period: val })} 
                />
              </span>
            </div>
            <div className="text-brand-secondary font-medium flex items-center gap-2">
              <EditableText 
                value={item.company} 
                isEditing={isEditing} 
                onSave={(val) => onUpdate({ ...item, company: val })} 
              />
            </div>
          </div>
          <div className={`mt-1 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-5 h-5 text-gray-300" />
          </div>
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-4 border-l-2 border-gray-100 ml-1">
              <ul className="space-y-3">
                {item.description.map((point, idx) => (
                  <li key={idx} className="text-gray-600 leading-relaxed relative pl-4">
                    <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-accent/30" />
                    <EditableText 
                      value={point} 
                      isEditing={isEditing} 
                      onSave={(val) => {
                        const newDesc = [...item.description];
                        newDesc[idx] = val;
                        onUpdate({ ...item, description: newDesc });
                      }} 
                    />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState<CVData>(() => {
    const saved = localStorage.getItem('cv_data');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [profileImg, setProfileImg] = useState(() => {
    return localStorage.getItem('profile_img') || "https://media.licdn.com/dms/image/v2/C4D03AQE_E0_E0_E0_E0/profile-displayphoto-shrink_800_800/0/1516231234567?e=1723680000&v=beta&t=example";
  });
  const [isEditing, setIsEditing] = useState(false);
  const [openId, setOpenId] = useState<string | null>(data.experience[0]?.id || null);

  // Persistence effect
  useEffect(() => {
    localStorage.setItem('cv_data', JSON.stringify(data));
    localStorage.setItem('profile_img', profileImg);
  }, [data, profileImg]);

  const handleReset = () => {
    if (confirm("Er du sikker på at du vil tilbakestille alle endringer?")) {
      setData(initialData);
      setProfileImg("https://media.licdn.com/dms/image/v2/C4D03AQE_E0_E0_E0_E0/profile-displayphoto-shrink_800_800/0/1516231234567?e=1723680000&v=beta&t=example");
      localStorage.removeItem('cv_data');
      localStorage.removeItem('profile_img');
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-100">
      {/* Navigation / Header Info Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <span className="font-display font-bold text-lg tracking-tight">
            <EditableText 
              value={data.name} 
              isEditing={isEditing} 
              onSave={(val) => setData({ ...data, name: val })} 
            />
          </span>
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
              <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={14} /> {data.contact.email}
              </a>
              <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
            <div className="flex gap-2">
              {isEditing && (
                <button 
                  onClick={handleReset}
                  className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Tilbakestill endringer"
                >
                  <RotateCcw size={18} />
                </button>
              )}
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  isEditing 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-200 ring-2 ring-green-100' 
                  : 'bg-brand-primary text-white hover:bg-black'
                }`}
              >
                {isEditing ? <><Check size={16} /> Save</> : <><Edit2 size={16} /> Edit</>}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <header className="pt-32 pb-20 md:pt-48 md:pb-32 bg-white relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-blue-50 text-accent text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                  {data.name}
                </span>
                <h1 className="text-4xl md:text-7xl font-display font-medium text-brand-primary leading-[1.1] mb-8 max-w-2xl">
                  <EditableText 
                    value={data.title} 
                    isEditing={isEditing} 
                    onSave={(val) => setData({ ...data, title: val })} 
                  />
                </h1>
                
                <div className="flex flex-wrap gap-8 text-brand-secondary">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Location</p>
                      <p className="font-medium">
                        <EditableText 
                          value={data.contact.location} 
                          isEditing={isEditing} 
                          onSave={(val) => setData({ ...data, contact: { ...data.contact, location: val } })} 
                        />
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Status</p>
                      <p className="font-medium tracking-tight">Active Product Professional</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className={`w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${isEditing ? 'opacity-80 scale-95 ring-4 ring-accent' : 'rotate-3 hover:rotate-0'}`}>
                    <img 
                      src={profileImg} 
                      alt={data.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop";
                      }}
                    />
                  </div>
                </motion.div>
                
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-xl pointer-events-auto border border-accent/20 w-full max-w-[240px]">
                      <div className="flex items-center gap-2 mb-2 text-accent font-bold text-xs uppercase tracking-wider">
                        <ImageIcon size={14} /> Edit Image URL
                      </div>
                      <input 
                        type="text" 
                        value={profileImg}
                        onChange={(e) => setProfileImg(e.target.value)}
                        className="w-full text-xs p-2 border border-gray-200 rounded focus:border-accent outline-none"
                        placeholder="Paste image URL here..."
                      />
                    </div>
                  </div>
                )}
                
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl -z-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-24 space-y-24">
        
        {/* Sammendrag Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 translate-y-1">
            <h2 className="text-xs uppercase font-bold tracking-widest text-accent mb-4">Sammendrag</h2>
          </div>
          <div className="md:col-span-8">
            <div className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
              <EditableText 
                value={data.summary} 
                isEditing={isEditing} 
                onSave={(val) => setData({ ...data, summary: val })} 
                multiline
              />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 sticky top-24">
            <h2 className="text-xs uppercase font-bold tracking-widest text-accent mb-4">Erfaring</h2>
            <p className="text-sm text-gray-400 max-w-[200px]">
              {isEditing ? "Du er nå i redigeringsmodus." : "Klikk på en stilling for å se detaljer."}
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {data.experience.map((item, idx) => (
                <ExperienceItem 
                  key={item.id} 
                  item={item} 
                  isOpen={openId === item.id}
                  isEditing={isEditing}
                  onUpdate={(updated) => {
                    const newExp = [...data.experience];
                    newExp[idx] = updated;
                    setData({ ...data, experience: newExp });
                  }}
                  onClick={() => !isEditing && setOpenId(openId === item.id ? null : item.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h2 className="text-xs uppercase font-bold tracking-widest text-accent mb-4">Ferdigheter</h2>
          </div>
          <div className="md:col-span-8">
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-2 bg-gray-100/50 text-brand-secondary rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  <EditableText 
                    value={skill} 
                    isEditing={isEditing} 
                    onSave={(val) => {
                      const newSkills = [...data.skills];
                      newSkills[idx] = val;
                      setData({ ...data, skills: newSkills });
                    }} 
                  />
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h2 className="text-xs uppercase font-bold tracking-widest text-accent mb-4">1Utdannelse</h2>
          </div>
          <div className="md:col-span-8 space-y-8">
            {data.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">
                    <EditableText 
                      value={edu.degree} 
                      isEditing={isEditing} 
                      onSave={(val) => {
                        const newEdu = [...data.education];
                        newEdu[idx] = { ...edu, degree: val };
                        setData({ ...data, education: newEdu });
                      }} 
                    />
                  </h4>
                  <p className="text-brand-secondary">
                    <EditableText 
                      value={edu.institution} 
                      isEditing={isEditing} 
                      onSave={(val) => {
                        const newEdu = [...data.education];
                        newEdu[idx] = { ...edu, institution: val };
                        setData({ ...data, education: newEdu });
                      }} 
                    />
                  </p>
                </div>
                <span className="text-sm font-mono text-gray-400">
                  <EditableText 
                    value={edu.year} 
                    isEditing={isEditing} 
                    onSave={(val) => {
                      const newEdu = [...data.education];
                      newEdu[idx] = { ...edu, year: val };
                      setData({ ...data, education: newEdu });
                    }} 
                  />
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-display font-bold text-2xl mb-2">{data.name}</h3>
            <p className="text-gray-400">Digital CV • {new Date().getFullYear()}</p>
          </div>
          <div className="flex gap-4">
             <a href={`mailto:${data.contact.email}`} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                <Mail size={20} />
             </a>
             <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                <Linkedin size={20} />
             </a>
             <a href={`tel:${data.contact.phone.replace(/\s/g, '')}`} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                <Phone size={20} />
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
