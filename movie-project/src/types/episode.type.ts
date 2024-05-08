export interface IEpisodeProps {
    text: string | number;
    href?: string;
    slug?: string;
    episode: IEpisodeHistory;
    active?: boolean;
}

export interface IEpisodeHistory {
    movieId?: number;
    slug?: string;
}