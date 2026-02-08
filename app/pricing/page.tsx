import Link from 'next/link';

export default function PricingPage() {
    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-black">
            {/* Background Fluid Art - matching auth pages */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-fuchsia-600/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[40%] left-[40%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Navbar */}
            <nav className="relative z-20 flex items-center justify-between px-8 py-5 max-w-[1400px] mx-auto">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                    </div>
                </Link>
                <Link href="/login" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    Sign In
                </Link>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-sm text-white/80 mb-6">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        Transparent Pricing
                    </div>
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
                        Simple, <span className="italic">Fair</span> Pricing
                    </h1>
                    <p className="text-white/50 text-lg max-w-xl">
                        Choose the plan that fits your career goals. Upgrade or cancel anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                    {/* Free Plan */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 flex flex-col">
                        <h2 className="text-white/60 text-sm font-medium tracking-wide uppercase mb-2">Free</h2>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="font-serif text-5xl font-bold text-white">$0</span>
                            <span className="text-white/50">/forever</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-white/70 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                1 Resume
                            </li>
                            <li className="flex items-center gap-3 text-white/70 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Standard Templates
                            </li>
                            <li className="flex items-center gap-3 text-white/70 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                TXT Export (ATS Safe)
                            </li>
                            <li className="flex items-center gap-3 text-white/40 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                Watermarked PDF
                            </li>
                        </ul>
                        <Link
                            href="/login"
                            className="w-full py-3 rounded-full border border-white/20 text-white text-sm font-medium text-center hover:bg-white/10 transition"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative bg-gradient-to-br from-fuchsia-600/20 via-purple-600/20 to-blue-600/20 border border-white/20 backdrop-blur-sm rounded-3xl p-8 flex flex-col">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full text-xs font-medium text-white">
                            Most Popular
                        </div>
                        <h2 className="text-white/60 text-sm font-medium tracking-wide uppercase mb-2">Pro Monthly</h2>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="font-serif text-5xl font-bold text-white">$19</span>
                            <span className="text-white/50">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-white/70 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Unlimited Resumes
                            </li>
                            <li className="flex items-center gap-3 text-white/70 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Premium Templates
                            </li>
                            <li className="flex items-center gap-3 text-white/70 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                AI Content Suggestions
                            </li>
                            <li className="flex items-center gap-3 text-white/70 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Unbranded PDF Export
                            </li>
                            <li className="flex items-center gap-3 text-white/70 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Cover Letter Builder
                            </li>
                        </ul>
                        <Link
                            href="/login"
                            className="w-full py-3 rounded-full bg-white text-black text-sm font-medium text-center hover:bg-white/90 transition"
                        >
                            Go Pro
                        </Link>
                    </div>

                    {/* Lifetime Plan */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 flex flex-col">
                        <h2 className="text-white/60 text-sm font-medium tracking-wide uppercase mb-2">Lifetime</h2>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="font-serif text-5xl font-bold text-white">$99</span>
                            <span className="text-white/50">/once</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-white/70 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                One-time Payment
                            </li>
                            <li className="flex items-center gap-3 text-white/70 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                All Pro Features Forever
                            </li>
                            <li className="flex items-center gap-3 text-white/70 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Future Updates Included
                            </li>
                            <li className="flex items-center gap-3 text-white/70 text-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                Priority Support
                            </li>
                        </ul>
                        <Link
                            href="/login"
                            className="w-full py-3 rounded-full border border-white/20 text-white text-sm font-medium text-center hover:bg-white/10 transition"
                        >
                            Get Lifetime
                        </Link>
                    </div>
                </div>

                {/* Footer note */}
                <p className="text-white/40 text-sm mt-12 text-center">
                    All plans include a 7-day money-back guarantee. No questions asked.
                </p>
            </div>
        </div>
    );
}
