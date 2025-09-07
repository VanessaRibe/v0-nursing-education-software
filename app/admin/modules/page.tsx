import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Edit, Eye, Trash2, Settings, Users, Clock, FileText } from "lucide-react"

// Mock data - will be replaced with real data from database
const modules = [
  {
    id: 1,
    title: "Identificação e Diagnóstico Precoce do TEA",
    description: "Aprenda sobre os sinais precoces e métodos de diagnóstico do Transtorno do Espectro Autista",
    order: 1,
    isActive: true,
    enrolledStudents: 142,
    completionRate: 95,
    averageTime: 180,
    contents: [
      { type: "video", count: 2 },
      { type: "podcast", count: 1 },
      { type: "mindmap", count: 1 },
    ],
    quiz: {
      questions: 10,
      averageScore: 87,
      attempts: 45,
    },
  },
  {
    id: 2,
    title: "Intervenções Precoces e Desenvolvimento no TEA",
    description: "Compreenda as intervenções essenciais para o desenvolvimento de crianças com TEA",
    order: 2,
    isActive: true,
    enrolledStudents: 98,
    completionRate: 78,
    averageTime: 160,
    contents: [
      { type: "video", count: 2 },
      { type: "podcast", count: 1 },
      { type: "mindmap", count: 1 },
    ],
    quiz: {
      questions: 12,
      averageScore: 78,
      attempts: 32,
    },
  },
  {
    id: 3,
    title: "Desafios Familiares e Apoio no Cuidado",
    description: "Explore o impacto familiar e estratégias de apoio no cuidado de crianças com TEA",
    order: 3,
    isActive: true,
    enrolledStudents: 67,
    completionRate: 65,
    averageTime: 170,
    contents: [
      { type: "video", count: 2 },
      { type: "podcast", count: 1 },
      { type: "mindmap", count: 1 },
    ],
    quiz: {
      questions: 8,
      averageScore: 82,
      attempts: 18,
    },
  },
  {
    id: 4,
    title: "Comunicação e Personalização do Cuidado",
    description: "Desenvolva habilidades de comunicação e personalização do cuidado",
    order: 4,
    isActive: false,
    enrolledStudents: 34,
    completionRate: 45,
    averageTime: 150,
    contents: [
      { type: "video", count: 2 },
      { type: "podcast", count: 1 },
      { type: "mindmap", count: 1 },
    ],
    quiz: {
      questions: 10,
      averageScore: 79,
      attempts: 5,
    },
  },
  {
    id: 5,
    title: "Adaptação Ambiental e Qualidade de Vida",
    description: "Aprenda sobre adaptações ambientais e planos de cuidados de enfermagem",
    order: 5,
    isActive: false,
    enrolledStudents: 12,
    completionRate: 30,
    averageTime: 190,
    contents: [
      { type: "video", count: 3 },
      { type: "podcast", count: 1 },
      { type: "mindmap", count: 1 },
    ],
    quiz: {
      questions: 15,
      averageScore: 88,
      attempts: 0,
    },
  },
]

const stats = {
  totalModules: modules.length,
  activeModules: modules.filter((m) => m.isActive).length,
  totalStudents: modules.reduce((acc, m) => Math.max(acc, m.enrolledStudents), 0),
  averageCompletion: Math.round(modules.reduce((acc, m) => acc + m.completionRate, 0) / modules.length),
}

export default function AdminModulesPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gerenciar Módulos</h1>
          <p className="text-muted-foreground">Administre o conteúdo e estrutura dos módulos de aprendizagem</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Módulo
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Módulos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalModules}</div>
            <p className="text-xs text-muted-foreground">{stats.activeModules} ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudantes Inscritos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">No primeiro módulo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageCompletion}%</div>
            <p className="text-xs text-muted-foreground">Média geral</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(modules.reduce((acc, m) => acc + m.averageTime, 0) / modules.length)} min
            </div>
            <p className="text-xs text-muted-foreground">Por módulo</p>
          </CardContent>
        </Card>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{module.order}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <Badge variant={module.isActive ? "default" : "secondary"}>
                        {module.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <CardDescription className="mb-4">{module.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {/* Module Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Estudantes:</span>
                    <div className="font-medium">{module.enrolledStudents}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Taxa de Conclusão:</span>
                    <div className="font-medium">{module.completionRate}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tempo Médio:</span>
                    <div className="font-medium">{module.averageTime} min</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Nota Média Quiz:</span>
                    <div className="font-medium">{module.quiz.averageScore}%</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Taxa de Conclusão</span>
                    <span>{module.completionRate}%</span>
                  </div>
                  <Progress value={module.completionRate} className="h-2" />
                </div>

                {/* Content Summary */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>{module.contents.find((c) => c.type === "video")?.count || 0} vídeos</span>
                  <span>{module.contents.find((c) => c.type === "podcast")?.count || 0} podcasts</span>
                  <span>{module.contents.find((c) => c.type === "mindmap")?.count || 0} mapas mentais</span>
                  <span>{module.quiz.questions} questões no quiz</span>
                  <span>{module.quiz.attempts} tentativas de quiz</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
