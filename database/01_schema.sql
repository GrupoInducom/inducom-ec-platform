CREATE SCHEMA IF NOT EXISTS rrhh;
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- 1. ENUMS
CREATE TYPE rrhh.user_role AS ENUM ('admin', 'hr', 'reviewer', 'candidate');
CREATE TYPE rrhh.user_status AS ENUM ('inactive', 'active');
CREATE TYPE rrhh.vacancy_status AS ENUM ('draft', 'published', 'closed', 'cancelled');
CREATE TYPE rrhh.application_status AS ENUM ('applied', 'testing', 'under_review', 'rejected', 'winner', 'withdrawn');

-- 2. TABLES
CREATE TABLE rrhh.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role rrhh.user_role NOT NULL DEFAULT 'candidate',
  status rrhh.user_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rrhh.candidates (
  id UUID PRIMARY KEY REFERENCES rrhh.profiles(id) ON DELETE CASCADE,
  phone TEXT,
  document_id TEXT UNIQUE, -- Cédula/DNI
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rrhh.vacancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status rrhh.vacancy_status NOT NULL DEFAULT 'draft',
  created_by UUID NOT NULL REFERENCES rrhh.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rrhh.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES rrhh.candidates(id),
  vacancy_id UUID NOT NULL REFERENCES rrhh.vacancies(id),
  status rrhh.application_status NOT NULL DEFAULT 'applied',
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(candidate_id, vacancy_id) -- No duplicate applications per vacancy
);

CREATE TABLE rrhh.application_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES rrhh.applications(id) ON DELETE CASCADE,
  previous_status rrhh.application_status,
  new_status rrhh.application_status NOT NULL,
  changed_by UUID REFERENCES rrhh.profiles(id),
  comments TEXT,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rrhh.tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  min_score NUMERIC NOT NULL DEFAULT 70.0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rrhh.application_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES rrhh.applications(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES rrhh.tests(id),
  score NUMERIC,
  passed BOOLEAN GENERATED ALWAYS AS (score >= 70.0) STORED,
  completed_at TIMESTAMPTZ,
  UNIQUE(application_id, test_id)
);

CREATE TABLE rrhh.candidate_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES rrhh.candidates(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rrhh.candidate_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES rrhh.applications(id) ON DELETE CASCADE,
  step_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rrhh.reviewer_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES rrhh.applications(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES rrhh.profiles(id),
  decision TEXT NOT NULL CHECK (decision IN ('approved', 'rejected')),
  comments TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rrhh.winners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL UNIQUE REFERENCES rrhh.applications(id),
  vacancy_id UUID NOT NULL REFERENCES rrhh.vacancies(id),
  candidate_id UUID NOT NULL REFERENCES rrhh.candidates(id),
  confirmed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rrhh.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL,
  old_data JSONB,
  new_data JSONB,
  performed_by UUID,
  performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. ÍNDICES DE PERFORMANCE
CREATE INDEX idx_applications_candidate_id ON rrhh.applications(candidate_id);
CREATE INDEX idx_applications_vacancy_id ON rrhh.applications(vacancy_id);
CREATE INDEX idx_vacancies_status ON rrhh.vacancies(status);
CREATE INDEX idx_app_status_hist_app_id ON rrhh.application_status_history(application_id);

-- 4. POLÍTICAS RLS Y SEGURIDAD
ALTER TABLE rrhh.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rrhh.vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE rrhh.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE rrhh.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE rrhh.candidate_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE rrhh.candidate_videos ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION rrhh.auth_user_role() RETURNS rrhh.user_role AS $$
  SELECT role FROM rrhh.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- CANDIDATOS
CREATE POLICY "Candidates can view own profile" ON rrhh.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Candidates can view own data" ON rrhh.candidates FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Candidates can update own data" ON rrhh.candidates FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Candidates see published vacancies" ON rrhh.vacancies FOR SELECT USING (status = 'published');
CREATE POLICY "Candidates see own applications" ON rrhh.applications FOR SELECT USING (candidate_id = auth.uid());
CREATE POLICY "Candidates can insert own applications" ON rrhh.applications FOR INSERT WITH CHECK (candidate_id = auth.uid());

-- HR / ADMIN
CREATE POLICY "HR can view all profiles" ON rrhh.profiles FOR SELECT USING (rrhh.auth_user_role() IN ('hr', 'admin'));
CREATE POLICY "HR can full access vacancies" ON rrhh.vacancies FOR ALL USING (rrhh.auth_user_role() IN ('hr', 'admin'));
CREATE POLICY "HR can full access applications" ON rrhh.applications FOR ALL USING (rrhh.auth_user_role() IN ('hr', 'admin'));

-- REVISORES
CREATE POLICY "Reviewers can view applications under review" ON rrhh.applications FOR SELECT USING (
  status = 'under_review' AND rrhh.auth_user_role() IN ('reviewer', 'admin')
);
CREATE POLICY "Reviewers can insert decisions" ON rrhh.reviewer_decisions FOR INSERT WITH CHECK (
  reviewer_id = auth.uid() AND rrhh.auth_user_role() IN ('reviewer', 'admin')
);

-- DOCUMENTOS Y VIDEOS
CREATE POLICY "Candidates manage own documents" ON rrhh.candidate_documents FOR ALL USING (candidate_id = auth.uid());
CREATE POLICY "HR and Reviewers can view documents" ON rrhh.candidate_documents FOR SELECT USING (rrhh.auth_user_role() IN ('hr', 'reviewer', 'admin'));

-- 5. TRIGGERS
-- Trigger para auditar cambios de estado en las postulaciones de forma automática e inmutable
CREATE OR REPLACE FUNCTION rrhh.log_application_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO rrhh.application_status_history (application_id, previous_status, new_status, changed_by, comments)
    VALUES (NEW.id, NULL, NEW.status, auth.uid(), 'Postulación inicial automática');
  ELSIF TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO rrhh.application_status_history (application_id, previous_status, new_status, changed_by, comments)
    VALUES (NEW.id, OLD.status, NEW.status, auth.uid(), 'Cambio de estado modificado por el sistema/usuario');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_application_status_change
  AFTER INSERT OR UPDATE ON rrhh.applications
  FOR EACH ROW
  EXECUTE FUNCTION rrhh.log_application_status_change();
