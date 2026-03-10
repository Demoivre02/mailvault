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
  LogOut,
  MessageSquare,
  Bell,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMemo, useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { mockMail } from "@/components/mail/mail-list"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/mail", label: "My Mail", icon: FolderOpen },
  { href: "/assistant", label: "Assistant", icon: MessageSquare },
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

  const pendingActions = useMemo(
    () =>
      mockMail
        .filter((mail) => mail.urgent || !!mail.dueDate)
        .map((mail) => ({
          id: mail.id,
          title: mail.title,
          summary: mail.summary,
          due: mail.dueDate ?? mail.date,
          href: `/mail/${mail.id}`,
        })),
    []
  )
  
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden text-[#5a7a94] hover:text-[#355872] md:flex"
              >
                <Bell className="h-5 w-5" />
                {pendingActions.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e97451] px-1 text-[10px] font-medium text-white">
                    {pendingActions.length}
                  </span>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 border-[#d1dde6] bg-white">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-[#355872]">Pending actions</p>
                <Badge
                  variant="outline"
                  className="border-[#d1dde6] bg-[#F7F8F0] text-xs text-[#5a7a94]"
                >
                  {pendingActions.length} open
                </Badge>
              </div>
              <div className="space-y-2">
                {pendingActions.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="block rounded-md border border-transparent p-2 hover:border-[#d1dde6] hover:bg-[#F7F8F0]"
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-[#9CD5FF]/40">
                        <Clock className="h-3.5 w-3.5 text-[#355872]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-[#355872]">
                          {item.title}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-[11px] text-[#5a7a94]">
                          {item.summary}
                        </p>
                        <p className="mt-1 text-[11px] font-medium text-[#e97451]">
                          Due {item.due}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-3 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-[#355872] hover:bg-[#9CD5FF]/20"
                  asChild
                >
                  <Link href="/mail?filter=pending">View all pending</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="ghost" size="icon" asChild className="hidden text-[#5a7a94] hover:text-[#355872] md:flex">
            <Link href="/settings">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
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
                    href="/settings" 
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#5a7a94] hover:bg-[#9CD5FF]/20 hover:text-[#355872]"
                    onClick={() => setOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
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
