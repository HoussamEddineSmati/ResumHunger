'use client';

import Editor from '@/components/ui/builder/editor';

export default function TestEditorPage() {
    const dummyResume = {
        id: 'test-id',
        title: 'Modern Resume Preview',
        content: JSON.stringify({
            personalInfo: {
                fullName: 'Samantha Sterling',
                email: 'samantha@example.com',
                phone: '+1 (555) 001-2233',
                address: 'San Francisco, CA',
                summary: 'Innovative Software Architect with over 10 years of experience in building scalable cloud solutions and modern web applications. Passionate about clean code and exceptional user experiences.'
            },
            experience: [
                {
                    id: '1',
                    company: 'TechFlow Systems',
                    position: 'Lead Developer',
                    startDate: '2020-01',
                    endDate: '',
                    description: 'Leading the core platform team in developing a high-performance microservices architecture.'
                }
            ],
            education: [
                {
                    id: '2',
                    school: 'MIT',
                    degree: 'M.S. in Computer Science',
                    startDate: '2015-09',
                    endDate: '2017-06'
                }
            ],
            skills: ['React', 'Next.js', 'Typescript', 'Node.js', 'UI/UX Design', 'Cloud Architecture']
        }),
        templateId: 'modern'
    };

    return (
        <div className="h-screen w-full">
            <Editor resume={dummyResume} />
        </div>
    );
}
