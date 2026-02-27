import { ResumeData } from '@/lib/definitions';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';

export default function ResumePreview({ data, templateId = 'classic' }: { data: ResumeData; templateId?: string }) {
    switch (templateId) {
        case 'modern':
            return <ModernTemplate data={data} />;
        case 'professional':
            return <ProfessionalTemplate data={data} />;
        case 'classic':
        default:
            return <ClassicTemplate data={data} />;
    }
}
