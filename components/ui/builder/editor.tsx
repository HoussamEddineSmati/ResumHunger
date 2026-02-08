'use client';

import { useState } from 'react';
import { ResumeData } from '@/lib/definitions';
import PersonalForm from './forms/PersonalForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ResumePreview from './preview/ResumePreview';

export default function Editor({ resume }: { resume: any }) {
    const [activeTab, setActiveTab] = useState('personal');
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
        console.log('Saving...', formData);
        // TODO: Server action integration
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar / Form Area */}
            <div className="w-1/2 p-8 border-r overflow-y-auto bg-gray-50">
                <div className="flex space-x-2 mb-6 border-b pb-2">
                    {['personal', 'experience', 'education', 'skills'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded capitalize ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="bg-white p-6 rounded shadow-sm border">
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

                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={() => window.print()} className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">
                        Download PDF
                    </button>
                    <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                        Save Resume
                    </button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="w-1/2 bg-gray-200 p-8 overflow-y-auto flex justify-center">
                <div className="bg-white shadow-lg w-[210mm] min-h-[297mm] p-[10mm] origin-top scale-90">
                    <ResumePreview data={formData} />
                </div>
            </div>
        </div>
    );
}
