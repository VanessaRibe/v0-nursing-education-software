import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Download, Eye, Edit, Trash2, UserPlus, Mail } from "lucide-react"

// Mock data - will be replaced with real data from database
const users = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria@email.com",
    role: "student",
    registeredAt: "2024-01-10",
    lastAccess: "2024-01-25",
    progress: 85,
    completedModules: 4,
    totalTimeSpent: 320,
    certificateEarned: true,
    status: "active",
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao@email.com",
    role: "student",
    registeredAt: "2024-01-12",
    lastAccess: "2024-01-24",
    progress: 45,
    completedModules: 2,
    totalTimeSpent: 180,
    certificateEarned: false,
    status: "active",
  },
  {
    id: 3,
    name: "Ana Costa",
    email: "ana@email.com",
    role: "student",
    registeredAt: "2024-01-08",
    lastAccess: "2024-01-25",
    progress: 100,
    completedModules: 5,
    totalTimeSpent: 450,
    certificateEarned: true,
    status: "active",
  },
  {
    id: 4,
    name: "Pedro Lima",
    email: "pedro@email.com",
    role: "student",
    registeredAt: "2024-01-15",
    lastAccess: "2024-01-22",
    progress: 23,
    completedModules: 1,
    totalTimeSpent: 90,
    certificateEarned: false,
    status: "inactive",
  },
  {
    id: 5,
    name: "Carla Mendes",
    email: "carla@email.com",
    role: "student",
    registeredAt: "2024-01-20",
    lastAccess: "2024-01-25",
    progress: 67,
    completedModules: 3,
    totalTimeSpent: 240,
    certificateEarned: false,
    status: "active",
  },
]

const stats = {
  totalUsers: users.length,
  activeUsers: users.filter((u) => u.status === "active").length,
  certificatesEarned: users.filter((u) => u.certificateEarned).length,
  averageProgress: Math.round(users.reduce((acc, u) => acc + u.progress, 0) / users.length),
}

export default function AdminUsersPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gerenciar Usuários</h1>
          <p className="text-muted-foreground">Administre estudantes e acompanhe seu progresso</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">{stats.activeUsers} ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificados Emitidos</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certificatesEarned}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.certificatesEarned / stats.totalUsers) * 100)}% dos usuários
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Médio</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProgress}%</div>
            <p className="text-xs text-muted-foreground">Todos os usuários</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por nome ou email..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Progresso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="completed">Concluído (100%)</SelectItem>
                <SelectItem value="high">Alto (80-99%)</SelectItem>
                <SelectItem value="medium">Médio (50-79%)</SelectItem>
                <SelectItem value="low">Baixo (0-49%)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>Gerencie todos os usuários do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{user.name}</h3>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                      {user.certificateEarned && <Badge variant="outline">Certificado</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span>Progresso: {user.progress}%</span>
                      <span>Módulos: {user.completedModules}/5</span>
                      <span>
                        Tempo: {Math.floor(user.totalTimeSpent / 60)}h {user.totalTimeSpent % 60}m
                      </span>
                      <span>Último acesso: {new Date(user.lastAccess).toLocaleDateString("pt-BR")}</span>
                    </div>
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
