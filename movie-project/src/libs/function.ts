import { IEpisodeHistory } from "@/types/episode.type";
import { IBookmark } from "@/types/response/movies.type";

export const numberFormat = (price: number, currency: boolean = true) => {
  const format = new Intl.NumberFormat("vi-VN", {
    style: currency ? "currency" : undefined,
    currency: currency ? "VND" : undefined,
  }).format(price);
  return format;
};

export const saveEpisode = (episode: IEpisodeHistory) => {
  const localHistories: Array<IEpisodeHistory> = JSON.parse(
    localStorage.getItem("movie-history") ?? "[]"
  );
  if (!checkEpisode(episode)) {
    const newHistory: Array<IEpisodeHistory> = [
      ...localHistories,
      {
        movieId: episode.movieId,
        slug: episode.slug,
      },
    ];
    localStorage.setItem("movie-history", JSON.stringify(newHistory));
  }
};

export const checkEpisode = (episode: IEpisodeHistory) => {
  const localHistories: Array<IEpisodeHistory> = JSON.parse(
    localStorage?.getItem("movie-history") ?? "[]"
  );
  return localHistories.find((elm) => elm.slug === episode.slug);
};

export const saveBookmark = (bookmark: IBookmark) => {
  const localBookmarks: Array<IBookmark> = JSON.parse(
    localStorage.getItem("movie-bookmarks") ?? "[]"
  );
  if (!checkBookmark(bookmark)) {
    const newBookmark: Array<IBookmark> = [
      ...localBookmarks,
      {
        slug: bookmark.slug,
      },
    ];
    localStorage.setItem("movie-bookmarks", JSON.stringify(newBookmark));
  }
};

export const checkBookmark = (bookmark: IBookmark) => {
  const localBookmarks: Array<IBookmark> = JSON.parse(
    localStorage.getItem("movie-bookmarks") ?? "[]"
  );
  return localBookmarks.find((elm) => elm.slug === bookmark.slug);
};

export const removeBookmark = (bookmark: IBookmark) => {
  const localBookmarks: Array<IBookmark> = JSON.parse(
    localStorage.getItem("movie-bookmarks") ?? "[]"
  );
  const index = localBookmarks.findIndex((elm) => elm.slug === bookmark.slug);
  localBookmarks.splice(index, 1);
  console.log(localBookmarks, index);
  
  localStorage.setItem("movie-bookmarks", JSON.stringify(localBookmarks));
};

export function objectToFormData(
  formData: FormData,
  data: Record<string, any>,
  parentKey: string | null = null
) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const newItemKey = `${newKey}[${index}]`;
          if (item instanceof File) {
            formData.append(newItemKey, item);
            return;
          }
          if (typeof item === "object" && item !== null) {
            objectToFormData(formData, item, newItemKey);
            return;
          }
          formData.append(newItemKey, item);
        });
      } else if (value instanceof File) {
        formData.append(newKey, value);
      } else if (typeof value === "object" && value !== null) {
        objectToFormData(formData, value, newKey);
      } else {
        formData.append(newKey, value);
      }
    }
  }
}