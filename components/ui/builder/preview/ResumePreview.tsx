import { ResumeData } from '@/lib/definitions';

export default function ResumePreview({ data }: { data: ResumeData }) {
    const { personalInfo, experience, education, skills } = data;

    return (
        <div id="resume-preview-content" className="font-sans text-gray-900">
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-4 mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-wide">{personalInfo?.fullName || 'Your Name'}</h1>
                <div className="text-sm mt-2 flex flex-wrap gap-3 text-gray-600">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo?.address && <span>• {personalInfo.address}</span>}
                </div>
            </header>

            {/* Summary */}
            {personalInfo?.summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">Professional Summary</h2>
                    <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-300 pb-1">Experience</h2>
                    <div className="space-y-4">
                        {experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-md">{exp.company}</h3>
                                    <span className="text-sm text-gray-600">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                </div>
                                <div className="text-sm font-semibold italic mb-1">{exp.position}</div>
                                <p className="text-sm whitespace-pre-wrap">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-300 pb-1">Education</h2>
                    <div className="space-y-4">
                        {education.map((edu, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-md">{edu.school}</h3>
                                    <span className="text-sm text-gray-600">{edu.startDate} – {edu.endDate}</span>
                                </div>
                                <div className="text-sm">{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">Skills</h2>
                    <div className="flex flex-wrap gap-2 text-sm">
                        {skills.join(' • ')}
                    </div>
                </section>
            )}
        </div>
    );
}
