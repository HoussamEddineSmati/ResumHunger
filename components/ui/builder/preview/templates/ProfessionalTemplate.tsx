import { ResumeData } from '@/lib/definitions';

export default function ProfessionalTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, experience, education, skills, projects, certifications, languages, sectionOrder } = data;

    const order = sectionOrder && sectionOrder.length > 0 ? sectionOrder : [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages',
    ];

    // Split sections: left sidebar gets skills, languages, certifications; main gets the rest
    const sidebarSections = ['skills', 'languages', 'certifications'];
    const mainSections = order.filter(s => !sidebarSections.includes(s));
    const sideItems = order.filter(s => sidebarSections.includes(s));

    const renderSideSection = (id: string) => {
        switch (id) {
            case 'skills':
                return skills?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-300">Skills</h2>
                        <ul className="space-y-1">
                            {skills.map((skill, i) => (
                                <li key={i} className="text-[10px] text-gray-400 flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-blue-400 inline-block flex-shrink-0" />
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : null;

            case 'languages':
                return languages?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-300">Languages</h2>
                        <ul className="space-y-1">
                            {languages.map((l, i) => (
                                <li key={i} className="text-[10px] text-gray-400">
                                    {l.name} <span className="text-gray-500">— {l.proficiency}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : null;

            case 'certifications':
                return certifications?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-300">Certifications</h2>
                        <ul className="space-y-2">
                            {certifications.map((cert, i) => (
                                <li key={i} className="text-[10px] text-gray-400">
                                    <div className="font-bold text-gray-300">{cert.name}</div>
                                    <div>{cert.issuer}</div>
                                    <div className="text-gray-500">{cert.date}</div>
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : null;

            default:
                return null;
        }
    };

    const renderMainSection = (id: string) => {
        switch (id) {
            case 'summary':
                return personalInfo?.summary ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">Professional Summary</h2>
                        <p className="text-xs leading-relaxed text-gray-700">{personalInfo.summary}</p>
                    </section>
                ) : null;

            case 'experience':
                return experience?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Experience</h2>
                        <div className="space-y-3">
                            {experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-xs">{exp.position}</h3>
                                        <span className="text-[10px] text-gray-500">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                    </div>
                                    <div className="text-xs text-gray-600 font-medium">{exp.company}</div>
                                    <p className="text-xs mt-1 whitespace-pre-wrap leading-relaxed text-gray-700">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'education':
                return education?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Education</h2>
                        <div className="space-y-3">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-xs">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                                        <span className="text-[10px] text-gray-500">{edu.startDate} – {edu.endDate}</span>
                                    </div>
                                    <div className="text-xs text-gray-700">{edu.school}</div>
                                    {edu.gpa && <div className="text-[10px] text-gray-500">GPA: {edu.gpa}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'projects':
                return projects?.length > 0 ? (
                    <section key={id} className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Projects</h2>
                        <div className="space-y-3">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-xs">{proj.name}</h3>
                                    {proj.technologies && <div className="text-[10px] text-gray-500 italic">{proj.technologies}</div>}
                                    <p className="text-xs mt-1 text-gray-700">{proj.description}</p>
                                    {proj.link && <div className="text-[10px] text-blue-700">{proj.link}</div>}
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
        <div className="font-sans text-gray-900 flex min-h-full">
            {/* Left Sidebar */}
            <aside className="w-[30%] bg-gray-900 text-white -ml-[15mm] -mt-[15mm] -mb-[15mm] p-5 pt-[15mm] pl-[15mm] flex flex-col">
                {/* Name in sidebar */}
                <div className="mb-6">
                    <h1 className="text-lg font-bold uppercase tracking-wide">{personalInfo?.fullName || 'Your Name'}</h1>
                </div>

                {/* Contact */}
                <section className="mb-5">
                    <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-300">Contact</h2>
                    <ul className="space-y-1 text-[10px] text-gray-400">
                        {personalInfo?.email && <li>{personalInfo.email}</li>}
                        {personalInfo?.phone && <li>{personalInfo.phone}</li>}
                        {personalInfo?.address && <li>{personalInfo.address}</li>}
                        {personalInfo?.linkedIn && <li>{personalInfo.linkedIn}</li>}
                        {personalInfo?.github && <li>{personalInfo.github}</li>}
                        {personalInfo?.portfolio && <li>{personalInfo.portfolio}</li>}
                    </ul>
                </section>

                {sideItems.map(renderSideSection)}
            </aside>

            {/* Main Content */}
            <main className="w-[70%] pl-6 pt-0">
                {mainSections.map(renderMainSection)}
            </main>
        </div>
    );
}
