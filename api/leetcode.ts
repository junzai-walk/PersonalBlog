import { API_BASE_URL } from './config';

export interface LeetCodeStats {
  total_solved: number;
  accuracy: number;
  streak_days: number;
  global_rank: number;
  weekly_solved: number;
}

export interface LeetCodeProblem {
  id: number;
  problem_id: string;
  title: string;
  difficulty: '简单' | '中等' | '困难';
  tags: string[];
  url: string;
  solved_at: string;
}

export const getLeetCodeStats = async (): Promise<LeetCodeStats | null> => {
  const response = await fetch(`${API_BASE_URL}/leetcode/stats`);
  const result = await response.json();
  return result.success ? result.data : null;
};

export const getLeetCodeProblems = async (params: { difficulty?: string; search?: string; limit?: number; offset?: number } = {}): Promise<LeetCodeProblem[]> => {
  const query = new URLSearchParams(params as any).toString();
  const response = await fetch(`${API_BASE_URL}/leetcode/problems?${query}`);
  const result = await response.json();
  return result.success ? result.data : [];
};
