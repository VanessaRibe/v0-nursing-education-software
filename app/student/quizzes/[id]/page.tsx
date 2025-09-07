"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

// Mock data - will be replaced with real data from database
const getQuizData = (id: string) => {
  const quizzes = {
    "1": {
      id: 1,
      title: "Avaliação: Identificação e Diagnóstico Precoce do TEA",
      description: "Teste seus conhecimentos sobre identificação e diagnóstico precoce do TEA",
      timeLimit: 30,
      passingScore: 80,
      questions: [
        {
          id: 1,
          type: "multiple_choice",
          question: "Qual é a idade típica para os primeiros sinais de TEA aparecerem?",
          options: [
            { id: 1, text: "Entre 6-12 meses", isCorrect: false },
            { id: 2, text: "Entre 12-24 meses", isCorrect: true },
            { id: 3, text: "Entre 3-4 anos", isCorrect: false },
            { id: 4, text: "Após os 5 anos", isCorrect: false },
          ],
          points: 2,
          explanation:
            "Os primeiros sinais do TEA geralmente aparecem entre 12-24 meses, quando as habilidades sociais e de comunicação começam a se desenvolver mais claramente.",
        },
        {
          id: 2,
          type: "true_false",
          question: "A comunicação não-verbal é sempre prejudicada em crianças com TEA.",
          options: [
            { id: 5, text: "Verdadeiro", isCorrect: false },
            { id: 6, text: "Falso", isCorrect: true },
          ],
          points: 1,
          explanation:
            "Falso. O TEA é um espectro, e nem todas as crianças apresentam os mesmos déficits. Algumas podem ter comunicação não-verbal preservada.",
        },
        {
          id: 3,
          type: "scenario",
          question:
            "Cenário: Uma criança de 3 anos evita contato visual e não responde ao nome. Qual seria sua primeira abordagem como enfermeiro(a)?",
          options: [
            { id: 7, text: "Encaminhar imediatamente para avaliação especializada", isCorrect: true },
            { id: 8, text: "Aguardar mais alguns meses para observar", isCorrect: false },
            { id: 9, text: "Recomendar apenas atividades lúdicas", isCorrect: false },
            { id: 10, text: "Sugerir mudança de ambiente escolar", isCorrect: false },
          ],
          points: 3,
          explanation:
            "O encaminhamento precoce para avaliação especializada é fundamental, pois a intervenção precoce melhora significativamente os resultados.",
        },
      ],
    },
  }

  return quizzes[id as keyof typeof quizzes] || null
}

interface QuizPageProps {
  params: {
    id: string
  }
}

export default function QuizPage({ params }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const quiz = getQuizData(params.id)

  useEffect(() => {
    if (quiz && isStarted && !isCompleted) {
      setTimeLeft(quiz.timeLimit * 60) // Convert minutes to seconds
    }
  }, [quiz, isStarted, isCompleted])

  useEffect(() => {
    if (timeLeft > 0 && isStarted && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && isStarted && !isCompleted) {
      handleSubmitQuiz()
    }
  }, [timeLeft, isStarted, isCompleted])

  const handleStartQuiz = () => {
    setIsStarted(true)
  }

  const handleAnswerChange = (questionId: number, optionId: number) => {
    setAnswers({ ...answers, [questionId]: optionId })
  }

  const handleNextQuestion = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    setIsCompleted(true)
    setShowResults(true)
  }

  const calculateResults = () => {
    if (!quiz) return { score: 0, totalPoints: 0, percentage: 0, passed: false }

    let score = 0
    const totalPoints = quiz.questions.reduce((acc, q) => acc + q.points, 0)

    quiz.questions.forEach((question) => {
      const selectedOptionId = answers[question.id]
      const selectedOption = question.options.find((opt) => opt.id === selectedOptionId)
      if (selectedOption?.isCorrect) {
        score += question.points
      }
    })

    const percentage = Math.round((score / totalPoints) * 100)
    const passed = percentage >= quiz.passingScore

    return { score, totalPoints, percentage, passed }
  }

  if (!quiz) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Avaliação não encontrada</h1>
          <Link href="/student/quizzes">
            <Button>Voltar às Avaliações</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (showResults) {
    const results = calculateResults()
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Resultado da Avaliação</CardTitle>
            <CardDescription>{quiz.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-4">
                <span className={results.passed ? "text-green-600" : "text-red-600"}>{results.percentage}%</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                {results.passed ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                )}
                <span className="text-lg font-medium">{results.passed ? "Aprovado!" : "Reprovado"}</span>
              </div>
              <p className="text-muted-foreground">
                Você acertou {results.score} de {results.totalPoints} pontos
              </p>
            </div>

            <Alert variant={results.passed ? "default" : "destructive"}>
              <AlertDescription>
                {results.passed
                  ? `Parabéns! Você atingiu a nota mínima de ${quiz.passingScore}% e foi aprovado nesta avaliação.`
                  : `Você precisa de pelo menos ${quiz.passingScore}% para ser aprovado. Revise o conteúdo e tente novamente.`}
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Revisão das Questões</h3>
              {quiz.questions.map((question, index) => {
                const selectedOptionId = answers[question.id]
                const selectedOption = question.options.find((opt) => opt.id === selectedOptionId)
                const correctOption = question.options.find((opt) => opt.isCorrect)
                const isCorrect = selectedOption?.isCorrect || false

                return (
                  <Card key={question.id} className={isCorrect ? "border-green-200" : "border-red-200"}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">
                          Questão {index + 1} ({question.points} {question.points === 1 ? "ponto" : "pontos"})
                        </CardTitle>
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <p className="text-sm">{question.question}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {question.options.map((option) => (
                          <div
                            key={option.id}
                            className={`p-2 rounded border ${
                              option.isCorrect
                                ? "bg-green-50 border-green-200"
                                : option.id === selectedOptionId && !option.isCorrect
                                  ? "bg-red-50 border-red-200"
                                  : "bg-muted"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {option.isCorrect && <CheckCircle className="w-4 h-4 text-green-600" />}
                              {option.id === selectedOptionId && !option.isCorrect && (
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                              )}
                              <span className="text-sm">{option.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <strong>Explicação:</strong> {question.explanation}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="flex justify-center gap-4">
              <Link href="/student/quizzes">
                <Button variant="outline">Voltar às Avaliações</Button>
              </Link>
              {!results.passed && <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isStarted) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Questões:</span>
                <div className="font-medium">{quiz.questions.length}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Tempo limite:</span>
                <div className="font-medium">{quiz.timeLimit} minutos</div>
              </div>
              <div>
                <span className="text-muted-foreground">Nota mínima:</span>
                <div className="font-medium">{quiz.passingScore}%</div>
              </div>
              <div>
                <span className="text-muted-foreground">Pontuação total:</span>
                <div className="font-medium">{quiz.questions.reduce((acc, q) => acc + q.points, 0)} pontos</div>
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Uma vez iniciada, a avaliação não pode ser pausada. Certifique-se de ter tempo suficiente para
                completá-la.
              </AlertDescription>
            </Alert>

            <div className="flex justify-between">
              <Link href="/student/quizzes">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <Button onClick={handleStartQuiz}>Iniciar Avaliação</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header with timer and progress */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">
            Questão {currentQuestion + 1} de {quiz.questions.length}
          </h1>
          <Progress value={progress} className="w-32" />
        </div>
        <div className="flex items-center gap-2 text-lg font-mono">
          <Clock className="w-5 h-5" />
          <span className={timeLeft < 300 ? "text-red-600" : ""}>
            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{currentQ.question}</CardTitle>
            <Badge variant="outline">
              {currentQ.points} {currentQ.points === 1 ? "ponto" : "pontos"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQ.id]?.toString()}
            onValueChange={(value) => handleAnswerChange(currentQ.id, Number.parseInt(value))}
          >
            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id.toString()} id={option.id.toString()} />
                  <Label htmlFor={option.id.toString()} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>

        <div className="text-sm text-muted-foreground">
          {Object.keys(answers).length} de {quiz.questions.length} questões respondidas
        </div>

        {currentQuestion === quiz.questions.length - 1 ? (
          <Button onClick={handleSubmitQuiz} disabled={Object.keys(answers).length !== quiz.questions.length}>
            Finalizar Avaliação
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            Próxima
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
