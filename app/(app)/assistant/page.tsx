"use client"

import { useMemo, useState } from "react"
import { Navigation } from "@/components/navigation"
import { AIChat } from "@/components/mail/ai-chat"
import { MailList } from "@/components/mail/mail-list"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Sparkles, Filter } from "lucide-react"

const assistantSuggestions = [
  "What bills are due this week?",
  "Do I have any documents I need to sign?",
  "Summarize all important mail from this month.",
  "Which documents mention insurance or medical?",
]

export default function AssistantPage() {
  const [globalQuery, setGlobalQuery] = useState("")
  const [selectedContext, setSelectedContext] = useState<{
    title: string
    summary: string
  } | null>(null)

  // For now we derive a generic summary from the current query;
  // in a real app this would come from the backend based on the user’s documents.
  const derivedSummary = useMemo(() => {
    if (!globalQuery.trim()) {
      return "I’ll search across all of your uploaded mail and documents to answer in plain language."
    }
    return `I’m searching across your digitized mail and documents for anything related to “${globalQuery}” and will surface key dates, amounts, and required actions.`
  }, [globalQuery])

  const activeTitle =
    selectedContext?.title || (globalQuery ? `Query: ${globalQuery}` : "Ask MailVault Assistant")

  const activeSummary =
    selectedContext?.summary || derivedSummary

  const handleSuggestionClick = (q: string) => {
    setGlobalQuery(q)
    setSelectedContext({
      title: `Assistant search: ${q}`,
      summary:
        "This is a combined view over your recent bills, insurance, bank, and government documents. I’ll highlight anything time‑sensitive or requiring action.",
    })
  }

  return (
    <div className="min-h-screen bg-[#F7F8F0]">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#355872]">Assistant</h1>
            <p className="mt-1 max-w-xl text-[#5a7a94]">
              Ask questions across all of your uploaded mail and documents. I’ll use OCR and AI
              summaries to find what matters.
            </p>
          </div>
          <Card className="w-full max-w-md border-[#d1dde6] bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-[#5a7a94]" />
              <Input
                value={globalQuery}
                onChange={(e) => setGlobalQuery(e.target.value)}
                placeholder="Search or ask a question (e.g. “upcoming payments”)"
                className="border-0 bg-transparent px-0 text-sm text-[#355872] placeholder:text-[#5a7a94] focus-visible:ring-0"
              />
            </div>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          {/* Left: context + document explorer */}
          <div className="space-y-6">
            <Card className="border-[#d1dde6] bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#9CD5FF]/30">
                    <Sparkles className="h-5 w-5 text-[#7AAACE]" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-[#355872]">
                      MailVault Assistant
                    </h2>
                    <p className="mt-1 text-sm text-[#5a7a94]">
                      Choose a document or ask a broad question. I’ll answer based on your uploaded
                      mail.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 border-[#d1dde6] text-xs text-[#355872] hover:bg-[#9CD5FF]/10"
                >
                  <Filter className="h-3 w-3" />
                  Focus on bills
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {assistantSuggestions.map((q) => (
                  <Button
                    key={q}
                    variant="outline"
                    size="sm"
                    className="border-[#d1dde6] text-xs text-[#355872] hover:bg-[#9CD5FF]/20"
                    onClick={() => handleSuggestionClick(q)}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="border-[#d1dde6] bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-[#355872]">
                    Your documents
                  </h3>
                  <p className="text-xs text-[#5a7a94]">
                    Click any document to drill in; the assistant will use it as context.
                  </p>
                </div>
              </div>

              {/* Reuse existing mail list UI as the “document explorer” */}
              <div className="mt-2">
                <MailList />
              </div>
            </Card>
          </div>

          {/* Right: global assistant chat */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AIChat
              documentTitle={activeTitle}
              documentSummary={activeSummary}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

