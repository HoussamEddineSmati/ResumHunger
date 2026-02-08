import Link from 'next/link';

function PlayIcon() {
    return (
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5 hover:bg-white/10 transition cursor-pointer">
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path d="M15 8.134a1 1 0 010 1.732l-13 7.5A1 1 0 010 16.5v-15A1 1 0 012 .634l13 7.5z" fill="white" />
            </svg>
        </div>
    );
}

function FloatingNode({ label, value, x, y, icon }: { label: string; value: string; x: string; y: string; icon: React.ReactNode }) {
    return (
        <div className="absolute flex items-center gap-2 text-sm" style={{ left: x, top: y }}>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                {icon}
            </div>
            <div>
                <p className="text-white/90 font-medium">{label}</p>
                <p className="text-white/50 text-xs">{value}</p>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* Navbar */}
            <nav className="relative z-20 flex items-center justify-between px-8 py-5 max-w-[1400px] mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                    </div>
                </Link>

                {/* Center nav links */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-sm">
                    {['Home', 'Templates', 'Builder', 'Features', 'Pricing', 'FAQ'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'Home' ? '/' : item === 'Builder' ? '/dashboard' : `/#${item.toLowerCase()}`}
                            className="px-4 py-1.5 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/10 transition"
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        href="/dashboard"
                        className="px-4 py-1.5 text-sm text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition flex items-center gap-1"
                    >
                        Get Started
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </Link>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <Link href="/login" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Create Account
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-8">
                {/* Background glow - matching auth pages */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-fuchsia-600/30 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-[40%] left-[40%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                {/* Network lines (decorative SVG) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <line x1="12%" y1="35%" x2="45%" y2="25%" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
                        <line x1="45%" y1="25%" x2="85%" y2="35%" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
                        <line x1="12%" y1="35%" x2="10%" y2="65%" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
                        <line x1="85%" y1="35%" x2="88%" y2="65%" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
                        <line x1="10%" y1="65%" x2="50%" y2="85%" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
                        <line x1="88%" y1="65%" x2="50%" y2="85%" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
                        {/* Vertical bars decoration */}
                        <line x1="45%" y1="60%" x2="45%" y2="90%" stroke="white" strokeOpacity="0.08" strokeWidth="1.5" />
                        <line x1="47%" y1="65%" x2="47%" y2="85%" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                        <line x1="55%" y1="55%" x2="55%" y2="90%" stroke="white" strokeOpacity="0.08" strokeWidth="1.5" />
                        <line x1="57%" y1="70%" x2="57%" y2="88%" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                    </svg>
                </div>

                {/* Floating Nodes */}
                <div className="absolute inset-0 hidden lg:block pointer-events-none">
                    <FloatingNode
                        label="Templates"
                        value="20+"
                        x="10%"
                        y="30%"
                        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>}
                    />
                    <FloatingNode
                        label="ATS Score"
                        value="98.5%"
                        x="82%"
                        y="28%"
                        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>}
                    />
                    <FloatingNode
                        label="Resumes"
                        value="12,450"
                        x="7%"
                        y="60%"
                        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>}
                    />
                    <FloatingNode
                        label="Downloads"
                        value="8,200"
                        x="83%"
                        y="62%"
                        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>}
                    />
                </div>

                {/* Play button */}
                <div className="relative z-10 mb-8">
                    <PlayIcon />
                </div>

                {/* Badge */}
                <div className="relative z-10 mb-6 flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-sm text-white/80">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    AI-Powered Resume Builder
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </div>

                {/* Main Heading */}
                <h1 className="relative z-10 text-5xl md:text-7xl font-bold text-center max-w-4xl leading-tight tracking-tight">
                    One-click for Perfect{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
                        Resumes
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="relative z-10 mt-6 text-base md:text-lg text-white/50 text-center max-w-2xl leading-relaxed">
                    Build professional, ATS-friendly resumes where intelligent design
                    meets career expertise — land your dream job faster.
                </p>

                {/* CTA Buttons */}
                <div className="relative z-10 mt-10 flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-7 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-medium hover:bg-white/20 transition backdrop-blur-sm"
                    >
                        Start Building
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </Link>
                    <Link
                        href="#features"
                        className="flex items-center gap-2 px-7 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition"
                    >
                        Discover More
                    </Link>
                </div>

                {/* Bottom indicators */}
                <div className="absolute bottom-8 left-8 flex items-center gap-2 text-xs text-white/40">
                    <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                    01/03 . Scroll down
                </div>

                <div className="absolute bottom-8 right-8 text-right">
                    <p className="text-sm text-white/50 mb-2">Career horizons</p>
                    <div className="w-24 h-0.5 bg-white/10 rounded-full">
                        <div className="w-8 h-full bg-white/50 rounded-full" />
                    </div>
                </div>
            </section>

            {/* Logos Section */}
            <section className="relative z-10 border-t border-white/10 py-8 px-8">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 opacity-40">
                    {[
                        { name: 'Google', icon: 'G' },
                        { name: 'Microsoft', icon: 'M' },
                        { name: 'Amazon', icon: 'A' },
                        { name: 'Netflix', icon: 'N' },
                        { name: 'Spotify', icon: 'S' },
                        { name: 'Stripe', icon: 'St' },
                        { name: 'Vercel', icon: 'V' },
                    ].map((company) => (
                        <div key={company.name} className="flex items-center gap-2 text-white/80 text-sm font-medium tracking-wider">
                            <span className="text-lg font-bold">{company.icon}</span>
                            <span className="hidden sm:inline">{company.name}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
