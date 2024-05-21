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
    id: number,
    server_name: string,
    source_link: string,
    status: "on" | "off",
}

export interface IEpisode {
    episode_name: string,
    slug: string,
}

interface Category {
    name: string,
    slug: string
}

export interface IMovieAdmin {
    id: number,
    movie_name: string,
    movie_name_other: string,
    release: string,
    status: "off" | "on",
    banner_image: string,
    movie_image: string,
    description: string,
    created_at: string,
    updated_at: string,
    views: number,
    slug: string,
    episodes_counter: number,
    movie_rate_avg_rate: number,
    movie_episode_laster?: IEpisode,
    comments_counter: number,
    report_counter: number,
    episoded_counter: number
}

export interface IMovieAdminDetail extends IMovieAdmin {
    categories: Array<string>
}

export interface IEpisodeDetailAdmin extends IEpisodeResponse {
    status: "on" | "off",
}