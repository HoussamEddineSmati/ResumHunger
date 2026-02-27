'use client';

import { useState, useCallback } from 'react';
import { ResumeData, getDefaultResumeData } from '@/lib/definitions';
import PersonalForm from './forms/PersonalForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import LanguagesForm from './forms/LanguagesForm';
import ResumePreview from './preview/ResumePreview';
import KeywordAnalyzer from './keyword/KeywordAnalyzer';
import {
    User, Briefcase, GraduationCap, Award, Download, Save,
    Eye, Edit3, Loader2, FolderGit2, ShieldCheck, Globe,
    FileText, FileDown, Search, Palette,
} from 'lucide-react';
import { saveResume } from '@/lib/actions';

const TEMPLATE_OPTIONS = [
    { id: 'classic', label: 'Classic', desc: 'Clean single-column, highest ATS compatibility' },
    { id: 'modern', label: 'Modern', desc: 'Styled with color accents, ATS-safe' },
    { id: 'professional', label: 'Professional', desc: 'Two-column layout, balanced ATS/visual' },
];

export default function Editor({ resume }: { resume: any }) {
    const [activeTab, setActiveTab] = useState('personal');
    const [isSaving, setIsSaving] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [showKeywordPanel, setShowKeywordPanel] = useState(false);
    const [templateId, setTemplateId] = useState(resume.templateId || 'classic');

    const parsed = typeof resume.content === 'string'
        ? JSON.parse(resume.content || '{}')
        : resume.content;

    const defaults = getDefaultResumeData();
    const [formData, setFormData] = useState<ResumeData>({
        ...defaults,
        ...parsed,
        personalInfo: { ...defaults.personalInfo, ...parsed.personalInfo },
        experience: parsed.experience || [],
        education: parsed.education || [],
        skills: parsed.skills || [],
        projects: parsed.projects || [],
        certifications: parsed.certifications || [],
        languages: parsed.languages || [],
        sectionOrder: parsed.sectionOrder || defaults.sectionOrder,
    });

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveResume(resume.id, JSON.stringify(formData));
        } catch (error) {
            console.error('Failed to save resume:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleExportTxt = useCallback(() => {
        const pi = formData.personalInfo;
        let txt = `${pi.fullName}\n`;
        txt += [pi.email, pi.phone, pi.address].filter(Boolean).join(' | ') + '\n';
        if (pi.linkedIn) txt += `LinkedIn: ${pi.linkedIn}\n`;
        if (pi.github) txt += `GitHub: ${pi.github}\n`;
        if (pi.portfolio) txt += `Portfolio: ${pi.portfolio}\n`;
        txt += '\n';

        if (pi.summary) {
            txt += `PROFESSIONAL SUMMARY\n${'='.repeat(40)}\n${pi.summary}\n\n`;
        }

        if (formData.experience.length > 0) {
            txt += `EXPERIENCE\n${'='.repeat(40)}\n`;
            formData.experience.forEach(exp => {
                txt += `${exp.position} at ${exp.company}\n`;
                txt += `${exp.startDate} - ${exp.endDate || 'Present'}\n`;
                txt += `${exp.description}\n\n`;
            });
        }

        if (formData.education.length > 0) {
            txt += `EDUCATION\n${'='.repeat(40)}\n`;
            formData.education.forEach(edu => {
                txt += `${edu.degree}${edu.field ? ' in ' + edu.field : ''}\n`;
                txt += `${edu.school} | ${edu.startDate} - ${edu.endDate}\n`;
                if (edu.gpa) txt += `GPA: ${edu.gpa}\n`;
                txt += '\n';
            });
        }

        if (formData.skills.length > 0) {
            txt += `SKILLS\n${'='.repeat(40)}\n${formData.skills.join(', ')}\n\n`;
        }

        if (formData.projects.length > 0) {
            txt += `PROJECTS\n${'='.repeat(40)}\n`;
            formData.projects.forEach(proj => {
                txt += `${proj.name}\n`;
                if (proj.technologies) txt += `Technologies: ${proj.technologies}\n`;
                txt += `${proj.description}\n\n`;
            });
        }

        if (formData.certifications.length > 0) {
            txt += `CERTIFICATIONS\n${'='.repeat(40)}\n`;
            formData.certifications.forEach(cert => {
                txt += `${cert.name} - ${cert.issuer} (${cert.date})\n`;
            });
            txt += '\n';
        }

        if (formData.languages.length > 0) {
            txt += `LANGUAGES\n${'='.repeat(40)}\n`;
            formData.languages.forEach(lang => {
                txt += `${lang.name} - ${lang.proficiency}\n`;
            });
        }

        const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formData.personalInfo.fullName || 'resume'}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }, [formData]);

    const handleExportDocx = useCallback(async () => {
        const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import('docx');
        const { saveAs } = await import('file-saver');

        const pi = formData.personalInfo;
        const sections: any[] = [];

        // Header
        sections.push(
            new Paragraph({ text: pi.fullName, heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({ text: [pi.email, pi.phone, pi.address].filter(Boolean).join(' | '), size: 20 }),
                ],
            }),
        );

        if (pi.linkedIn || pi.github || pi.portfolio) {
            sections.push(new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({ text: [pi.linkedIn, pi.github, pi.portfolio].filter(Boolean).join(' | '), size: 18, color: '555555' }),
                ],
            }));
        }

        sections.push(new Paragraph({ text: '' }));

        // Summary
        if (pi.summary) {
            sections.push(
                new Paragraph({ text: 'PROFESSIONAL SUMMARY', heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: pi.summary }),
                new Paragraph({ text: '' }),
            );
        }

        // Experience
        if (formData.experience.length > 0) {
            sections.push(new Paragraph({ text: 'EXPERIENCE', heading: HeadingLevel.HEADING_2 }));
            formData.experience.forEach(exp => {
                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: exp.position, bold: true }),
                            new TextRun({ text: ` at ${exp.company}` }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: `${exp.startDate} - ${exp.endDate || 'Present'}`, italics: true, size: 20, color: '666666' }),
                        ],
                    }),
                    new Paragraph({ text: exp.description }),
                    new Paragraph({ text: '' }),
                );
            });
        }

        // Education
        if (formData.education.length > 0) {
            sections.push(new Paragraph({ text: 'EDUCATION', heading: HeadingLevel.HEADING_2 }));
            formData.education.forEach(edu => {
                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: `${edu.degree}${edu.field ? ' in ' + edu.field : ''}`, bold: true }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: `${edu.school} | ${edu.startDate} - ${edu.endDate}`, italics: true, size: 20 }),
                        ],
                    }),
                    new Paragraph({ text: '' }),
                );
            });
        }

        // Skills
        if (formData.skills.length > 0) {
            sections.push(
                new Paragraph({ text: 'SKILLS', heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: formData.skills.join(' • ') }),
                new Paragraph({ text: '' }),
            );
        }

        // Projects
        if (formData.projects.length > 0) {
            sections.push(new Paragraph({ text: 'PROJECTS', heading: HeadingLevel.HEADING_2 }));
            formData.projects.forEach(proj => {
                sections.push(
                    new Paragraph({ children: [new TextRun({ text: proj.name, bold: true })] }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: `Technologies: ${proj.technologies}`, italics: true, size: 20, color: '666666' }),
                        ],
                    }),
                    new Paragraph({ text: proj.description }),
                    new Paragraph({ text: '' }),
                );
            });
        }

        // Certifications
        if (formData.certifications.length > 0) {
            sections.push(new Paragraph({ text: 'CERTIFICATIONS', heading: HeadingLevel.HEADING_2 }));
            formData.certifications.forEach(cert => {
                sections.push(new Paragraph({
                    children: [
                        new TextRun({ text: cert.name, bold: true }),
                        new TextRun({ text: ` — ${cert.issuer} (${cert.date})` }),
                    ],
                }));
            });
            sections.push(new Paragraph({ text: '' }));
        }

        // Languages
        if (formData.languages.length > 0) {
            sections.push(new Paragraph({ text: 'LANGUAGES', heading: HeadingLevel.HEADING_2 }));
            formData.languages.forEach(lang => {
                sections.push(new Paragraph({ text: `${lang.name} — ${lang.proficiency}` }));
            });
        }

        const doc = new Document({
            sections: [{
                properties: {},
                children: sections,
            }],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${pi.fullName || 'resume'}.docx`);
    }, [formData]);

    const tabs = [
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'skills', label: 'Skills', icon: Award },
        { id: 'projects', label: 'Projects', icon: FolderGit2 },
        { id: 'certifications', label: 'Certs', icon: ShieldCheck },
        { id: 'languages', label: 'Languages', icon: Globe },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-black text-white selection:bg-blue-500/30 relative">
            {/* Background Fluid Art */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-fuchsia-600/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[40%] left-[40%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Sidebar / Form Area */}
            <div className="w-1/2 flex flex-col h-full relative z-10 bg-black/40 backdrop-blur-xl border-r border-white/10">
                {/* Header */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/20 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <Edit3 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight">Design your Resume</h1>
                            <p className="text-xs text-gray-400">ATS-optimized builder</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowKeywordPanel(!showKeywordPanel)}
                            className={`p-2.5 rounded-xl border transition-all group ${showKeywordPanel ? 'bg-green-600/20 border-green-500/30 text-green-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            title="ATS Keyword Analyzer"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setShowTemplates(!showTemplates)}
                            className={`p-2.5 rounded-xl border transition-all group ${showTemplates ? 'bg-purple-600/20 border-purple-500/30 text-purple-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            title="Change Template"
                        >
                            <Palette className="w-5 h-5" />
                        </button>
                        <div className="relative group/export">
                            <button
                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                title="Export Options"
                            >
                                <Download className="w-5 h-5 text-gray-300 group-hover/export:text-white" />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover/export:opacity-100 group-hover/export:visible transition-all z-50">
                                <button
                                    onClick={() => window.print()}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-t-xl transition"
                                >
                                    <FileText className="w-4 h-4" /> Print / PDF
                                </button>
                                <button
                                    onClick={handleExportDocx}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition"
                                >
                                    <FileDown className="w-4 h-4" /> DOCX
                                </button>
                                <button
                                    onClick={handleExportTxt}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-b-xl transition"
                                >
                                    <FileDown className="w-4 h-4" /> Plain Text
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            <span>{isSaving ? 'Saving...' : 'Save'}</span>
                        </button>
                    </div>
                </div>

                {/* Template Picker Drawer */}
                {showTemplates && (
                    <div className="px-6 py-4 border-b border-white/10 bg-black/30 space-y-3">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Select ATS Template</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {TEMPLATE_OPTIONS.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setTemplateId(t.id)}
                                    className={`p-3 rounded-xl text-left transition-all ${templateId === t.id
                                        ? 'bg-blue-600/20 border-2 border-blue-500'
                                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="text-sm font-bold">{t.label}</div>
                                    <div className="text-xs text-gray-400 mt-1">{t.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab Navigation */}
                <div className="px-6 pt-4">
                    <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 gap-0.5 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    <span className="text-xs font-medium">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Form Content Area */}
                <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                    <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm p-6 shadow-2xl">
                        {activeTab === 'personal' && (
                            <PersonalForm
                                data={formData.personalInfo}
                                onChange={(data) => setFormData({ ...formData, personalInfo: data })}
                            />
                        )}
                        {activeTab === 'experience' && (
                            <ExperienceForm
                                data={formData.experience}
                                onChange={(data) => setFormData({ ...formData, experience: data })}
                            />
                        )}
                        {activeTab === 'education' && (
                            <EducationForm
                                data={formData.education}
                                onChange={(data) => setFormData({ ...formData, education: data })}
                            />
                        )}
                        {activeTab === 'skills' && (
                            <SkillsForm
                                data={formData.skills}
                                onChange={(data) => setFormData({ ...formData, skills: data })}
                            />
                        )}
                        {activeTab === 'projects' && (
                            <ProjectsForm
                                data={formData.projects}
                                onChange={(data) => setFormData({ ...formData, projects: data })}
                            />
                        )}
                        {activeTab === 'certifications' && (
                            <CertificationsForm
                                data={formData.certifications}
                                onChange={(data) => setFormData({ ...formData, certifications: data })}
                            />
                        )}
                        {activeTab === 'languages' && (
                            <LanguagesForm
                                data={formData.languages}
                                onChange={(data) => setFormData({ ...formData, languages: data })}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side — Preview or Keyword Analyzer */}
            <div className="w-1/2 bg-transparent relative overflow-hidden flex flex-col backdrop-blur-3xl z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />

                {showKeywordPanel ? (
                    <KeywordAnalyzer resumeData={formData} />
                ) : (
                    <>
                        {/* Preview Header */}
                        <div className="px-8 py-4 flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                <Eye className="w-4 h-4 text-blue-400" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Live Preview — {TEMPLATE_OPTIONS.find(t => t.id === templateId)?.label}</span>
                            </div>
                        </div>

                        {/* Preview Scroll Container */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10 flex justify-center">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-blue-600/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div id="resume-preview-content" className="bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] w-[210mm] min-h-[297mm] p-[15mm] transform-gpu transition-all duration-500 rounded-sm overflow-hidden text-black origin-top scale-[0.7] xl:scale-[0.85]">
                                    <ResumePreview data={formData} templateId={templateId} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}
