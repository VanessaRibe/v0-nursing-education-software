-- Add test data for student functionality testing

-- Insert test student user
INSERT INTO users (id, name, email, password_hash, role, created_at) VALUES 
(2, 'Maria Silva Santos', 'maria@email.com', '$2b$10$hash_for_student123', 'student', NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert sample content for each module
INSERT INTO content (id, module_id, title, type, content_url, description, duration_minutes, order_index) VALUES
-- Module 1 content
(1, 1, 'Introdução ao TEA', 'video', '/videos/intro-tea.mp4', 'Vídeo introdutório sobre o Transtorno do Espectro Autista', 15, 1),
(2, 1, 'Características do TEA', 'podcast', '/audio/caracteristicas-tea.mp3', 'Podcast sobre as principais características do TEA', 20, 2),
(3, 1, 'Mapa Mental - Conceitos Básicos', 'mindmap', '/images/mindmap-conceitos.png', 'Mapa mental com conceitos fundamentais', 10, 3),

-- Module 2 content  
(4, 2, 'Comunicação no TEA', 'video', '/videos/comunicacao-tea.mp4', 'Como se comunicar efetivamente com pessoas com TEA', 18, 1),
(5, 2, 'Estratégias de Comunicação', 'podcast', '/audio/estrategias-comunicacao.mp3', 'Podcast sobre estratégias práticas', 25, 2),
(6, 2, 'Mapa Mental - Comunicação', 'mindmap', '/images/mindmap-comunicacao.png', 'Técnicas de comunicação visual', 12, 3),

-- Module 3 content
(7, 3, 'Cuidados de Enfermagem', 'video', '/videos/cuidados-enfermagem.mp4', 'Cuidados específicos de enfermagem para TEA', 22, 1),
(8, 3, 'Procedimentos Adaptados', 'podcast', '/audio/procedimentos-adaptados.mp3', 'Como adaptar procedimentos de enfermagem', 30, 2),
(9, 3, 'Mapa Mental - Cuidados', 'mindmap', '/images/mindmap-cuidados.png', 'Fluxo de cuidados de enfermagem', 15, 3),

-- Module 4 content
(10, 4, 'Família e TEA', 'video', '/videos/familia-tea.mp4', 'O papel da família no cuidado', 20, 1),
(11, 4, 'Apoio Familiar', 'podcast', '/audio/apoio-familiar.mp3', 'Como apoiar famílias de pessoas com TEA', 28, 2),
(12, 4, 'Mapa Mental - Família', 'mindmap', '/images/mindmap-familia.png', 'Rede de apoio familiar', 10, 3),

-- Module 5 content
(13, 5, 'Inclusão Social', 'video', '/videos/inclusao-social.mp4', 'Promovendo a inclusão social', 25, 1),
(14, 5, 'Práticas Inclusivas', 'podcast', '/audio/praticas-inclusivas.mp3', 'Práticas para inclusão no ambiente hospitalar', 35, 2),
(15, 5, 'Mapa Mental - Inclusão', 'mindmap', '/images/mindmap-inclusao.png', 'Estratégias de inclusão', 12, 3)

ON CONFLICT (id) DO NOTHING;

-- Insert sample quiz questions for testing
INSERT INTO quiz_questions (id, quiz_id, question, question_type, options, correct_answer, explanation, points) VALUES
-- Quiz 1 questions
(1, 1, 'O que significa TEA?', 'multiple_choice', '["Transtorno do Espectro Autista", "Transtorno de Estresse Agudo", "Transtorno Emocional Adaptativo", "Transtorno de Atenção"]', 0, 'TEA é a sigla para Transtorno do Espectro Autista, uma condição neurológica que afeta a comunicação e comportamento.', 2),
(2, 1, 'O TEA afeta apenas crianças.', 'true_false', '["Verdadeiro", "Falso"]', 1, 'Falso. O TEA é uma condição que permanece ao longo da vida, afetando pessoas de todas as idades.', 2),
(3, 1, 'Qual é uma característica comum do TEA?', 'multiple_choice', '["Dificuldades na comunicação social", "Sempre ter deficiência intelectual", "Ser sempre não-verbal", "Ter comportamentos agressivos"]', 0, 'Dificuldades na comunicação social são uma das principais características do TEA.', 2),

-- Quiz 2 questions
(4, 2, 'A comunicação com pessoas com TEA deve ser:', 'multiple_choice', '["Rápida e direta", "Clara e objetiva", "Complexa e detalhada", "Sempre não-verbal"]', 1, 'A comunicação deve ser clara e objetiva para facilitar a compreensão.', 2),
(5, 2, 'É importante manter contato visual constante.', 'true_false', '["Verdadeiro", "Falso"]', 1, 'Falso. Muitas pessoas com TEA podem se sentir desconfortáveis com contato visual prolongado.', 2),

-- Quiz 3 questions  
(6, 3, 'Durante procedimentos de enfermagem, é importante:', 'multiple_choice', '["Fazer tudo rapidamente", "Explicar cada passo", "Evitar falar com o paciente", "Usar força se necessário"]', 1, 'Explicar cada passo ajuda a reduzir a ansiedade e promove a cooperação.', 2),
(7, 3, 'Mudanças na rotina são sempre bem aceitas.', 'true_false', '["Verdadeiro", "Falso"]', 1, 'Falso. Pessoas com TEA frequentemente preferem rotinas previsíveis.', 2),

-- Quiz 4 questions
(8, 4, 'O papel da família no cuidado é:', 'multiple_choice', '["Irrelevante", "Fundamental", "Opcional", "Prejudicial"]', 1, 'A família desempenha um papel fundamental no cuidado e desenvolvimento da pessoa com TEA.', 2),
(9, 4, 'Famílias não precisam de apoio profissional.', 'true_false', '["Verdadeiro", "Falso"]', 1, 'Falso. O apoio profissional é essencial para orientar e apoiar as famílias.', 2),

-- Quiz 5 questions
(10, 5, 'A inclusão social beneficia:', 'multiple_choice', '["Apenas a pessoa com TEA", "Apenas a sociedade", "Ambos", "Ninguém"]', 2, 'A inclusão social beneficia tanto a pessoa com TEA quanto a sociedade como um todo.', 2),
(11, 5, 'Ambientes inclusivos são desnecessários.', 'true_false', '["Verdadeiro", "Falso"]', 1, 'Falso. Ambientes inclusivos são essenciais para o bem-estar e desenvolvimento de pessoas com TEA.', 2)

ON CONFLICT (id) DO NOTHING;

-- Insert some progress data for the test student
INSERT INTO user_progress (user_id, module_id, completed, completion_date, time_spent_minutes) VALUES
(2, 1, true, NOW() - INTERVAL '5 days', 45),
(2, 2, false, NULL, 20)
ON CONFLICT (user_id, module_id) DO NOTHING;

-- Insert some content progress
INSERT INTO content_progress (user_id, content_id, completed, completion_date, time_spent_minutes) VALUES
(2, 1, true, NOW() - INTERVAL '5 days', 15),
(2, 2, true, NOW() - INTERVAL '5 days', 20),
(2, 3, true, NOW() - INTERVAL '5 days', 10),
(2, 4, true, NOW() - INTERVAL '2 days', 18),
(2, 5, false, NULL, 2)
ON CONFLICT (user_id, content_id) DO NOTHING;

-- Insert some quiz attempts
INSERT INTO quiz_attempts (user_id, quiz_id, score, total_questions, passed, completed_at, time_spent_minutes) VALUES
(2, 1, 6, 6, true, NOW() - INTERVAL '4 days', 8),
(2, 2, 3, 4, false, NOW() - INTERVAL '1 day', 6)
ON CONFLICT (user_id, quiz_id) DO NOTHING;
