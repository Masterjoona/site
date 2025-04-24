import type { LayoutServerLoad } from "./$types";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } from "$env/static/private";

import { type PlayerState } from "$lib/types/Spotify";

const basicAuth = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

const ENDPOINTS = {
    NOW_PLAYING: `https://api.spotify.com/v1/me/player`,
    RECENTLY_PLAYED: `https://api.spotify.com/v1/me/player/recently-played?limit=1`,
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
const CACHE_DURATION = 10 * 1000;

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


export const load: LayoutServerLoad = async () => {
    const state = await getPlayerState()
    return {
        spotify: onlyNecessaryInfo(state),
    };
};