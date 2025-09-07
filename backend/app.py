from flask import Flask, request, jsonify, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os
from datetime import datetime, timedelta
import jwt
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'plataformatea-secret-key-2024'
CORS(app, origins=["http://localhost:3000", "http://localhost:3001", "http://0.0.0.0:3001"])

# Configuração do banco de dados
DATABASE = 'plataformatea.db'

def init_db():
    """Inicializa o banco de dados com as tabelas necessárias"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Tabela de usuários
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL,
            tipo TEXT NOT NULL DEFAULT 'estudante',
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            ativo BOOLEAN DEFAULT 1
        )
    ''')
    
    # Tabela de módulos
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS modulos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            ordem INTEGER NOT NULL,
            ativo BOOLEAN DEFAULT 1,
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Tabela de conteúdos
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS conteudos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            modulo_id INTEGER NOT NULL,
            titulo TEXT NOT NULL,
            tipo TEXT NOT NULL,
            url TEXT,
            descricao TEXT,
            ordem INTEGER NOT NULL,
            duracao_minutos INTEGER DEFAULT 0,
            ativo BOOLEAN DEFAULT 1,
            FOREIGN KEY (modulo_id) REFERENCES modulos (id)
        )
    ''')
    
    # Tabela de quizzes
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS quizzes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            modulo_id INTEGER NOT NULL,
            titulo TEXT NOT NULL,
            descricao TEXT,
            tempo_limite INTEGER DEFAULT 30,
            nota_minima REAL DEFAULT 8.0,
            ativo BOOLEAN DEFAULT 1,
            FOREIGN KEY (modulo_id) REFERENCES modulos (id)
        )
    ''')
    
    # Tabela de questões
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS questoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quiz_id INTEGER NOT NULL,
            pergunta TEXT NOT NULL,
            tipo TEXT NOT NULL DEFAULT 'multipla_escolha',
            opcoes TEXT NOT NULL,
            resposta_correta TEXT NOT NULL,
            explicacao TEXT,
            ordem INTEGER NOT NULL,
            FOREIGN KEY (quiz_id) REFERENCES quizzes (id)
        )
    ''')
    
    # Tabela de progresso do usuário
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS progresso_usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER NOT NULL,
            modulo_id INTEGER NOT NULL,
            conteudo_id INTEGER,
            completado BOOLEAN DEFAULT 0,
            tempo_gasto INTEGER DEFAULT 0,
            data_inicio TIMESTAMP,
            data_conclusao TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
            FOREIGN KEY (modulo_id) REFERENCES modulos (id),
            FOREIGN KEY (conteudo_id) REFERENCES conteudos (id)
        )
    ''')
    
    # Tabela de tentativas de quiz
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tentativas_quiz (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER NOT NULL,
            quiz_id INTEGER NOT NULL,
            respostas TEXT NOT NULL,
            nota REAL NOT NULL,
            tempo_gasto INTEGER NOT NULL,
            data_tentativa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            aprovado BOOLEAN DEFAULT 0,
            FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
            FOREIGN KEY (quiz_id) REFERENCES quizzes (id)
        )
    ''')
    
    conn.commit()
    conn.close()

def get_db_connection():
    """Retorna uma conexão com o banco de dados"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def token_required(f):
    """Decorator para verificar token JWT"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'erro': 'Token não fornecido'}), 401
        
        try:
            if token.startswith('Bearer '):
                token = token[7:]
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user_id = data['user_id']
        except:
            return jsonify({'erro': 'Token inválido'}), 401
        
        return f(current_user_id, *args, **kwargs)
    return decorated

# Rotas de autenticação
@app.route('/api/auth/login', methods=['POST'])
def login():
    """Endpoint para login de usuário"""
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')
    
    if not email or not senha:
        return jsonify({'erro': 'Email e senha são obrigatórios'}), 400
    
    conn = get_db_connection()
    usuario = conn.execute(
        'SELECT * FROM usuarios WHERE email = ? AND ativo = 1',
        (email,)
    ).fetchone()
    conn.close()
    
    if usuario and check_password_hash(usuario['senha'], senha):
        token = jwt.encode({
            'user_id': usuario['id'],
            'email': usuario['email'],
            'tipo': usuario['tipo'],
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'token': token,
            'usuario': {
                'id': usuario['id'],
                'nome': usuario['nome'],
                'email': usuario['email'],
                'tipo': usuario['tipo']
            }
        })
    
    return jsonify({'erro': 'Credenciais inválidas'}), 401

@app.route('/api/auth/registro', methods=['POST'])
def registro():
    """Endpoint para registro de novo usuário"""
    data = request.get_json()
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')
    tipo = data.get('tipo', 'estudante')
    
    if not all([nome, email, senha]):
        return jsonify({'erro': 'Todos os campos são obrigatórios'}), 400
    
    conn = get_db_connection()
    
    # Verifica se email já existe
    usuario_existente = conn.execute(
        'SELECT id FROM usuarios WHERE email = ?', (email,)
    ).fetchone()
    
    if usuario_existente:
        conn.close()
        return jsonify({'erro': 'Email já cadastrado'}), 400
    
    # Cria novo usuário
    senha_hash = generate_password_hash(senha)
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
        (nome, email, senha_hash, tipo)
    )
    conn.commit()
    
    usuario_id = cursor.lastrowid
    conn.close()
    
    return jsonify({
        'mensagem': 'Usuário criado com sucesso',
        'usuario_id': usuario_id
    }), 201

# Rotas de módulos
@app.route('/api/modulos', methods=['GET'])
@token_required
def listar_modulos(current_user_id):
    """Lista todos os módulos disponíveis"""
    conn = get_db_connection()
    modulos = conn.execute(
        'SELECT * FROM modulos WHERE ativo = 1 ORDER BY ordem'
    ).fetchall()
    conn.close()
    
    return jsonify([dict(modulo) for modulo in modulos])

@app.route('/api/modulos/<int:modulo_id>', methods=['GET'])
@token_required
def obter_modulo(current_user_id, modulo_id):
    """Obtém detalhes de um módulo específico"""
    conn = get_db_connection()
    
    modulo = conn.execute(
        'SELECT * FROM modulos WHERE id = ? AND ativo = 1',
        (modulo_id,)
    ).fetchone()
    
    if not modulo:
        conn.close()
        return jsonify({'erro': 'Módulo não encontrado'}), 404
    
    # Busca conteúdos do módulo
    conteudos = conn.execute(
        'SELECT * FROM conteudos WHERE modulo_id = ? AND ativo = 1 ORDER BY ordem',
        (modulo_id,)
    ).fetchall()
    
    # Busca progresso do usuário
    progresso = conn.execute(
        '''SELECT COUNT(*) as total_conteudos,
           SUM(CASE WHEN completado = 1 THEN 1 ELSE 0 END) as conteudos_completados
           FROM progresso_usuario 
           WHERE usuario_id = ? AND modulo_id = ?''',
        (current_user_id, modulo_id)
    ).fetchone()
    
    conn.close()
    
    modulo_dict = dict(modulo)
    modulo_dict['conteudos'] = [dict(conteudo) for conteudo in conteudos]
    modulo_dict['progresso'] = dict(progresso) if progresso else {'total_conteudos': 0, 'conteudos_completados': 0}
    
    return jsonify(modulo_dict)

# Rotas de progresso
@app.route('/api/progresso', methods=['GET'])
@token_required
def obter_progresso_geral(current_user_id):
    """Obtém progresso geral do usuário"""
    conn = get_db_connection()
    
    progresso = conn.execute('''
        SELECT m.id, m.titulo, m.ordem,
               COUNT(c.id) as total_conteudos,
               SUM(CASE WHEN p.completado = 1 THEN 1 ELSE 0 END) as conteudos_completados,
               SUM(COALESCE(p.tempo_gasto, 0)) as tempo_total
        FROM modulos m
        LEFT JOIN conteudos c ON m.id = c.modulo_id AND c.ativo = 1
        LEFT JOIN progresso_usuario p ON c.id = p.conteudo_id AND p.usuario_id = ?
        WHERE m.ativo = 1
        GROUP BY m.id, m.titulo, m.ordem
        ORDER BY m.ordem
    ''', (current_user_id,)).fetchall()
    
    conn.close()
    
    return jsonify([dict(p) for p in progresso])

@app.route('/api/progresso/conteudo', methods=['POST'])
@token_required
def marcar_conteudo_completado(current_user_id):
    """Marca um conteúdo como completado"""
    data = request.get_json()
    conteudo_id = data.get('conteudo_id')
    tempo_gasto = data.get('tempo_gasto', 0)
    
    if not conteudo_id:
        return jsonify({'erro': 'ID do conteúdo é obrigatório'}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Busca informações do conteúdo
    conteudo = conn.execute(
        'SELECT modulo_id FROM conteudos WHERE id = ?',
        (conteudo_id,)
    ).fetchone()
    
    if not conteudo:
        conn.close()
        return jsonify({'erro': 'Conteúdo não encontrado'}), 404
    
    # Verifica se já existe progresso
    progresso_existente = conn.execute(
        'SELECT id FROM progresso_usuario WHERE usuario_id = ? AND conteudo_id = ?',
        (current_user_id, conteudo_id)
    ).fetchone()
    
    if progresso_existente:
        # Atualiza progresso existente
        cursor.execute('''
            UPDATE progresso_usuario 
            SET completado = 1, tempo_gasto = ?, data_conclusao = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (tempo_gasto, progresso_existente['id']))
    else:
        # Cria novo progresso
        cursor.execute('''
            INSERT INTO progresso_usuario 
            (usuario_id, modulo_id, conteudo_id, completado, tempo_gasto, data_inicio, data_conclusao)
            VALUES (?, ?, ?, 1, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ''', (current_user_id, conteudo['modulo_id'], conteudo_id, tempo_gasto))
    
    conn.commit()
    conn.close()
    
    return jsonify({'mensagem': 'Progresso atualizado com sucesso'})

# Rotas de quizzes
@app.route('/api/quizzes', methods=['GET'])
@token_required
def listar_quizzes(current_user_id):
    """Lista todos os quizzes disponíveis"""
    conn = get_db_connection()
    
    quizzes = conn.execute('''
        SELECT q.*, m.titulo as modulo_titulo,
               COUNT(t.id) as tentativas,
               MAX(t.nota) as melhor_nota,
               MAX(CASE WHEN t.aprovado = 1 THEN 1 ELSE 0 END) as aprovado
        FROM quizzes q
        JOIN modulos m ON q.modulo_id = m.id
        LEFT JOIN tentativas_quiz t ON q.id = t.quiz_id AND t.usuario_id = ?
        WHERE q.ativo = 1
        GROUP BY q.id
        ORDER BY m.ordem, q.id
    ''', (current_user_id,)).fetchall()
    
    conn.close()
    
    return jsonify([dict(quiz) for quiz in quizzes])

@app.route('/api/quizzes/<int:quiz_id>', methods=['GET'])
@token_required
def obter_quiz(current_user_id, quiz_id):
    """Obtém detalhes de um quiz específico"""
    conn = get_db_connection()
    
    quiz = conn.execute(
        'SELECT * FROM quizzes WHERE id = ? AND ativo = 1',
        (quiz_id,)
    ).fetchone()
    
    if not quiz:
        conn.close()
        return jsonify({'erro': 'Quiz não encontrado'}), 404
    
    # Busca questões do quiz
    questoes = conn.execute(
        'SELECT id, pergunta, tipo, opcoes, ordem FROM questoes WHERE quiz_id = ? ORDER BY ordem',
        (quiz_id,)
    ).fetchall()
    
    conn.close()
    
    quiz_dict = dict(quiz)
    quiz_dict['questoes'] = [dict(questao) for questao in questoes]
    
    return jsonify(quiz_dict)

@app.route('/api/quizzes/<int:quiz_id>/submeter', methods=['POST'])
@token_required
def submeter_quiz(current_user_id, quiz_id):
    """Submete respostas de um quiz"""
    data = request.get_json()
    respostas = data.get('respostas', {})
    tempo_gasto = data.get('tempo_gasto', 0)
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Busca questões e respostas corretas
    questoes = conn.execute(
        'SELECT id, resposta_correta FROM questoes WHERE quiz_id = ?',
        (quiz_id,)
    ).fetchall()
    
    # Calcula nota
    total_questoes = len(questoes)
    acertos = 0
    
    for questao in questoes:
        resposta_usuario = respostas.get(str(questao['id']))
        if resposta_usuario == questao['resposta_correta']:
            acertos += 1
    
    nota = (acertos / total_questoes) * 10 if total_questoes > 0 else 0
    
    # Busca nota mínima do quiz
    quiz = conn.execute('SELECT nota_minima FROM quizzes WHERE id = ?', (quiz_id,)).fetchone()
    aprovado = nota >= quiz['nota_minima']
    
    # Salva tentativa
    cursor.execute('''
        INSERT INTO tentativas_quiz (usuario_id, quiz_id, respostas, nota, tempo_gasto, aprovado)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (current_user_id, quiz_id, str(respostas), nota, tempo_gasto, aprovado))
    
    conn.commit()
    conn.close()
    
    return jsonify({
        'nota': nota,
        'aprovado': aprovado,
        'acertos': acertos,
        'total_questoes': total_questoes,
        'nota_minima': quiz['nota_minima']
    })

# Rota para seed de dados iniciais
@app.route('/api/seed', methods=['POST'])
def seed_data():
    """Popula o banco com dados iniciais"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Usuários de teste
    usuarios_teste = [
        ('Administrador', 'admin@tea.edu', generate_password_hash('admin123'), 'admin'),
        ('Maria Silva', 'maria@email.com', generate_password_hash('student123'), 'estudante'),
        ('João Santos', 'joao@email.com', generate_password_hash('student123'), 'estudante')
    ]
    
    for usuario in usuarios_teste:
        cursor.execute('''
            INSERT OR IGNORE INTO usuarios (nome, email, senha, tipo)
            VALUES (?, ?, ?, ?)
        ''', usuario)
    
    # Módulos
    modulos = [
        ('Introdução ao TEA', 'Conceitos fundamentais sobre o Transtorno do Espectro Autista', 1),
        ('Características e Diagnóstico', 'Identificação de sinais e processo diagnóstico', 2),
        ('Abordagens Terapêuticas', 'Diferentes métodos de intervenção e tratamento', 3),
        ('Comunicação e Interação', 'Estratégias de comunicação efetiva', 4),
        ('Cuidado Humanizado', 'Práticas de cuidado centrado na pessoa', 5)
    ]
    
    for modulo in modulos:
        cursor.execute('''
            INSERT OR IGNORE INTO modulos (titulo, descricao, ordem)
            VALUES (?, ?, ?)
        ''', modulo)
    
    conn.commit()
    conn.close()
    
    return jsonify({'mensagem': 'Dados iniciais criados com sucesso'})

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
