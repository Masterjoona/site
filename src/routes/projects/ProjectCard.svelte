<script lang="ts">
	let { source = null, url, title, description } = $props();
</script>

<div class="project-card">
	<a href={url}>
		<p class="project-title">{title}</p>
	</a>
	<p class="project-description">{description}</p>
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

	.project-title {
		font-size: 1rem;
		margin: 0;
		text-decoration: underline;
	}

	.project-description {
		color: #959494;
		margin-top: 15px;
	}

	.source {
		text-decoration: underline;
	}
</style>
