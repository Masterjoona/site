<script lang="ts">
	import { onMount } from "svelte";
	import type { Artist } from "$lib/types/Spotify";

	let {
		spotify
	}: {
		spotify: {
			timestamp: number;
			progress: number;
			duration: number;
			name: string;
			artists: Artist[];
			image: string;
			trackUrl: string;
			albumUrl: string;
			albumName: string;
		};
	} = $props();

	let currentProgress = $state(spotify.progress);

	onMount(() => {
		const interval = setInterval(() => {
			if (currentProgress < spotify.duration) {
				currentProgress += 1000;
			} else {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	function formatTime(ms: number): string {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	}
</script>

<div class="spotify-container">
	<div class="spotify">
		<a href={spotify.albumUrl} target="_blank" rel="noopener noreferrer">
			<img src={spotify.image} alt={spotify.albumName} />
		</a>
		<div class="spotify-info">
			<a href={spotify.trackUrl} target="_blank" rel="noopener noreferrer">
				<p class="track-name">{spotify.name}</p>
			</a>
			{#each spotify.artists as artist}
				<p>{artist.name}</p>
			{/each}
			<div class="progress-bar">
				<div style="width: {Math.min((currentProgress / spotify.duration) * 100, 100)}%;"></div>
			</div>
			<p>{formatTime(currentProgress)} / {formatTime(spotify.duration)}</p>
		</div>
	</div>
</div>

<style>
	.spotify-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.spotify {
		display: flex;
		align-items: center;
		gap: 1rem;
		background-color: #1db954;
		color: white;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		margin-top: 3%;
		width: 50%;
	}

	.spotify img {
		width: 64px;
		height: 64px;
		border-radius: 4px;
		object-fit: cover;
	}

	.spotify-info {
		flex: 1;
	}

	.spotify-info p {
		margin: 0;
		font-size: 0.9rem;
	}

	.spotify-info a {
		text-decoration: none;
		color: inherit;
		transition: color 0.3s ease;
	}

	.spotify-info p:first-child {
		font-weight: bold;
		font-size: 1.1rem;
	}

	.progress-bar {
		margin-top: 0.5rem;
		height: 6px;
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 3px;
		overflow: hidden;
	}

	.progress-bar div {
		height: 100%;
		background-color: white;
		width: 0%;
		transition: width 0.3s ease;
	}

	@media (max-width: 600px) {
		.spotify {
			width: 100%;
		}
	}
</style>
