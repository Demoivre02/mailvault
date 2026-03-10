"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from "lucide-react"
import Link from "next/link"

const categoryColors: Record<string, string> = {
  Bills: "bg-[#e97451]/20 text-[#e97451] border-[#e97451]/30",
  Insurance: "bg-[#7AAACE]/20 text-[#355872] border-[#7AAACE]/30",
  Bank: "bg-[#355872]/20 text-[#355872] border-[#355872]/30",
  Government: "bg-[#6b5b95]/20 text-[#6b5b95] border-[#6b5b95]/30",
  Medical: "bg-[#e06377]/20 text-[#e06377] border-[#e06377]/30",
  Personal: "bg-[#88b04b]/20 text-[#88b04b] border-[#88b04b]/30",
  Legal: "bg-[#5a7a94]/20 text-[#5a7a94] border-[#5a7a94]/30",
}

const recentMail = [
  {
    id: "1",
    title: "Electric Bill - March 2026",
    category: "Bills",
    date: "Mar 8, 2026",
    summary: "Amount due: $142.50. Payment due by March 25, 2026.",
    urgent: true,
  },
  {
    id: "2",
    title: "Health Insurance EOB",
    category: "Insurance",
    date: "Mar 7, 2026",
    summary: "Explanation of Benefits for Dr. Smith visit. No payment required.",
    urgent: false,
  },
  {
    id: "3",
    title: "Bank Statement - February",
    category: "Bank",
    date: "Mar 5, 2026",
    summary: "Monthly statement for checking account ending in 4523.",
    urgent: false,
  },
  {
    id: "4",
    title: "Property Tax Notice",
    category: "Government",
    date: "Mar 4, 2026",
    summary: "Annual property tax assessment for 2026. Review deadline: April 1.",
    urgent: true,
  },
  {
    id: "5",
    title: "Medical Lab Results",
    category: "Medical",
    date: "Mar 3, 2026",
    summary: "Routine blood work results from Quest Diagnostics.",
    urgent: false,
  },
]

export function RecentMail() {
  return (
    <Card className="border-[#d1dde6] md:w-full w-[100%]  bg-white shadow-sm ">
      <CardHeader className="flex flex-row items-center w-[400px] justify-between">
        <CardTitle className="text-[#355872]">Recent Mail</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/mail" className="flex items-center gap-1 text-[#7AAACE] hover:text-[#355872]">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentMail.map((mail) => (
          <Link
            key={mail.id}
            href={`/mail/${mail.id}`}
            className="group flex b flex-col md:flex-row items-start gap-4 rounded-lg border border-transparent p-3 transition-colors hover:border-[#d1dde6] hover:bg-[#F7F8F0]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#9CD5FF]/30">
              <FileText className="h-5 w-5 text-[#355872]" />
            </div>
            <div className="min-w-0 w-full flex flex-col md:flex-row justify-between border-b border-gray-200 pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0  md:flex-1">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                    <h4 className="truncate font-medium text-[#355872] group-hover:text-[#7AAACE]">
                      {mail.title}
                    </h4>
                    {mail.urgent && (
                      <span className="flex h-2 w-2 shrink-0 rounded-full bg-[#e97451]" />
                    )}
                  </div>
                  <p className="mt-1 truncate text-sm text-[#5a7a94] ">
                    {mail.summary}
                  </p>
                </div>
                <div className="md:w-fit w-full ml-[7em] items-end justify-end">
                  <Badge variant="outline" className={categoryColors[mail.category]} >
                    {mail.category}
                  </Badge>
                </div>
              </div>
              <p className="mt-2 text-xs text-[#5a7a94]">{mail.date}</p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
