"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Search, 
  FileText, 
  Calendar, 
  Filter,
  Grid,
  List,
  SortAsc
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const categories = [
  { value: "all", label: "All Categories" },
  { value: "bills", label: "Bills" },
  { value: "insurance", label: "Insurance" },
  { value: "bank", label: "Bank" },
  { value: "government", label: "Government" },
  { value: "medical", label: "Medical" },
  { value: "personal", label: "Personal" },
  { value: "legal", label: "Legal" },
]

const categoryColors: Record<string, string> = {
  Bills: "bg-[#e97451]/20 text-[#e97451] border-[#e97451]/30",
  Insurance: "bg-[#7AAACE]/20 text-[#355872] border-[#7AAACE]/30",
  Bank: "bg-[#355872]/20 text-[#355872] border-[#355872]/30",
  Government: "bg-[#6b5b95]/20 text-[#6b5b95] border-[#6b5b95]/30",
  Medical: "bg-[#e06377]/20 text-[#e06377] border-[#e06377]/30",
  Personal: "bg-[#88b04b]/20 text-[#88b04b] border-[#88b04b]/30",
  Legal: "bg-[#5a7a94]/20 text-[#5a7a94] border-[#5a7a94]/30",
}

// Mock data
const mockMail = [
  {
    id: "1",
    title: "Electric Bill - March 2026",
    category: "Bills",
    date: "Mar 8, 2026",
    summary: "Amount due: $142.50. Payment due by March 25, 2026.",
    urgent: true,
    dueDate: "Mar 25, 2026",
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
    summary: "Monthly statement for checking account ending in 4523. Balance: $3,245.67.",
    urgent: false,
  },
  {
    id: "4",
    title: "Property Tax Notice",
    category: "Government",
    date: "Mar 4, 2026",
    summary: "Annual property tax assessment for 2026. Review deadline: April 1.",
    urgent: true,
    dueDate: "Apr 1, 2026",
  },
  {
    id: "5",
    title: "Medical Lab Results",
    category: "Medical",
    date: "Mar 3, 2026",
    summary: "Routine blood work results from Quest Diagnostics. All values normal.",
    urgent: false,
  },
  {
    id: "6",
    title: "Water Bill - March 2026",
    category: "Bills",
    date: "Mar 2, 2026",
    summary: "Amount due: $78.25. Payment due by March 20, 2026.",
    urgent: false,
    dueDate: "Mar 20, 2026",
  },
  {
    id: "7",
    title: "Car Insurance Renewal",
    category: "Insurance",
    date: "Feb 28, 2026",
    summary: "Auto insurance policy renewal notice. Premium: $650/6 months.",
    urgent: true,
    dueDate: "Mar 15, 2026",
  },
  {
    id: "8",
    title: "Credit Card Statement",
    category: "Bank",
    date: "Feb 25, 2026",
    summary: "Monthly statement for card ending in 1234. Balance: $1,892.45.",
    urgent: false,
    dueDate: "Mar 18, 2026",
  },
  {
    id: "9",
    title: "Lease Renewal Agreement",
    category: "Legal",
    date: "Feb 20, 2026",
    summary: "Annual lease renewal for apartment. Review and sign by March 31.",
    urgent: true,
    dueDate: "Mar 31, 2026",
  },
  {
    id: "10",
    title: "Birthday Card from Grandma",
    category: "Personal",
    date: "Feb 18, 2026",
    summary: "Happy birthday wishes and $50 check enclosed.",
    urgent: false,
  },
]

export function MailList() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const filteredMail = mockMail.filter((mail) => {
    const matchesSearch = 
      mail.title.toLowerCase().includes(search.toLowerCase()) ||
      mail.summary.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = 
      category === "all" || mail.category.toLowerCase() === category.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a7a94]" />
            <Input
              placeholder="Search mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-[#d1dde6] bg-white pl-9 text-[#355872] placeholder:text-[#5a7a94]"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px] border-[#d1dde6] bg-white text-[#355872]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-[#9CD5FF]/30 text-[#355872]" : "text-[#5a7a94]"}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-[#9CD5FF]/30 text-[#355872]" : "text-[#5a7a94]"}
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between text-sm text-[#5a7a94]">
        <span>{filteredMail.length} documents</span>
        <Button variant="ghost" size="sm" className="gap-1 text-[#5a7a94] hover:text-[#355872]">
          <SortAsc className="h-4 w-4" />
          Date (newest)
        </Button>
      </div>

      {/* Mail items */}
      {viewMode === "list" ? (
        <div className="space-y-2">
          {filteredMail.map((mail) => (
            <MailListItem key={mail.id} mail={mail} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMail.map((mail) => (
            <MailGridItem key={mail.id} mail={mail} />
          ))}
        </div>
      )}

      {filteredMail.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-[#5a7a94]/50" />
          <h3 className="mt-4 text-lg font-semibold text-[#355872]">No documents found</h3>
          <p className="mt-1 text-sm text-[#5a7a94]">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  )
}

interface MailItemProps {
  mail: typeof mockMail[0]
}

function MailListItem({ mail }: MailItemProps) {
  return (
    <Link href={`/mail/${mail.id}`}>
      <Card className="group border-[#d1dde6] bg-white p-4 shadow-sm transition-colors hover:border-[#7AAACE] hover:bg-[#9CD5FF]/5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#9CD5FF]/30">
            <FileText className="h-5 w-5 text-[#355872]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-medium text-[#355872] group-hover:text-[#7AAACE]">
                    {mail.title}
                  </h3>
                  {mail.urgent && (
                    <span className="flex h-2 w-2 shrink-0 rounded-full bg-[#e97451]" />
                  )}
                </div>
                <p className="mt-1 truncate text-sm text-[#5a7a94]">
                  {mail.summary}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <Badge variant="outline" className={categoryColors[mail.category]}>
                  {mail.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-[#5a7a94]">
                  <Calendar className="h-3 w-3" />
                  {mail.date}
                </div>
              </div>
            </div>
            {mail.dueDate && (
              <div className="mt-2 flex items-center gap-1 text-xs text-[#e97451]">
                <span>Due: {mail.dueDate}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}

function MailGridItem({ mail }: MailItemProps) {
  return (
    <Link href={`/mail/${mail.id}`}>
      <Card className="group h-full border-[#d1dde6] bg-white p-4 shadow-sm transition-colors hover:border-[#7AAACE] hover:bg-[#9CD5FF]/5">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9CD5FF]/30">
            <FileText className="h-5 w-5 text-[#355872]" />
          </div>
          <Badge variant="outline" className={categoryColors[mail.category]}>
            {mail.category}
          </Badge>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h3 className="line-clamp-1 font-medium text-[#355872] group-hover:text-[#7AAACE]">
              {mail.title}
            </h3>
            {mail.urgent && (
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-[#e97451]" />
            )}
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-[#5a7a94]">
            {mail.summary}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-[#5a7a94]">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {mail.date}
          </div>
          {mail.dueDate && (
            <span className="text-[#e97451]">Due: {mail.dueDate}</span>
          )}
        </div>
      </Card>
    </Link>
  )
}
