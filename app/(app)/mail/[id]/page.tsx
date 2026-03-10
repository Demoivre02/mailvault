import { Navigation } from "@/components/navigation"
import { MailDetail, mockMailData } from "@/components/mail/mail-detail"
import { AIChat } from "@/components/mail/ai-chat"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MailDetailPage({ params }: PageProps) {
  const { id } = await params
  const mail = mockMailData[id] || mockMailData["1"]

  return (
    <div className="min-h-screen bg-[#F7F8F0]">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="-ml-2 gap-1 text-[#5a7a94] hover:text-[#355872]">
            <Link href="/mail">
              <ArrowLeft className="h-4 w-4" />
              Back to Mail
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MailDetail mailId={id} />
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AIChat 
              documentTitle={mail.title} 
              documentSummary={mail.summary}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
