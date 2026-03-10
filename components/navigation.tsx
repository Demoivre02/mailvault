"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Mail, 
  Upload, 
  LayoutDashboard, 
  FolderOpen, 
  Settings,
  Menu,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/mail", label: "My Mail", icon: FolderOpen },
]

function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#355872]">
        <Mail className="h-5 w-5 text-[#F7F8F0]" />
      </div>
      <span className="text-lg font-semibold tracking-tight text-[#355872]">MailVault</span>
    </Link>
  )
}

function NavLinks({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname()
  
  return (
    <nav className={cn("flex gap-1", mobile ? "flex-col" : "items-center")}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || 
          (item.href !== "/dashboard" && pathname.startsWith(item.href))
        
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive 
                ? "bg-[#9CD5FF]/30 text-[#355872]" 
                : "text-[#5a7a94] hover:bg-[#9CD5FF]/20 hover:text-[#355872]",
              mobile && "w-full"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function Navigation() {
  const [open, setOpen] = useState(false)
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d1dde6]/50 bg-[#F7F8F0]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden md:block">
            <NavLinks />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden text-[#5a7a94] hover:text-[#355872] md:flex">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden text-[#5a7a94] hover:text-[#355872] md:flex">
            <Link href="/">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sign out</span>
            </Link>
          </Button>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-[#355872]">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-[#F7F8F0]">
              <div className="flex flex-col gap-6 pt-6">
                <Logo />
                <NavLinks mobile onNavigate={() => setOpen(false)} />
                <div className="mt-auto flex flex-col gap-2 border-t border-[#d1dde6] pt-4">
                  <Link 
                    href="/" 
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#5a7a94] hover:bg-[#9CD5FF]/20 hover:text-[#355872]"
                    onClick={() => setOpen(false)}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
