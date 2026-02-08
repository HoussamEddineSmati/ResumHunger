import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
    it('renders the hero heading', () => {
        render(<Home />);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
            'One-click for Perfect Resumes'
        );
    });

    it('renders the CTA link pointing to dashboard', () => {
        render(<Home />);
        const cta = screen.getByRole('link', { name: /start building/i });
        expect(cta).toHaveAttribute('href', '/dashboard');
    });

    it('renders the badge text', () => {
        render(<Home />);
        expect(screen.getByText(/AI-Powered Resume Builder/i)).toBeInTheDocument();
    });

    it('renders the logo section with company names', () => {
        render(<Home />);
        expect(screen.getByText('Google')).toBeInTheDocument();
        expect(screen.getByText('Microsoft')).toBeInTheDocument();
        expect(screen.getByText('Vercel')).toBeInTheDocument();
    });
});
