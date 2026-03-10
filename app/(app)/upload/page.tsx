import { Navigation } from "@/components/navigation"
import { UploadZone } from "@/components/upload/upload-zone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Sparkles, FolderOpen, Bell } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "OCR Text Extraction",
    description: "Automatically extract text from your scanned documents using advanced OCR technology.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Analysis",
    description: "Get intelligent summaries, key dates, and action items identified automatically.",
  },
  {
    icon: FolderOpen,
    title: "Smart Categorization",
    description: "Documents are automatically sorted into Bills, Insurance, Bank, Medical, and more.",
  },
  {
    icon: Bell,
    title: "Deadline Reminders",
    description: "Never miss a payment or deadline with automatic reminder extraction.",
  },
]

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[#F7F8F0]">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#355872]">Upload Mail</h1>
          <p className="mt-1 text-[#5a7a94]">
            Scan or upload your physical mail to digitize and organize it.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UploadZone />
          </div>
          
          <div className="space-y-6">
            <Card className="border-[#d1dde6] bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#355872]">How it works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.title} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#9CD5FF]/30">
                      <feature.icon className="h-4 w-4 text-[#355872]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#355872]">{feature.title}</h4>
                      <p className="text-xs text-[#5a7a94]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-[#7AAACE]/30 bg-[#9CD5FF]/10">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 shrink-0 text-[#7AAACE]" />
                  <div>
                    <h4 className="text-sm font-medium text-[#355872]">Pro Tip</h4>
                    <p className="mt-1 text-xs text-[#5a7a94]">
                      For best results, ensure good lighting and capture the entire document clearly. 
                      Multi-page documents are supported.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
