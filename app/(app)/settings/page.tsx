"use client"

import { useState } from "react"
import { Eye, EyeOff, KeyRound, CheckCircle2, AlertCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [emailReminders, setEmailReminders] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [digestSummary, setDigestSummary] = useState(true)

  // Change password state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [pwLoading, setPwLoading] = useState(false)
  const [pwMessage, setPwMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSaveProfile = () => {
    console.log("Saving profile", { name, email })
  }

  const handleManageAccount = () => {
    console.log("Manage account details")
  }

  const handleViewPrivacyPolicy = () => {
    console.log("View privacy policy")
  }

  const handleDeleteAccount = () => {
    console.log("Delete account")
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwMessage(null)

    if (!currentPassword) {
      setPwMessage({ type: "error", text: "Please enter your current password." })
      return
    }
    if (newPassword.length < 8) {
      setPwMessage({ type: "error", text: "New password must be at least 8 characters." })
      return
    }
    if (newPassword !== confirmPassword) {
      setPwMessage({ type: "error", text: "New passwords do not match." })
      return
    }

    setPwLoading(true)
    // Simulate API call — replace with real auth logic
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setPwLoading(false)

    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setPwMessage({ type: "success", text: "Password updated successfully." })
  }

  return (
    <div className="min-h-screen bg-[#F7F8F0]">
      <Navigation />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#355872]">
            Settings
          </h1>
          <p className="mt-1 text-sm text-[#5a7a94]">
            Manage your profile, notifications, account details, and privacy preferences for MailVault.
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <Card className="border-[#d1dde6] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#355872]">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex"
                    className="border-[#d1dde6]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="border-[#d1dde6]"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleSaveProfile}
                  className="bg-[#355872] text-[#F7F8F0] hover:bg-[#456b85]"
                >
                  Save profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-[#d1dde6] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#355872]">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor="email-reminders" className="text-sm font-medium text-[#355872]">
                    Email reminders
                  </Label>
                  <p className="text-xs text-[#5a7a94]">
                    Get emails about upcoming due dates, renewals, and important actions.
                  </p>
                </div>
                <Switch id="email-reminders" checked={emailReminders} onCheckedChange={setEmailReminders} />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor="push-notifications" className="text-sm font-medium text-[#355872]">
                    Push notifications
                  </Label>
                  <p className="text-xs text-[#5a7a94]">
                    Receive native push notifications on supported devices.
                  </p>
                </div>
                <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor="weekly-summary" className="text-sm font-medium text-[#355872]">
                    Weekly summary
                  </Label>
                  <p className="text-xs text-[#5a7a94]">
                    A digest of new documents, bills, and important mail once a week.
                  </p>
                </div>
                <Switch id="weekly-summary" checked={digestSummary} onCheckedChange={setDigestSummary} />
              </div>
            </CardContent>
          </Card>

          {/* Account */}
          <Card className="border-[#d1dde6] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#355872]">Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-[#5a7a94]">
              <p>
                View and manage the basics of your MailVault account, like your plan, storage usage,
                and sign-in details.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={handleManageAccount}
                className="border-[#d1dde6] text-[#355872] hover:bg-[#9CD5FF]/20"
              >
                Manage account details
              </Button>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="border-[#d1dde6] bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-[#355872]" />
                <CardTitle className="text-[#355872]">Change Password</CardTitle>
              </div>
              <CardDescription className="text-[#5a7a94]">
                Update your password to keep your account secure. Use at least 8 characters.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                {/* Current password */}
                <div className="space-y-1.5">
                  <Label htmlFor="current-password" className="text-[#355872]">Current password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPw ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                      className="border-[#d1dde6] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a7a94] hover:text-[#355872]"
                      aria-label={showCurrentPw ? "Hide password" : "Show password"}
                    >
                      {showCurrentPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* New password */}
                <div className="space-y-1.5">
                  <Label htmlFor="new-password" className="text-[#355872]">New password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPw ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="border-[#d1dde6] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a7a94] hover:text-[#355872]"
                      aria-label={showNewPw ? "Hide password" : "Show password"}
                    >
                      {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {newPassword.length > 0 && newPassword.length < 8 && (
                    <p className="text-xs text-[#e97451]">Must be at least 8 characters.</p>
                  )}
                </div>

                {/* Confirm new password */}
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-password" className="text-[#355872]">Confirm new password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPw ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your new password"
                      className="border-[#d1dde6] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a7a94] hover:text-[#355872]"
                      aria-label={showConfirmPw ? "Hide password" : "Show password"}
                    >
                      {showConfirmPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                    <p className="text-xs text-[#e97451]">Passwords do not match.</p>
                  )}
                </div>

                {/* Feedback message */}
                {pwMessage && (
                  <div
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                      pwMessage.type === "success"
                        ? "bg-[#e6f4ea] text-[#276b3c]"
                        : "bg-[#fff0ed] text-[#b14427]"
                    }`}
                  >
                    {pwMessage.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    )}
                    {pwMessage.text}
                  </div>
                )}

                <div className="flex justify-end pt-1">
                  <Button
                    type="submit"
                    disabled={pwLoading}
                    className="bg-[#355872] text-[#F7F8F0] hover:bg-[#456b85] disabled:opacity-60"
                  >
                    {pwLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Updating…
                      </span>
                    ) : (
                      "Update password"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Privacy & Data */}
          <Card className="border-[#d1dde6] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#355872]">Privacy &amp; Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-[#5a7a94]">
              <p>
                Control how your documents and derived data are used to power features like search,
                reminders, and AI summaries.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={handleViewPrivacyPolicy}
                className="border-[#d1dde6] text-[#355872] hover:bg-[#9CD5FF]/20"
              >
                View privacy policy
              </Button>
            </CardContent>
          </Card>

          {/* Delete account */}
          <Card className="border-[#e97451]/40 bg-[#fff7f5] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#b14427]">Delete account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-[#7a3a29]">
              <p>
                Permanently delete your MailVault account and all associated documents and data.
                This action cannot be undone.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={handleDeleteAccount}
                className="border-[#e97451] text-[#b14427] hover:bg-[#e97451]/10"
              >
                Delete account
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}