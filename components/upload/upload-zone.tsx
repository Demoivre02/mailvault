"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, Camera, FileImage, X, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  file: File
  preview: string
  status: "uploading" | "processing" | "complete" | "error"
  progress: number
  category?: string
  summary?: string
}

export function UploadZone() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      status: "uploading" as const,
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload and processing
    newFiles.forEach((uploadedFile) => {
      simulateUpload(uploadedFile.id)
    })
  }, [])

  const simulateUpload = async (fileId: string) => {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, progress: i } : f
        )
      )
    }

    // Switch to processing
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, status: "processing" as const } : f
      )
    )

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Complete with mock data
    const categories = ["Bills", "Insurance", "Bank", "Government", "Medical", "Personal"]
    const summaries = [
      "Electric bill for March 2026. Amount due: $142.50. Payment deadline: March 25, 2026.",
      "Health insurance explanation of benefits. Claim processed successfully.",
      "Monthly bank statement for February 2026. Account balance: $3,245.67.",
      "Property tax assessment notice. Review deadline: April 1, 2026.",
      "Lab results from routine blood work. All values within normal range.",
    ]

    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? {
              ...f,
              status: "complete" as const,
              category: categories[Math.floor(Math.random() * categories.length)],
              summary: summaries[Math.floor(Math.random() * summaries.length)],
            }
          : f
      )
    )
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === fileId)
      if (file) URL.revokeObjectURL(file.preview)
      return prev.filter((f) => f.id !== fileId)
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
      "application/pdf": [".pdf"],
    },
    multiple: true,
  })

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-xl border-2 border-dashed bg-white p-12 text-center transition-colors",
          isDragActive
            ? "border-[#7AAACE] bg-[#9CD5FF]/10"
            : "border-[#d1dde6] hover:border-[#7AAACE] hover:bg-[#9CD5FF]/5"
        )}
      >
        <input {...getInputProps()} />
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9CD5FF]/30">
          <Upload className={cn(
            "h-8 w-8 transition-colors",
            isDragActive ? "text-[#355872]" : "text-[#5a7a94]"
          )} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-[#355872]">
          {isDragActive ? "Drop files here" : "Drag & drop your mail"}
        </h3>
        <p className="mt-2 text-sm text-[#5a7a94]">
          or click to browse. Supports JPG, PNG, PDF
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button variant="outline" type="button" className="gap-2 border-[#d1dde6] text-[#355872] hover:bg-[#9CD5FF]/20">
            <FileImage className="h-4 w-4" />
            Browse Files
          </Button>
          <Button variant="outline" type="button" className="gap-2 border-[#d1dde6] text-[#355872] hover:bg-[#9CD5FF]/20">
            <Camera className="h-4 w-4" />
            Use Camera
          </Button>
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#355872]">Uploaded Files</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <FileCard key={file.id} file={file} onRemove={removeFile} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function FileCard({ 
  file, 
  onRemove 
}: { 
  file: UploadedFile
  onRemove: (id: string) => void 
}) {
  const categoryColors: Record<string, string> = {
    Bills: "bg-[#e97451]/20 text-[#e97451]",
    Insurance: "bg-[#7AAACE]/20 text-[#355872]",
    Bank: "bg-[#355872]/20 text-[#355872]",
    Government: "bg-[#6b5b95]/20 text-[#6b5b95]",
    Medical: "bg-[#e06377]/20 text-[#e06377]",
    Personal: "bg-[#88b04b]/20 text-[#88b04b]",
  }

  return (
    <Card className="overflow-hidden border-[#d1dde6] bg-white shadow-sm">
      <div className="relative aspect-[4/3]">
        <img
          src={file.preview}
          alt={file.file.name}
          className="h-full w-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => onRemove(file.id)}
        >
          <X className="h-4 w-4 text-[#355872]" />
        </Button>
        
        {/* Status Overlay */}
        {file.status !== "complete" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
            {file.status === "uploading" && (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-[#7AAACE]" />
                <p className="mt-2 text-sm font-medium text-[#355872]">Uploading...</p>
                <div className="mt-2 w-32">
                  <Progress value={file.progress} className="h-1" />
                </div>
              </>
            )}
            {file.status === "processing" && (
              <>
                <div className="relative">
                  <Loader2 className="h-8 w-8 animate-spin text-[#7AAACE]" />
                </div>
                <p className="mt-2 text-sm font-medium text-[#355872]">Processing with AI...</p>
                <p className="text-xs text-[#5a7a94]">Extracting text & analyzing</p>
              </>
            )}
          </div>
        )}
        
        {/* Complete Status */}
        {file.status === "complete" && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-[#88b04b]/20 px-2 py-1 text-xs font-medium text-[#88b04b]">
            <Check className="h-3 w-3" />
            Processed
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-medium text-[#355872]">{file.file.name}</p>
          {file.category && (
            <span className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
              categoryColors[file.category] || "bg-[#9CD5FF]/30 text-[#355872]"
            )}>
              {file.category}
            </span>
          )}
        </div>
        {file.summary && (
          <p className="mt-2 line-clamp-2 text-xs text-[#5a7a94]">
            {file.summary}
          </p>
        )}
      </div>
    </Card>
  )
}
