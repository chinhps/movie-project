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
    movie_episode_laster?: IEpisode,
    movie_episodes?: Array<IEpisode>,
    categories?: Array<Category>,
    movie_rate_count?: number,
    created_at?: string,
}

export interface IMovieHistory {
    episode_name: string,
    id: number
    movie: IMovieResponse
}

export interface IBookmark {
    slug: string;
}

export interface IEpisodeResponse {
    movie: IMovieResponse,
    id: number,
    episode_name: string,
    created_at: string,
    slug: string,
    movie_sources: Array<IEpisodeSource>
}

export interface IEpisodeSource {
    server_name: string,
    source_link: string
}

export interface IEpisode {
    episode_name: string,
    slug: string,
}

interface Category {
    name: string,
    slug: string
}