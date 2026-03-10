import { Navigation } from "@/components/navigation"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentMail } from "@/components/dashboard/recent-mail"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F7F8F0]">
      <Navigation />
      <main className="mx-auto md:max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#355872]">Dashboard</h1>
          <p className="mt-1 text-[#5a7a94]">
            Welcome back. Here&apos;s an overview of your mail.
          </p>
        </div>
        
        <div className="space-y-8">
          <StatsCards />
          
          <div className="grid gap-8 md:grid-cols-3 grid-cols-1">
            <div className="lg:col-span-2">
              <RecentMail />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
