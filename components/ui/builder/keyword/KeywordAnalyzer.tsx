'use client';

import { useState, useMemo } from 'react';
import { ResumeData } from '@/lib/definitions';
import { Search, CheckCircle2, XCircle, AlertTriangle, TrendingUp, Zap } from 'lucide-react';

// Common ATS action verbs
const ACTION_VERBS = [
    'achieved', 'administered', 'analyzed', 'built', 'collaborated', 'created', 'decreased',
    'delivered', 'designed', 'developed', 'directed', 'enhanced', 'established', 'executed',
    'generated', 'implemented', 'improved', 'increased', 'led', 'managed', 'mentored',
    'optimized', 'orchestrated', 'pioneered', 'reduced', 'resolved', 'spearheaded',
    'streamlined', 'supervised', 'transformed', 'upgraded',
];

function extractKeywordsFromJD(jd: string): string[] {
    const cleaned = jd.toLowerCase()
        .replace(/[^\w\s+#./-]/g, ' ')
        .replace(/\s+/g, ' ');

    // Extract multi-word phrases first (2-3 words)
    const phrases: string[] = [];
    const words = cleaned.split(' ').filter(w => w.length > 2);

    for (let i = 0; i < words.length - 1; i++) {
        const twoWord = `${words[i]} ${words[i + 1]}`;
        const threeWord = i < words.length - 2 ? `${words[i]} ${words[i + 1]} ${words[i + 2]}` : '';
        if (twoWord.length > 5) phrases.push(twoWord);
        if (threeWord.length > 8) phrases.push(threeWord);
    }

    // Important single words (skills, technologies, tools)
    const singleKeywords = words.filter(w =>
        w.length > 3 &&
        !['with', 'this', 'that', 'from', 'have', 'will', 'been', 'were', 'they', 'their',
            'about', 'which', 'would', 'there', 'these', 'your', 'more', 'some', 'than',
            'other', 'into', 'also', 'just', 'over', 'such', 'make', 'like', 'well',
            'back', 'only', 'come', 'could', 'after', 'first', 'need', 'work', 'must',
            'should', 'under', 'able', 'based', 'using', 'role', 'team', 'join',
            'company', 'position', 'required', 'preferred', 'including', 'looking',
            'responsibilities', 'qualifications', 'requirements', 'experience', 'years',
        ].includes(w)
    );

    // Combine and deduplicate
    const allKeywords = Array.from(new Set([...singleKeywords, ...phrases]));

    // Score keywords by frequency and importance
    const keywordScores = allKeywords.map(kw => ({
        keyword: kw,
        count: (cleaned.match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length,
    }));

    return keywordScores
        .filter(k => k.count >= 1)
        .sort((a, b) => b.count - a.count)
        .slice(0, 40)
        .map(k => k.keyword);
}

function getResumeText(data: ResumeData): string {
    const parts: string[] = [];
    const pi = data.personalInfo;
    parts.push(pi.fullName, pi.summary, pi.email);
    data.experience.forEach(e => parts.push(e.position, e.company, e.description));
    data.education.forEach(e => parts.push(e.degree, e.school, e.field || ''));
    parts.push(...data.skills);
    data.projects.forEach(p => parts.push(p.name, p.description, p.technologies));
    data.certifications.forEach(c => parts.push(c.name, c.issuer));
    data.languages.forEach(l => parts.push(l.name));
    return parts.join(' ').toLowerCase();
}

function analyzeContentQuality(data: ResumeData) {
    const issues: { type: 'error' | 'warning' | 'tip'; message: string }[] = [];

    // Summary check
    if (!data.personalInfo.summary || data.personalInfo.summary.length < 50) {
        issues.push({ type: 'error', message: 'Professional summary is too short (min 50 chars). ATS often weights this heavily.' });
    } else if (data.personalInfo.summary.length > 500) {
        issues.push({ type: 'warning', message: 'Professional summary is too long (max 500 chars). Keep it concise.' });
    }

    // Experience descriptions
    data.experience.forEach((exp, i) => {
        if (!exp.description || exp.description.length < 30) {
            issues.push({ type: 'error', message: `Experience #${i + 1} (${exp.company || 'unnamed'}) description is too short.` });
        }

        // Check for action verbs
        const descLower = exp.description?.toLowerCase() || '';
        const hasActionVerb = ACTION_VERBS.some(v => descLower.includes(v));
        if (!hasActionVerb && exp.description) {
            issues.push({ type: 'warning', message: `Experience #${i + 1}: Use action verbs (e.g., "Developed", "Led", "Improved").` });
        }

        // Check for quantified results
        const hasNumbers = /\d+%|\d+x|\$[\d,]+|\d+ (users|clients|projects|teams|members)/i.test(exp.description || '');
        if (!hasNumbers && exp.description) {
            issues.push({ type: 'tip', message: `Experience #${i + 1}: Add quantified results (e.g., "Increased sales by 25%").` });
        }
    });

    // Date format check
    const allDates = [
        ...data.experience.flatMap(e => [e.startDate, e.endDate]),
        ...data.education.flatMap(e => [e.startDate, e.endDate]),
    ].filter(Boolean);

    const inconsistentDates = allDates.some(d => d && !/^\d{4}-\d{2}$/.test(d) && d !== 'Present');
    if (inconsistentDates) {
        issues.push({ type: 'warning', message: 'Use consistent date formats (YYYY-MM) for better ATS parsing.' });
    }

    // Missing sections
    if (data.skills.length === 0) {
        issues.push({ type: 'error', message: 'Skills section is empty. This is critical for ATS keyword matching.' });
    }
    if (data.experience.length === 0) {
        issues.push({ type: 'error', message: 'No work experience added.' });
    }
    if (!data.personalInfo.email) {
        issues.push({ type: 'error', message: 'Email is missing. Recruiters need contact info.' });
    }
    if (!data.personalInfo.phone) {
        issues.push({ type: 'warning', message: 'Phone number is missing.' });
    }
    if (!data.personalInfo.linkedIn) {
        issues.push({ type: 'tip', message: 'Add LinkedIn URL — most ATS systems scan for it.' });
    }

    return issues;
}

export default function KeywordAnalyzer({ resumeData }: { resumeData: ResumeData }) {
    const [jobDescription, setJobDescription] = useState('');
    const resumeText = useMemo(() => getResumeText(resumeData), [resumeData]);

    const extracted = useMemo(() => {
        if (!jobDescription.trim()) return [];
        return extractKeywordsFromJD(jobDescription);
    }, [jobDescription]);

    const matched = useMemo(() => {
        return extracted.filter(kw => resumeText.includes(kw));
    }, [extracted, resumeText]);

    const missing = useMemo(() => {
        return extracted.filter(kw => !resumeText.includes(kw));
    }, [extracted, resumeText]);

    const score = extracted.length > 0 ? Math.round((matched.length / extracted.length) * 100) : 0;
    const contentIssues = useMemo(() => analyzeContentQuality(resumeData), [resumeData]);

    const scoreColor = score >= 70 ? 'text-green-400' : score >= 40 ? 'text-yellow-400' : 'text-red-400';
    const scoreBg = score >= 70 ? 'bg-green-400' : score >= 40 ? 'bg-yellow-400' : 'bg-red-400';

    return (
        <div className="flex flex-col h-full relative z-10">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-2 mb-1">
                    <Search className="w-5 h-5 text-green-400" />
                    <h2 className="text-lg font-bold">ATS Keyword Analyzer</h2>
                </div>
                <p className="text-xs text-gray-400">Paste a job description to check keyword match</p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
                {/* JD Input */}
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here to analyze keyword match with your resume..."
                    className="w-full h-32 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 transition resize-none text-sm"
                />

                {/* Score Dashboard */}
                {extracted.length > 0 && (
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <TrendingUp className={`w-6 h-6 ${scoreColor}`} />
                                <div>
                                    <div className={`text-3xl font-bold ${scoreColor}`}>{score}%</div>
                                    <div className="text-xs text-gray-400">Keyword Match Score</div>
                                </div>
                            </div>
                            <div className="text-right text-xs text-gray-400">
                                <div>{matched.length} matched</div>
                                <div>{missing.length} missing</div>
                            </div>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full ${scoreBg} rounded-full transition-all duration-500`} style={{ width: `${score}%` }} />
                        </div>
                    </div>
                )}

                {/* Matched Keywords */}
                {matched.length > 0 && (
                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            <h3 className="text-sm font-bold text-green-400">Matched Keywords ({matched.length})</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {matched.map((kw, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-green-500/20 text-green-300 border border-green-500/30">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Missing Keywords */}
                {missing.length > 0 && (
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                        <div className="flex items-center gap-2 mb-3">
                            <XCircle className="w-4 h-4 text-red-400" />
                            <h3 className="text-sm font-bold text-red-400">Missing Keywords ({missing.length})</h3>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">Consider adding these to your resume:</p>
                        <div className="flex flex-wrap gap-1.5">
                            {missing.map((kw, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content Quality */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <h3 className="text-sm font-bold">Content Quality Check</h3>
                    </div>
                    {contentIssues.length === 0 ? (
                        <p className="text-xs text-green-400 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> All checks passed!
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {contentIssues.map((issue, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs">
                                    {issue.type === 'error' && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />}
                                    {issue.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />}
                                    {issue.type === 'tip' && <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />}
                                    <span className={
                                        issue.type === 'error' ? 'text-red-300' :
                                            issue.type === 'warning' ? 'text-yellow-300' : 'text-blue-300'
                                    }>
                                        {issue.message}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
