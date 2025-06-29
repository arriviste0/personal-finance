'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { UserPlus, Mail, KeyRound, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AuthBackground from '@/components/layout/AuthBackground'; // Import the new component

export default function GetStartedPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const router = useRouter();

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

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                 setError(data.message || `Signup failed with status: ${response.status}`);
                 toast({
                     title: "Signup Failed",
                     description: data.message || "Could not create account. Please try again later.",
                     variant: "destructive",
                 });
            } else {
                 toast({
                     title: "Account Created!",
                     description: "Welcome to FinTrack Pro! Redirecting to login...",
                 });
                 router.push('/login');
            }
        } catch (err) {
             console.error('Signup exception:', err);
             const errorMessage = err instanceof Error ? err.message : 'An unexpected network error occurred.';
             setError(`An error occurred: ${errorMessage}`);
             toast({
                 title: "Signup Error",
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
                        <div className="space-y-1.5">
                             <Label htmlFor="name">Full Name</Label>
                             <div className="relative flex items-center">
                                <User className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="retro-input pl-9"
                                    disabled={isLoading}
                                    aria-invalid={!!error}
                                    aria-describedby={error ? "signup-error" : undefined}
                                />
                             </div>
                        </div>
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
                                    aria-describedby={error ? "signup-error" : undefined}
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
                                    placeholder="Create a password (min. 6 chars)"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="retro-input pl-9"
                                    disabled={isLoading}
                                    aria-invalid={!!error}
                                    aria-describedby={error ? "signup-error" : undefined}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative flex items-center">
                                <KeyRound className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="retro-input pl-9"
                                    disabled={isLoading}
                                    aria-invalid={!!error}
                                    aria-describedby={error ? "signup-error" : undefined}
                                />
                            </div>
                        </div>
                        {error && <p id="signup-error" className="text-sm text-destructive text-center pt-2">{error}</p>}
                    </CardContent>
                    <CardFooter className="retro-card-content !border-t-2 !pt-4 !pb-4 flex flex-col gap-4">
                        <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
