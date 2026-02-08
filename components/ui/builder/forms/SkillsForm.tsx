'use client';

import { useState, useEffect } from 'react';

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

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <p className="text-sm text-gray-600 mb-2">Separate skills with commas (e.g. JavaScript, React, System Design)</p>
            <textarea
                value={textValue}
                onChange={handleChange}
                className="w-full p-2 border rounded h-32"
                placeholder="List your skills..."
            />
        </div>
    );
}
