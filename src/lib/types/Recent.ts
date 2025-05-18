export interface RecentlyPlayedResp {
    items: Item[];
    next: string;
    cursors: Cursors;
    limit: number;
    href: string;
}

export interface Cursors {
    after: string;
    before: string;
}

export interface Item {
    track: Track;
    played_at: Date;
    context: Context | null;
}

export interface Context {
    external_urls: ExternalUrls;
    href: string;
    type: ContextType;
    uri: string;
}

export interface ExternalUrls {
    spotify: string;
}

export enum ContextType {
    Artist = "artist",
}

export interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIDS;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: null;
    track_number: number;
    type: TrackType;
    uri: string;
}

export interface Album {
    album_type: AlbumTypeEnum;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: Date;
    release_date_precision: ReleaseDatePrecision;
    total_tracks: number;
    type: AlbumTypeEnum;
    uri: string;
}

export enum AlbumTypeEnum {
    Album = "album",
    Compilation = "compilation",
    Single = "single",
}

export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: ContextType;
    uri: string;
}

export interface Image {
    height: number;
    url: string;
    width: number;
}

export enum ReleaseDatePrecision {
    Day = "day",
}

export interface ExternalIDS {
    isrc: string;
}

export enum TrackType {
    Track = "track",
}


export interface RecentlyPlayedItem {
    playedAt: Date;
    track: {
        name: string;
        url: string;
        duration_ms: number;
    }
    artists: Array<{
        name: string;
        url: string;
    }>;
    album: {
        name: string;
        url: string;
        image: string;
    };
    playTimes: number;
}