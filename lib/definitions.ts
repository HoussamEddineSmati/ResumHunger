export type PersonalInfo = {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
};

export type Experience = {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
};

export type Education = {
    id: string;
    school: string;
    degree: string;
    field?: string;
    startDate: string;
    endDate: string;
    gpa?: string;
};

export type Project = {
    id: string;
    name: string;
    description: string;
    technologies: string;
    link?: string;
    startDate?: string;
    endDate?: string;
};

export type Certification = {
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
    credentialId?: string;
    url?: string;
};

export type Language = {
    id: string;
    name: string;
    proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Beginner';
};

export type ResumeData = {
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    skills: string[];
    projects: Project[];
    certifications: Certification[];
    languages: Language[];
    sectionOrder: string[];
};

export type Resume = {
    id: string;
    title: string;
    templateId: string;
    updatedAt: Date;
    data: ResumeData;
};

export const DEFAULT_SECTION_ORDER = [
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'languages',
];

export const SECTION_LABELS: Record<string, string> = {
    summary: 'Professional Summary',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    certifications: 'Certifications',
    languages: 'Languages',
};

export function getDefaultResumeData(): ResumeData {
    return {
        personalInfo: { fullName: '', email: '', phone: '', address: '', summary: '' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
        sectionOrder: [...DEFAULT_SECTION_ORDER],
    };
}
