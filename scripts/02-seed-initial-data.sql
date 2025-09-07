-- Seed initial data for TEA Care Learning Platform

-- Insert default admin user
INSERT INTO users (name, email, password_hash, role) VALUES 
('Administrador', 'admin@tea.edu', '$2b$10$example_hash_here', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert the 5 learning modules
INSERT INTO modules (title, description, order_index) VALUES 
('Identificação e Diagnóstico Precoce do TEA', 'Aprenda sobre os sinais precoces e métodos de diagnóstico do Transtorno do Espectro Autista', 1),
('Intervenções Precoces e Desenvolvimento no TEA', 'Compreenda as intervenções essenciais para o desenvolvimento de crianças com TEA', 2),
('Desafios Familiares e Apoio no Cuidado de Crianças com TEA', 'Explore o impacto familiar e estratégias de apoio no cuidado de crianças com TEA', 3),
('Comunicação e Personalização do Cuidado para Crianças com TEA', 'Desenvolva habilidades de comunicação e personalização do cuidado', 4),
('Adaptação Ambiental e Qualidade de Vida no Cuidado ao TEA', 'Aprenda sobre adaptações ambientais e planos de cuidados de enfermagem', 5)
ON CONFLICT DO NOTHING;

-- Insert sample content for Module 1
INSERT INTO content (module_id, title, content_type, content_url, duration_minutes, order_index) VALUES 
(1, 'Introdução ao TEA', 'video', '/videos/modulo1-intro.mp4', 15, 1),
(1, 'Sinais Precoces do Autismo', 'video', '/videos/modulo1-sinais.mp4', 20, 2),
(1, 'Podcast: Experiências de Diagnóstico', 'podcast', '/audio/modulo1-podcast.mp3', 25, 3),
(1, 'Mapa Mental: Características do TEA', 'mindmap', '/images/modulo1-mapa.png', 5, 4)
ON CONFLICT DO NOTHING;

-- Insert sample quiz for Module 1
INSERT INTO quizzes (module_id, title, description, passing_score) VALUES 
(1, 'Avaliação: Identificação e Diagnóstico', 'Teste seus conhecimentos sobre identificação e diagnóstico precoce do TEA', 80)
ON CONFLICT DO NOTHING;

-- Insert sample quiz questions
INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES 
(1, 'Qual é a idade típica para os primeiros sinais de TEA aparecerem?', 'multiple_choice', 1, 2),
(1, 'A comunicação não-verbal é sempre prejudicada em crianças com TEA.', 'true_false', 2, 1),
(1, 'Cenário: Uma criança de 3 anos evita contato visual e não responde ao nome. Qual seria sua primeira abordagem?', 'scenario', 3, 3)
ON CONFLICT DO NOTHING;

-- Insert answer options for the multiple choice question
INSERT INTO quiz_answer_options (question_id, option_text, is_correct, order_index) VALUES 
(1, 'Entre 6-12 meses', false, 1),
(1, 'Entre 12-24 meses', true, 2),
(1, 'Entre 3-4 anos', false, 3),
(1, 'Após os 5 anos', false, 4);

-- Insert answer options for true/false question
INSERT INTO quiz_answer_options (question_id, option_text, is_correct, order_index) VALUES 
(2, 'Verdadeiro', false, 1),
(2, 'Falso', true, 2);

-- Insert scenario answer options
INSERT INTO quiz_answer_options (question_id, option_text, is_correct, order_index) VALUES 
(3, 'Encaminhar imediatamente para avaliação especializada', true, 1),
(3, 'Aguardar mais alguns meses para observar', false, 2),
(3, 'Recomendar apenas atividades lúdicas', false, 3),
(3, 'Sugerir mudança de ambiente escolar', false, 4);
