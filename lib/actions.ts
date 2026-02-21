'use server';

import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function register(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password || !name) {
            return 'Please fill in all fields.';
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return 'User already exists.';
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function authenticateGoogle() {
    await signIn('google');
}

export async function saveResume(id: string, content: string) {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    await prisma.resume.update({
        where: { id },
        data: { content }
    });
}

export async function deleteResume(id: string) {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    const resume = await prisma.resume.findUnique({
        where: { id },
        include: { user: true }
    });

    if (!resume || resume.user.email !== session.user.email) {
        throw new Error("Unauthorized");
    }

    await prisma.resume.delete({
        where: { id }
    });

    revalidatePath('/dashboard');
}
