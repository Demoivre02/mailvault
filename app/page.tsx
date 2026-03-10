import { LandingNav } from "@/components/landing/landing-nav"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F8F0]">
      <LandingNav />
      <main>
        <Hero />
        <Features />
        
        {/* CTA Section */}
        <section className="border-t border-[#d1dde6] bg-[#355872] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#F7F8F0] sm:text-4xl">
              Ready to take control of your mail?
            </h2>
            <p className="mb-8 text-lg text-[#9CD5FF]">
              Join thousands of users who have simplified their document management with MailVault.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-lg bg-[#F7F8F0] px-8 py-3 font-semibold text-[#355872] transition-colors hover:bg-white"
              >
                Start Free Trial
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg border border-[#7AAACE] px-8 py-3 font-semibold text-[#F7F8F0] transition-colors hover:bg-[#456b85]"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-[#d1dde6] bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#355872]">
                <Mail className="h-4 w-4 text-[#F7F8F0]" />
              </div>
              <span className="font-semibold text-[#355872]">MailVault</span>
            </div>
            <nav className="flex gap-6 text-sm text-[#5a7a94]">
              <Link href="#" className="hover:text-[#355872]">Privacy</Link>
              <Link href="#" className="hover:text-[#355872]">Terms</Link>
              <Link href="#" className="hover:text-[#355872]">Contact</Link>
            </nav>
            <p className="text-sm text-[#5a7a94]">
              2024 MailVault. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
