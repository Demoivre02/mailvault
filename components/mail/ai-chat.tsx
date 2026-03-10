"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Sparkles, User, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface AIChatProps {
  /** Controlled value for the input field (optional) */
  input?: string
  /** Called when the user types or the input should update */
  onInputChange?: (value: string) => void
  /** Legacy props kept for backward compatibility (mail detail view) */
  documentTitle?: string
  documentSummary?: string
}

export function AIChat({ input: externalInput, onInputChange, documentTitle = "MailVault Assistant", documentSummary = "Ask a question about your mail and I'll keep the answer simple." }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [internalInput, setInternalInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Use externally controlled input when provided, otherwise use internal state
  const isControlled = externalInput !== undefined
  const input = isControlled ? externalInput : internalInput

  const setInput = (value: string) => {
    if (isControlled) {
      onInputChange?.(value)
    } else {
      setInternalInput(value)
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response — replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const responses: Record<string, string> = {
      "when is this due?": `Based on the document "${documentTitle}", the payment is due on March 25, 2026. I recommend setting up a reminder a few days before to ensure you don't miss it.`,
      "do i need to pay this?": `Yes, this is an invoice that requires payment. The amount due is $142.50. You can typically pay this through the utility company's online portal, by mail, or through your bank's bill pay service.`,
      "is this important?": `Yes, this document is important. It's a utility bill that requires action before the due date to avoid late fees or service interruption. I've flagged it as urgent in your dashboard.`,
      "what actions should i take?": `Based on my analysis, here are the recommended actions:\n\n1. Review the charges to ensure accuracy\n2. Set up payment before March 25, 2026\n3. Consider enrolling in autopay to avoid missing future payments\n4. File this document in your Bills folder for tax purposes`,
      "what bills are due this week?": `You have 2 bills due this week:\n\n1. **Electric bill** — $142.50 due March 12\n2. **Internet service** — $79.99 due March 14\n\nWould you like help setting up reminders or finding payment links?`,
      "do i have any documents i need to sign?": `I found 1 document that may require your signature:\n\n- **Lease renewal agreement** received March 8 — review required before March 20.\n\nWould you like me to flag it on your dashboard?`,
      "summarize all important mail from this month.": `Here's a summary of important mail received in March:\n\n- **Lease renewal** (March 8) — Requires signature by March 20\n- **Electric bill** (March 9) — $142.50 due March 12\n- **Health insurance EOB** (March 10) — No action required\n- **Internet bill** (March 11) — $79.99 due March 14`,
      "which documents mention insurance or medical?": `I found 2 documents mentioning insurance or medical topics:\n\n1. **Health insurance EOB** (March 10) — Summary of benefits, no payment needed\n2. **Doctor's office statement** (February 28) — $35 copay, likely already processed`,
    }

    const defaultResponse = `Based on my analysis of "${documentTitle}", I can help you understand this document better. ${documentSummary} Is there anything specific you'd like to know?`

    const aiMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role: "assistant",
      content: responses[userMessage.content.toLowerCase()] || defaultResponse,
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsLoading(false)
  }

  return (
    <Card className="flex flex-col border-[#d1dde6] bg-white shadow-sm" style={{ minHeight: "420px", maxHeight: "68vh" }}>
      {/* Messages area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-12 text-center">
            <Sparkles className="h-10 w-10 text-[#7AAACE]/50" />
            <h4 className="mt-4 font-medium text-[#355872]">Ask anything about your mail</h4>
            <p className="mt-1 text-sm text-[#5a7a94]">
              Choose a prompt above or type your own question below.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9CD5FF]/30">
                    <Sparkles className="h-4 w-4 text-[#7AAACE]" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                    message.role === "user"
                      ? "bg-[#355872] text-[#F7F8F0]"
                      : "bg-[#F7F8F0] text-[#355872]"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
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
                  <span className="text-sm text-[#5a7a94]">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input bar */}
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
  )
}
