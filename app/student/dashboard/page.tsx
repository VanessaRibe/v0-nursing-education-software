"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Award, Loader2 } from "lucide-react"
import { api, type Modulo } from "@/lib/api"

interface ModuloComProgresso extends Modulo {
  progress: number
  status: "completed" | "in_progress" | "locked"
  timeSpent: number
  contents: Array<{
    type: string
    title: string
    completed: boolean
  }>
}

export default function StudentDashboard() {
  const [modules, setModules] = useState<ModuloComProgresso[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [modulosData, progressoData] = await Promise.all([api.listarModulos(), api.obterProgressoGeral()])

        // Transform API data to match component interface
        const modulosComProgresso: ModuloComProgresso[] = modulosData.map((modulo, index) => ({
          ...modulo,
          progress: progressoData.modulos?.[modulo.id]?.progresso || 0,
          status:
            progressoData.modulos?.[modulo.id]?.progresso >= 100
              ? "completed"
              : progressoData.modulos?.[modulo.id]?.progresso > 0
                ? "in_progress"
                : index === 0 || progressoData.modulos?.[modulosData[index - 1]?.id]?.progresso >= 100
                  ? "in_progress"
                  : "locked",
          timeSpent: progressoData.modulos?.[modulo.id]?.tempo_gasto || 0,
          contents: [], // Will be loaded when module is accessed
        }))

        setModules(modulosComProgresso)
      } catch (err) {
        console.error("[v0] Error loading dashboard data:", err)
        setError("Erro ao carregar dados do painel")
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
          <span>Carregando painel...</span>
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

  const overallProgress = Math.round(modules.reduce((acc, module) => acc + module.progress, 0) / modules.length)
  const totalTimeSpent = modules.reduce((acc, module) => acc + module.timeSpent, 0)

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
                      <CardTitle className="text-lg mb-2">{module.titulo}</CardTitle>
                      <CardDescription className="text-sm">{module.descricao}</CardDescription>
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
                      asChild={module.status !== "locked"}
                    >
                      {module.status === "locked" ? (
                        "Bloqueado"
                      ) : (
                        <a href={`/student/modules/${module.id}`}>
                          {module.status === "completed"
                            ? "Revisar Módulo"
                            : module.status === "in_progress"
                              ? "Continuar"
                              : "Iniciar Módulo"}
                        </a>
                      )}
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
