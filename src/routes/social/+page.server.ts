import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } from "$env/static/private";
import type { RecentlyPlayedResp, RecentlyPlayedItem } from "$lib/types/Recent";

import { type PlayerState } from "$lib/types/Spotify";
import type { PageServerLoad } from "./$types";

const basicAuth = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

const ENDPOINTS = {
    NOW_PLAYING: `https://api.spotify.com/v1/me/player`,
    RECENTLY_PLAYED: `https://api.spotify.com/v1/me/player/recently-played?limit=10`,
    TOKEN: `https://accounts.spotify.com/api/token`
};

let cachedAccessToken: string | null = null;
let accessTokenExpiresAt: number | null = null;

async function getAccessToken(): Promise<string | null> {
    const now = Date.now();

    if (cachedAccessToken && accessTokenExpiresAt && now < accessTokenExpiresAt) {
        return cachedAccessToken;
    }

    const response = await fetch(ENDPOINTS.TOKEN, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${basicAuth}`,
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: SPOTIFY_REFRESH_TOKEN,
        }),
    });

    if (!response.ok) {
        console.error("Failed to refresh access token:", await response.text());
        return null
    }

    const { access_token, expires_in } = await response.json();
    cachedAccessToken = access_token;
    accessTokenExpiresAt = now + (expires_in * 1000) - (60 * 1000);

    return access_token;
}

async function fetchSpotifyData(endpoint: string) {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        console.error("Failed to get access token");
        return null;
    }

    const response = await fetch(endpoint, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        console.error("guhhh", await response.text());
        return null;
    }
    if (response.status === 204) {
        return null;
    }
    return response.json();
}

let cachedNowPlaying: PlayerState | null = null;
let nowPlayingCachedAt: number | null = null;
const CACHE_DURATION = 180_000;

function onlyNecessaryInfo(nowPlaying: PlayerState) {
    if (!nowPlaying || !nowPlaying.is_playing || nowPlaying.device.is_private_session) {
        return null;
    }

    return {
        timestamp: nowPlaying.timestamp,
        progress: nowPlaying.progress_ms,
        duration: nowPlaying.item.duration_ms,
        name: nowPlaying.item.name,
        artists: nowPlaying.item.artists,
        image: nowPlaying.item.album.images[0].url,
        trackUrl: nowPlaying.item.external_urls.spotify,
        albumUrl: nowPlaying.item.album.external_urls.spotify,
        albumName: nowPlaying.item.album.name,
    }
}

async function getPlayerState() {
    const now = Date.now();

    if (cachedNowPlaying && nowPlayingCachedAt && now < nowPlayingCachedAt + CACHE_DURATION) {
        return cachedNowPlaying
    }

    const nowPlaying = await fetchSpotifyData(ENDPOINTS.NOW_PLAYING) as PlayerState;

    cachedNowPlaying = nowPlaying;
    nowPlayingCachedAt = now;

    return nowPlaying
}

const recentlyPlayedCache: { data: RecentlyPlayedItem[] | null, cachedAt: number } = {
    data: null,
    cachedAt: 0
};

const getRecentlyPlayed = async () => {
    const now = Date.now();
    if (recentlyPlayedCache.data && now - recentlyPlayedCache.cachedAt < CACHE_DURATION) {
        //console.log("Using cached recently played data");
        return recentlyPlayedCache.data;
    }
    //console.log("Fetching new recently played data");
    recentlyPlayedCache.cachedAt = now;
    const recentlyPlayed = await fetchSpotifyData(ENDPOINTS.RECENTLY_PLAYED) as RecentlyPlayedResp | null;
    if (!recentlyPlayed || !recentlyPlayed.items || recentlyPlayed.items.length === 0) {
        return null;
    }

    const data = recentlyPlayed.items.map(item => ({
        playedAt: item.played_at,
        track: {
            name: item.track.name,
            url: item.track.external_urls.spotify,
            duration_ms: item.track.duration_ms,
        },
        artists: item.track.artists.map(artist => ({
            name: artist.name,
            url: artist.external_urls.spotify,
        })),
        album: {
            name: item.track.album.name,
            url: item.track.album.external_urls.spotify,
            image: item.track.album.images[0].url
        },
        playTimes: 0
    })).reduce((acc, item) => {
        const existing = acc.find(i => i.track.url === item.track.url);
        if (existing) {
            existing.playTimes += 1;
        } else {
            item.playTimes = 1;
            acc.push(item);
        }
        return acc;
    }, [] as RecentlyPlayedItem[]);

    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
    const filteredData = data.filter(item => new Date(item.playedAt) > sixHoursAgo);
    recentlyPlayedCache.data = filteredData;
    return filteredData;
}


export const load: PageServerLoad = async () => {
    const recent = await getRecentlyPlayed();
    return { recent };
};
