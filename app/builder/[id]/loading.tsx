export default function BuilderLoading() {
    return (
        <div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl border-t-2 border-r-2 border-white/20 animate-spin" />
                    <div className="absolute inset-2 rounded-xl border-b-2 border-l-2 border-white/40 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="text-white/80 font-medium text-sm tracking-widest uppercase mb-2">Preparing Workspace</h3>
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
