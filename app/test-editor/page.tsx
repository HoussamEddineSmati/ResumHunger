'use client';

import Editor from '@/components/ui/builder/editor';

export default function TestEditorPage() {
    const dummyResume = {
        id: 'test-id',
        title: 'Modern Resume Preview',
        templateId: 'classic',
        content: JSON.stringify({
            personalInfo: {
                fullName: 'Samantha Sterling',
                email: 'samantha@example.com',
                phone: '+1 (555) 001-2233',
                address: 'San Francisco, CA',
                summary: 'Innovative Software Architect with over 10 years of experience in building scalable cloud solutions and modern web applications. Passionate about clean code and exceptional user experiences.',
                linkedIn: 'https://linkedin.com/in/samanthasterling',
                github: 'https://github.com/ssterling',
                portfolio: 'https://samanthasterling.dev',
            },
            experience: [
                {
                    id: '1',
                    company: 'TechFlow Systems',
                    position: 'Lead Developer',
                    startDate: '2020-01',
                    endDate: '',
                    description: 'Led a team of 8 engineers to develop a high-performance microservices architecture, reducing API latency by 40%. Implemented CI/CD pipelines that decreased deployment time by 60%.'
                }
            ],
            education: [
                {
                    id: '2',
                    school: 'MIT',
                    degree: 'M.S.',
                    field: 'Computer Science',
                    startDate: '2015-09',
                    endDate: '2017-06',
                    gpa: '3.9'
                }
            ],
            skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'],
            projects: [
                {
                    id: '3',
                    name: 'CloudScale Dashboard',
                    description: 'Built a real-time monitoring dashboard for cloud infrastructure serving 10,000+ users.',
                    technologies: 'React, D3.js, WebSocket, Go',
                    link: 'https://github.com/ssterling/cloudscale',
                    startDate: '2022-03',
                    endDate: '2022-08',
                }
            ],
            certifications: [
                {
                    id: '4',
                    name: 'AWS Solutions Architect Professional',
                    issuer: 'Amazon Web Services',
                    date: '2023-06',
                    credentialId: 'AWS-SAP-2023',
                }
            ],
            languages: [
                { id: '5', name: 'English', proficiency: 'Native' as const },
                { id: '6', name: 'Spanish', proficiency: 'Intermediate' as const },
            ],
            sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
        }),
    };

    return (
        <div className="h-screen w-full">
            <Editor resume={dummyResume} />
        </div>
    );
}
