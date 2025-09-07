"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Calendar, Clock, User, CheckCircle } from "lucide-react"

// Mock data - will be replaced with real data from database
const studentData = {
  name: "Maria Silva Santos",
  email: "maria@email.com",
  completionDate: "2024-01-15",
  totalHours: 40,
  finalScore: 92,
  modules: [
    { name: "Identificação e Diagnóstico Precoce do TEA", score: 95, completed: true },
    { name: "Intervenções Precoces e Desenvolvimento no TEA", score: 88, completed: true },
    { name: "Desafios Familiares e Apoio no Cuidado", score: 90, completed: true },
    { name: "Comunicação e Personalização do Cuidado", score: 94, completed: true },
    { name: "Adaptação Ambiental e Qualidade de Vida", score: 93, completed: true },
  ],
  certificateId: "TEA-2024-001",
}

const isEligibleForCertificate =
  studentData.modules.every((m) => m.completed && m.score >= 80) && studentData.finalScore >= 80

export default function CertificatePage() {
  const handleDownloadCertificate = () => {
    // In a real app, this would generate and download a PDF certificate
    alert("Certificado será baixado em breve!")
  }

  const handleShareCertificate = () => {
    // In a real app, this would share the certificate
    alert("Link do certificado copiado para área de transferência!")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Certificação
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">Plataformatea - Humanização do Cuidado no TEA</p>
        </div>

        {isEligibleForCertificate ? (
          <>
            {/* Certificate Preview */}
            <Card className="mb-8 border-primary/20 bg-gradient-to-br from-blue-50/50 to-primary/5">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <Award className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">CERTIFICADO DE CONCLUSÃO</h2>
                    <p className="text-muted-foreground">Certificamos que</p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">{studentData.name}</h3>
                    <p className="text-muted-foreground">concluiu com êxito o curso de</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-2">
                      Humanização do Cuidado no Transtorno do Espectro Autista
                    </h4>
                    <p className="text-sm text-muted-foreground">Curso de capacitação para graduandos de enfermagem</p>
                  </div>

                  <div className="flex items-center justify-center space-x-8 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Concluído em {new Date(studentData.completionDate).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{studentData.totalHours}h de carga horária</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Certificado ID: {studentData.certificateId} | Nota Final: {studentData.finalScore}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button onClick={handleDownloadCertificate} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Baixar Certificado (PDF)
              </Button>
              <Button variant="outline" onClick={handleShareCertificate} className="flex-1 bg-transparent">
                <User className="h-4 w-4 mr-2" />
                Compartilhar Certificado
              </Button>
            </div>
          </>
        ) : (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-muted-foreground" />
                Certificado Não Disponível
              </CardTitle>
              <CardDescription>
                Complete todos os módulos com nota mínima de 80% para obter seu certificado
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Progress Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Progresso</CardTitle>
            <CardDescription>Seu desempenho detalhado no curso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Overall Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{studentData.finalScore}%</div>
                  <div className="text-sm text-muted-foreground">Nota Final</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{studentData.totalHours}h</div>
                  <div className="text-sm text-muted-foreground">Tempo Total</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {studentData.modules.filter((m) => m.completed).length}/{studentData.modules.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Módulos Concluídos</div>
                </div>
              </div>

              {/* Module Details */}
              <div className="space-y-3">
                <h4 className="font-semibold">Desempenho por Módulo</h4>
                {studentData.modules.map((module, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle
                        className={`h-5 w-5 ${module.completed ? "text-green-500" : "text-muted-foreground"}`}
                      />
                      <span className="font-medium">{module.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={module.score >= 80 ? "default" : "destructive"}>{module.score}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
