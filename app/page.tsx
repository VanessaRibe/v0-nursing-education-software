import { FormularioLogin } from "@/components/auth/formulario-login"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-blue-100/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Plataformatea
            </h1>
          </div>
          <p className="text-muted-foreground text-balance text-lg">
            Plataforma educacional para humanização do cuidado no Transtorno do Espectro Autista
          </p>
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2 text-sm text-primary font-medium">
              <div className="w-4 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-sm"></div>
              <span>Conscientização do Autismo</span>
            </div>
          </div>
        </div>

        <Card className="border-blue-200 shadow-lg shadow-blue-100/50">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50">
            <CardTitle className="text-primary">Acesso ao Sistema</CardTitle>
            <CardDescription>Entre com suas credenciais para acessar os módulos de aprendizagem</CardDescription>
          </CardHeader>
          <CardContent>
            <FormularioLogin />
          </CardContent>
        </Card>

        {/* Demo credentials info */}
        <Card className="mt-4 border-blue-100">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium text-primary">Credenciais de demonstração:</p>
              <div className="space-y-1">
                <p>
                  <strong>Admin:</strong> admin@tea.edu / admin123
                </p>
                <p>
                  <strong>Estudante:</strong> maria@email.com / student123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
