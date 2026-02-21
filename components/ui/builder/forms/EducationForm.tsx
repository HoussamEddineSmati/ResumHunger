'use client';

import { ResumeData } from '@/lib/definitions';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

type Props = {
    data: ResumeData['education'];
    onChange: (data: ResumeData['education']) => void;
};

export default function EducationForm({ data = [], onChange }: Props) {
    const handleChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const addEducation = () => {
        onChange([
            ...data,
            {
                id: crypto.randomUUID(),
                school: '',
                degree: '',
                startDate: '',
                endDate: '',
            },
        ]);
    };

    const removeEducation = (index: number) => {
        const newData = [...data];
        newData.splice(index, 1);
        onChange(newData);
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all text-sm";
    const labelClasses = "block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1";

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Education</h3>
                    <p className="text-sm text-gray-400">Share your educational background</p>
                </div>
            </div>

            <div className="space-y-4">
                {data.map((edu, index) => (
                    <div key={edu.id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative group transition-all hover:bg-white/[0.05]">
                        <button
                            onClick={() => removeEducation(index)}
                            className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                            title="Remove Education"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <div>
                                <label className={labelClasses}>School / University</label>
                                <input
                                    value={edu.school}
                                    placeholder="e.g. Stanford University"
                                    onChange={(e) => handleChange(index, 'school', e.target.value)}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Degree / Field of Study</label>
                                <input
                                    value={edu.degree}
                                    placeholder="e.g. Bachelor of Science in Computer Science"
                                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                                    className={inputClasses}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClasses}>Start Date</label>
                                    <input
                                        type="month"
                                        value={edu.startDate}
                                        onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>End Date</label>
                                    <input
                                        type="month"
                                        value={edu.endDate}
                                        onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                        className={inputClasses}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addEducation}
                className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-400 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 group"
            >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                    <Plus className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">Add Education</span>
            </button>
        </div>
    );
}
