import type { Metadata } from "next"
import ProfileTabs from "@/components/profile/profile-tabs"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Meu Perfil | CreatorHub",
  description: "Gerencie seu perfil, acompanhe seu progresso e configure sua conta.",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Meu Perfil</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Gerencie suas informações, acompanhe seu progresso e configure sua conta.
        </p>
      </div>
      <Separator />
      <ProfileTabs />
    </div>
  )
}
