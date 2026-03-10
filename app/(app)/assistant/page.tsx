"use client"

import { useState, useRef, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Filter, Sparkles, Send, User, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const assistantSuggestions = [
  "What bills are due this week?",
  "Do I have any documents I need to sign?",
  "Summarize all important mail from this month.",
  "Which documents mention insurance or medical?",
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const mockResponses: Record<string, string> = {
  "what bills are due this week?":
    "You have 2 bills due this week:\n\n1. **Electric bill** — $142.50 due March 12\n2. **Internet service** — $79.99 due March 14\n\nWould you like help setting up reminders?",
  "do i have any documents i need to sign?":
    "I found 1 document that may require your signature:\n\n- **Lease renewal agreement** received March 8 — review required before March 20.\n\nWould you like me to flag it on your dashboard?",
  "summarize all important mail from this month.":
    "Here's a summary of important mail received in March:\n\n- **Lease renewal** (Mar 8) — Requires signature by Mar 20\n- **Electric bill** (Mar 9) — $142.50 due Mar 12\n- **Health insurance EOB** (Mar 10) — No action required\n- **Internet bill** (Mar 11) — $79.99 due Mar 14",
  "which documents mention insurance or medical?":
    "I found 2 documents mentioning insurance or medical topics:\n\n1. **Health insurance EOB** (March 10) — No payment needed\n2. **Doctor's office statement** (February 28) — $35 copay, likely already processed",
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: input.trim(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    await new Promise((r) => setTimeout(r, 1400))

    const aiMsg: Message = {
      id: Math.random().toString(36).substring(7),
      role: "assistant",
      content:
        mockResponses[userMsg.content.toLowerCase()] ||
        `I'm searching your mail for anything related to "${userMsg.content}". Here's what I found — let me know if you'd like more detail.`,
    }
    setMessages((prev) => [...prev, aiMsg])
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F7F8F0]">
      <Navigation />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-[#355872] sm:text-3xl">
            Assistant
          </h1>
          <p className="mt-1 text-sm text-[#5a7a94] sm:text-base">
            Ask a question about your mail and I'll help you find clear answers.
          </p>
        </div>

        {/* Single unified card */}
        <Card className="flex flex-col border-[#d1dde6] bg-white shadow-sm" style={{ minHeight: "500px", maxHeight: "72vh" }}>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-[#d1dde6] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#9CD5FF]/30">
                <Sparkles className="h-5 w-5 text-[#7AAACE]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#355872] sm:text-base">
                  MailVault Assistant
                </h2>
                <p className="mt-0.5 text-xs text-[#5a7a94] sm:text-sm">
                  Pick a prompt or type your own question below.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 gap-1 border-[#d1dde6] text-xs text-[#355872] hover:bg-[#9CD5FF]/10"
            >
              <Filter className="h-3 w-3" />
              Focus on bills
            </Button>
          </div>

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-2 border-b border-[#d1dde6] px-4 py-3">
            {assistantSuggestions.map((q) => (
              <Button
                key={q}
                variant="outline"
                size="sm"
                className="border-[#d1dde6] text-xs text-[#355872] hover:bg-[#9CD5FF]/20"
                onClick={() => setInput(q)}
              >
                {q}
              </Button>
            ))}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <Sparkles className="h-9 w-9 text-[#7AAACE]/40" />
                <p className="mt-3 text-sm font-medium text-[#355872]">
                  Ask anything about your mail
                </p>
                <p className="mt-1 text-xs text-[#5a7a94]">
                  Choose a prompt above or type your own question.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9CD5FF]/30">
                        <Sparkles className="h-4 w-4 text-[#7AAACE]" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                        msg.role === "user"
                          ? "bg-[#355872] text-[#F7F8F0]"
                          : "bg-[#F7F8F0] text-[#355872]"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9CD5FF]/30">
                        <User className="h-4 w-4 text-[#355872]" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9CD5FF]/30">
                      <Sparkles className="h-4 w-4 text-[#7AAACE]" />
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-[#F7F8F0] px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin text-[#7AAACE]" />
                      <span className="text-sm text-[#5a7a94]">Thinking…</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input + send — always at the bottom of the card */}
          <form onSubmit={handleSubmit} className="border-t border-[#d1dde6] p-3 md:p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about your mail…"
                className="flex-1 border-[#d1dde6] bg-[#F7F8F0] text-sm text-[#355872] placeholder:text-[#5a7a94]"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="bg-[#355872] text-[#F7F8F0] hover:bg-[#456b85]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
