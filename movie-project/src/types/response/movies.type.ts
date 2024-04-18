export interface IMovieResponse {
    id: number,
    movie_name: string,
    movie_name_other: string,
    release: string,
    status: "on" | "off",
    banner_image: string,
    movie_image: string,
    description: string,
    views: number,
    slug: string,
    episodes_counter: number,
    movie_episodes_count: number,
    movie_rate_avg_rate: null | number,
    movie_episode_laster?: IEpisode
}

interface IEpisode {
    episode_name: string,
    slug: string,
}