<script lang="ts">
	interface Props {
		source: string;
		publicUrl?: string | null;
		title: string;
		description: string;
		readme?: string | null;
		stars?: number | null;
	}

	let {
		source,
		publicUrl = null,
		title,
		description,
		readme = null,
		stars = null
	}: Props = $props();

	function extractGitHubAssets(text: string) {
		const regex = /(!?\[.*?\]\()?https:\/\/github\.com\/[^\s)]+\/assets\/[^\s)]+(?:\))?/g;

		const results = [];
		for (const match of text.matchAll(regex)) {
			const fullMatch = match[0];
			const urlMatch = fullMatch.match(/https:\/\/github\.com\/[^\s)]+\/assets\/[^\s)]+/);
			const url = urlMatch ? urlMatch[0] : null;
			if (!url) continue;

			const isImg = fullMatch.startsWith("![");
			const altTextMatch = fullMatch.match(/!\[([^\]]*)\]/);
			const altText = altTextMatch ? altTextMatch[1] : null;

			results.push({
				url,
				isImg,
				altText
			});
		}

		return results;
	}

	const readmeMedia = $derived.by(() => {
		if (!readme) return null;
		return extractGitHubAssets(readme);
	});
</script>

<div class="project-card">
	<div class="project-header">
		{#if publicUrl}
			<a href={publicUrl} target="_blank" rel="noopener noreferrer">
				<p class={"project-title underline"}>{title}</p>
			</a>
		{:else}
			<p class="project-title">{title}</p>
		{/if}
		{#if stars}
			<p class="project-title">★ {stars}</p>
		{/if}
	</div>
	<div class="project-info">
		<p class="project-description">{description}</p>
		{#if readmeMedia && readmeMedia.length > 0}
			<div class="readme-media">
				{#each readmeMedia as { url, isImg, altText }}
					{#if isImg}
						<img src={url} alt={altText} class="readme-img" />
					{:else}
						<!-- svelte-ignore a11y_media_has_caption -->
						<video controls class="readme-video">
							<source
								src={url}
								type="video/mp4"
								onerror={(e) => {
									const sourceElem = e.target as HTMLElement;
									sourceElem.parentElement && (sourceElem.parentElement.style.display = "none");
								}} />
							<p>Your browser does not support the video tag.</p>
						</video>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
	{#if source}
		<a href={source} target="_blank" rel="noopener noreferrer">
			<p class="source">source</p>
		</a>
	{/if}
</div>

<style>
	.project-card {
		background-color: #333;
		border-radius: 10px;
		margin: 10px;
		padding: 10px;
		width: 300px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}

	.project-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
	}

	.project-card a {
		color: #fff;
		text-decoration: none;
	}

	.project-header {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	.project-title {
		font-size: 1rem;
		margin: 0;
	}

	.project-title.underline {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.project-description {
		color: #959494;
		margin-top: 15px;
	}

	.readme-media {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 15px;
		align-items: center;
	}

	.readme-img {
		max-width: 100%;
		max-height: 180px;
		border-radius: 6px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
		background: #222;
		object-fit: contain;
	}

	.readme-video {
		max-width: 100%;
		max-height: 180px;
		border-radius: 6px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
		background: #222;
	}

	.source {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
