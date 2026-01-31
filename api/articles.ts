import { API_BASE_URL } from './config';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  reading_time: string;
  category: string;
  tags: string[];
  view_count?: number;
}

export const getArticles = async (params: { category?: string; search?: string; limit?: number; offset?: number } = {}): Promise<{ data: Article[]; pagination: any }> => {
  const query = new URLSearchParams(params as any).toString();
  const response = await fetch(`${API_BASE_URL}/articles?${query}`);
  const result = await response.json();
  return result.success ? { data: result.data, pagination: result.pagination } : { data: [], pagination: {} };
};

export const getArticleDetail = async (id: string): Promise<Article | null> => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`);
  const result = await response.json();
  return result.success ? result.data : null;
};

export const createArticle = async (article: Partial<Article>): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article),
  });
  const result = await response.json();
  return result.success;
};

export const updateArticle = async (id: string, article: Partial<Article>): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article),
  });
  const result = await response.json();
  return result.success;
};

export const deleteArticle = async (id: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result.success;
};

export const getCategoryStats = async (): Promise<{ category: string; count: number }[]> => {
  const response = await fetch(`${API_BASE_URL}/articles/stats/categories`);
  const result = await response.json();
  return result.success ? result.data : [];
};
