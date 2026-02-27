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

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all";
    const labelClasses = "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1";

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold text-white mb-1">Personal Details</h3>
                <p className="text-sm text-gray-400 mb-6">Let recruiters know how to reach you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className={labelClasses}>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={data.fullName || ''}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className={labelClasses}>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email || ''}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className={labelClasses}>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={data.phone || ''}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className={labelClasses}>Location / Address</label>
                    <input
                        type="text"
                        name="address"
                        value={data.address || ''}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="New York, USA"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className={labelClasses}>Professional Summary</label>
                    <textarea
                        name="summary"
                        value={data.summary || ''}
                        onChange={handleChange}
                        className={`${inputClasses} h-40 resize-none`}
                        placeholder="Briefly describe your professional background and key achievements..."
                    />
                </div>
            </div>

            <div className="pt-4 border-t border-white/10">
                <h3 className="text-lg font-bold text-white mb-1">Professional Links</h3>
                <p className="text-sm text-gray-400 mb-4">ATS systems scan for professional profiles</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>LinkedIn URL</label>
                        <input
                            type="url"
                            name="linkedIn"
                            value={data.linkedIn || ''}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>GitHub URL</label>
                        <input
                            type="url"
                            name="github"
                            value={data.github || ''}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="https://github.com/..."
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className={labelClasses}>Portfolio / Website</label>
                        <input
                            type="url"
                            name="portfolio"
                            value={data.portfolio || ''}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="https://yoursite.com"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
