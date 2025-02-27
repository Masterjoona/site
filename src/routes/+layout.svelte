<script lang="ts">
	import "../app.css";

	import Header from "$lib/ui/Header.svelte";
	import Footer from "$lib/ui/Footer.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<title>joona</title>
	<meta name="description" content="meow" />
	<meta property="og:image" content="/favicon.png" />
	<meta name="darkreader-lock" />
</svelte:head>

<main>
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

	.border {
		border: 1px solid #333;
		border-radius: 10px;
		padding: 10px;
		max-width: 60%;
		width: 100%;
	}
</style>
