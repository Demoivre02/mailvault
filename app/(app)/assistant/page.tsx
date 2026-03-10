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
    <div className="min-h-screen bg-[#F7F8F0] ">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 lg:mb-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#355872] sm:text-3xl">
              Assistant
            </h1>
            <p className="mt-1 max-w-xl text-sm text-[#5a7a94] sm:text-base">
              Ask questions across all of your uploaded mail and documents. I’ll use OCR and AI
              summaries to find what matters.
            </p>
          </div>
          <Card className="w-full max-w-md border-[#d1dde6] bg-white p-2 shadow-sm sm:p-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-[#5a7a94]" />
              <Input
                value={globalQuery}
                onChange={(e) => setGlobalQuery(e.target.value)}
                placeholder="Search or ask a question (e.g. “upcoming payments”)"
                className="border-0 bg-transparent px-0 text-xs text-[#355872] placeholder:text-[#5a7a94] focus-visible:ring-0 sm:text-sm"
              />
            </div>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          {/* Left: context + document explorer */}
          <div className="order-2 space-y-4 lg:order-1 lg:space-y-6">
            <Card className="border-[#d1dde6] bg-white p-3 shadow-sm sm:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#9CD5FF]/30">
                    <Sparkles className="h-5 w-5 text-[#7AAACE]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-[#355872] sm:text-base">
                      MailVault Assistant
                    </h2>
                    <p className="mt-1 text-xs text-[#5a7a94] sm:text-sm">
                      Choose a document or ask a broad question. I’ll answer based on your uploaded
                      mail.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1 border-[#d1dde6] text-xs text-[#355872] hover:bg-[#9CD5FF]/10 sm:w-auto sm:self-start"
                >
                  <Filter className="h-3 w-3" />
                  <span className="hidden sm:inline">Focus on bills</span>
                </Button>
              </div>

              <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-wrap sm:flex-row">
                {assistantSuggestions.map((q) => (
                  <Button
                    key={q}
                    variant="outline"
                    size="sm"
                    className="w-full justify-center border-[#d1dde6] text-xs text-[#355872] hover:bg-[#9CD5FF]/20 sm:w-auto sm:justify-start"
                    onClick={() => handleSuggestionClick(q)}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="border-[#d1dde6] bg-white p-3 shadow-sm sm:p-4">
              <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
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
          <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
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

