import { 
  Camera, 
  Brain, 
  FolderOpen, 
  MessageSquare, 
  Bell, 
  Lock,
  Search,
  Zap
} from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "Scan Anywhere",
    description: "Use your phone camera or upload files with auto edge detection, smart cropping, and image enhancement. Our OCR technology then extracts text with 99.9% accuracy."
  },
  {
    icon: Brain,
    title: "AI Understanding",
    description: "Get instant summaries, key dates, amounts due, and actionable insights from every document."
  },
  {
    icon: FolderOpen,
    title: "Smart Organization",
    description: "Auto-categorize into Bills, Insurance, Bank, Medical, and more. Never lose a document again."
  },
  {
    icon: MessageSquare,
    title: "Ask Questions",
    description: "Chat with your documents. Ask 'When is my insurance due?' and get instant answers."
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Never miss a payment. Get notified before due dates and important deadlines."
  },
  {
    icon: Search,
    title: "Powerful Search",
    description: "Find any document instantly with full-text search across all your scanned mail."
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description: "End-to-end encryption, secure storage, and strict privacy controls protect your data."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process documents in seconds. Our AI works in real-time to organize your mail."
  }
]

export function Features() {
  return (
    <section className="border-t border-[#d1dde6] bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#355872] sm:text-4xl">
            Everything you need to manage your mail
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#5a7a94]">
            From scanning to understanding, MailVault handles the entire lifecycle of your physical documents.
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div 
              key={i}
              className="group rounded-xl border border-[#d1dde6] bg-[#F7F8F0] p-6 transition-all hover:border-[#7AAACE] hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#9CD5FF]/30 text-[#355872] transition-colors group-hover:bg-[#7AAACE] group-hover:text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-[#355872]">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-[#5a7a94]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
