<script lang="ts">
	import "../app.css";

	import Header from "$lib/ui/Header.svelte";
	import Footer from "$lib/ui/Footer.svelte";
	//import Spotify from "$lib/ui/Spotify.svelte";
	/*
	{#if data?.spotify?.name}
		<Spotify spotify={data.spotify} />
	{/if}
	*/

	let { children, data } = $props();

	let pawPrints = $state(false);
	let neko = $state("");

	const listenForKeys = (e: KeyboardEvent) => {
		neko += e.key;
		if (neko.endsWith("neko")) {
			pawPrints = !pawPrints;
			neko = "";
		} else if (!"neko".startsWith(neko)) {
			neko = "";
		}
	};
</script>

<svelte:head>
	<title>joona</title>
	<meta name="description" content="meow" />
	<meta property="og:image" content="/favicon.png" />
	<meta name="darkreader-lock" />
</svelte:head>

<svelte:window onkeydown={listenForKeys} />

<main class={pawPrints ? "paw-prints" : ""}>
	<div class="border">
		<Header />
		{@render children?.()}
	</div>
	<Footer />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100vh;
		align-items: center;
	}

	.paw-prints {
		background-image: url("$lib/icons/paw.png");
		background-size: 50px 50px;
		background-repeat: repeat;
		background-position: 0 0;
		animation: paw-scroll 10s linear infinite;
	}

	@keyframes paw-scroll {
		from {
			background-position: 0 0;
		}
		to {
			background-position: -200px 200px;
		}
	}

	.border {
		border: 3px solid #444;
		border-radius: 10px;
		padding: 50px;
		max-width: 60%;
		width: 100%;
		background-color: #1a1a1a;
	}
</style>
