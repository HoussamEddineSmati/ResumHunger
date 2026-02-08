'use client';

import { ResumeData } from '@/lib/definitions';

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

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
            {data.map((exp, index) => (
                <div key={exp.id} className="p-4 border rounded relative bg-white">
                    <button
                        onClick={() => removeExperience(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                        Remove
                    </button>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Company</label>
                            <input
                                value={exp.company}
                                onChange={(e) => handleChange(index, 'company', e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Position</label>
                            <input
                                value={exp.position}
                                onChange={(e) => handleChange(index, 'position', e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={exp.description}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                            className="w-full p-2 border rounded h-24"
                            placeholder="Key responsibilities and achievements..."
                        />
                    </div>
                </div>
            ))}
            <button
                onClick={addExperience}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded hover:border-blue-500 hover:text-blue-500"
            >
                + Add Experience
            </button>
        </div>
    );
}
