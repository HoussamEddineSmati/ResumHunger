export default function GlobalLoading() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-violet-600/10 rounded-full blur-[100px] animate-pulse" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Logo spinner */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl border-t-2 border-r-2 border-white/20 animate-spin" />
                    <div className="absolute inset-2 rounded-xl border-b-2 border-l-2 border-white/40 animate-spin flex-reverse" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center animate-pulse">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="text-white/90 font-medium text-sm tracking-widest uppercase mb-2">Loading</h3>
                    <div className="flex items-center justify-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
