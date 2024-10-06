<script lang="ts">
	import ProjectCard from "./ProjectCard.svelte";

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
	<p>i don't really have big projects, but here are some that i've made</p>
	<div class="project-cards">
		{#each myProjects as { title, description, source, url }}
			<ProjectCard {title} {description} {source} {url} />
		{/each}
	</div>
</div>

<style>
	.cool-projects p {
		margin-top: 3%;
	}

	.project-cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		font-family: "Fira Code light";
	}
</style>
