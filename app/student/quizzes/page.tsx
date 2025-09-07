import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, FileQuestion, CheckCircle, AlertCircle, Play } from "lucide-react"
import Link from "next/link"

// Mock data - will be replaced with real data from database
const quizzes = [
  {
    id: 1,
    moduleId: 1,
    moduleTitle: "Identificação e Diagnóstico Precoce do TEA",
    title: "Avaliação: Identificação e Diagnóstico",
    description: "Teste seus conhecimentos sobre identificação e diagnóstico precoce do TEA",
    questions: 10,
    timeLimit: 30,
    passingScore: 80,
    attempts: [
      { id: 1, score: 85, percentage: 85, passed: true, completedAt: "2024-01-15" },
      { id: 2, score: 92, percentage: 92, passed: true, completedAt: "2024-01-20" },
    ],
    bestScore: 92,
    status: "completed",
    isAvailable: true,
  },
  {
    id: 2,
    moduleId: 2,
    moduleTitle: "Intervenções Precoces e Desenvolvimento no TEA",
    title: "Avaliação: Intervenções Precoces",
    description: "Avalie seu entendimento sobre intervenções essenciais para o desenvolvimento",
    questions: 12,
    timeLimit: 35,
    passingScore: 80,
    attempts: [{ id: 3, score: 75, percentage: 75, passed: false, completedAt: "2024-01-22" }],
    bestScore: 75,
    status: "failed",
    isAvailable: true,
  },
  {
    id: 3,
    moduleId: 3,
    moduleTitle: "Desafios Familiares e Apoio no Cuidado",
    title: "Avaliação: Desafios Familiares",
    description: "Teste seus conhecimentos sobre impacto familiar e estratégias de apoio",
    questions: 8,
    timeLimit: 25,
    passingScore: 80,
    attempts: [],
    bestScore: null,
    status: "available",
    isAvailable: true,
  },
  {
    id: 4,
    moduleId: 4,
    moduleTitle: "Comunicação e Personalização do Cuidado",
    title: "Avaliação: Comunicação",
    description: "Avalie suas habilidades de comunicação e personalização do cuidado",
    questions: 10,
    timeLimit: 30,
    passingScore: 80,
    attempts: [],
    bestScore: null,
    status: "locked",
    isAvailable: false,
  },
  {
    id: 5,
    moduleId: 5,
    moduleTitle: "Adaptação Ambiental e Qualidade de Vida",
    title: "Avaliação: Adaptação Ambiental",
    description: "Teste seus conhecimentos sobre adaptações ambientais e planos de cuidado",
    questions: 15,
    timeLimit: 40,
    passingScore: 80,
    attempts: [],
    bestScore: null,
    status: "locked",
    isAvailable: false,
  },
]

const overallProgress = Math.round((quizzes.filter((q) => q.status === "completed").length / quizzes.length) * 100)
const averageScore = Math.round(
  quizzes.filter((q) => q.bestScore).reduce((acc, q) => acc + (q.bestScore || 0), 0) /
    quizzes.filter((q) => q.bestScore).length || 0,
)

export default function QuizzesPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Avaliações</h1>
        <p className="text-muted-foreground">Complete as avaliações de cada módulo para demonstrar seu aprendizado</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso das Avaliações</CardTitle>
            <FileQuestion className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {quizzes.filter((q) => q.status === "completed").length} de {quizzes.length} concluídas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nota Média</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore || 0}%</div>
            <p className="text-xs text-muted-foreground mt-2">
              {averageScore >= 80 ? "Acima da média necessária" : "Abaixo da média necessária"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tentativas Totais</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quizzes.reduce((acc, q) => acc + q.attempts.length, 0)}</div>
            <p className="text-xs text-muted-foreground mt-2">Todas as tentativas</p>
          </CardContent>
        </Card>
      </div>

      {/* Quizzes List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Avaliações por Módulo</h2>

        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className={`${!quiz.isAvailable ? "opacity-60" : ""}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      <Badge
                        variant={
                          quiz.status === "completed"
                            ? "default"
                            : quiz.status === "failed"
                              ? "destructive"
                              : quiz.status === "available"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {quiz.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {quiz.status === "failed" && <AlertCircle className="w-3 h-3 mr-1" />}
                        {quiz.status === "completed"
                          ? "Aprovado"
                          : quiz.status === "failed"
                            ? "Reprovado"
                            : quiz.status === "available"
                              ? "Disponível"
                              : "Bloqueado"}
                      </Badge>
                    </div>
                    <CardDescription className="mb-2">{quiz.description}</CardDescription>
                    <p className="text-sm text-muted-foreground">{quiz.moduleTitle}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Quiz Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Questões:</span>
                      <div className="font-medium">{quiz.questions}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tempo:</span>
                      <div className="font-medium">{quiz.timeLimit} min</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Nota mínima:</span>
                      <div className="font-medium">{quiz.passingScore}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Melhor nota:</span>
                      <div className="font-medium">{quiz.bestScore ? `${quiz.bestScore}%` : "N/A"}</div>
                    </div>
                  </div>

                  {/* Attempts History */}
                  {quiz.attempts.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Histórico de Tentativas</h4>
                      <div className="space-y-2">
                        {quiz.attempts.slice(-3).map((attempt) => (
                          <div key={attempt.id} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {new Date(attempt.completedAt).toLocaleDateString("pt-BR")}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className={attempt.passed ? "text-green-600" : "text-red-600"}>
                                {attempt.percentage}%
                              </span>
                              {attempt.passed ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      {!quiz.isAvailable && "Complete o módulo anterior para desbloquear"}
                      {quiz.isAvailable && quiz.status === "completed" && "Você pode refazer para melhorar sua nota"}
                      {quiz.isAvailable && quiz.status === "failed" && "Você precisa atingir 80% para ser aprovado"}
                      {quiz.isAvailable && quiz.status === "available" && "Clique para iniciar a avaliação"}
                    </div>

                    <Link href={quiz.isAvailable ? `/student/quizzes/${quiz.id}` : "#"}>
                      <Button
                        disabled={!quiz.isAvailable}
                        variant={quiz.status === "completed" ? "outline" : "default"}
                      >
                        {quiz.status === "completed" ? (
                          "Refazer Avaliação"
                        ) : quiz.status === "failed" ? (
                          "Tentar Novamente"
                        ) : quiz.status === "available" ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Iniciar Avaliação
                          </>
                        ) : (
                          "Bloqueado"
                        )}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
