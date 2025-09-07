-- Add progress tracking and certification tables

-- Create progress tracking table
CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
    content_id INTEGER REFERENCES module_contents(id) ON DELETE CASCADE,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    time_spent INTEGER DEFAULT 0, -- in minutes
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, content_id)
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    certificate_id VARCHAR(50) UNIQUE NOT NULL,
    course_name VARCHAR(255) NOT NULL DEFAULT 'Humanização do Cuidado no TEA',
    final_score INTEGER NOT NULL CHECK (final_score >= 0 AND final_score <= 100),
    total_hours INTEGER NOT NULL DEFAULT 40,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_valid BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create learning sessions table for detailed tracking
CREATE TABLE IF NOT EXISTS learning_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
    session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_end TIMESTAMP,
    duration_minutes INTEGER DEFAULT 0,
    activities_completed INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_module_id ON user_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_user_id ON learning_sessions(user_id);

-- Insert sample progress data
INSERT INTO user_progress (user_id, module_id, content_id, progress_percentage, time_spent, completed_at) VALUES
(2, 1, 1, 100, 45, '2024-01-05 10:30:00'),
(2, 1, 2, 100, 35, '2024-01-05 11:15:00'),
(2, 1, 3, 100, 25, '2024-01-05 12:00:00'),
(2, 2, 4, 100, 40, '2024-01-08 09:30:00'),
(2, 2, 5, 60, 20, NULL),
(2, 3, 6, 100, 30, '2024-01-11 14:00:00');

-- Insert sample certificate for completed student
INSERT INTO certificates (user_id, certificate_id, final_score, total_hours) VALUES
(2, 'TEA-2024-001', 92, 40);

-- Insert sample learning sessions
INSERT INTO learning_sessions (user_id, module_id, session_start, session_end, duration_minutes, activities_completed) VALUES
(2, 1, '2024-01-05 10:00:00', '2024-01-05 12:30:00', 150, 4),
(2, 2, '2024-01-08 09:00:00', '2024-01-08 10:30:00', 90, 2),
(2, 3, '2024-01-11 13:30:00', '2024-01-11 14:30:00', 60, 1);
