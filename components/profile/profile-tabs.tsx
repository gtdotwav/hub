"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MonetizationDashboardTab from "./monetization-dashboard-tab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

// Placeholder for a future Overview Tab
function OverviewTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
        <CardDescription>Esta é a aparência do seu perfil para outros usuários.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" defaultValue="Creator Exemplo" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="creator@exemplo.com" />
        </div>
        <Button>Salvar Alterações</Button>
      </CardContent>
    </Card>
  )
}

// Placeholder for a future Settings Tab
function SettingsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Avançadas</CardTitle>
        <CardDescription>Gerencie as configurações de notificações e tema.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Configurações de notificações e tema virão aqui...</p>
      </CardContent>
    </Card>
  )
}

export default function ProfileTabs() {
  return (
    <Tabs defaultValue="dashboard" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard de Monetização</TabsTrigger>
        <TabsTrigger value="settings">Configurações</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <OverviewTab />
      </TabsContent>
      <TabsContent value="dashboard" className="space-y-4">
        <MonetizationDashboardTab />
      </TabsContent>
      <TabsContent value="settings" className="space-y-4">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  )
}
