'use client';

import { Language } from '@/lib/definitions';
import { Plus, Trash2, Globe } from 'lucide-react';

const PROFICIENCY_LEVELS: Language['proficiency'][] = [
    'Native',
    'Fluent',
    'Advanced',
    'Intermediate',
    'Beginner',
];

export default function LanguagesForm({
    data,
    onChange,
}: {
    data: Language[];
    onChange: (data: Language[]) => void;
}) {
    const addLanguage = () => {
        onChange([
            ...data,
            {
                id: crypto.randomUUID(),
                name: '',
                proficiency: 'Intermediate',
            },
        ]);
    };

    const updateLanguage = (index: number, field: keyof Language, value: string) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value } as Language;
        onChange(updated);
    };

    const removeLanguage = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-lg font-semibold">Languages</h2>
                </div>
                <button
                    onClick={addLanguage}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-all text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Language
                </button>
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <Globe className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>No languages yet. Add your spoken languages.</p>
                </div>
            )}

            {data.map((lang, index) => (
                <div
                    key={lang.id}
                    className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-400">
                            Language {index + 1}
                        </span>
                        <button
                            onClick={() => removeLanguage(index)}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Language</label>
                            <input
                                type="text"
                                value={lang.name}
                                onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
                                placeholder="e.g. English"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Proficiency</label>
                            <select
                                value={lang.proficiency}
                                onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 transition appearance-none"
                            >
                                {PROFICIENCY_LEVELS.map((level) => (
                                    <option key={level} value={level} className="bg-gray-900">
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
