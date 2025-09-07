"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { api } from "@/lib/api"

export function FormularioLogin() {
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")
  const router = useRouter()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCarregando(true)
    setErro("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const senha = formData.get("senha") as string

    try {
      const response = await api.login(email, senha)

      // Redireciona baseado no tipo de usuário
      if (response.usuario.tipo === "admin") {
        router.push("/admin/painel")
      } else {
        router.push("/estudante/painel")
      }
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao fazer login")
    } finally {
      setCarregando(false)
    }
  }

  const handleRegistro = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCarregando(true)
    setErro("")

    const formData = new FormData(event.currentTarget)
    const nome = formData.get("nome") as string
    const email = formData.get("email") as string
    const senha = formData.get("senha") as string
    const confirmarSenha = formData.get("confirmarSenha") as string

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem")
      setCarregando(false)
      return
    }

    try {
      await api.registro(nome, email, senha)
      // Após registro bem-sucedido, faz login automaticamente
      await api.login(email, senha)
      router.push("/estudante/painel")
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao criar conta")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Entrar</TabsTrigger>
        <TabsTrigger value="registro">Criar Conta</TabsTrigger>
      </TabsList>

      {erro && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}

      <TabsContent value="login">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="seu@email.com" required disabled={carregando} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input id="senha" name="senha" type="password" placeholder="Sua senha" required disabled={carregando} />
          </div>
          <Button type="submit" className="w-full" disabled={carregando}>
            {carregando ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="registro">
        <form onSubmit={handleRegistro} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input id="nome" name="nome" type="text" placeholder="Seu nome completo" required disabled={carregando} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-registro">Email</Label>
            <Input
              id="email-registro"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              disabled={carregando}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senha-registro">Senha</Label>
            <Input
              id="senha-registro"
              name="senha"
              type="password"
              placeholder="Sua senha"
              required
              disabled={carregando}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
            <Input
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              placeholder="Confirme sua senha"
              required
              disabled={carregando}
            />
          </div>
          <Button type="submit" className="w-full" disabled={carregando}>
            {carregando ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              "Criar Conta"
            )}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  )
}
