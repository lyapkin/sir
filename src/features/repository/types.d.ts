// Структура репозитория хранящегося в состоянии приложения
export type Repository = {
  id: number;
  name: string;
  language: string;
  forks: number;
  stars: number;
  updated: string;
  description: string;
  license: string;
};

// Данные по текущему запросу, состоящие из списка репозиториев
// и общего количества репозиториев доступных по данному запросу
export type SearchData = {
  items: Repository[];
  total: number;
};

// Структура состояния приложения, ответственная за репозитории
export type RepositoriesState = {
  data: SearchData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selected: Repository | null;
};

// Структура репозитория приходящего от сервера
export type ResponseRepository = {
  id: number;
  name: string;
  language: string;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
  description: string;
  license: {
    key: string;
    name: string;
  };
};

// Ответ приходящие от сервера
export type SearchResponse = {
  incomplete_results: boolean;
  items: ResponseRepository[];
  total_count: number;
};
