import Link from 'next/link';

/* ── Stat Card ── */
function StatCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
    return (
        <div className="group flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <div>
                <p className="text-white font-semibold text-sm leading-none">{value}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
            </div>
        </div>
    );
}

/* ── Company Logo ── */
function CompanyLogo({ name }: { name: string }) {
    return (
        <span className="text-white/25 text-sm font-medium tracking-[0.2em] uppercase whitespace-nowrap select-none hover:text-white/40 transition-colors duration-300">
            {name}
        </span>
    );
}

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">

            {/* ── Background ── */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Gradient orbs */}
                <div className="absolute top-[-15%] left-[-5%] w-[55%] h-[55%] bg-violet-600/20 rounded-full blur-[140px] animate-glow-pulse" />
                <div className="absolute bottom-[-15%] right-[-5%] w-[55%] h-[55%] bg-blue-600/20 rounded-full blur-[140px] animate-glow-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[35%] left-[30%] w-[40%] h-[40%] bg-fuchsia-600/10 rounded-full blur-[140px] animate-glow-pulse" style={{ animationDelay: '4s' }} />

                {/* Dot grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80" />
            </div>

            {/* ── Navbar ── */}
            <nav className="relative z-30 flex items-center justify-between px-6 md:px-10 py-5 max-w-[1400px] mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                    </div>
                    <span className="text-white/90 font-semibold text-sm tracking-tight hidden sm:inline">ResumHunger</span>
                </Link>

                {/* Center nav links */}
                <div className="hidden md:flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.06] rounded-full px-1.5 py-1 backdrop-blur-xl">
                    {['Home', 'Templates', 'Builder', 'Features', 'Pricing', 'FAQ'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'Home' ? '/' : item === 'Builder' ? '/dashboard' : item === 'Pricing' ? '/pricing' : `/#${item.toLowerCase()}`}
                            className="px-3.5 py-1.5 text-[13px] text-white/50 hover:text-white rounded-full hover:bg-white/[0.06] transition-all duration-200"
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        href="/dashboard"
                        className="ml-1 px-4 py-1.5 text-[13px] text-white bg-white/[0.08] border border-white/[0.1] rounded-full hover:bg-white/[0.14] transition-all duration-200 flex items-center gap-1.5"
                    >
                        Get Started
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </Link>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white transition-colors duration-200"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] text-white/90 bg-white/[0.06] border border-white/[0.08] rounded-full hover:bg-white/[0.1] transition-all duration-200"
                    >
                        Create Account
                    </Link>
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className="relative z-10 flex flex-col items-center justify-center px-6 md:px-10 pt-16 md:pt-24 pb-20">

                {/* Badge */}
                <div className="animate-fade-in-up mb-8 flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span className="text-[13px] text-white/60">AI-Powered Resume Builder</span>
                </div>

                {/* Main Heading */}
                <h1 className="animate-fade-in-up animation-delay-200 text-center max-w-4xl">
                    <span className="block text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                        Craft Resumes That
                    </span>
                    <span
                        className="block text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mt-1 md:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 animate-gradient-shift"
                    >
                        Land Interviews
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="animate-fade-in-up animation-delay-400 mt-6 md:mt-8 text-base md:text-lg text-white/40 text-center max-w-xl leading-relaxed">
                    Build professional, ATS-optimized resumes in minutes.
                    Intelligent design meets career expertise.
                </p>

                {/* CTA Buttons */}
                <div className="animate-fade-in-up animation-delay-600 mt-10 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                        href="/dashboard"
                        className="group relative flex items-center gap-2 px-7 py-3.5 bg-white text-[#0a0a0a] rounded-full text-sm font-semibold hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300"
                    >
                        Start Building
                        <svg className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </Link>
                    <Link
                        href="#features"
                        className="flex items-center gap-2 px-7 py-3.5 bg-white/[0.05] border border-white/[0.08] rounded-full text-sm text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" />
                        </svg>
                        See How It Works
                    </Link>
                </div>

                {/* Stats row */}
                <div className="animate-fade-in-up animation-delay-800 mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-3">
                    <StatCard
                        value="20+"
                        label="Templates"
                        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>}
                    />
                    <StatCard
                        value="98.5%"
                        label="ATS Score"
                        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>}
                    />
                    <StatCard
                        value="12,450+"
                        label="Resumes Created"
                        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>}
                    />
                    <StatCard
                        value="8,200+"
                        label="Downloads"
                        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>}
                    />
                </div>
            </section>

            {/* ── Trusted By ── */}
            <section className="relative z-10 border-t border-white/[0.05] py-8 overflow-hidden">
                <p className="text-center text-[11px] text-white/20 uppercase tracking-[0.25em] mb-6">
                    Trusted by professionals at
                </p>
                <div className="relative max-w-[1000px] mx-auto">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

                    {/* Scrolling logos */}
                    <div className="flex animate-marquee">
                        {[
                            'Google', 'Microsoft', 'Amazon', 'Netflix', 'Spotify', 'Stripe', 'Vercel',
                            'Google', 'Microsoft', 'Amazon', 'Netflix', 'Spotify', 'Stripe', 'Vercel',
                        ].map((name, i) => (
                            <div key={`${name}-${i}`} className="flex items-center justify-center px-10">
                                <CompanyLogo name={name} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Bottom floating indicator ── */}
            <div className="relative z-10 flex justify-center pb-10">
                <div className="flex items-center gap-2 text-white/20 text-xs animate-float">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                    Scroll to explore
                </div>
            </div>
        </div>
    );
}
