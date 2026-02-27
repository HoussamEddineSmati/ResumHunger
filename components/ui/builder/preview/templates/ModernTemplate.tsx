import { ResumeData } from '@/lib/definitions';

export default function ModernTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, experience, education, skills, projects, certifications, languages, sectionOrder } = data;

    const order = sectionOrder && sectionOrder.length > 0 ? sectionOrder : [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages',
    ];

    const renderSection = (id: string) => {
        switch (id) {
            case 'summary':
                return personalInfo?.summary ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 text-blue-700 border-b border-blue-200 pb-1">Professional Summary</h2>
                        <p className="text-xs leading-relaxed text-gray-700">{personalInfo.summary}</p>
                    </section>
                ) : null;

            case 'experience':
                return experience?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-blue-700 border-b border-blue-200 pb-1">Experience</h2>
                        <div className="space-y-4">
                            {experience.map((exp, i) => (
                                <div key={i} className="pl-3 border-l-2 border-blue-300">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-xs text-gray-900">{exp.position}</h3>
                                        <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                    </div>
                                    <div className="text-xs text-blue-600 font-medium">{exp.company}</div>
                                    <p className="text-xs mt-1 whitespace-pre-wrap leading-relaxed text-gray-700">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'education':
                return education?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-blue-700 border-b border-blue-200 pb-1">Education</h2>
                        <div className="space-y-3">
                            {education.map((edu, i) => (
                                <div key={i} className="pl-3 border-l-2 border-blue-300">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-xs">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                                        <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{edu.startDate} – {edu.endDate}</span>
                                    </div>
                                    <div className="text-xs text-gray-700">{edu.school}</div>
                                    {edu.gpa && <div className="text-[10px] text-gray-500">GPA: {edu.gpa}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'skills':
                return skills?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 text-blue-700 border-b border-blue-200 pb-1">Skills</h2>
                        <div className="flex flex-wrap gap-1.5">
                            {skills.map((skill, i) => (
                                <span key={i} className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-100">{skill}</span>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'projects':
                return projects?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-blue-700 border-b border-blue-200 pb-1">Projects</h2>
                        <div className="space-y-3">
                            {projects.map((proj, i) => (
                                <div key={i} className="pl-3 border-l-2 border-blue-300">
                                    <h3 className="font-bold text-xs">{proj.name}</h3>
                                    {proj.technologies && (
                                        <div className="text-[10px] text-blue-600 italic">{proj.technologies}</div>
                                    )}
                                    <p className="text-xs mt-1 text-gray-700">{proj.description}</p>
                                    {proj.link && <div className="text-[10px] text-blue-700 mt-0.5">{proj.link}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'certifications':
                return certifications?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 text-blue-700 border-b border-blue-200 pb-1">Certifications</h2>
                        <ul className="space-y-1">
                            {certifications.map((cert, i) => (
                                <li key={i} className="text-xs">
                                    <span className="font-bold">{cert.name}</span>
                                    <span className="text-gray-500"> — {cert.issuer} ({cert.date})</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : null;

            case 'languages':
                return languages?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 text-blue-700 border-b border-blue-200 pb-1">Languages</h2>
                        <div className="flex flex-wrap gap-3">
                            {languages.map((l, i) => (
                                <div key={i} className="text-xs">
                                    <span className="font-bold">{l.name}</span>
                                    <span className="text-gray-500"> — {l.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            default:
                return null;
        }
    };

    return (
        <div className="font-sans text-gray-900">
            {/* Header with accent */}
            <header className="mb-5">
                <div className="bg-blue-700 -mx-[15mm] -mt-[15mm] px-[15mm] pt-[15mm] pb-4">
                    <h1 className="text-2xl font-bold uppercase tracking-wide text-white">{personalInfo?.fullName || 'Your Name'}</h1>
                    <div className="text-[10px] mt-1.5 flex flex-wrap gap-2 text-blue-100">
                        {personalInfo?.email && <span>{personalInfo.email}</span>}
                        {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
                        {personalInfo?.address && <span>• {personalInfo.address}</span>}
                    </div>
                    {(personalInfo?.linkedIn || personalInfo?.github || personalInfo?.portfolio) && (
                        <div className="text-[10px] mt-1 flex flex-wrap gap-2 text-blue-200">
                            {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
                            {personalInfo.github && <span>• {personalInfo.github}</span>}
                            {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
                        </div>
                    )}
                </div>
            </header>

            {order.map(renderSection)}
        </div>
    );
}
