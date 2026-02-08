import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import { authenticate } from '@/lib/actions';

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Enter your email and password to access your account"
            isLogin={true}
        >
            <LoginForm action={authenticate} />
        </AuthLayout>
    );
}
