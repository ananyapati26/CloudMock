import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Cloud,
    Zap,
    Shield,
    Code,
    Globe,
    TestTube,
    ArrowRight,
    CheckCircle
} from "lucide-react";
import Link from 'next/link';

export default function Landing() {
    const features = [
        {
            icon: Cloud,
            title: "Cloud-Based Mocking",
            description: "Deploy and manage your API mocks in the cloud with instant global availability."
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Get your mock APIs up and running in seconds with our intuitive interface."
        },
        {
            icon: Shield,
            title: "Secure & Reliable",
            description: "Enterprise-grade security with 99.9% uptime guaranteed."
        },
        {
            icon: Code,
            title: "Developer Friendly",
            description: "RESTful APIs, OpenAPI support, and comprehensive documentation."
        },
        {
            icon: Globe,
            title: "Public URLs",
            description: "Get shareable public URLs for your mock endpoints instantly."
        },
        {
            icon: TestTube,
            title: "Built-in Testing",
            description: "Test your APIs directly in the platform with our integrated testing suite."
        }
    ];

    const useCases = [
        "Frontend Development",
        "API Testing",
        "Prototype Development",
        "Team Collaboration",
        "CI/CD Integration",
        "Load Testing"
    ];

    return (
        <div className=" text-white bg-slate-950 font-sans">
            {/* Hero Section */}
            <section className="bg-gradient-hero container mx-auto px-4 pt-20 pb-20">
                <div className="text-center max-w-4xl mx-auto animate-fade-in">
                    <Badge className="mb-6 bg-blue-500/10 text-blue-300 border border-blue-500/30">
                        <Zap className="h-3 w-3 mr-1 text-blue-400" />
                        Now in Beta
                    </Badge>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text text-transparent leading-tight text-center">
                        Mock APIs with
                        <br />
                        <span className="glow-text inline-block">CloudMocker</span>
                    </h1>


                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Create, deploy, and test mock APIs in seconds. Perfect for frontend development,
                        testing, and rapid prototyping. No backend required.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors" asChild>
                            <Link href="/signup" className="flex items-center">
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" className="text-lg px-8 py-6 bg-transparent text-white hover:bg-white/10" asChild>
                            <Link href="/login">
                                Sign In
                            </Link>
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
                        <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            No credit card required
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            Free forever plan
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            Setup in 30 seconds
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Everything you need to mock APIs
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Powerful features that make API mocking simple and efficient for developers and teams.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-gradient-card border border-blue-500/50">
                            <CardContent className="p-6">
                                <div className="rounded-lg bg-blue-500/10 p-3 w-fit mb-4">
                                    <feature.icon className="h-6 w-6 text-blue-400" />
                                </div>
                                <div className="text-xl font-semibold text-white mb-2">{feature.title}</div>
                             
                                <p className="text-slate-400">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Perfect for any use case
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Whether you're building a prototype or testing in production, CloudMocker has you covered.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {useCases.map((useCase, index) => (
                        <div
                            key={index}
                            className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center hover:bg-slate-800 transition-colors duration-200"
                        >
                            <span className="font-medium">{useCase}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <Card className="bg-gradient-card border-slate-700/50 shadow-elegant">
                    <CardContent className="p-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to start mocking?
                        </h2>
                        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                            Join thousands of developers who trust CloudMocker for their API mocking needs.
                        </p>
                        <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors" asChild>
                            <Link href="/dashboard" className="flex items-center">
                                Create Your First Mock
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}