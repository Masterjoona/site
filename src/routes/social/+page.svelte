<script lang="ts">
	import Codeberg from "$lib/icons/codeberg.svg";
	import Discord from "$lib/icons/discord.svg";
	import Github from "$lib/icons/github.svg";
	import Mail from "$lib/icons/mail.svg";
	import Telegram from "$lib/icons/telegram.svg";

	import Icon from "$lib/ui/Icon.svelte";

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
			text: "j [at] masterjoona [dot] dev",
			icon: Mail
		}
	];
</script>

<svelte:head>
	<title>joona - social</title>
	<meta name="social" content="social" />
</svelte:head>

<div class="social">
	<p>you can find me on various platforms</p>
	<div class="social-links">
		{#each socials as link}
			<a href={link.url} target="_blank" rel="noopener noreferrer">
				<Icon src={link.icon} alt={link.name} />
			</a>
		{/each}
	</div>
</div>

<style>
	.social {
		margin-top: 1%;
	}

	.social-links {
		justify-content: center;
	}
</style>
