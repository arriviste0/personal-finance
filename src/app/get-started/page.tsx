'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { UserPlus, Mail, KeyRound, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GetStartedPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            toast({
                title: "Signup Failed",
                description: "Passwords do not match.",
                variant: "destructive",
            });
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
             toast({
                 title: "Signup Failed",
                 description: "Password must be at least 6 characters long.",
                 variant: "destructive",
             });
            return;
        }

        setIsLoading(true);

        // --- Placeholder Signup Logic ---
        // In a real app, you'd call your registration API here.
        console.log('Signup attempt with:', { name, email, password });
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

        // Example success/error handling (replace with actual API response check)
        const success = Math.random() > 0.2; // Simulate success/failure

        if (success) {
             toast({
                 title: "Account Created!",
                 description: "Welcome to FinTrack Pro! Redirecting to login...",
             });
             // Redirect to login or dashboard
             // router.push('/login');
              alert('Signup successful! Redirecting to login... (placeholder)');
             window.location.href = '/login'; // Simple redirect for demo
        } else {
             setError("Failed to create account. Please try again.");
             toast({
                 title: "Signup Failed",
                 description: "Could not create account. Please try again later.",
                 variant: "destructive",
             });
        }
        // --- End Placeholder ---

        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
            <Card className="retro-card w-full max-w-md">
                <CardHeader className="retro-card-header !bg-accent !text-accent-foreground">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <UserPlus className="h-6 w-6" />
                        Get Started with FinTrack Pro
                    </CardTitle>
                    <CardDescription className="!text-accent-foreground/80">
                        Create your account to start managing your finances.
                    </CardDescription>
                     <div className="retro-window-controls">
                        <span className="!bg-accent !border-accent-foreground"></span>
                        <span className="!bg-accent !border-accent-foreground"></span>
                        <span className="!bg-accent !border-accent-foreground"></span>
                     </div>
                </CardHeader>
                <form onSubmit={handleSignUp}>
                    <CardContent className="retro-card-content !border-t-0 space-y-5 pt-6">
                        <div className="space-y-1.5 relative">
                             <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="retro-input pl-9"
                                disabled={isLoading}
                            />
                        </div>
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
                                placeholder="Create a password (min. 6 chars)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="retro-input pl-9"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-1.5 relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="retro-input pl-9"
                                disabled={isLoading}
                            />
                        </div>
                        {error && <p className="text-sm text-destructive text-center">{error}</p>}
                    </CardContent>
                    <CardFooter className="retro-card-content !border-t-2 !pt-4 !pb-4 flex flex-col gap-4">
                        <Button type="submit" variant="accent" className="w-full retro-button" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Login
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
