import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="text-xl f ont-bold">
            PR Review
          </Link>

          <nav className="hidden gap-6 md:flex">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>

          <Button>Get Started</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto py-32 text-center">
        <Badge>AI Powered</Badge>

        <h1 className="mt-6 text-6xl font-bold">AI Pull Request Reviews</h1>

        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          Improve code quality with fast AI-powered pull request reviews.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button>
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button variant="outline">Learn More</Button>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="container mx-auto py-16 text-center">
        <p className="mb-8 text-muted-foreground">Trusted by developers</p>

        <div className="flex flex-wrap justify-center gap-10 text-2xl font-bold text-muted-foreground">
          <span>GitHub</span>
          <span>Vercel</span>
          <span>Docker</span>
          <span>AWS</span>
          <span>OpenAI</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto py-24">
        <h2 className="mb-12 text-center text-4xl font-bold">Features</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {["AI Reviews", "GitHub Sync", "Fast Feedback"].map((title) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent>
                Improve your development workflow with AI assistance.
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto py-24">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Loved by Developers
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <CardContent className="pt-6">
                "This tool saved our team hours every week."
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto py-24">
        <h2 className="mb-12 text-center text-4xl font-bold">Pricing</h2>

        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Pro Plan</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-6 text-5xl font-bold">$19/mo</p>

            <Button className="w-full">Start Free Trial</Button>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto py-24">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible>
          <AccordionItem value="1">
            <AccordionTrigger>Is there a free plan?</AccordionTrigger>

            <AccordionContent>Yes, you can start for free.</AccordionContent>
          </AccordionItem>

          <AccordionItem value="2">
            <AccordionTrigger>Does it support GitHub?</AccordionTrigger>

            <AccordionContent>
              Yes, GitHub integration is built in.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-muted-foreground">
        © 2026 PR Review. All rights reserved.
      </footer>
    </>
  );
}
  