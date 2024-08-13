import { Repository, SearchData, SearchResponse } from "./types";

// Функция осуществляющая запрос к серверу для поиска репозиториев
// Принимает объект с query параметрами и возвращает найденные данные в случае успеха
// Выбрасывает ошибку при неудачном запросе
export const fetchRepositories = async (params: URLSearchParams) => {
  if (!params.has("per_page")) {
    params.set("per_page", "10");
  }
  const url = new URL(
    "https://api.github.com/search/repositories?" + params.toString()
  );
  const res = await fetch(url, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github+json",
    },
  });
  if (res.ok) {
    const data = (await res.json()) as SearchResponse;
    return {
      items: data.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          language: item.language,
          forks: item.forks_count,
          stars: item.stargazers_count,
          updated: formatDate(item.updated_at),
          description: item.description,
          license: item.license?.name,
        } as Repository;
      }),
      total: data.total_count,
    } as SearchData;
  }
  if (res.status === 304) {
    // Not modified
    throw new Error("Ошибка");
  }
  if (res.status === 422) {
    // Validation failed, or the endpoint has been spammed.
    throw new Error("Ошибка");
  }
  if (res.status === 503) {
    // Service unavailable
    throw new Error("Поиск временно невозможен");
  }

  throw new Error("Поиск временно невозможен");
};

// Список заголовков таблицы результатов поиска
export const titles: [keyof Repository, string][] = [
  ["name", "Название"],
  ["language", "Язык"],
  ["forks", "Число форков"],
  ["stars", "Число звезд"],
  ["updated", "Дата обновления"],
];

// Параметры, по которым возможно сортировка результатов поиска
export const sortableTitles: { [n in keyof Repository]?: boolean } = {
  name: false,
  language: false,
  forks: true,
  stars: true,
  updated: true,
};

// Функция для форматирования даты
// Принимает строку
// Возвращает дату в формате DD.MM.YYYY
const formatDate = (value: string) => {
  const date = new Date(value);
  let d = ["0" + date.getDate(), "0" + (date.getMonth() + 1)].map((component) =>
    component.slice(-2)
  );

  return d.slice(0, 3).join(".") + "." + date.getFullYear();
};
