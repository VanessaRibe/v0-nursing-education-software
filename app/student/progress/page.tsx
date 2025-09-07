import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Clock, Target, BookOpen, Award } from "lucide-react"

// Mock data for detailed progress tracking
const progressData = {
  student: {
    name: "Maria Silva Santos",
    enrollmentDate: "2024-01-01",
    lastAccess: "2024-01-15",
    totalTimeSpent: 2400, // minutes
    averageSessionTime: 45, // minutes
  },
  modules: [
    {
      id: 1,
      name: "Identificação e Diagnóstico",
      progress: 100,
      timeSpent: 720,
      quizScore: 95,
      status: "completed",
      completedDate: "2024-01-05",
    },
    {
      id: 2,
      name: "Intervenções Precoces",
      progress: 100,
      timeSpent: 680,
      quizScore: 88,
      status: "completed",
      completedDate: "2024-01-08",
    },
    {
      id: 3,
      name: "Desafios Familiares",
      progress: 100,
      timeSpent: 600,
      quizScore: 90,
      status: "completed",
      completedDate: "2024-01-11",
    },
    {
      id: 4,
      name: "Comunicação e Personalização",
      progress: 75,
      timeSpent: 300,
      quizScore: 0,
      status: "in_progress",
      completedDate: null,
    },
    {
      id: 5,
      name: "Adaptação Ambiental",
      progress: 0,
      timeSpent: 0,
      quizScore: 0,
      status: "locked",
      completedDate: null,
    },
  ],
  weeklyProgress: [
    { week: "Sem 1", timeSpent: 300, modulesCompleted: 1 },
    { week: "Sem 2", timeSpent: 450, modulesCompleted: 2 },
    { week: "Sem 3", timeSpent: 380, modulesCompleted: 1 },
    { week: "Sem 4", timeSpent: 200, modulesCompleted: 0 },
  ],
  contentTypes: [
    { name: "Vídeos", value: 40, color: "#3b82f6" },
    { name: "Podcasts", value: 30, color: "#06b6d4" },
    { name: "Mapas Mentais", value: 20, color: "#8b5cf6" },
    { name: "Quizzes", value: 10, color: "#10b981" },
  ],
}

const overallProgress = Math.round(
  progressData.modules.reduce((acc, module) => acc + module.progress, 0) / progressData.modules.length,
)
const completedModules = progressData.modules.filter((m) => m.status === "completed").length
const averageScore = Math.round(
  progressData.modules.filter((m) => m.quizScore > 0).reduce((acc, module) => acc + module.quizScore, 0) /
    progressData.modules.filter((m) => m.quizScore > 0).length,
)

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Acompanhamento de Progresso</h1>
          <p className="text-muted-foreground">Análise detalhada do seu desempenho no curso</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Módulos Concluídos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{completedModules}/5</div>
              <p className="text-xs text-muted-foreground mt-2">{5 - completedModules} restantes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Total</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.floor(progressData.student.totalTimeSpent / 60)}h {progressData.student.totalTimeSpent % 60}m
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Média: {progressData.student.averageSessionTime}min/sessão
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nota Média</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{averageScore}%</div>
              <Badge variant={averageScore >= 80 ? "default" : "secondary"} className="mt-2">
                {averageScore >= 80 ? "Aprovado" : "Em Progresso"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Progresso Semanal
              </CardTitle>
              <CardDescription>Tempo de estudo e módulos concluídos por semana</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData.weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="timeSpent" fill="#3b82f6" name="Tempo (min)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Content Types Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Conteúdo</CardTitle>
              <CardDescription>Tempo gasto por tipo de conteúdo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={progressData.contentTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {progressData.contentTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Module Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progresso Detalhado por Módulo</CardTitle>
            <CardDescription>Status completo de cada módulo do curso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressData.modules.map((module) => (
                <div key={module.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{module.name}</h4>
                    <Badge
                      variant={
                        module.status === "completed"
                          ? "default"
                          : module.status === "in_progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {module.status === "completed"
                        ? "Concluído"
                        : module.status === "in_progress"
                          ? "Em Progresso"
                          : "Bloqueado"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Progresso</div>
                      <div className="font-semibold">{module.progress}%</div>
                      <Progress value={module.progress} className="mt-1" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Tempo Gasto</div>
                      <div className="font-semibold">
                        {Math.floor(module.timeSpent / 60)}h {module.timeSpent % 60}m
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Nota do Quiz</div>
                      <div className="font-semibold">
                        {module.quizScore > 0 ? `${module.quizScore}%` : "Não realizado"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Data de Conclusão</div>
                      <div className="font-semibold">
                        {module.completedDate
                          ? new Date(module.completedDate).toLocaleDateString("pt-BR")
                          : "Não concluído"}
                      </div>
                    </div>
                  </div>

                  {module.status !== "locked" && (
                    <Button variant="outline" size="sm">
                      {module.status === "completed" ? "Revisar" : "Continuar"}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
