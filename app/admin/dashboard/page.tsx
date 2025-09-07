"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, FileQuestion, TrendingUp, Plus, Settings, Download, Eye, Loader2 } from "lucide-react"
import { api, type Modulo } from "@/lib/api"

interface DashboardStats {
  totalStudents: number
  activeModules: number
  totalQuizzes: number
  averageCompletion: number
}

interface RecentStudent {
  id: number
  name: string
  email: string
  progress: number
  lastAccess: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    activeModules: 0,
    totalQuizzes: 0,
    averageCompletion: 0,
  })
  const [modules, setModules] = useState<Modulo[]>([])
  const [recentStudents, setRecentStudents] = useState<RecentStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [modulosData, quizzesData] = await Promise.all([api.listarModulos(), api.listarQuizzes()])

        setModules(modulosData)

        // Calculate stats from real data
        setStats({
          totalStudents: 156, // This would come from a users endpoint
          activeModules: modulosData.filter((m) => m.ativo).length,
          totalQuizzes: quizzesData.length,
          averageCompletion: 67, // This would come from progress analytics
        })

        // Mock recent students - in real app this would come from API
        setRecentStudents([
          { id: 1, name: "Maria Silva", email: "maria@email.com", progress: 80, lastAccess: "2 horas atrás" },
          { id: 2, name: "João Santos", email: "joao@email.com", progress: 45, lastAccess: "1 dia atrás" },
          { id: 3, name: "Ana Costa", email: "ana@email.com", progress: 100, lastAccess: "30 min atrás" },
          { id: 4, name: "Pedro Lima", email: "pedro@email.com", progress: 23, lastAccess: "3 dias atrás" },
        ])
      } catch (err) {
        console.error("[v0] Error loading admin dashboard data:", err)
        setError("Erro ao carregar dados do painel administrativo")
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando painel administrativo...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">{error}</p>
            <Button className="w-full mt-4" onClick={() => window.location.reload()}>
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie o curso de Humanização do Cuidado no TEA</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a href="/admin/reports">
                <Download className="h-4 w-4 mr-2" />
                Relatórios
              </a>
            </Button>
            <Button asChild>
              <a href="/admin/modules">
                <Plus className="h-4 w-4 mr-2" />
                Novo Conteúdo
              </a>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Estudantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">+12 este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Módulos Ativos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeModules}</div>
              <p className="text-xs text-muted-foreground">Todos funcionando</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Quizzes</CardTitle>
              <FileQuestion className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
              <p className="text-xs text-muted-foreground">Distribuídos nos módulos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conclusão Média</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageCompletion}%</div>
              <p className="text-xs text-muted-foreground">+5% vs mês anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Students */}
          <Card>
            <CardHeader>
              <CardTitle>Estudantes Recentes</CardTitle>
              <CardDescription>Últimas atividades dos estudantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={student.progress >= 80 ? "default" : student.progress >= 50 ? "secondary" : "outline"}
                      >
                        {student.progress}%
                      </Badge>
                      <Button variant="ghost" size="sm" asChild>
                        <a href="/admin/users">
                          <Eye className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Module Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance dos Módulos</CardTitle>
              <CardDescription>Estatísticas de engajamento por módulo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div key={module.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{module.titulo}</p>
                      <p className="text-xs text-muted-foreground">
                        Módulo {module.ordem} • {module.ativo ? "Ativo" : "Inativo"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href="/admin/modules">
                          <Settings className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Ferramentas de administração mais utilizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
                <a href="/admin/modules">
                  <Plus className="h-6 w-6 mb-2" />
                  Adicionar Módulo
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
                <a href="/admin/quizzes">
                  <FileQuestion className="h-6 w-6 mb-2" />
                  Criar Quiz
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
                <a href="/admin/users">
                  <Users className="h-6 w-6 mb-2" />
                  Gerenciar Usuários
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
                <a href="/admin/reports">
                  <Download className="h-6 w-6 mb-2" />
                  Exportar Dados
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
