import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Editor from '@/components/ui/builder/editor';

export default async function BuilderPage({ params }: { params: { id: string } }) {
    const session = await auth();
    if (!session?.user?.email) redirect('/login');

    let resume;
    if (params.id === 'new') {
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (user) {
            resume = await prisma.resume.create({
                data: {
                    userId: user.id,
                    title: 'Untitled Resume',
                    content: '{}',
                    templateId: 'modern'
                }
            });
            redirect(`/builder/${resume.id}`);
        } else {
            redirect('/login');
        }
    } else {
        resume = await prisma.resume.findUnique({ where: { id: params.id } });
    }

    if (!resume) return <p>Resume not found</p>;

    return <Editor resume={resume} />;
}
