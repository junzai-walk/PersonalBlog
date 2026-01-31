
export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  video_url?: string;
  project_url?: string;
  source_url?: string;
  features?: string[];
  techStack?: string[];
  long_description?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  reading_time: string;
  category: string;
  tags: string[];
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
  icon: string;
}

export interface Problem {
  id: number;
  title: string;
  difficulty: '简单' | '中等' | '困难';
  tags: string[];
  time: string;
}
