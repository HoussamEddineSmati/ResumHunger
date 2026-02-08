'use client';

import { ResumeData } from '@/lib/definitions';

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

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Education</h3>
            {data.map((edu, index) => (
                <div key={edu.id} className="p-4 border rounded relative bg-white">
                    <button
                        onClick={() => removeEducation(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                        Remove
                    </button>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">School / University</label>
                            <input
                                value={edu.school}
                                onChange={(e) => handleChange(index, 'school', e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Degree</label>
                            <input
                                value={edu.degree}
                                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Start Date</label>
                                <input
                                    type="month"
                                    value={edu.startDate}
                                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">End Date</label>
                                <input
                                    type="month"
                                    value={edu.endDate}
                                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={addEducation}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded hover:border-blue-500 hover:text-blue-500"
            >
                + Add Education
            </button>
        </div>
    );
}
