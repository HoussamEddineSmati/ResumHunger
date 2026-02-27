'use client';

import { Certification } from '@/lib/definitions';
import { Plus, Trash2, ShieldCheck } from 'lucide-react';

export default function CertificationsForm({
    data,
    onChange,
}: {
    data: Certification[];
    onChange: (data: Certification[]) => void;
}) {
    const addCertification = () => {
        onChange([
            ...data,
            {
                id: crypto.randomUUID(),
                name: '',
                issuer: '',
                date: '',
                expiryDate: '',
                credentialId: '',
                url: '',
            },
        ]);
    };

    const updateCert = (index: number, field: keyof Certification, value: string) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeCert = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    <h2 className="text-lg font-semibold">Certifications</h2>
                </div>
                <button
                    onClick={addCertification}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-all text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Certification
                </button>
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <ShieldCheck className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>No certifications yet. Add your professional credentials.</p>
                </div>
            )}

            {data.map((cert, index) => (
                <div
                    key={cert.id}
                    className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-400">
                            Certification {index + 1}
                        </span>
                        <button
                            onClick={() => removeCert(index)}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Certification Name</label>
                            <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => updateCert(index, 'name', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
                                placeholder="e.g. AWS Solutions Architect"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Issuing Organization</label>
                            <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => updateCert(index, 'issuer', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
                                placeholder="e.g. Amazon Web Services"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Issue Date</label>
                            <input
                                type="month"
                                value={cert.date}
                                onChange={(e) => updateCert(index, 'date', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Expiry Date (optional)</label>
                            <input
                                type="month"
                                value={cert.expiryDate || ''}
                                onChange={(e) => updateCert(index, 'expiryDate', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Credential ID</label>
                            <input
                                type="text"
                                value={cert.credentialId || ''}
                                onChange={(e) => updateCert(index, 'credentialId', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
                                placeholder="e.g. ABC123XYZ"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Credential URL</label>
                            <input
                                type="url"
                                value={cert.url || ''}
                                onChange={(e) => updateCert(index, 'url', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
                                placeholder="https://verify.example.com/..."
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
