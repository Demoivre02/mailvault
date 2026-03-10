"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  Trash2, 
  Edit3,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Building
} from "lucide-react"

const categoryColors: Record<string, string> = {
  Bills: "bg-[#e97451]/20 text-[#e97451] border-[#e97451]/30",
  Insurance: "bg-[#7AAACE]/20 text-[#355872] border-[#7AAACE]/30",
  Bank: "bg-[#355872]/20 text-[#355872] border-[#355872]/30",
  Government: "bg-[#6b5b95]/20 text-[#6b5b95] border-[#6b5b95]/30",
  Medical: "bg-[#e06377]/20 text-[#e06377] border-[#e06377]/30",
  Personal: "bg-[#88b04b]/20 text-[#88b04b] border-[#88b04b]/30",
  Legal: "bg-[#5a7a94]/20 text-[#5a7a94] border-[#5a7a94]/30",
}

// Mock mail data - in real app this would come from API
export const mockMailData: Record<string, {
  id: string
  title: string
  category: string
  date: string
  summary: string
  urgent: boolean
  dueDate?: string
  amount?: string
  sender?: string
  extractedText: string
  keyInfo: { label: string; value: string; icon: React.ElementType }[]
  actions: string[]
}> = {
  "1": {
    id: "1",
    title: "Electric Bill - March 2026",
    category: "Bills",
    date: "Mar 8, 2026",
    summary: "Monthly electric bill from City Power & Light. This bill covers usage from February 1-28, 2026. The amount due is $142.50, which is 12% higher than last month due to increased heating usage.",
    urgent: true,
    dueDate: "Mar 25, 2026",
    amount: "$142.50",
    sender: "City Power & Light",
    extractedText: `CITY POWER & LIGHT
Monthly Statement

Account Number: 12345-67890
Service Address: 123 Main Street, Anytown, ST 12345

Statement Date: March 1, 2026
Due Date: March 25, 2026

Previous Balance: $0.00
Current Charges: $142.50

Usage Summary:
- kWh Used: 1,245
- Rate: $0.1145/kWh
- Basic Service Charge: $15.00

Total Amount Due: $142.50

Pay online at: citypower.com/pay
Or mail payment to: PO Box 1234, Anytown, ST 12345`,
    keyInfo: [
      { label: "Amount Due", value: "$142.50", icon: DollarSign },
      { label: "Due Date", value: "Mar 25, 2026", icon: Clock },
      { label: "Sender", value: "City Power & Light", icon: Building },
      { label: "Status", value: "Payment Required", icon: AlertCircle },
    ],
    actions: [
      "Pay bill before March 25, 2026",
      "Consider enrolling in autopay",
      "Review usage compared to last month",
    ],
  },
  "2": {
    id: "2",
    title: "Health Insurance EOB",
    category: "Insurance",
    date: "Mar 7, 2026",
    summary: "Explanation of Benefits for recent visit to Dr. Smith. The insurance covered $180 of the $200 charge. No patient payment is required as the remaining $20 was covered by your copay at time of service.",
    urgent: false,
    sender: "BlueCross Health Insurance",
    extractedText: `BLUECROSS HEALTH INSURANCE
Explanation of Benefits

This is not a bill.

Member: John Doe
Member ID: BCH-123456789
Claim Number: CLM-2026-00345

Provider: Dr. Sarah Smith, MD
Date of Service: February 15, 2026
Type of Service: Office Visit

Charges Submitted: $200.00
Plan Discount: -$50.00
Amount Covered: $130.00
Copay (paid at visit): $20.00
Amount You Owe: $0.00

If you have questions, call: 1-800-555-0123`,
    keyInfo: [
      { label: "Amount Owed", value: "$0.00", icon: DollarSign },
      { label: "Service Date", value: "Feb 15, 2026", icon: Calendar },
      { label: "Provider", value: "Dr. Sarah Smith", icon: Building },
      { label: "Status", value: "No Action Needed", icon: CheckCircle },
    ],
    actions: [
      "Keep for your records",
      "Verify charges match your visit",
    ],
  },
}

interface MailDetailProps {
  mailId: string
}

export function MailDetail({ mailId }: MailDetailProps) {
  const mail = mockMailData[mailId] || mockMailData["1"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-[#d1dde6] bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#9CD5FF]/30">
                <FileText className="h-6 w-6 text-[#355872]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-[#355872]">{mail.title}</h1>
                  {mail.urgent && (
                    <span className="flex h-2 w-2 rounded-full bg-[#e97451]" />
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[#5a7a94]">
                  <Badge variant="outline" className={categoryColors[mail.category]}>
                    {mail.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {mail.date}
                  </span>
                  {mail.sender && (
                    <span className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {mail.sender}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1 border-[#d1dde6] text-[#355872] hover:bg-[#9CD5FF]/20">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="gap-1 border-[#d1dde6] text-[#355872] hover:bg-[#9CD5FF]/20">
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="gap-1 border-[#e97451]/30 text-[#e97451] hover:bg-[#e97451]/10">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Information */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mail.keyInfo.map((info) => (
          <Card key={info.label} className="border-[#d1dde6] bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9CD5FF]/30">
                  <info.icon className="h-5 w-5 text-[#355872]" />
                </div>
                <div>
                  <p className="text-xs text-[#5a7a94]">{info.label}</p>
                  <p className="font-semibold text-[#355872]">{info.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Summary */}
      <Card className="border-[#7AAACE]/30 bg-[#9CD5FF]/10">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-[#355872]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7AAACE]/30">
              <CheckCircle className="h-4 w-4 text-[#7AAACE]" />
            </span>
            AI Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-[#355872]">{mail.summary}</p>
          
          {mail.actions.length > 0 && (
            <>
              <Separator className="my-4 bg-[#7AAACE]/20" />
              <div>
                <h4 className="mb-2 text-sm font-medium text-[#355872]">Recommended Actions</h4>
                <ul className="space-y-2">
                  {mail.actions.map((action, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[#355872]">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#7AAACE]/30 text-xs text-[#355872]">
                        {index + 1}
                      </span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Extracted Text */}
      <Card className="border-[#d1dde6] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#355872]">Extracted Text (OCR)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-[#F7F8F0] p-4">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#5a7a94]">
              {mail.extractedText}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
