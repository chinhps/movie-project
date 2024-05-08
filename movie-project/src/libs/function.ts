import { IEpisodeHistory } from "@/types/episode.type";

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