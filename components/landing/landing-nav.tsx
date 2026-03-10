"use client"

import Link from "next/link"
import { Mail, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function LandingNav() {
  const [open, setOpen] = useState(false)
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d1dde6]/50 bg-[#F7F8F0]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#355872]">
            <Mail className="h-5 w-5 text-[#F7F8F0]" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-[#355872]">MailVault</span>
        </Link>
        
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#features" className="text-sm font-medium text-[#5a7a94] hover:text-[#355872]">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-[#5a7a94] hover:text-[#355872]">
            Pricing
          </Link>
          <Link href="#about" className="text-sm font-medium text-[#5a7a94] hover:text-[#355872]">
            About
          </Link>
        </nav>
        
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" className="text-[#355872]">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-[#355872] text-[#F7F8F0] hover:bg-[#456b85]">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5 text-[#355872]" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-[#F7F8F0]">
            <div className="flex flex-col gap-6 pt-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#355872]">
                  <Mail className="h-5 w-5 text-[#F7F8F0]" />
                </div>
                <span className="text-lg font-semibold text-[#355872]">MailVault</span>
              </Link>
              <nav className="flex flex-col gap-4">
                <Link href="#features" className="text-[#355872]" onClick={() => setOpen(false)}>Features</Link>
                <Link href="#pricing" className="text-[#355872]" onClick={() => setOpen(false)}>Pricing</Link>
                <Link href="#about" className="text-[#355872]" onClick={() => setOpen(false)}>About</Link>
              </nav>
              <div className="flex flex-col gap-3 pt-4">
                <Button asChild variant="outline" className="border-[#355872] text-[#355872]">
                  <Link href="/login" onClick={() => setOpen(false)}>Sign In</Link>
                </Button>
                <Button asChild className="bg-[#355872] text-[#F7F8F0]">
                  <Link href="/signup" onClick={() => setOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
