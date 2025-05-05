'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { LogIn, Mail, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // --- Placeholder Login Logic ---
        // In a real app, you'd call your authentication API here.
        console.log('Login attempt with:', { email, password });
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

        // Example success/error handling
        if (email === 'test@example.com' && password === 'password') {
            toast({
                title: "Login Successful!",
                description: "Welcome back!",
            });
            // Redirect to dashboard (using Next.js router or window.location)
            // router.push('/dashboard');
            alert('Login successful! Redirecting... (placeholder)');
             window.location.href = '/dashboard'; // Simple redirect for demo
        } else {
            toast({
                title: "Login Failed",
                description: "Invalid email or password.",
                variant: "destructive",
            });
        }
        // --- End Placeholder ---

        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
            <Card className="retro-card w-full max-w-md">
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
                        <div className="space-y-1.5 relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="retro-input pl-9"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-1.5 relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="retro-input pl-9"
                                disabled={isLoading}
                            />
                        </div>
                         <div className="text-right text-sm">
                            <Link href="/forgot-password" className="text-primary hover:underline underline-offset-2">
                                Forgot Password?
                            </Link>
                         </div>
                    </CardContent>
                    <CardFooter className="retro-card-content !border-t-2 !pt-4 !pb-4 flex flex-col gap-4">
                        <Button type="submit" variant="primary" className="w-full retro-button" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
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
