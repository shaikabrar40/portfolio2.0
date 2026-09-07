import { useCallback, useEffect, useState } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import CustomizePanel from './components/CustomizePanel';
import Education from './components/Education';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import type { EducationItem, Project, SiteSettings, Skill } from './lib/api';
import { DEFAULT_SETTINGS, fetchJson } from './lib/api';

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const parts = result.split(',');
      resolve(parts[1] || '');
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

export default function App() {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('aura-theme');
      if (stored) return stored === 'dark';
    } catch {
      /* ignore */
    }
    return true;
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [educationError, setEducationError] = useState<string | null>(null);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('aura-theme', dark ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  }, [dark]);

  const fetchProjects = useCallback(async () => {
    try {
      setProjectsError(null);
      const data = await fetchJson<Project[]>('/api/projects');
      setProjects(data);
    } catch (err) {
      setProjectsError(err instanceof Error ? err.message : 'Failed to load');
    }
  }, []);

  const fetchSkills = useCallback(async () => {
    try {
      setSkillsError(null);
      const data = await fetchJson<Skill[]>('/api/skills');
      setSkills(data);
    } catch (err) {
      setSkillsError(err instanceof Error ? err.message : 'Failed to load');
    }
  }, []);

  const fetchEducation = useCallback(async () => {
    try {
      setEducationError(null);
      const data = await fetchJson<EducationItem[]>('/api/education');
      setEducation(data);
    } catch (err) {
      setEducationError(err instanceof Error ? err.message : 'Failed to load');
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await fetchJson<SiteSettings>('/api/settings');
      setSettings({ ...DEFAULT_SETTINGS, ...data });
    } catch {
      setSettings(DEFAULT_SETTINGS);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchProjects(), fetchSkills(), fetchEducation(), fetchSettings()]);
      setLoading(false);
    })();
  }, [fetchProjects, fetchSkills, fetchEducation, fetchSettings]);

  const saveSettings = useCallback(async (patch: Partial<SiteSettings>) => {
    setSaving(true);
    try {
      const updated = await fetchJson<SiteSettings>('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      setSettings((prev) => ({ ...prev, ...updated }));
    } finally {
      setSaving(false);
    }
  }, []);

  const uploadVideo = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const fileBase64 = await fileToBase64(file);
      const { url } = await fetchJson<{ url: string }>('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, fileBase64, contentType: file.type }),
      });
      const updated = await fetchJson<SiteSettings>('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero_video_url: url, video_enabled: true }),
      });
      setSettings((prev) => ({ ...prev, ...updated }));
    } finally {
      setUploading(false);
    }
  }, []);

  const sendMessage = useCallback(async (payload: { name: string; email: string; message: string }) => {
    await fetchJson('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-[#0a0a18] dark:text-white">
      <Navbar
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
        onOpenSettings={() => setCustomizeOpen(true)}
      />

      <main>
        <Hero
          settings={settings}
          projectCount={projects.length}
          projectsLoading={loading}
          onOpenSettings={() => setCustomizeOpen(true)}
        />
        <About />
        <Skills skills={skills} loading={loading} error={skillsError} onRetry={fetchSkills} />
        <Projects projects={projects} loading={loading} error={projectsError} onRetry={fetchProjects} />
        <Education items={education} loading={loading} error={educationError} onRetry={fetchEducation} />
        <Contact onSend={sendMessage} />
      </main>

      <Footer />

      <CustomizePanel
        open={customizeOpen}
        settings={settings}
        saving={saving}
        uploading={uploading}
        onClose={() => setCustomizeOpen(false)}
        onSave={saveSettings}
        onUpload={uploadVideo}
      />
    </div>
  );
}
