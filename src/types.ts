export interface ContactInfo {
  location: string;
  phone: string;
  email: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  description: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period: string;
  details: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  description: string;
  bullets: string[];
}

export interface CVData {
  settings?: {
    sidebarWidth?: number; // percentage
    contentPadding?: number; // padding in px (base 64 for 16rem/p-16)
    experienceWidth?: number; // width of the left company column in px
    sidebarPadding?: number; // internal padding for dark sidebar
    sectionSpacing?: number; // gap between major sections
    itemSpacing?: number; // gap between jobs/projects
    headerSpacing?: number; // margin above/below name and header
    fieldPadding?: number; // padding on clickable/editable field sections
    nameFontSize?: number;
    titleFontSize?: number;
    sectionTitleFontSize?: number;
    bodyFontSize?: number;
    sidebarTitleFontSize?: number;
    sidebarBodyFontSize?: number;
    headingFontFamily?: string;
    bodyFontFamily?: string;
    projectsWidth?: number;
    lineHeight?: number;
    nameToTitleSpacing?: number;
    titleToContactSpacing?: number;
    headerVerticalPadding?: number;
    headerPaddingTop?: number;
    headerContactGap?: number;
    projectsDescriptionWidth?: number;
    pageWidth?: number;
  };
  personal: {
    name: string;
    title: string;
    subtitle: string;
    summary: string;
    profilePicture?: string;
    contact: ContactInfo;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  links: { label: string; url: string }[];
  languages: LanguageItem[];
  projects: ProjectItem[];
}

export interface CVVersion {
  id: string;
  userId: string;
  name: string;
  data: CVData;
  createdAt: any;
  updatedAt: any;
}
