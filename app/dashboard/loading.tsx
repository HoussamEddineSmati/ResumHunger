export default function DashboardLoading() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-black">
            {/* Background Fluid Art - matching auth pages */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-white/5 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-white/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[40%] left-[40%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Main Container - Skeleton */}
            <div className="w-full max-w-[1200px] min-h-[800px] bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-3 relative z-10 animate-pulse">

                {/* Left Panel Placeholder */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-gray-100">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />

                    <div className="space-y-4">
                        <div className="h-10 w-[70%] bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 w-[50%] bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 w-[60%] bg-gray-200 rounded animate-pulse" />
                        <div className="h-20 w-[90%] bg-gray-200 rounded mt-4 animate-pulse" />
                    </div>

                    <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                </div>

                {/* Right Panel Placeholder */}
                <div className="lg:col-span-2 flex flex-col px-12 py-12 bg-white">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <div className="h-10 w-48 bg-gray-100 rounded mb-2 animate-pulse" />
                            <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-36 bg-gray-100 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Resume Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl p-6">
                                <div className="w-12 h-12 rounded-xl bg-gray-200 mb-4 animate-pulse" />
                                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
                                <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
