"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, AlertCircle, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "Total Documents",
    value: "247",
    change: "+12 this week",
    icon: FileText,
    iconColor: "text-[#355872]",
    bgColor: "bg-[#9CD5FF]/30",
  },
  {
    title: "Pending Actions",
    value: "8",
    change: "3 due soon",
    icon: Clock,
    iconColor: "text-[#7AAACE]",
    bgColor: "bg-[#7AAACE]/20",
  },
  {
    title: "Bills Due",
    value: "3",
    change: "Next: Mar 15",
    icon: AlertCircle,
    iconColor: "text-[#e97451]",
    bgColor: "bg-[#e97451]/20",
  },
  {
    title: "Processed Today",
    value: "5",
    change: "All categorized",
    icon: CheckCircle,
    iconColor: "text-[#88b04b]",
    bgColor: "bg-[#88b04b]/20",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-[#d1dde6] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#5a7a94]">
              {stat.title}
            </CardTitle>
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#355872]">{stat.value}</div>
            <p className="text-xs text-[#5a7a94]">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
