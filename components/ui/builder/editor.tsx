'use client';

import { useState } from 'react';
import { ResumeData } from '@/lib/definitions';
import PersonalForm from './forms/PersonalForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ResumePreview from './preview/ResumePreview';
import { User, Briefcase, GraduationCap, Award, Download, Save, Eye, Edit3, Loader2 } from 'lucide-react';
import { saveResume } from '@/lib/actions';

export default function Editor({ resume }: { resume: any }) {
    const [activeTab, setActiveTab] = useState('personal');
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<ResumeData>(
        typeof resume.content === 'string'
            ? JSON.parse(resume.content || '{}')
            : resume.content
    );

    // Ensure default structure exists
    if (!formData.personalInfo) formData.personalInfo = { fullName: '', email: '', phone: '', address: '', summary: '' };
    if (!formData.experience) formData.experience = [];
    if (!formData.education) formData.education = [];
    if (!formData.skills) formData.skills = [];

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

    const tabs = [
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'skills', label: 'Skills', icon: Award },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-black text-white selection:bg-blue-500/30 relative">
            {/* Background Fluid Art - CSS approximation */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-fuchsia-600/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[40%] left-[40%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Sidebar / Form Area */}
            <div className="w-1/2 flex flex-col h-full relative z-10 bg-black/40 backdrop-blur-xl border-r border-white/10">
                {/* Header inside Form Area */}
                <div className="px-8 py-6 flex items-center justify-between border-b border-white/10 bg-black/20 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <Edit3 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight">Design your Resume</h1>
                            <p className="text-xs text-gray-400">Personalize every detail</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => window.print()}
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                            title="Download PDF"
                        >
                            <Download className="w-5 h-5 text-gray-300 group-hover:text-white" />
                        </button>
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

                {/* Tab Navigation */}
                <div className="px-8 pt-6">
                    <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/10 gap-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
                                    <span className="text-sm font-medium">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Form Content Area */}
                <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
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
                    </div>
                </div>
            </div>

            {/* Preview Area */}
            <div className="w-1/2 bg-transparent relative overflow-hidden flex flex-col backdrop-blur-3xl z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />

                {/* Preview Header */}
                <div className="px-8 py-6 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Live Preview</span>
                    </div>
                </div>

                {/* Preview Scroll Container */}
                <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative z-10 flex justify-center">
                    <div className="relative group">
                        {/* Decorative background elements behind the paper */}
                        <div className="absolute -inset-4 bg-blue-600/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div id="resume-preview-content" className="bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] w-[210mm] min-h-[297mm] p-[15mm] transform-gpu transition-all duration-500 rounded-sm overflow-hidden text-black origin-top scale-[0.85] xl:scale-100">
                            <ResumePreview data={formData} />
                        </div>
                    </div>
                </div>
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
