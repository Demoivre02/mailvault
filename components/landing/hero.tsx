"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Shield, Sparkles, FileText } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#9CD5FF]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#7AAACE]/20 blur-3xl" />
      </div>
      
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2 text-sm font-medium text-[#7AAACE]">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Document Management</span>
            </div>
            
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#355872] sm:text-5xl lg:text-6xl">
              <span className="text-balance">Digitize Your</span>
              <br />
              <span className="text-[#7AAACE]">Physical Mail</span>
            </h1>
            
            <p className="max-w-lg text-lg leading-relaxed text-[#5a7a94]">
              Scan, organize, and understand your mail with AI. Never miss a bill, 
              lose an important document, or wonder what that letter said again.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-[#355872] text-[#F7F8F0] hover:bg-[#456b85]">
                <Link href="/signup">
                  Get Started Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[#7AAACE] text-[#355872] hover:bg-[#9CD5FF]/20">
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4 text-sm text-[#5a7a94]">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#7AAACE]" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#7AAACE]" />
                <span>99.9% OCR accuracy</span>
              </div>
            </div>
          </div>
          
          {/* Right content - Feature preview */}
          <div className="relative">
            <div className="rounded-2xl border border-[#d1dde6] bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#355872]">
                    <Mail className="h-5 w-5 text-[#F7F8F0]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#355872]">Recent Mail</p>
                    <p className="text-sm text-[#5a7a94]">3 new today</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { title: "Electric Bill", category: "Bills", amount: "$142.50", urgent: true },
                  { title: "Insurance Policy", category: "Insurance", amount: null, urgent: false },
                  { title: "Bank Statement", category: "Bank", amount: null, urgent: false },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-[#d1dde6] bg-[#F7F8F0] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${item.urgent ? 'bg-[#e97451]' : 'bg-[#7AAACE]'}`} />
                      <div>
                        <p className="font-medium text-[#355872]">{item.title}</p>
                        <p className="text-sm text-[#5a7a94]">{item.category}</p>
                      </div>
                    </div>
                    {item.amount && (
                      <span className="font-semibold text-[#355872]">{item.amount}</span>
                    )}
                  </div>
                ))}
              </div>
              
              {/* AI Summary preview */}
              <div className="mt-4 rounded-lg border border-[#9CD5FF] bg-[#9CD5FF]/10 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#355872]">
                  <Sparkles className="h-4 w-4 text-[#7AAACE]" />
                  AI Summary
                </div>
                <p className="text-sm text-[#5a7a94]">
                  You have 1 bill due this week totaling $142.50. Your insurance policy renewal is coming up next month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
