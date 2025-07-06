<script lang="ts">
	import { type RecentlyPlayedItem } from "$lib/types/Recent";

	let { recent }: { recent: Promise<RecentlyPlayedItem[] | null> } = $props();
</script>

<div class="spotify-container">
	<div class="spotify-header">
		<p>Some songs i have recently listened on spotify</p>
	</div>
	{#await recent}
		<p>loading songs...</p>
	{:then items}
		{#if items && items.length > 0}
			<div class="spotify-list">
				{#each items as item}
					<div class="spotify-item">
						<a href={item.track.url} target="_blank" rel="noopener noreferrer" class="spotify-link">
							<img src={item.album.image} alt={item.album.name} class="spotify-image" />
							<div class="spotify-info">
								<div class="spotify-track">{item.track.name}</div>
								<div class="spotify-artist">
									{item.artists.map((artist) => artist.name).join(", ")}
								</div>
								<div class="spotify-album">{item.album.name}</div>
							</div>
						</a>
					</div>
				{/each}
			</div>
		{:else}
			<p>looks like i havent listened to anything recently</p>
		{/if}
	{:catch error}
		<p>uh oh: {error.message}</p>
	{/await}
</div>

<style>
	.spotify-container {
		margin-top: 1rem;
		max-width: 100%;
		padding: 1rem;
		background: linear-gradient(135deg, #1db954 0%, #191414 100%);
		border-radius: 0.75rem;
	}

	.spotify-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.spotify-item {
		background-color: #121212;
		border-radius: 0.75rem;
		overflow: hidden;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.spotify-item:hover {
		transform: scale(1.01);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
	}

	.spotify-link {
		display: flex;
		gap: 0.75rem;
		padding: 0.75rem;
		color: #fff;
		text-decoration: none;
		align-items: center;
	}

	.spotify-image {
		width: 56px;
		height: 56px;
		object-fit: cover;
		border-radius: 0.5rem;
		flex-shrink: 0;
	}

	.spotify-info {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.spotify-track {
		font-size: 0.9rem;
		font-weight: 600;
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.spotify-artist,
	.spotify-album {
		font-size: 0.75rem;
		color: #b3b3b3;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media (min-width: 600px) {
		.spotify-list {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		}
		.spotify-link {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			padding: 0.75rem;
			color: #fff;
			text-decoration: none;
			width: 100%;
		}

		.spotify-image {
			width: 64px;
			height: 64px;
		}
	}
</style>
