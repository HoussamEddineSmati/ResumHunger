'use client';

import { Project } from '@/lib/definitions';
import { Plus, Trash2, FolderGit2 } from 'lucide-react';

export default function ProjectsForm({
    data,
    onChange,
}: {
    data: Project[];
    onChange: (data: Project[]) => void;
}) {
    const addProject = () => {
        onChange([
            ...data,
            {
                id: crypto.randomUUID(),
                name: '',
                description: '',
                technologies: '',
                link: '',
                startDate: '',
                endDate: '',
            },
        ]);
    };

    const updateProject = (index: number, field: keyof Project, value: string) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeProject = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FolderGit2 className="w-5 h-5 text-blue-400" />
                    <h2 className="text-lg font-semibold">Projects</h2>
                </div>
                <button
                    onClick={addProject}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-all text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Project
                </button>
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <FolderGit2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>No projects yet. Add your key projects to showcase.</p>
                </div>
            )}

            {data.map((project, index) => (
                <div
                    key={project.id}
                    className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-400">
                            Project {index + 1}
                        </span>
                        <button
                            onClick={() => removeProject(index)}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Project Name</label>
                            <input
                                type="text"
                                value={project.name}
                                onChange={(e) => updateProject(index, 'name', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
                                placeholder="e.g. E-commerce Platform"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Start Date</label>
                            <input
                                type="month"
                                value={project.startDate || ''}
                                onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">End Date</label>
                            <input
                                type="month"
                                value={project.endDate || ''}
                                onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 transition"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Technologies Used</label>
                            <input
                                type="text"
                                value={project.technologies}
                                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
                                placeholder="e.g. React, Node.js, PostgreSQL"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Project Link</label>
                            <input
                                type="url"
                                value={project.link || ''}
                                onChange={(e) => updateProject(index, 'link', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
                                placeholder="https://github.com/..."
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Description</label>
                            <textarea
                                value={project.description}
                                onChange={(e) => updateProject(index, 'description', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition resize-none"
                                placeholder="Describe the project, your role, and key achievements..."
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
