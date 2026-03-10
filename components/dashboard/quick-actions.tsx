"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Search, MessageSquare, Bell } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Scan New Mail",
    description: "Upload or capture new documents",
    icon: Upload,
    href: "/upload",
    primary: true,
  },
  {
    title: "Search Documents",
    description: "Find specific mail items",
    icon: Search,
    href: "/mail?search=true",
    primary: false,
  },
  {
    title: "Ask AI",
    description: "Get answers about your mail",
    icon: MessageSquare,
    href: "/mail?chat=true",
    primary: false,
  },
  {
    title: "View Reminders",
    description: "Upcoming deadlines & actions",
    icon: Bell,
    href: "/mail?filter=reminders",
    primary: false,
  },
]

export function QuickActions() {
  return (
    <Card className="border-[#d1dde6] bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-[#355872]">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant={action.primary ? "default" : "outline"}
            className={`h-auto flex-col items-start gap-2 p-4 ${
              action.primary 
                ? "bg-[#355872] text-[#F7F8F0] hover:bg-[#456b85]" 
                : "border-[#d1dde6] text-[#355872] hover:bg-[#9CD5FF]/20"
            }`}
            asChild
          >
            <Link href={action.href}>
              <div className="flex w-full items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  action.primary ? "bg-[#F7F8F0]/20" : "bg-[#9CD5FF]/30"
                }`}>
                  <action.icon className={`h-5 w-5 ${
                    action.primary ? "text-[#F7F8F0]" : "text-[#355872]"
                  }`} />
                </div>
                <div className="text-left">
                  <div className={`font-medium ${
                    action.primary ? "text-[#F7F8F0]" : "text-[#355872]"
                  }`}>
                    {action.title}
                  </div>
                  <div className={`text-xs ${
                    action.primary ? "text-[#F7F8F0]/70" : "text-[#5a7a94]"
                  }`}>
                    {action.description}
                  </div>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
