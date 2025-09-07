"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, BarChart3, Users, Clock, Award, TrendingUp, TrendingDown } from "lucide-react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

// Mock data - will be replaced with real data from database
const reportData = {
  studentProgress: [
    { name: "Maria Silva", email: "maria@email.com", progress: 100, timeSpent: 450, score: 92, certificate: true },
    { name: "João Santos", email: "joao@email.com", progress: 45, timeSpent: 180, score: 75, certificate: false },
    { name: "Ana Costa", email: "ana@email.com", progress: 100, timeSpent: 420, score: 88, certificate: true },
    { name: "Pedro Lima", email: "pedro@email.com", progress: 23, timeSpent: 90, score: 65, certificate: false },
    { name: "Carla Mendes", email: "carla@email.com", progress: 67, timeSpent: 240, score: 82, certificate: false },
  ],
  modulePerformance: [
    { module: "Módulo 1", completionRate: 95, averageScore: 87, averageTime: 180 },
    { module: "Módulo 2", completionRate: 78, averageScore: 82, averageTime: 160 },
    { module: "Módulo 3", completionRate: 65, averageScore: 85, averageTime: 170 },
    { module: "Módulo 4", completionRate: 45, averageScore: 79, averageTime: 150 },
    { module: "Módulo 5", completionRate: 30, averageScore: 88, averageTime: 190 },
  ],
  quizPerformance: [
    { quiz: "Avaliação Módulo 1", attempts: 45, averageScore: 87, passingRate: 89 },
    { quiz: "Avaliação Módulo 2", attempts: 32, averageScore: 78, passingRate: 72 },
    { quiz: "Avaliação Módulo 3", attempts: 18, averageScore: 82, passingRate: 83 },
    { quiz: "Avaliação Módulo 4", attempts: 5, averageScore: 85, passingRate: 80 },
    { quiz: "Avaliação Módulo 5", attempts: 0, averageScore: 0, passingRate: 0 },
  ],
  timeAnalytics: {
    totalStudyTime: 1380, // minutes
    averageSessionTime: 45,
    mostActiveHours: "14:00-16:00",
    peakDays: "Terça e Quinta",
  },
  certificationData: {
    totalEligible: 15,
    certificatesIssued: 8,
    averageCompletionTime: 25, // days
    overallPassRate: 87,
  },
}

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [reportType, setReportType] = useState("overview")

  const handleExportReport = (format: "excel" | "pdf") => {
    // TODO: Implement actual export functionality
    console.log(`Exporting ${reportType} report as ${format}`)
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Relatórios e Analytics</h1>
          <p className="text-muted-foreground">Acompanhe o desempenho e progresso dos estudantes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExportReport("excel")}>
            <Download className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" onClick={() => handleExportReport("pdf")}>
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Tipo de Relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Visão Geral</SelectItem>
                <SelectItem value="student-progress">Progresso dos Estudantes</SelectItem>
                <SelectItem value="module-performance">Performance dos Módulos</SelectItem>
                <SelectItem value="quiz-analytics">Analytics de Avaliações</SelectItem>
                <SelectItem value="time-tracking">Rastreamento de Tempo</SelectItem>
                <SelectItem value="certification">Certificação</SelectItem>
              </SelectContent>
            </Select>
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <Button>Gerar Relatório</Button>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudantes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +12% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +5% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23h</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
              -2h vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificados</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +15 este mês
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Content */}
      {reportType === "student-progress" && (
        <Card>
          <CardHeader>
            <CardTitle>Relatório de Progresso dos Estudantes</CardTitle>
            <CardDescription>Situação detalhada de cada estudante na trilha de aprendizagem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.studentProgress.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{student.name}</h3>
                      {student.certificate && <Badge>Certificado</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{student.email}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progresso</span>
                          <span>{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.floor(student.timeSpent / 60)}h {student.timeSpent % 60}m
                      </div>
                      <div className="text-sm font-medium">Nota: {student.score}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {reportType === "module-performance" && (
        <Card>
          <CardHeader>
            <CardTitle>Performance dos Módulos</CardTitle>
            <CardDescription>Taxa de conclusão e desempenho por módulo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {reportData.modulePerformance.map((module, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{module.module}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Taxa: {module.completionRate}%</span>
                      <span>Nota: {module.averageScore}%</span>
                      <span>Tempo: {module.averageTime}min</span>
                    </div>
                  </div>
                  <Progress value={module.completionRate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {reportType === "quiz-analytics" && (
        <Card>
          <CardHeader>
            <CardTitle>Analytics de Avaliações</CardTitle>
            <CardDescription>Desempenho detalhado das avaliações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.quizPerformance.map((quiz, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">{quiz.quiz}</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Tentativas:</span>
                        <div className="font-medium">{quiz.attempts}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Nota Média:</span>
                        <div className="font-medium">{quiz.averageScore}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Taxa de Aprovação:</span>
                        <div className="font-medium">{quiz.passingRate}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {reportType === "certification" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados de Certificação</CardTitle>
              <CardDescription>Estatísticas de certificados emitidos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Estudantes Elegíveis:</span>
                <span className="font-medium">{reportData.certificationData.totalEligible}</span>
              </div>
              <div className="flex justify-between">
                <span>Certificados Emitidos:</span>
                <span className="font-medium">{reportData.certificationData.certificatesIssued}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de Certificação:</span>
                <span className="font-medium">
                  {Math.round(
                    (reportData.certificationData.certificatesIssued / reportData.certificationData.totalEligible) *
                      100,
                  )}
                  %
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tempo Médio de Conclusão:</span>
                <span className="font-medium">{reportData.certificationData.averageCompletionTime} dias</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa Geral de Aprovação:</span>
                <span className="font-medium">{reportData.certificationData.overallPassRate}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics de Tempo</CardTitle>
              <CardDescription>Padrões de uso e engajamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Tempo Total de Estudo:</span>
                <span className="font-medium">
                  {Math.floor(reportData.timeAnalytics.totalStudyTime / 60)}h{" "}
                  {reportData.timeAnalytics.totalStudyTime % 60}m
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tempo Médio por Sessão:</span>
                <span className="font-medium">{reportData.timeAnalytics.averageSessionTime} min</span>
              </div>
              <div className="flex justify-between">
                <span>Horários Mais Ativos:</span>
                <span className="font-medium">{reportData.timeAnalytics.mostActiveHours}</span>
              </div>
              <div className="flex justify-between">
                <span>Dias de Pico:</span>
                <span className="font-medium">{reportData.timeAnalytics.peakDays}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
