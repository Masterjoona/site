<script lang="ts">
	import type { PageProps } from "./$types";

	import ProjectCard from "./ProjectCard.svelte";

	let { data }: PageProps = $props();

	const myProjects = [
		{
			title: "slideshow-embed",
			description: "allows you to embed tiktok slideshows (and videos) inside discord",
			source: "https://github.com/Masterjoona/slideshow-embed",
			url: "https://tt.masterjoona.dev"
		},
		{
			title: "pawste",
			description: "my pastebin",
			source: "https://github.com/Masterjoona/pawste",
			url: "https://pawst.eu"
		}
	];
</script>

<svelte:head>
	<title>joona - projects</title>
	<meta name="projects" content="projects" />
</svelte:head>

<div class="cool-projects">
	<p>some stuff that i have made</p>

	<p>
		if you like what i do you can support me with <a
			class="link"
			href="https://github.com/sponsors/Masterjoona/">github sponsors</a>
	</p>

	<div class="project-cards">
		{#each myProjects as { title, description, source, url }}
			<ProjectCard {title} {description} {source} publicUrl={url} />
		{/each}
	</div>

	<p>vencord plugins</p>
	<p>
		if you want me to make a plugin for you, <a href="/social?hover=discord" class="link"
			>contact me</a>
	</p>
	<div class="project-cards">
		{#await data.pluginRepos}
			<p>loading plugins...</p>
		{:then pluginRepos}
			{#if pluginRepos == null || pluginRepos.length === 0}
				<p>no plugins found</p>
			{:else}
				{#each pluginRepos as { name, description, source, stars, readme }}
					<ProjectCard title={name} {description} {source} {stars} {readme} />
				{/each}
			{/if}
		{:catch error}
			<p>uh oh: {error.message}</p>
		{/await}
	</div>
</div>

<style>
	.cool-projects p {
		margin-top: 3%;
	}

	.project-cards {
		display: flex;
		flex-wrap: wrap;
		margin: 0 auto;
		justify-content: center;
		font-family: "Fira Code light";
	}

	.link {
		color: #0366d6;
		text-underline-offset: 3px;
	}
</style>
