import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Award, Play, FileText, Brain } from "lucide-react"

// Mock data - will be replaced with real data from database
const modules = [
  {
    id: 1,
    title: "Identificação e Diagnóstico Precoce do TEA",
    description: "Aprenda sobre os sinais precoces e métodos de diagnóstico do Transtorno do Espectro Autista",
    progress: 100,
    status: "completed",
    timeSpent: 120,
    contents: [
      { type: "video", title: "Introdução ao TEA", completed: true },
      { type: "video", title: "Sinais Precoces", completed: true },
      { type: "podcast", title: "Experiências de Diagnóstico", completed: true },
      { type: "mindmap", title: "Características do TEA", completed: true },
    ],
  },
  {
    id: 2,
    title: "Intervenções Precoces e Desenvolvimento no TEA",
    description: "Compreenda as intervenções essenciais para o desenvolvimento de crianças com TEA",
    progress: 60,
    status: "in_progress",
    timeSpent: 45,
    contents: [
      { type: "video", title: "Tipos de Intervenção", completed: true },
      { type: "video", title: "Desenvolvimento Motor", completed: false },
      { type: "podcast", title: "Casos de Sucesso", completed: false },
    ],
  },
  {
    id: 3,
    title: "Desafios Familiares e Apoio no Cuidado",
    description: "Explore o impacto familiar e estratégias de apoio no cuidado de crianças com TEA",
    progress: 0,
    status: "locked",
    timeSpent: 0,
    contents: [],
  },
  {
    id: 4,
    title: "Comunicação e Personalização do Cuidado",
    description: "Desenvolva habilidades de comunicação e personalização do cuidado",
    progress: 0,
    status: "locked",
    timeSpent: 0,
    contents: [],
  },
  {
    id: 5,
    title: "Adaptação Ambiental e Qualidade de Vida",
    description: "Aprenda sobre adaptações ambientais e planos de cuidados de enfermagem",
    progress: 0,
    status: "locked",
    timeSpent: 0,
    contents: [],
  },
]

const overallProgress = Math.round(modules.reduce((acc, module) => acc + module.progress, 0) / modules.length)
const totalTimeSpent = modules.reduce((acc, module) => acc + module.timeSpent, 0)

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Painel do Estudante</h1>
          <p className="text-muted-foreground">Bem-vindo ao curso de Humanização do Cuidado no TEA</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo de Estudo</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.floor(totalTimeSpent / 60)}h {totalTimeSpent % 60}m
              </div>
              <p className="text-xs text-muted-foreground mt-2">Total acumulado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificação</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress >= 80 ? "Disponível" : "Pendente"}</div>
              <p className="text-xs text-muted-foreground mt-2">
                {overallProgress >= 80 ? "Parabéns!" : `${80 - overallProgress}% restante`}
              </p>
              {overallProgress >= 80 && (
                <Button size="sm" className="mt-2 w-full" asChild>
                  <a href="/student/certificate">Ver Certificado</a>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso Detalhado</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {modules.filter((m) => m.status === "completed").length}/{modules.length}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Módulos concluídos</p>
              <Button size="sm" variant="outline" className="mt-2 w-full bg-transparent" asChild>
                <a href="/student/progress">Ver Detalhes</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Módulos de Aprendizagem</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modules.map((module) => (
              <Card key={module.id} className={`${module.status === "locked" ? "opacity-60" : ""}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{module.title}</CardTitle>
                      <CardDescription className="text-sm">{module.description}</CardDescription>
                    </div>
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
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progresso</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} />
                    </div>

                    {/* Content Types */}
                    {module.contents.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {module.contents.map((content, index) => (
                          <div key={index} className="flex items-center gap-1 text-xs">
                            {content.type === "video" && <Play className="h-3 w-3" />}
                            {content.type === "podcast" && <FileText className="h-3 w-3" />}
                            {content.type === "mindmap" && <Brain className="h-3 w-3" />}
                            <span className={content.completed ? "line-through text-muted-foreground" : ""}>
                              {content.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Time Spent */}
                    {module.timeSpent > 0 && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{module.timeSpent} minutos estudados</span>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      className="w-full"
                      disabled={module.status === "locked"}
                      variant={module.status === "completed" ? "outline" : "default"}
                    >
                      {module.status === "completed"
                        ? "Revisar Módulo"
                        : module.status === "in_progress"
                          ? "Continuar"
                          : "Bloqueado"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
