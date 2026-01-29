
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  category: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
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
