'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { LogIn, Mail, KeyRound, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AuthBackground from '@/components/layout/AuthBackground'; // Import the new component

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                 setError(result.error === 'CredentialsSignin' ? 'Invalid email or password.' : result.error);
                 toast({
                     title: "Login Failed",
                     description: result.error === 'CredentialsSignin' ? 'Invalid email or password.' : 'An error occurred during login.',
                     variant: "destructive",
                 });
            } else if (result?.ok) {
                toast({
                    title: "Login Successful!",
                    description: "Welcome back! Redirecting to dashboard...",
                });
                 router.push('/dashboard');
            } else {
                 setError('An unexpected error occurred. Please try again.');
                 toast({
                     title: "Login Error",
                     description: "An unexpected error occurred. Please try again.",
                     variant: "destructive",
                 });
             }

        } catch (err) {
             console.error('Login exception:', err);
             setError('An unexpected error occurred. Please try again.');
             toast({
                title: "Login Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
             });
        } finally {
             setIsLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 overflow-hidden">
            <AuthBackground />
            <Card className="retro-card w-full max-w-md z-10">
                <CardHeader className="retro-card-header !bg-primary !text-primary-foreground">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <LogIn className="h-6 w-6" />
                        Login to FinTrack Pro
                    </CardTitle>
                    <CardDescription className="!text-primary-foreground/80">
                        Enter your credentials to access your dashboard.
                    </CardDescription>
                    <div className="retro-window-controls">
                        <span className="!bg-primary !border-primary-foreground"></span>
                        <span className="!bg-primary !border-primary-foreground"></span>
                        <span className="!bg-primary !border-primary-foreground"></span>
                    </div>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="retro-card-content !border-t-0 space-y-5 pt-6">
                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="retro-input pl-9"
                                    disabled={isLoading}
                                    aria-invalid={!!error}
                                    aria-describedby={error ? "login-error" : undefined}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                             <div className="relative flex items-center">
                                <KeyRound className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="retro-input pl-9"
                                    disabled={isLoading}
                                    aria-invalid={!!error}
                                    aria-describedby={error ? "login-error" : undefined}
                                />
                             </div>
                        </div>
                         {error && (
                             <p id="login-error" className="text-sm text-destructive text-center pt-2">{error}</p>
                         )}
                         <div className="text-right text-sm">
                            <Link href="/forgot-password" className="text-primary hover:underline underline-offset-2">
                                Forgot Password?
                            </Link>
                         </div>
                    </CardContent>
                    <CardFooter className="retro-card-content !border-t-2 !pt-4 !pb-4 flex flex-col gap-4">
                        <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Logging In...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                        <p className="text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link href="/get-started" className="text-primary hover:underline font-medium">
                                Sign Up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
