import { Navigation } from "@/components/navigation"
import { MailList } from "@/components/mail/mail-list"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import Link from "next/link"

export default function MailPage() {
  return (
    <div className="min-h-screen bg-[#F7F8F0]">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#355872]">My Mail</h1>
            <p className="mt-1 text-[#5a7a94]">
              Browse and search all your digitized documents.
            </p>
          </div>
          <Button asChild className="gap-2 bg-[#355872] text-[#F7F8F0] hover:bg-[#456b85]">
            <Link href="/upload">
              <Upload className="h-4 w-4" />
              Upload New
            </Link>
          </Button>
        </div>

        <MailList />
      </main>
    </div>
  )
}
