import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Trash2, FileQuestion, Users, TrendingUp } from "lucide-react"

// Mock data - will be replaced with real data from database
const quizzes = [
  {
    id: 1,
    moduleId: 1,
    moduleTitle: "Identificação e Diagnóstico Precoce do TEA",
    title: "Avaliação: Identificação e Diagnóstico",
    questions: 10,
    totalAttempts: 45,
    averageScore: 87,
    passingRate: 89,
    isActive: true,
  },
  {
    id: 2,
    moduleId: 2,
    moduleTitle: "Intervenções Precoces e Desenvolvimento no TEA",
    title: "Avaliação: Intervenções Precoces",
    questions: 12,
    totalAttempts: 32,
    averageScore: 78,
    passingRate: 72,
    isActive: true,
  },
  {
    id: 3,
    moduleId: 3,
    moduleTitle: "Desafios Familiares e Apoio no Cuidado",
    title: "Avaliação: Desafios Familiares",
    questions: 8,
    totalAttempts: 18,
    averageScore: 82,
    passingRate: 83,
    isActive: true,
  },
  {
    id: 4,
    moduleId: 4,
    moduleTitle: "Comunicação e Personalização do Cuidado",
    title: "Avaliação: Comunicação",
    questions: 10,
    totalAttempts: 5,
    averageScore: 85,
    passingRate: 80,
    isActive: false,
  },
  {
    id: 5,
    moduleId: 5,
    moduleTitle: "Adaptação Ambiental e Qualidade de Vida",
    title: "Avaliação: Adaptação Ambiental",
    questions: 15,
    totalAttempts: 0,
    averageScore: 0,
    passingRate: 0,
    isActive: false,
  },
]

const stats = {
  totalQuizzes: quizzes.length,
  activeQuizzes: quizzes.filter((q) => q.isActive).length,
  totalAttempts: quizzes.reduce((acc, q) => acc + q.totalAttempts, 0),
  averagePassingRate: Math.round(
    quizzes.filter((q) => q.totalAttempts > 0).reduce((acc, q) => acc + q.passingRate, 0) /
      quizzes.filter((q) => q.totalAttempts > 0).length,
  ),
}

export default function AdminQuizzesPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gerenciar Avaliações</h1>
          <p className="text-muted-foreground">Administre as avaliações e acompanhe o desempenho dos estudantes</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Avaliação
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
            <FileQuestion className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
            <p className="text-xs text-muted-foreground">{stats.activeQuizzes} ativas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tentativas Totais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAttempts}</div>
            <p className="text-xs text-muted-foreground">Todas as avaliações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averagePassingRate}%</div>
            <p className="text-xs text-muted-foreground">Média geral</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nota Média</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                quizzes.filter((q) => q.totalAttempts > 0).reduce((acc, q) => acc + q.averageScore, 0) /
                  quizzes.filter((q) => q.totalAttempts > 0).length,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Todas as avaliações</p>
          </CardContent>
        </Card>
      </div>

      {/* Quizzes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Avaliações</CardTitle>
          <CardDescription>Gerencie todas as avaliações do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{quiz.title}</h3>
                    <Badge variant={quiz.isActive ? "default" : "secondary"}>
                      {quiz.isActive ? "Ativa" : "Inativa"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{quiz.moduleTitle}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>{quiz.questions} questões</span>
                    <span>{quiz.totalAttempts} tentativas</span>
                    <span>Nota média: {quiz.averageScore}%</span>
                    <span>Taxa de aprovação: {quiz.passingRate}%</span>
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
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
