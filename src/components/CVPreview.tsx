import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, ExternalLink, Camera, MoveHorizontal, MoveVertical, GripVertical, GripHorizontal } from 'lucide-react';
import { CVData } from '../types';
import { cn } from '../lib/utils';

interface CVPreviewProps {
  data: CVData;
  onEditSection: (section: string) => void;
  onUpdateData: (data: CVData) => void;
  highlightSetting?: string | null;
}

export default function CVPreview({ data, onEditSection, onUpdateData, highlightSetting }: CVPreviewProps) {
  const fieldHighlight = highlightSetting === 'fieldPadding'
    ? 'ring-2 ring-indigo-500 ring-offset-2'
    : '';
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  const dragRef = useRef<{ startX: number; startY: number; startValue: number }>({ startX: 0, startY: 0, startValue: 0 });

  const sidebarWidth = data.settings?.sidebarWidth || 35;
  const contentPadding = data.settings?.contentPadding ?? 16;
  const experienceWidth = data.settings?.experienceWidth ?? 96;
  const projectsWidth = data.settings?.projectsWidth ?? 180;
  const sidebarPadding = data.settings?.sidebarPadding ?? 32;
  const sectionSpacing = data.settings?.sectionSpacing ?? 40;
  const itemSpacing = data.settings?.itemSpacing ?? 24;
  const headerSpacing = data.settings?.headerSpacing ?? 48;
  const fieldPadding = data.settings?.fieldPadding ?? 8;
  const pageWidth = data.settings?.pageWidth ?? 1000;
  const projectsDescriptionWidth = data.settings?.projectsDescriptionWidth ?? 400;
  
  const nameFontSize = data.settings?.nameFontSize ?? 26;
  const titleFontSize = data.settings?.titleFontSize ?? 9;
  const sectionTitleFontSize = data.settings?.sectionTitleFontSize ?? 11;
  const bodyFontSize = data.settings?.bodyFontSize ?? 7.8;
  const sidebarTitleFontSize = data.settings?.sidebarTitleFontSize ?? 10;
  const sidebarBodyFontSize = data.settings?.sidebarBodyFontSize ?? 8.5;
  
  const headingFontFamily = data.settings?.headingFontFamily ?? 'Raleway';
  const bodyFontFamily = data.settings?.bodyFontFamily ?? 'Open Sans';
  const lineHeight = data.settings?.lineHeight ?? 1.5;
  const nameToTitleSpacing = data.settings?.nameToTitleSpacing ?? 8;
  const titleToContactSpacing = data.settings?.titleToContactSpacing ?? 32;
  const headerVerticalPadding = data.settings?.headerVerticalPadding ?? 64;
  const headerPaddingTop = data.settings?.headerPaddingTop ?? 64;
  const headerContactGap = data.settings?.headerContactGap ?? 24;

  const mainWidth = 100 - sidebarWidth;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!activeHandle) return;

      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      const { startValue } = dragRef.current;

      let newValue = startValue;

      if (activeHandle === 'sidebarWidth') {
        const percentDelta = (deltaX / 1000) * 100;
        newValue = Math.max(20, Math.min(50, startValue + percentDelta));
      } else if (activeHandle === 'contentPadding' || activeHandle === 'sidebarPadding') {
        newValue = Math.max(8, Math.min(80, startValue + deltaX));
      } else if (activeHandle === 'sectionSpacing' || activeHandle === 'itemSpacing' || activeHandle === 'headerSpacing') {
        newValue = Math.max(4, Math.min(120, startValue + deltaY));
      } else if (activeHandle === 'experienceWidth' || activeHandle === 'projectsWidth' || activeHandle === 'projectsDescriptionWidth' || activeHandle === 'pageWidth') {
        newValue = Math.max(activeHandle === 'pageWidth' ? 600 : 60, Math.min(activeHandle === 'pageWidth' ? 1200 : 800, startValue + deltaX));
      }

      onUpdateData({
        ...data,
        settings: {
          ...data.settings,
          [activeHandle]: newValue
        }
      });
    };

    const handleMouseUp = () => {
      setActiveHandle(null);
    };

    if (activeHandle) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = activeHandle.includes('Width') || activeHandle.includes('Padding') ? 'col-resize' : 'row-resize';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [activeHandle, data, onUpdateData]);

  const startDragging = (e: React.MouseEvent, handle: string, initialValue: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveHandle(handle);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startValue: initialValue
    };
  };

  const handlePictureClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onUpdateData({
            ...data,
            personal: {
              ...data.personal,
              profilePicture: reader.result as string
            }
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div 
      className="flex flex-col gap-12 w-full mx-auto pb-20 print:gap-0 print:pb-0 print:max-w-none print-document-pages group/page"
      style={{ 
        '--heading-font': `"${headingFontFamily}", sans-serif`, 
        '--body-font': `"${bodyFontFamily}", sans-serif`,
        lineHeight: lineHeight,
        maxWidth: `${pageWidth}px`
      } as React.CSSProperties}
    >
      {/* Page Width Handle */}
      <div 
        className="absolute top-0 -right-2 w-4 h-full cursor-col-resize opacity-0 group-hover/page:opacity-100 hover:bg-indigo-500/10 transition-all z-50 flex items-center justify-center print:hidden"
        onMouseDown={(e) => startDragging(e, 'pageWidth', pageWidth)}
        title="Juster sidebredde"
      >
        <div className="bg-indigo-600 text-white rounded p-0.5 shadow-md">
          <GripVertical size={14} />
        </div>
      </div>
      {/* PAGE 1 */}
      <div className="bg-white shadow-2xl w-full min-h-[1414px] flex flex-col md:flex-row text-[#333] font-sans overflow-hidden ring-1 ring-slate-200 print:shadow-none print:ring-0 print:break-after-page print-document-page">
        {/* Left Sidebar */}
        <div 
          className="bg-[#4A4A4A] text-white flex flex-col transition-all duration-300 relative group/sidebar print-document-sidebar"
          style={{ width: `${sidebarWidth}%` }}
        >
          {/* Sidebar Width Handle */}
          <div 
            className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize opacity-0 group-hover/sidebar:opacity-100 hover:bg-indigo-500/30 transition-all z-50 flex items-center justify-center"
            onMouseDown={(e) => startDragging(e, 'sidebarWidth', sidebarWidth)}
          >
            <div className="w-4 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg -mr-0.5">
              <GripVertical size={10} className="text-white" />
            </div>
          </div>

          <div className="flex flex-col items-center relative group/sidebar-pad" style={{ padding: `${sidebarPadding}px` }}>
            {/* Sidebar Padding Handle */}
            <div 
              className="absolute inset-y-0 right-0 w-4 cursor-col-resize opacity-0 group-hover/sidebar-pad:opacity-100 bg-indigo-500/5 transition-all flex items-center justify-center border-r border-dashed border-indigo-400/30"
              onMouseDown={(e) => startDragging(e, 'sidebarPadding', sidebarPadding)}
              title="Juster sidefelt-padding"
            >
              <div className="bg-indigo-600 text-white rounded p-0.5 shadow-sm">
                <MoveHorizontal size={10} />
              </div>
            </div>
            <div 
              onClick={handlePictureClick}
              className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#666] mb-8 bg-slate-200 shadow-inner cursor-pointer hover:border-indigo-400 transition-colors group relative"
            >
               {data.personal.profilePicture ? (
                 <img src={data.personal.profilePicture} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-400 text-5xl font-bold">TH</div>
               )}
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera size={24} className="text-white" />
               </div>
            </div>

            <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: `${itemSpacing}px` }}>
              {/* About Section */}
              <section 
                onClick={() => onEditSection('personal')}
                className={cn("cursor-pointer hover:bg-white/5 rounded transition-colors group", fieldHighlight)}
                style={{ padding: `${fieldPadding}px`, margin: `-${fieldPadding}px` }}
              >
                <h2 
                  className="font-heading font-semibold tracking-widest border-b border-[#666] pb-1.5 mb-3 group-hover:text-indigo-300 uppercase"
                  style={{ fontSize: `${sidebarTitleFontSize}pt` }}
                >
                  {data.personal.subtitle}
                </h2>
                <p 
                  className="font-body leading-relaxed text-gray-200 font-normal"
                  style={{ fontSize: `${sidebarBodyFontSize}pt` }}
                >
                  {data.personal.summary}
                </p>
              </section>

              {/* Skills Section */}
              <section 
                onClick={() => onEditSection('skills')}
                className={cn("cursor-pointer hover:bg-white/5 rounded transition-colors group", fieldHighlight)}
                style={{ padding: `${fieldPadding}px`, margin: `-${fieldPadding}px` }}
              >
                <h2 
                  className="font-heading font-semibold tracking-widest border-b border-[#666] pb-1.5 mb-3 group-hover:text-indigo-300 uppercase"
                  style={{ fontSize: `${sidebarTitleFontSize}pt` }}
                >
                  Ferdigheter
                </h2>
                <ul 
                  className="space-y-1.5 font-body tracking-tight"
                  style={{ fontSize: `${sidebarBodyFontSize}pt` }}
                >
                  {data.skills.map((skill, index) => (
                    <li key={index} className="uppercase leading-tight text-gray-100">{skill}</li>
                  ))}
                </ul>
              </section>

              {/* Links Section */}
              <section 
                onClick={() => onEditSection('links')}
                className={cn("cursor-pointer hover:bg-white/5 rounded transition-colors group", fieldHighlight)}
                style={{ padding: `${fieldPadding}px`, margin: `-${fieldPadding}px` }}
              >
                <h2 
                  className="font-heading font-semibold tracking-widest border-b border-[#666] pb-1.5 mb-3 group-hover:text-indigo-300 uppercase"
                  style={{ fontSize: `${sidebarTitleFontSize}pt` }}
                >
                  Link
                </h2>
                <ul 
                  className="space-y-1 font-body"
                  style={{ fontSize: `${sidebarBodyFontSize}pt` }}
                >
                  {data.links.map((link, index) => (
                    <li key={index} className="flex items-center gap-2 font-normal">
                      <span>{link.label}: {link.url}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Education Section */}
              <section 
                onClick={() => onEditSection('education')}
                className={cn("cursor-pointer hover:bg-white/5 rounded transition-colors group", fieldHighlight)}
                style={{ padding: `${fieldPadding}px`, margin: `-${fieldPadding}px` }}
              >
                <h2 
                  className="font-heading font-semibold tracking-widest border-b border-[#666] pb-1.5 mb-3 group-hover:text-indigo-300 uppercase"
                  style={{ fontSize: `${sidebarTitleFontSize}pt` }}
                >
                  Utdanning
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${itemSpacing/1.5}px` }}>
                  {data.education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <h3 
                        className="font-body font-semibold text-white leading-tight"
                        style={{ fontSize: `${sidebarBodyFontSize}pt` }}
                      >
                        {edu.degree}
                      </h3>
                      <p 
                        className="font-body text-gray-300 font-normal"
                        style={{ fontSize: `${sidebarBodyFontSize * 0.88}pt` }}
                      >
                        {edu.school} {edu.period && `· ${edu.period}`}
                      </p>
                      {edu.details && (
                        <p 
                          className="font-body italic text-gray-400 font-normal leading-snug"
                          style={{ fontSize: `${sidebarBodyFontSize * 0.92}pt` }}
                        >
                          {edu.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div 
          className="bg-white flex flex-col transition-all duration-300 relative group/main print-document-main"
          style={{ 
            width: `${mainWidth}%`,
            padding: `${contentPadding}px`
          }}
        >
          {/* Content Padding Handle */}
          <div 
            className="absolute top-0 left-0 w-full h-4 cursor-row-resize opacity-0 group-hover/main:opacity-100 bg-indigo-500/5 transition-all flex items-center justify-center border-b border-dashed border-indigo-400/30 z-40"
            onMouseDown={(e) => startDragging(e, 'contentPadding', contentPadding)}
            title="Juster innholds-padding"
          >
             <div className="bg-indigo-600 text-white rounded px-2 py-0.5 shadow-sm text-[8px] font-bold uppercase tracking-widest">Padding</div>
          </div>
          {/* Header Section */}
          <section 
            onClick={() => onEditSection('personal')}
            className={cn("relative group/header rounded hover:bg-indigo-50/50 cursor-pointer border-2 border-transparent hover:border-indigo-200 transition-all flex flex-col", fieldHighlight)}
            style={{ 
              paddingTop: `${headerPaddingTop}px`, 
              paddingBottom: `${headerVerticalPadding / 2}px`,
              paddingLeft: `${fieldPadding}px`,
              paddingRight: `${fieldPadding}px`,
              margin: `-${fieldPadding}px`, 
              marginBottom: `${headerSpacing}px` 
            }}
          >
            {/* Header Spacing Handle */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-24 h-4 cursor-row-resize opacity-0 group-hover/header:opacity-100 transition-all z-20 flex items-center justify-center"
              onMouseDown={(e) => startDragging(e, 'headerSpacing', headerSpacing)}
            >
               <div className="w-12 h-1 bg-indigo-600/50 rounded-full"></div>
            </div>

            <div className="absolute top-2 right-2 opacity-0 group-hover/header:opacity-100 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-tighter">Edit Header</div>
            <div style={{ marginBottom: `${nameToTitleSpacing}px` }}>
              <h1 
                className="font-heading font-light text-[#333] tracking-[0.1em] leading-tight"
                style={{ fontSize: `${nameFontSize}pt` }}
              >
                {data.personal.name.split(' ')[0]}
              </h1>
              <h1 
                className="font-heading font-light text-[#333] tracking-[0.1em] leading-tight"
                style={{ fontSize: `${nameFontSize}pt` }}
              >
                {data.personal.name.split(' ').slice(1).join(' ')}
              </h1>
            </div>

            <p 
              className="font-heading font-thin text-gray-500 tracking-[0.4em] uppercase"
              style={{ fontSize: `${titleFontSize}pt`, marginBottom: `${titleToContactSpacing}px` }}
            >
              {data.personal.title}
            </p>

            <div 
              className="flex flex-wrap font-body text-[8pt] text-[#333] items-center"
              style={{ gap: `${headerContactGap}px` }}
            >
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#333]" />
                <span>{data.personal.contact.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={12} className="text-[#333]" />
                <span>{data.personal.contact.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={12} className="text-[#333]" />
                <span>{data.personal.contact.email}</span>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section 
            onClick={() => onEditSection('experience')}
            className={cn("relative group/exp rounded hover:bg-indigo-50/50 cursor-pointer border-2 border-transparent hover:border-indigo-100 transition-all flex-1", fieldHighlight)}
            style={{ padding: `${fieldPadding}px`, margin: `-${fieldPadding}px`, marginBottom: `${sectionSpacing}px` }}
          >
            {/* Section Spacing Handle */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-24 h-4 cursor-row-resize opacity-0 group-hover/exp:opacity-100 transition-all z-20 flex items-center justify-center"
              onMouseDown={(e) => startDragging(e, 'sectionSpacing', sectionSpacing)}
            >
               <div className="w-12 h-1 bg-indigo-600/50 rounded-full"></div>
            </div>

            <div className="absolute top-2 right-2 opacity-0 group-hover/exp:opacity-100 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-tighter">Edit Experience</div>
            <h2 
              className="font-heading font-semibold tracking-widest border-b-2 border-[#333] pb-1 mb-5 group-hover:text-indigo-600 uppercase"
              style={{ fontSize: `${sectionTitleFontSize}pt` }}
            >
              Arbeidserfaring
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${itemSpacing}px` }}>
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative flex group/item">
                  {/* Item Spacing Handle (shown on hover between items) */}
                  <div 
                    className="absolute -bottom-1 left-0 right-0 h-4 cursor-row-resize opacity-0 group-hover/item:opacity-100 transition-all z-20 flex items-center justify-center pointer-events-none"
                  >
                     <div 
                        className="w-12 h-1 bg-indigo-400/30 rounded-full pointer-events-auto hover:bg-indigo-600 transition-colors"
                        onMouseDown={(e) => startDragging(e, 'itemSpacing', itemSpacing)}
                      ></div>
                  </div>

                  {/* Left side: Company & Location */}
                  <div 
                    className="flex flex-col items-end pr-3 text-right shrink-0 relative group/col-width"
                    style={{ width: `${experienceWidth}px` }}
                  >
                    {/* Experience Column Width Handle */}
                    <div 
                      className="absolute inset-y-0 right-0 w-2 cursor-col-resize opacity-0 group-hover/col-width:opacity-100 hover:bg-indigo-500/20 transition-all z-30"
                      onMouseDown={(e) => startDragging(e, 'experienceWidth', experienceWidth)}
                    ></div>
                    
                    <span 
                      className="font-body font-semibold text-[#333] leading-tight uppercase"
                      style={{ fontSize: `${bodyFontSize * 1.09}pt` }}
                    >
                      {exp.company}
                    </span>
                    <p 
                      className="font-body text-gray-500 font-normal"
                      style={{ fontSize: `${bodyFontSize * 0.96}pt` }}
                    >
                      {exp.location}
                    </p>
                    <p 
                      className="font-body text-gray-500 italic mt-0.5"
                      style={{ fontSize: `${bodyFontSize * 0.96}pt` }}
                    >
                      {exp.period}
                    </p>
                  </div>
                  
                  {/* Timeline Dot & Line */}
                  <div className="relative w-4 flex justify-center shrink-0">
                    <div className="w-2.5 h-2.5 bg-[#333] rounded-full mt-1 z-10 border-[2px] border-white ring-1 ring-white"></div>
                    <div className="absolute top-3.5 bottom-0 w-[1px] bg-gray-100 h-[calc(100%+1.5rem)] last:h-0"></div>
                  </div>

                  {/* Right side: Role & Details */}
                  <div className="flex-1 space-y-1.5 pl-0">
                    <h3 
                      className="font-heading font-semibold text-[#333] tracking-tight leading-none mb-1"
                      style={{ fontSize: `${bodyFontSize * 1.34}pt` }}
                    >
                      {exp.role}
                    </h3>
                    <p 
                      className="font-body leading-relaxed text-[#333] font-normal"
                      style={{ fontSize: `${bodyFontSize}pt` }}
                    >
                      {exp.description}
                    </p>
                    <ul className="space-y-0.5">
                      {exp.bullets.map((bullet, i) => (
                        <li 
                          key={i} 
                          className="font-body text-[#444] leading-relaxed flex items-start gap-2 font-normal"
                          style={{ fontSize: `${bodyFontSize}pt` }}
                        >
                          <span className="w-1 h-1 bg-[#333] rounded-full mt-2 shrink-0"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="bg-white shadow-2xl w-full min-h-[1414px] flex flex-col text-[#333] font-sans overflow-hidden ring-1 ring-slate-200 print-document-page">
        <div 
          className="bg-white flex flex-col transition-all duration-300"
          style={{ 
            padding: `${contentPadding}px`
          }}
        >
          {/* Projects Section */}
          <section 
            onClick={() => onEditSection('projects')}
            className={cn("relative group rounded hover:bg-indigo-50/50 cursor-pointer border-2 border-transparent hover:border-indigo-100 transition-all", fieldHighlight)}
            style={{ padding: `${fieldPadding}px`, margin: `-${fieldPadding}px` }}
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-tighter">Edit Projects</div>
            <h2 
              className="font-heading font-semibold tracking-widest pb-2 group-hover:text-indigo-600 uppercase" 
              style={{ marginBottom: `${sectionSpacing}px`, fontSize: `${sectionTitleFontSize}pt` }}
            >
              Utvalgte prosjekter
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${itemSpacing}px` }}>
              {data.projects.map((proj) => (
                <div key={proj.id} className="flex gap-6 relative group/proj-item">
                  {/* Item Spacing Handle */}
                  <div 
                    className="absolute -bottom-1 left-0 right-0 h-4 cursor-row-resize opacity-0 group-hover/proj-item:opacity-100 transition-all z-20 flex items-center justify-center pointer-events-none"
                  >
                     <div 
                        className="w-12 h-1 bg-indigo-400/30 rounded-full pointer-events-auto hover:bg-indigo-600 transition-colors"
                        onMouseDown={(e) => startDragging(e, 'itemSpacing', itemSpacing)}
                      ></div>
                  </div>
                  
                  {/* Left Column: Title & Client */}
                  <div 
                    className="shrink-0 flex flex-col pt-1 relative group/col-width"
                    style={{ width: `${projectsWidth}px` }}
                  >
                    <div 
                      className="absolute inset-y-0 right-0 w-2 cursor-col-resize opacity-0 group-hover/col-width:opacity-100 hover:bg-indigo-500/20 transition-all z-30"
                      onMouseDown={(e) => startDragging(e, 'projectsWidth', projectsWidth)}
                    ></div>
                    
                    <h3 
                      className="font-heading font-black text-[#333] tracking-tight leading-snug"
                      style={{ fontSize: `${bodyFontSize * 1.6}pt` }}
                    >
                      {proj.title}
                    </h3>
                    <p 
                      className="font-body text-gray-500 font-bold uppercase tracking-tighter mt-1"
                      style={{ fontSize: `${bodyFontSize * 0.8}pt` }}
                    >
                      {proj.client}
                    </p>
                  </div>

                  {/* Right Column: Description */}
                  <div 
                    className="flex-1 relative group/desc-width"
                    style={{ maxWidth: `${projectsDescriptionWidth}px` }}
                  >
                    {/* Description Width Handle */}
                    <div 
                      className="absolute inset-y-0 right-0 w-2 cursor-col-resize opacity-0 group-hover/desc-width:opacity-100 hover:bg-indigo-500/20 transition-all z-30"
                      onMouseDown={(e) => startDragging(e, 'projectsDescriptionWidth', projectsDescriptionWidth)}
                    ></div>

                    <p 
                      className="font-body text-[#444] leading-relaxed font-normal"
                      style={{ fontSize: `${bodyFontSize}pt` }}
                    >
                      {proj.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
