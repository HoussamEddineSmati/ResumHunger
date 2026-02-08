import Link from 'next/link';
import Image from 'next/image';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    isLogin?: boolean;
}

export default function AuthLayout({ children, title, subtitle, isLogin = true }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-black">

            {/* Background Fluid Art - CSS approximation */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-fuchsia-600/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/30 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-[40%] left-[40%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[100px] animate-pulse delay-2000" />
            </div>

            {/* Main Container */}
            <div className="w-full max-w-[1200px] h-[800px] bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 relative z-10 transition-all duration-300">

                {/* Left Panel - Artistic */}
                <div className="relative hidden lg:flex flex-col justify-between p-12 bg-[#0a0a0a] overflow-hidden">
                    {/* Fluid Mesh Gradient Background for Left Panel */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-800 opacity-90" />
                        {/* Swirls overlay - using CSS radial gradients for complex effect */}
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

                        {/* Abstract Waves (SVG) */}
                        <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                            <filter id="noiseFilter">
                                <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
                            </filter>

                            <path d="M0,200 Q150,300 300,200 T600,200" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                            <path d="M0,400 Q150,500 300,400 T600,400" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
                            <path d="M0,600 Q150,700 300,600 T600,600" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.1" />

                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase">A Wise Quote</div>
                        <div className="w-24 h-[1px] bg-white/30 mt-4"></div>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <h1 className="font-serif text-6xl leading-tight text-white drop-shadow-lg">
                            Get<br />
                            <span className="italic">Everything</span><br />
                            You Want
                        </h1>
                        <p className="text-white/70 text-lg font-light max-w-sm">
                            You can get everything you want if you work hard, trust the process, and stick to the plan.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/10">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="flex flex-col justify-center px-12 py-12 md:px-24 bg-white text-[#0a0a0a]">
                    <div className="w-full max-w-[440px] mx-auto space-y-10">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-full bg-[#0a0a0a] flex items-center justify-center text-white">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                            </div>
                            <span className="font-medium text-xl tracking-tight">ResumHunger</span>
                        </Link>

                        <div className="space-y-3">
                            <h2 className="font-serif text-4xl text-[#0a0a0a]">{title}</h2>
                            <p className="text-[#666] text-sm">{subtitle}</p>
                        </div>

                        {children}

                        <div className="text-center text-sm text-[#666]">
                            {isLogin ? (
                                <>
                                    Don't have an account?{' '}
                                    <Link href="/register" className="text-black font-semibold hover:underline">
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <Link href="/login" className="text-black font-semibold hover:underline">
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
