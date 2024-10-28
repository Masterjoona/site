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

	const plugins = [
		{
			title: "SpotifyLyrics",
			description: "displays lyrics for the currently playing song on spotify",
			source: "https://github.com/Masterjoona/vc-spotifylyrics"
		},
		{
			title: "SidebarChat",
			description: "View two chats at once",
			source: "https://github.com/Masterjoona/vc-sidebarchat"
		},
		{
			title: "BetterPlusReacts",
			description: "The amount of + before the emoji is the message it adds the reaction to",
			source: "https://github.com/Masterjoona/vc-betterplusreacts"
		},
		{
			title: "UnreadCountBadge",
			description: "Show a badge in the channel list for the amount ofunread messages.",
			source: "https://github.com/Masterjoona/vc-unreadcountbadge"
		},
		{
			title: "randomQOLStuff",
			description: "Random patches",
			source: "https://github.com/Masterjoona/vc-randomqolstuff"
		},
		{
			title: "TriggerWarning",
			description: "Spoiler words in messages and files/embeds based on a list of keywords",
			source: "https://github.com/Masterjoona/vc-triggerwarning"
		},
		{
			title: "atSomeone",
			description: "Mention someone or some role randomly",
			source: "https://github.com/Masterjoona/vc-atsomeone"
		},
		{
			title: "StreamPIP",
			description: "Open a stream in a picture in picture window",
			source: "https://github.com/Masterjoona/vc-streampips"
		},
		{
			title: "TimelessClips",
			description: "Custom clip length",
			source: "https://github.com/Masterjoona/vc-timelessclips"
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

	<details class="details-plugin">
		<summary>vencord plugins</summary>
		<div class="project-cards">
			{#each plugins as { title, description, source }}
				<ProjectCard {title} {description} url={source} />
			{/each}
		</div>
	</details>

	<p>
		if you like what i do you can support me with <a
			class="github-sponsor"
			href="https://github.com/sponsors/Masterjoona/">github sponsors</a>
	</p>
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

	.details-plugin {
		margin-top: 2%;
	}

	.github-sponsor {
		color: #0366d6;
	}
</style>
