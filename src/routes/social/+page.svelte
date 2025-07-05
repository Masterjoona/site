<script lang="ts">
	import { PUBLIC_ENABLE_PAGE_VISIT_COUNTER } from "$env/static/public";

	import { page } from "$app/state";

	import Codeberg from "$lib/icons/codeberg.svg";
	import Discord from "$lib/icons/discord.svg";
	import Github from "$lib/icons/github.svg";
	import Mail from "$lib/icons/mail.svg";
	import Telegram from "$lib/icons/telegram.svg";

	import Icon from "$lib/ui/Icon.svelte";
	import Spotify from "$lib/ui/Spotify.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	const hoverSocial = $state(page.url.searchParams.get("hover") || "");

	const socials = [
		{
			name: "github",
			url: "https://github.com/Masterjoona",
			text: "Masterjoona",
			icon: Github
		},
		{
			name: "codeberg",
			url: "https://codeberg.org/Joona",
			text: "Joona",
			icon: Codeberg
		},
		{
			name: "telegram",
			url: "https://t.me/masterjoona",
			text: "masterjoona",
			icon: Telegram
		},
		{
			name: "discord",
			url: "https://discord.com/users/297410829589020673",
			text: "masterjoona",
			icon: Discord
		},
		{
			name: "email",
			url: "mailto:j@masterjoona.dev",
			text: "j@masterjoona.dev",
			icon: Mail
		}
	];
</script>

<svelte:head>
	<title>joona - social</title>
	<meta name="social" content="social" />
</svelte:head>

<div class="contact">
	<p>you can find me on various platforms</p>
	<div class="contact-links">
		{#each socials as social}
			<a href={social.url} target="_blank" rel="noopener noreferrer">
				<Icon
					src={social.icon}
					alt={social.name}
					text={social.text}
					hover={hoverSocial === social.name} />
			</a>
		{/each}
	</div>
	{#if PUBLIC_ENABLE_PAGE_VISIT_COUNTER === "true"}
		<div class="page-visit-counter">
			<img
				src="https://count.getloli.com/@:joona.moe?theme=booru-helltaker&scale=0.6"
				alt=":joona" />
		</div>
	{/if}
	<Spotify recent={data.recent} />
</div>

<style>
	.page-visit-counter {
		margin-top: 1rem;
	}

	.contact-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		margin-top: 1rem;
	}
</style>
