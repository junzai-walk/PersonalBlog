import { API_BASE_URL } from './config';

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  video_url: string | null;
  project_url: string | null;
  source_url: string | null;
  features: string[];
  techStack: string[];
  long_description: string | null;
  view_count: number;
}

export const getProjects = async (params: { category?: string; search?: string } = {}): Promise<Project[]> => {
  const query = new URLSearchParams(params as any).toString();
  const response = await fetch(`${API_BASE_URL}/projects?${query}`);
  const result = await response.json();
  return result.success ? result.data : [];
};

export const getProjectDetail = async (id: string): Promise<Project | null> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`);
  const result = await response.json();
  return result.success ? result.data : null;
};

export const createProject = async (project: Partial<Project>): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  const result = await response.json();
  return result.success;
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  const result = await response.json();
  return result.success;
};

export const deleteProject = async (id: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result.success;
};
