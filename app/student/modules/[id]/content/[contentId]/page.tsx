"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { ContentViewer } from "@/components/modules/content-viewer"

// Mock data - will be replaced with real data from database
const getContentData = (moduleId: string, contentId: string) => {
  const allContents = {
    "1": [
      {
        id: 1,
        moduleId: 1,
        type: "video",
        title: "Introdução ao TEA",
        duration: 15,
        completed: false,
        url: "/placeholder-ijg13.png",
        description:
          "Uma visão geral sobre o Transtorno do Espectro Autista, suas características principais e a importância do diagnóstico precoce.",
        transcript:
          "Neste vídeo, vamos explorar os conceitos fundamentais do Transtorno do Espectro Autista (TEA). O TEA é uma condição neurológica que afeta o desenvolvimento social, comunicativo e comportamental...",
      },
      // Add more content items...
    ],
  }

  const moduleContents = allContents[moduleId as keyof typeof allContents] || []
  return moduleContents.find((c) => c.id === Number.parseInt(contentId)) || null
}

interface ContentPageProps {
  params: {
    id: string
    contentId: string
  }
}

export default function ContentPage({ params }: ContentPageProps) {
  const [timeSpent, setTimeSpent] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const content = getContentData(params.id, params.contentId)

  useEffect(() => {
    // Track time spent on content
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleMarkComplete = () => {
    setIsCompleted(true)
    // TODO: Update progress in database
  }

  if (!content) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Conteúdo não encontrado</h1>
          <Link href={`/student/modules/${params.id}`}>
            <Button>Voltar ao Módulo</Button>
          </Link>
        </div>
      </div>
    )
  }

  const progressPercentage = Math.min((timeSpent / (content.duration * 60)) * 100, 100)

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href={`/student/modules/${params.id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Módulo
          </Button>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, "0")}
            </span>
          </div>

          {isCompleted && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Concluído</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{content.title}</CardTitle>
          <p className="text-muted-foreground">{content.description}</p>
        </CardHeader>

        <CardContent>
          <ContentViewer content={content} />
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progresso do Conteúdo</span>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Tempo estimado: {content.duration} min</span>
              <span>Tempo gasto: {Math.floor(timeSpent / 60)} min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transcript or Additional Content */}
      {content.transcript && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Transcrição</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{content.transcript}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Conteúdo Anterior
        </Button>

        <div className="flex gap-2">
          {!isCompleted && progressPercentage >= 80 && (
            <Button onClick={handleMarkComplete}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Marcar como Concluído
            </Button>
          )}

          <Button>
            Próximo Conteúdo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
