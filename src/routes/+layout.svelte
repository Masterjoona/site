<script lang="ts">
	import "../app.css";

	import Header from "$lib/ui/Header.svelte";
	import Source from "$lib/ui/Footer.svelte";
</script>

<svelte:head>
	<title>joona</title>
	<meta name="description" content="meow" />
	<meta property="og:image" content="/favicon.png" />
	<meta name="darkreader-lock" />
</svelte:head>

<main>
	<Header />
	<slot />
	<Source />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100vh;
	}
</style>
