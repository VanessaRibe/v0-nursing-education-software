const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface Usuario {
  id: number
  nome: string
  email: string
  tipo: "admin" | "estudante"
}

interface LoginResponse {
  token: string
  usuario: Usuario
}

interface Modulo {
  id: number
  titulo: string
  descricao: string
  ordem: number
  ativo: boolean
}

interface Conteudo {
  id: number
  modulo_id: number
  titulo: string
  tipo: string
  url: string
  descricao: string
  ordem: number
  duracao_minutos: number
}

interface Quiz {
  id: number
  modulo_id: number
  titulo: string
  descricao: string
  tempo_limite: number
  nota_minima: number
}

interface Questao {
  id: number
  quiz_id: number
  pergunta: string
  tipo: string
  opcoes: string
  ordem: number
}

class ApiClient {
  private token: string | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ erro: "Erro desconhecido" }))
      throw new Error(error.erro || `Erro HTTP: ${response.status}`)
    }

    return response.json()
  }

  // Métodos de autenticação
  async login(email: string, senha: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    })

    this.token = response.token
    if (typeof window !== "undefined") {
      localStorage.setItem("token", response.token)
      localStorage.setItem("usuario", JSON.stringify(response.usuario))
    }

    return response
  }

  async registro(nome: string, email: string, senha: string, tipo = "estudante") {
    return this.request("/auth/registro", {
      method: "POST",
      body: JSON.stringify({ nome, email, senha, tipo }),
    })
  }

  logout() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("usuario")
    }
  }

  // Métodos de módulos
  async listarModulos(): Promise<Modulo[]> {
    return this.request<Modulo[]>("/modulos")
  }

  async obterModulo(id: number): Promise<Modulo & { conteudos: Conteudo[]; progresso: any }> {
    return this.request<Modulo & { conteudos: Conteudo[]; progresso: any }>(`/modulos/${id}`)
  }

  // Métodos de progresso
  async obterProgressoGeral() {
    return this.request("/progresso")
  }

  async marcarConteudoCompletado(conteudo_id: number, tempo_gasto = 0) {
    return this.request("/progresso/conteudo", {
      method: "POST",
      body: JSON.stringify({ conteudo_id, tempo_gasto }),
    })
  }

  // Métodos de quizzes
  async listarQuizzes() {
    return this.request("/quizzes")
  }

  async obterQuiz(id: number): Promise<Quiz & { questoes: Questao[] }> {
    return this.request<Quiz & { questoes: Questao[] }>(`/quizzes/${id}`)
  }

  async submeterQuiz(quiz_id: number, respostas: Record<string, string>, tempo_gasto: number) {
    return this.request(`/quizzes/${quiz_id}/submeter`, {
      method: "POST",
      body: JSON.stringify({ respostas, tempo_gasto }),
    })
  }

  // Método para popular dados iniciais
  async seedData() {
    return this.request("/seed", { method: "POST" })
  }
}

export const api = new ApiClient()
export type { Usuario, Modulo, Conteudo, Quiz, Questao, LoginResponse }
