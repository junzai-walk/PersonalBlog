
import React, { useState, useEffect } from 'react';
import { getLeetCodeStats, getLeetCodeProblems, type LeetCodeStats, type LeetCodeProblem } from '../api/leetcode';

const LeetCode: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [problems, setProblems] = useState<LeetCodeProblem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsData, problemsData] = await Promise.all([
          getLeetCodeStats(),
          getLeetCodeProblems({ limit: 20 })
        ]);
        setStats(statsData);
        setProblems(problemsData);
      } catch (error) {
        console.error('Failed to fetch LeetCode data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProblems = problems.filter(p => 
    p.title.includes(searchTerm) || p.tags.some(t => t.includes(searchTerm))
  );

  // Simulated Heatmap Data
  const heatmap = Array.from({ length: 52 }, () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)));

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">代码练习日志</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">记录我在算法挑战中的足迹，坚持每天解决一个难题。</p>
        </div>
        <div className="flex gap-3">
          <a href="https://leetcode.cn/u/xietong" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2.5 rounded-lg text-sm font-bold transition-all">
            <span className="material-symbols-outlined text-xl">code</span>
            <span>力扣个人主页</span>
          </a>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 p-6 rounded-2xl mb-12 shadow-sm overflow-x-auto">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">活跃热力图 / Activity Heatmap</h3>
        <div className="flex gap-1">
          {heatmap.map((week, i) => (
            <div key={i} className="flex flex-col gap-1">
              {week.map((level, j) => (
                <div 
                  key={j} 
                  className={`size-3 rounded-sm ${
                    level === 0 ? 'bg-slate-100 dark:bg-slate-800' : 
                    level === 1 ? 'bg-primary/20' : 
                    level === 2 ? 'bg-primary/40' : 
                    level === 3 ? 'bg-primary/70' : 'bg-primary'
                  }`}
                  title={`${level} submissions`}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-4 text-[10px] text-slate-400 font-bold items-center">
          <span>Less</span>
          <div className="size-3 rounded-sm bg-slate-100 dark:bg-slate-800"></div>
          <div className="size-3 rounded-sm bg-primary/20"></div>
          <div className="size-3 rounded-sm bg-primary/70"></div>
          <div className="size-3 rounded-sm bg-primary"></div>
          <span>More</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
            </div>
          ))
        ) : stats ? (
          [
            { label: '总解题数', value: stats.total_solved.toString(), trend: `本周 +${stats.weekly_solved || 0}`, color: 'easy', icon: 'task_alt', status: 'up' },
            { label: '正确率', value: `${(typeof stats.accuracy === 'number' ? stats.accuracy : parseFloat(stats.accuracy) || 0).toFixed(1)}%`, trend: '保持稳定', color: 'easy', icon: 'percent', status: 'up' },
            { label: '连续打卡', value: `${stats.streak_days} 天`, trend: '继续加油', color: 'hard', icon: 'local_fire_department', status: 'up' },
            { label: '全球排名', value: `#${stats.global_rank.toLocaleString()}`, trend: '排名前列', color: 'primary', icon: 'leaderboard', status: 'up' },
          ].map((s, idx) => (
            <div key={idx} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{s.label}</p>
                <span className={`material-symbols-outlined text-primary`}>{s.icon}</span>
              </div>
              <p className="text-3xl font-bold tracking-tight mb-1">{s.value}</p>
              <p className={`${s.color === 'easy' ? 'text-easy' : s.color === 'hard' ? 'text-hard' : 'text-primary'} text-sm font-medium flex items-center gap-1`}>
                {s.trend}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center py-10 text-slate-400">
            <p>暂无统计数据</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">最近解题列表</h2>
            <div className="relative">
               <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
               <input 
                 type="text" 
                 placeholder="搜索题目或标签..." 
                 className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-sm w-full sm:w-64 focus:ring-2 focus:ring-primary outline-none"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
          </div>
          <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-8 text-center text-slate-400 animate-pulse">
                <p>加载题目列表中...</p>
              </div>
            ) : filteredProblems.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProblems.map((p) => {
                  // 格式化时间显示
                  const formatTime = (dateStr: string) => {
                    const date = new Date(dateStr);
                    const now = new Date();
                    const diff = now.getTime() - date.getTime();
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    if (days === 0) return '今天';
                    if (days === 1) return '昨天';
                    if (days < 7) return `${days} 天前`;
                    return date.toLocaleDateString('zh-CN');
                  };

                  return (
                    <div key={p.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                            p.difficulty === '简单' ? 'bg-easy/10 text-easy' : p.difficulty === '中等' ? 'bg-medium/10 text-medium' : 'bg-hard/10 text-hard'
                          }`}>
                            {p.difficulty}
                          </span>
                          <h3 className="font-bold">{p.problem_id ? `${p.problem_id}. ` : ''}{p.title}</h3>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">{formatTime(p.solved_at)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {p.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 font-bold">{tag}</span>
                          ))}
                        </div>
                        <a href={p.url} target="_blank" rel="noreferrer" className="text-primary text-xs font-bold flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          查看题解 <span className="material-symbols-outlined !text-sm">open_in_new</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <p>未找到匹配的题目</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold mb-6">难度分布</h3>
            <div className="flex flex-col gap-6">
              {[
                { label: '简单', val: 182, total: 400, color: 'bg-easy', pct: 45.5 },
                { label: '中等', val: 215, total: 600, color: 'bg-medium', pct: 35.8 },
                { label: '困难', val: 55, total: 200, color: 'bg-hard', pct: 27.5 },
              ].map(d => (
                <div key={d.label} className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{d.label}</span>
                    <span className="text-slate-400">{d.val}/{d.total}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${d.color} rounded-full transition-all duration-1000`} style={{ width: `${d.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCode;
