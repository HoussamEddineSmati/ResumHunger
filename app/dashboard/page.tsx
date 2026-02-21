import { auth, signOut } from '@/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { deleteResume } from '@/lib/actions';

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.email) {
        return <p>Access Denied</p>;
    }

    // Fetch resumes (mocked if DB fails)
    const resumes = await prisma.resume.findMany({
        where: { user: { email: session.user.email } },
        orderBy: { updatedAt: 'desc' },
    }).catch(() => []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-black">
            {/* Background Fluid Art - matching auth pages */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-fuchsia-600/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[40%] left-[40%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Main Container */}
            <div className="w-full max-w-[1200px] min-h-[800px] bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-3 relative z-10">

                {/* Left Panel - Artistic */}
                <div className="relative hidden lg:flex flex-col justify-between p-12 bg-[#0a0a0a] overflow-hidden">
                    {/* Fluid Mesh Gradient Background for Left Panel */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-800 opacity-90" />
                        <div className="absolute top-0 left-0 w-full h-full opacity-60 mix-blend-overlay"
                            style={{
                                backgroundImage: `
                                    radial-gradient(circle at 10% 20%, rgba(255, 0, 150, 0.5) 0%, transparent 50%),
                                    radial-gradient(circle at 90% 80%, rgba(0, 100, 255, 0.5) 0%, transparent 50%),
                                    radial-gradient(circle at 50% 50%, rgba(150, 50, 250, 0.5) 0%, transparent 50%)
                                `
                            }}
                        />
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase">Dashboard</div>
                        <div className="w-24 h-[1px] bg-white/30 mt-4"></div>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <h1 className="font-serif text-5xl leading-tight text-white drop-shadow-lg">
                            Your<br />
                            <span className="italic">Career</span><br />
                            Journey
                        </h1>
                        <p className="text-white/70 text-lg font-light max-w-sm">
                            Manage your resumes, track your applications, and land your dream job.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/10">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Content */}
                <div className="lg:col-span-2 flex flex-col px-12 py-12 bg-white text-[#0a0a0a]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="font-serif text-4xl text-[#0a0a0a]">My Resumes</h2>
                            <p className="text-[#666] text-sm mt-1">Welcome back, {session.user.name || session.user.email}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/builder/new"
                                className="flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white rounded-full text-sm font-medium hover:bg-black/90 transition-all shadow-lg hover:shadow-xl"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                Create New
                            </Link>
                            <form action={async () => {
                                'use server';
                                await signOut();
                            }}>
                                <button type="submit" className="px-4 py-2 text-sm text-[#666] hover:text-black transition">
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Resume Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                        {resumes.map((resume) => {
                            let displayName = resume.title;
                            try {
                                const content = JSON.parse(resume.content || '{}');
                                if (content.personalInfo?.fullName) {
                                    displayName = content.personalInfo.fullName;
                                }
                            } catch (e) { }

                            const deleteAction = deleteResume.bind(null, resume.id);

                            return (
                                <div key={resume.id} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                            </svg>
                                        </div>
                                        <div className="flex gap-2">
                                            <form action={deleteAction}>
                                                <button
                                                    type="submit"
                                                    className="opacity-0 group-hover:opacity-100 transition px-3 py-1 bg-red-600/10 text-red-600 font-medium hover:bg-red-600 hover:text-white text-xs rounded-full"
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                            <Link
                                                href={`/builder/${resume.id}`}
                                                className="opacity-0 group-hover:opacity-100 transition px-3 py-1 bg-black text-white font-medium text-xs rounded-full"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                    <h3 className="font-medium text-lg text-[#0a0a0a] mb-1">
                                        {displayName || 'Untitled Resume'}
                                    </h3>
                                    <p className="text-sm text-[#666]">Last updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                                </div>
                            );
                        })}

                        {resumes.length === 0 && (
                            <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="12" y1="11" x2="12" y2="17" />
                                        <line x1="9" y1="14" x2="15" y2="14" />
                                    </svg>
                                </div>
                                <h3 className="font-medium text-xl text-[#0a0a0a] mb-2">No resumes yet</h3>
                                <p className="text-[#666] mb-6">Create your first resume to get started</p>
                                <Link
                                    href="/builder/new"
                                    className="px-6 py-3 bg-[#0a0a0a] text-white rounded-full text-sm font-medium hover:bg-black/90 transition"
                                >
                                    Create Your First Resume
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
