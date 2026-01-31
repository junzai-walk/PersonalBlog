import { API_BASE_URL } from './config';

export interface Activity {
  id: number;
  title: string;
  date: string;
  type: string;
  icon: string;
  description: string;
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
  icon: string;
  color: string;
  sort_order: number;
}

export const getActivities = async (limit = 10): Promise<Activity[]> => {
  const response = await fetch(`${API_BASE_URL}/home/activities?limit=${limit}`);
  const result = await response.json();
  return result.success ? result.data : [];
};

export const getAvatar = async (): Promise<string | null> => {
  const response = await fetch(`${API_BASE_URL}/home/avatar`);
  const result = await response.json();
  if (result.success && result.data.avatarUrl) {
    if (result.data.avatarUrl.startsWith('/uploads/')) {
        return `http://localhost:3001${result.data.avatarUrl}`;
    }
    return result.data.avatarUrl;
  }
  return null;
};

export const updateAvatar = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('avatar', file);
  const response = await fetch(`${API_BASE_URL}/home/avatar`, {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();
  if (result.success && result.data.avatarUrl) {
      return `http://localhost:3001${result.data.avatarUrl}`;
  }
  return null;
};

export const getSkills = async (): Promise<Skill[]> => {
  const response = await fetch(`${API_BASE_URL}/home/skills`);
  const result = await response.json();
  return result.success ? result.data : [];
};
