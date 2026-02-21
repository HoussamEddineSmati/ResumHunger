'use client';

import { ResumeData } from '@/lib/definitions';
import { Plus, Trash2, Briefcase } from 'lucide-react';

type Props = {
    data: ResumeData['experience'];
    onChange: (data: ResumeData['experience']) => void;
};

export default function ExperienceForm({ data = [], onChange }: Props) {
    const handleChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const addExperience = () => {
        onChange([
            ...data,
            {
                id: crypto.randomUUID(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                description: '',
            },
        ]);
    };

    const removeExperience = (index: number) => {
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
                    <h3 className="text-xl font-bold text-white mb-1">Work Experience</h3>
                    <p className="text-sm text-gray-400">Highlight your career journey</p>
                </div>
            </div>

            <div className="space-y-4">
                {data.map((exp, index) => (
                    <div key={exp.id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative group transition-all hover:bg-white/[0.05]">
                        <button
                            onClick={() => removeExperience(index)}
                            className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                            title="Remove Experience"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className={labelClasses}>Company</label>
                                <input
                                    value={exp.company}
                                    placeholder="e.g. Google"
                                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Position</label>
                                <input
                                    value={exp.position}
                                    placeholder="e.g. Senior Software Engineer"
                                    onChange={(e) => handleChange(index, 'position', e.target.value)}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Start Date</label>
                                <input
                                    type="month"
                                    value={exp.startDate}
                                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>End Date</label>
                                <input
                                    type="month"
                                    value={exp.endDate}
                                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                        <div>
                            <label className={labelClasses}>Description</label>
                            <textarea
                                value={exp.description}
                                onChange={(e) => handleChange(index, 'description', e.target.value)}
                                className={`${inputClasses} h-32 resize-none`}
                                placeholder="Key responsibilities and achievements..."
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addExperience}
                className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-400 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 group"
            >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                    <Plus className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">Add Experience</span>
            </button>
        </div>
    );
}
