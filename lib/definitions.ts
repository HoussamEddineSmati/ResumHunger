export type ResumeData = {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
        summary: string;
    };
    experience: {
        id: string;
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        description: string;
    }[];
    education: {
        id: string;
        school: string;
        degree: string;
        startDate: string;
        endDate: string;
    }[];
    skills: string[];
};

export type Resume = {
    id: string;
    title: string;
    updatedAt: Date;
    data: ResumeData;
};
