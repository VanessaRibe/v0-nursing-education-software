import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, FileQuestion, TrendingUp, Plus, Settings, Download, Eye } from "lucide-react"

// Mock data - will be replaced with real data from database
const stats = {
  totalStudents: 156,
  activeModules: 5,
  totalQuizzes: 15,
  averageCompletion: 67,
}

const recentStudents = [
  { id: 1, name: "Maria Silva", email: "maria@email.com", progress: 80, lastAccess: "2 horas atrás" },
  { id: 2, name: "João Santos", email: "joao@email.com", progress: 45, lastAccess: "1 dia atrás" },
  { id: 3, name: "Ana Costa", email: "ana@email.com", progress: 100, lastAccess: "30 min atrás" },
  { id: 4, name: "Pedro Lima", email: "pedro@email.com", progress: 23, lastAccess: "3 dias atrás" },
]

const modules = [
  { id: 1, title: "Identificação e Diagnóstico Precoce", students: 142, avgScore: 85 },
  { id: 2, title: "Intervenções Precoces", students: 98, avgScore: 78 },
  { id: 3, title: "Desafios Familiares", students: 67, avgScore: 82 },
  { id: 4, title: "Comunicação e Personalização", students: 34, avgScore: 79 },
  { id: 5, title: "Adaptação Ambiental", students: 12, avgScore: 88 },
]

export default function AdminDashboard() {
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
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Relatórios
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Conteúdo
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
              <p className="text-xs text-muted-foreground">3 por módulo</p>
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
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
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
                {modules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{module.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {module.students} estudantes • Nota média: {module.avgScore}%
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
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
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Plus className="h-6 w-6 mb-2" />
                Adicionar Módulo
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <FileQuestion className="h-6 w-6 mb-2" />
                Criar Quiz
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Users className="h-6 w-6 mb-2" />
                Gerenciar Usuários
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Download className="h-6 w-6 mb-2" />
                Exportar Dados
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
