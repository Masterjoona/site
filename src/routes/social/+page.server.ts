import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } from "$env/static/private";
import type { RecentlyPlayedResp, RecentlyPlayedItem } from "$lib/types/Recent";

import { type PlayerState } from "$lib/types/Spotify";
import { createAsyncCache } from "$lib/util";
import type { PageServerLoad } from "./$types";

const basicAuth = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

const ENDPOINTS = {
    NOW_PLAYING: `https://api.spotify.com/v1/me/player`,
    RECENTLY_PLAYED: `https://api.spotify.com/v1/me/player/recently-played`,
    TOKEN: `https://accounts.spotify.com/api/token`
};


const getAccessToken = createAsyncCache(async () => {
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
        return null;
    }

    const { access_token, expires_in } = await response.json();

    return {
        value: access_token,
        ttlMs: expires_in * 1000 - 60 * 1000
    };
});


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
        console.error("Spotify API error:", await response.text());
        return null;
    }
    if (response.status === 204) {
        return null;
    }

    return response.json();
}

const getRecentlyPlayed = createAsyncCache(async () => {
    const recentlyPlayed = await fetchSpotifyData(ENDPOINTS.RECENTLY_PLAYED + `?after=${Date.now() - 6 * 60 * 60 * 1000}`) as RecentlyPlayedResp;
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
            if (new Date(item.playedAt) > new Date(existing.playedAt)) {
                existing.playedAt = item.playedAt;
            }
        } else {
            item.playTimes = 1;
            acc.push(item);
        }
        return acc;
    }, [] as RecentlyPlayedItem[]);

    data.sort((a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime());
    return data;
}, 3 * 60 * 1000);

export const load: PageServerLoad = async () => {
    const recent = await getRecentlyPlayed();
    return { recent };
};
