import { ResumeData } from '@/lib/definitions';

export default function ClassicTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, experience, education, skills, projects, certifications, languages, sectionOrder } = data;

    const order = sectionOrder && sectionOrder.length > 0 ? sectionOrder : [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages',
    ];

    const renderSection = (id: string) => {
        switch (id) {
            case 'summary':
                return personalInfo?.summary ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b-2 border-gray-800 pb-1">Professional Summary</h2>
                        <p className="text-xs leading-relaxed">{personalInfo.summary}</p>
                    </section>
                ) : null;

            case 'experience':
                return experience?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b-2 border-gray-800 pb-1">Experience</h2>
                        <div className="space-y-3">
                            {experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-xs">{exp.position}</h3>
                                        <span className="text-[10px] text-gray-600">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                    </div>
                                    <div className="text-xs text-gray-700 font-medium">{exp.company}</div>
                                    <p className="text-xs mt-1 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'education':
                return education?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b-2 border-gray-800 pb-1">Education</h2>
                        <div className="space-y-3">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-xs">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                                        <span className="text-[10px] text-gray-600">{edu.startDate} – {edu.endDate}</span>
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
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b-2 border-gray-800 pb-1">Skills</h2>
                        <p className="text-xs">{skills.join(' • ')}</p>
                    </section>
                ) : null;

            case 'projects':
                return projects?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b-2 border-gray-800 pb-1">Projects</h2>
                        <div className="space-y-3">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-xs">{proj.name}</h3>
                                        {proj.startDate && (
                                            <span className="text-[10px] text-gray-600">{proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}</span>
                                        )}
                                    </div>
                                    {proj.technologies && (
                                        <div className="text-[10px] text-gray-500 italic">{proj.technologies}</div>
                                    )}
                                    <p className="text-xs mt-1 whitespace-pre-wrap">{proj.description}</p>
                                    {proj.link && <div className="text-[10px] text-blue-700 mt-0.5">{proj.link}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'certifications':
                return certifications?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b-2 border-gray-800 pb-1">Certifications</h2>
                        <ul className="space-y-1">
                            {certifications.map((cert, i) => (
                                <li key={i} className="text-xs">
                                    <span className="font-bold">{cert.name}</span> — {cert.issuer} ({cert.date})
                                    {cert.credentialId && <span className="text-gray-500 ml-1">ID: {cert.credentialId}</span>}
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : null;

            case 'languages':
                return languages?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b-2 border-gray-800 pb-1">Languages</h2>
                        <p className="text-xs">
                            {languages.map(l => `${l.name} (${l.proficiency})`).join(' • ')}
                        </p>
                    </section>
                ) : null;

            default:
                return null;
        }
    };

    return (
        <div className="font-sans text-gray-900">
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-3 mb-4">
                <h1 className="text-2xl font-bold uppercase tracking-wide">{personalInfo?.fullName || 'Your Name'}</h1>
                <div className="text-[10px] mt-1.5 flex flex-wrap gap-2 text-gray-600">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo?.address && <span>• {personalInfo.address}</span>}
                </div>
                {(personalInfo?.linkedIn || personalInfo?.github || personalInfo?.portfolio) && (
                    <div className="text-[10px] mt-1 flex flex-wrap gap-2 text-blue-700">
                        {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
                        {personalInfo.github && <span>• {personalInfo.github}</span>}
                        {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
                    </div>
                )}
            </header>

            {/* Content in section order */}
            {order.map(renderSection)}
        </div>
    );
}
