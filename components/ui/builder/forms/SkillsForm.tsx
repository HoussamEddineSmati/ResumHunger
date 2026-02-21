'use client';

import { useState, useEffect } from 'react';
import { Award } from 'lucide-react';

type Props = {
    data: string[];
    onChange: (data: string[]) => void;
};

export default function SkillsForm({ data = [], onChange }: Props) {
    const [textValue, setTextValue] = useState(data.join(', '));

    // Sync internal state if data prop changes externally
    useEffect(() => {
        setTextValue(data.join(', '));
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newVal = e.target.value;
        setTextValue(newVal);
        const skills = newVal.split(',').map(s => s.trim()).filter(Boolean);
        onChange(skills);
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all text-sm h-48 resize-none shadow-inner";

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-400" />
                    <span>Skills & Expertise</span>
                </h3>
                <p className="text-sm text-gray-400">List your core strengths and technical skills</p>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 mb-4 text-xs text-blue-300">
                <p><strong>Tip:</strong> Separate skills with commas. For example: JavaScript, React, System Design, UX Design.</p>
            </div>

            <textarea
                value={textValue}
                onChange={handleChange}
                className={inputClasses}
                placeholder="List your skills here..."
            />
        </div>
    );
}
