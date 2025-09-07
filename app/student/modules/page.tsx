import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Play, FileText, Brain, Lock, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock data - will be replaced with real data from database
const modules = [
  {
    id: 1,
    title: "Identificação e Diagnóstico Precoce do TEA",
    description: "Aprenda sobre os sinais precoces e métodos de diagnóstico do Transtorno do Espectro Autista",
    progress: 100,
    status: "completed",
    timeSpent: 120,
    estimatedTime: 180,
    contents: [
      { id: 1, type: "video", title: "Introdução ao TEA", duration: 15, completed: true },
      { id: 2, type: "video", title: "Sinais Precoces do Autismo", duration: 20, completed: true },
      { id: 3, type: "podcast", title: "Experiências de Diagnóstico", duration: 25, completed: true },
      { id: 4, type: "mindmap", title: "Características do TEA", duration: 5, completed: true },
    ],
  },
  {
    id: 2,
    title: "Intervenções Precoces e Desenvolvimento no TEA",
    description: "Compreenda as intervenções essenciais para o desenvolvimento de crianças com TEA",
    progress: 60,
    status: "in_progress",
    timeSpent: 45,
    estimatedTime: 160,
    contents: [
      { id: 5, type: "video", title: "Tipos de Intervenção", duration: 18, completed: true },
      { id: 6, type: "video", title: "Desenvolvimento Motor", duration: 22, completed: false },
      { id: 7, type: "podcast", title: "Casos de Sucesso", duration: 30, completed: false },
      { id: 8, type: "mindmap", title: "Estratégias de Intervenção", duration: 5, completed: false },
    ],
  },
  {
    id: 3,
    title: "Desafios Familiares e Apoio no Cuidado",
    description: "Explore o impacto familiar e estratégias de apoio no cuidado de crianças com TEA",
    progress: 0,
    status: "locked",
    timeSpent: 0,
    estimatedTime: 170,
    contents: [
      { id: 9, type: "video", title: "Impacto Familiar", duration: 20, completed: false },
      { id: 10, type: "video", title: "Estratégias de Apoio", duration: 25, completed: false },
      { id: 11, type: "podcast", title: "Depoimentos de Famílias", duration: 35, completed: false },
      { id: 12, type: "mindmap", title: "Rede de Apoio", duration: 5, completed: false },
    ],
  },
  {
    id: 4,
    title: "Comunicação e Personalização do Cuidado",
    description: "Desenvolva habilidades de comunicação e personalização do cuidado",
    progress: 0,
    status: "locked",
    timeSpent: 0,
    estimatedTime: 150,
    contents: [
      { id: 13, type: "video", title: "Técnicas de Comunicação", duration: 18, completed: false },
      { id: 14, type: "video", title: "Personalização do Cuidado", duration: 22, completed: false },
      { id: 15, type: "podcast", title: "Comunicação Efetiva", duration: 28, completed: false },
      { id: 16, type: "mindmap", title: "Estratégias Comunicativas", duration: 5, completed: false },
    ],
  },
  {
    id: 5,
    title: "Adaptação Ambiental e Qualidade de Vida",
    description: "Aprenda sobre adaptações ambientais e planos de cuidados de enfermagem",
    progress: 0,
    status: "locked",
    timeSpent: 0,
    estimatedTime: 190,
    contents: [
      { id: 17, type: "video", title: "Adaptações Ambientais", duration: 25, completed: false },
      { id: 18, type: "video", title: "Planos de Cuidado", duration: 30, completed: false },
      { id: 19, type: "podcast", title: "Qualidade de Vida", duration: 32, completed: false },
      { id: 20, type: "mindmap", title: "Ambiente Terapêutico", duration: 5, completed: false },
    ],
  },
]

export default function ModulesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Módulos de Aprendizagem</h1>
        <p className="text-muted-foreground">
          Progresso sequencial através dos 5 módulos sobre humanização do cuidado no TEA
        </p>
      </div>

      <div className="space-y-6">
        {modules.map((module, index) => (
          <Card key={module.id} className={`${module.status === "locked" ? "opacity-60" : ""}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                    <CardDescription className="text-sm mb-4">{module.description}</CardDescription>

                    {/* Progress and Status */}
                    <div className="flex items-center gap-4 mb-4">
                      <Badge
                        variant={
                          module.status === "completed"
                            ? "default"
                            : module.status === "in_progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {module.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {module.status === "locked" && <Lock className="w-3 h-3 mr-1" />}
                        {module.status === "completed"
                          ? "Concluído"
                          : module.status === "in_progress"
                            ? "Em Progresso"
                            : "Bloqueado"}
                      </Badge>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          {module.timeSpent}min / {module.estimatedTime}min
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progresso do Módulo</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Content List */}
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Conteúdo do Módulo
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {module.contents.map((content) => (
                    <div
                      key={content.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        content.completed
                          ? "bg-muted/50 border-muted"
                          : module.status === "locked"
                            ? "bg-muted/20 border-muted"
                            : "bg-background border-border hover:bg-muted/30"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {content.type === "video" && (
                          <Play className={`w-4 h-4 ${content.completed ? "text-muted-foreground" : "text-primary"}`} />
                        )}
                        {content.type === "podcast" && (
                          <FileText
                            className={`w-4 h-4 ${content.completed ? "text-muted-foreground" : "text-secondary"}`}
                          />
                        )}
                        {content.type === "mindmap" && (
                          <Brain className={`w-4 h-4 ${content.completed ? "text-muted-foreground" : "text-accent"}`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium ${content.completed ? "line-through text-muted-foreground" : ""}`}
                        >
                          {content.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{content.duration} min</p>
                      </div>
                      {content.completed && <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {module.status === "locked" && "Complete o módulo anterior para desbloquear"}
                  {module.status === "completed" && "Módulo concluído com sucesso"}
                  {module.status === "in_progress" && "Continue de onde parou"}
                </div>

                <Link href={module.status !== "locked" ? `/student/modules/${module.id}` : "#"}>
                  <Button
                    disabled={module.status === "locked"}
                    variant={module.status === "completed" ? "outline" : "default"}
                  >
                    {module.status === "completed"
                      ? "Revisar Módulo"
                      : module.status === "in_progress"
                        ? "Continuar"
                        : "Bloqueado"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
