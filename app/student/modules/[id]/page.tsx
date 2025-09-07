import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Play, FileText, Brain, Clock, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ContentViewer } from "@/components/modules/content-viewer"

// Mock data - will be replaced with real data from database
const getModuleData = (id: string) => {
  const modules = {
    "1": {
      id: 1,
      title: "Identificação e Diagnóstico Precoce do TEA",
      description: "Aprenda sobre os sinais precoces e métodos de diagnóstico do Transtorno do Espectro Autista",
      progress: 100,
      status: "completed",
      timeSpent: 120,
      estimatedTime: 180,
      contents: [
        {
          id: 1,
          type: "video",
          title: "Introdução ao TEA",
          duration: 15,
          completed: true,
          url: "/placeholder-ijg13.png",
          description:
            "Uma visão geral sobre o Transtorno do Espectro Autista, suas características principais e a importância do diagnóstico precoce.",
        },
        {
          id: 2,
          type: "video",
          title: "Sinais Precoces do Autismo",
          duration: 20,
          completed: true,
          url: "/placeholder-wrpkz.png",
          description: "Identificação dos primeiros sinais e sintomas do TEA em crianças pequenas.",
        },
        {
          id: 3,
          type: "podcast",
          title: "Experiências de Diagnóstico",
          duration: 25,
          completed: true,
          url: "/placeholder-gy05g.png",
          description: "Depoimentos de profissionais e famílias sobre o processo de diagnóstico.",
        },
        {
          id: 4,
          type: "mindmap",
          title: "Características do TEA",
          duration: 5,
          completed: true,
          url: "/placeholder-5ivb7.png",
          description: "Mapa mental interativo das principais características do espectro autista.",
        },
      ],
    },
    "2": {
      id: 2,
      title: "Intervenções Precoces e Desenvolvimento no TEA",
      description: "Compreenda as intervenções essenciais para o desenvolvimento de crianças com TEA",
      progress: 60,
      status: "in_progress",
      timeSpent: 45,
      estimatedTime: 160,
      contents: [
        {
          id: 5,
          type: "video",
          title: "Tipos de Intervenção",
          duration: 18,
          completed: true,
          url: "/placeholder-t9h6b.png",
          description: "Diferentes tipos de intervenções terapêuticas para crianças com TEA.",
        },
        {
          id: 6,
          type: "video",
          title: "Desenvolvimento Motor",
          duration: 22,
          completed: false,
          url: "/placeholder-uwypj.png",
          description: "Como apoiar o desenvolvimento motor em crianças com TEA.",
        },
        {
          id: 7,
          type: "podcast",
          title: "Casos de Sucesso",
          duration: 30,
          completed: false,
          url: "/placeholder-tvko2.png",
          description: "Histórias inspiradoras de sucesso em intervenções precoces.",
        },
        {
          id: 8,
          type: "mindmap",
          title: "Estratégias de Intervenção",
          duration: 5,
          completed: false,
          url: "/placeholder-bcjvn.png",
          description: "Mapa mental das principais estratégias de intervenção.",
        },
      ],
    },
  }

  return modules[id as keyof typeof modules] || null
}

interface ModulePageProps {
  params: {
    id: string
  }
}

export default function ModulePage({ params }: ModulePageProps) {
  const module = getModuleData(params.id)

  if (!module) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Módulo não encontrado</h1>
          <Link href="/student/modules">
            <Button>Voltar aos Módulos</Button>
          </Link>
        </div>
      </div>
    )
  }

  const completedContents = module.contents.filter((c) => c.completed).length
  const totalContents = module.contents.length

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/student/modules">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Módulos
          </Button>
        </Link>
      </div>

      {/* Module Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{module.title}</h1>
            <p className="text-muted-foreground mb-4">{module.description}</p>
          </div>
          <Badge variant={module.status === "completed" ? "default" : "secondary"} className="ml-4">
            {module.status === "completed" ? "Concluído" : "Em Progresso"}
          </Badge>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progresso Geral</span>
                  <span>{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {module.timeSpent} / {module.estimatedTime} minutos
                </span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {completedContents} / {totalContents} conteúdos
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {module.contents.map((content, index) => (
          <Card key={content.id} className={content.completed ? "border-green-200 bg-green-50/50" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {content.type === "video" && <Play className="w-4 h-4 text-primary" />}
                    {content.type === "podcast" && <FileText className="w-4 h-4 text-secondary" />}
                    {content.type === "mindmap" && <Brain className="w-4 h-4 text-accent" />}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{content.title}</CardTitle>
                    <CardDescription className="mt-1">{content.description}</CardDescription>
                  </div>
                </div>
                {content.completed && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
              </div>
            </CardHeader>

            <CardContent>
              <ContentViewer content={content} />

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{content.duration} minutos</span>
                </div>

                <Button size="sm" variant={content.completed ? "outline" : "default"}>
                  {content.completed ? "Revisar" : "Iniciar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t">
        <div>
          {Number.parseInt(params.id) > 1 && (
            <Link href={`/student/modules/${Number.parseInt(params.id) - 1}`}>
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Módulo Anterior
              </Button>
            </Link>
          )}
        </div>

        <div>
          {Number.parseInt(params.id) < 5 && module.status === "completed" && (
            <Link href={`/student/modules/${Number.parseInt(params.id) + 1}`}>
              <Button>
                Próximo Módulo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
