'use client';

import { ResumeData } from '@/lib/definitions';

type Props = {
    data: ResumeData['personalInfo'];
    onChange: (data: ResumeData['personalInfo']) => void;
};

export default function PersonalForm({ data, onChange }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={data.fullName || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={data.phone || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={data.address || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="City, Country"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Professional Summary</label>
                    <textarea
                        name="summary"
                        value={data.summary || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded h-32"
                        placeholder="Briefly describe your professional background..."
                    />
                </div>
            </div>
        </div>
    );
}
