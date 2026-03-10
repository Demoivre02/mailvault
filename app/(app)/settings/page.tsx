"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

  const handleSaveProfile = () => {
    // Replace with your API call / server action
    console.log("Saving profile", { name, email })
  }

  const handleManageAccount = () => {
    // Replace with router push or modal open
    console.log("Manage account details")
  }

  const handleViewPrivacyPolicy = () => {
    // Replace with router push or external link
    console.log("View privacy policy")
  }

  const handleDeleteAccount = () => {
    // Replace with confirmation modal + delete flow
    console.log("Delete account")
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

          <Card className="border-[#d1dde6] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#355872]">Notifications</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label
                    htmlFor="email-reminders"
                    className="text-sm font-medium text-[#355872]"
                  >
                    Email reminders
                  </Label>
                  <p className="text-xs text-[#5a7a94]">
                    Get emails about upcoming due dates, renewals, and important actions.
                  </p>
                </div>
                <Switch
                  id="email-reminders"
                  checked={emailReminders}
                  onCheckedChange={setEmailReminders}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label
                    htmlFor="push-notifications"
                    className="text-sm font-medium text-[#355872]"
                  >
                    Push notifications
                  </Label>
                  <p className="text-xs text-[#5a7a94]">
                    Receive native push notifications on supported devices.
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label
                    htmlFor="weekly-summary"
                    className="text-sm font-medium text-[#355872]"
                  >
                    Weekly summary
                  </Label>
                  <p className="text-xs text-[#5a7a94]">
                    A digest of new documents, bills, and important mail once a week.
                  </p>
                </div>
                <Switch
                  id="weekly-summary"
                  checked={digestSummary}
                  onCheckedChange={setDigestSummary}
                />
              </div>
            </CardContent>
          </Card>

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