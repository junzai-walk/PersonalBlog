import { API_BASE_URL } from './config';

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
}

export interface DanceMedia {
  id: number;
  title: string;
  description: string;
  url: string;
  type: 'image' | 'video';
}

export interface ResumeInfo {
  url: string;
  name: string;
  uploadedAt: string;
}

export const getTimeline = async (): Promise<TimelineItem[]> => {
  const response = await fetch(`${API_BASE_URL}/about/timeline`);
  const result = await response.json();
  return result.success ? result.data : [];
};

export const getDanceMedia = async (): Promise<DanceMedia[]> => {
  const response = await fetch(`${API_BASE_URL}/about/dance-media`);
  const result = await response.json();
  return result.success ? result.data : [];
};

export const getResume = async (): Promise<ResumeInfo | null> => {
  const response = await fetch(`${API_BASE_URL}/about/resume`);
  const result = await response.json();
  return result.success ? result.data : null;
};
