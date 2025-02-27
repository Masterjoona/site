<script lang="ts">
	import "../app.css";
</script>

<svelte:head>
	<title>joona</title>
	<meta name="description" content="meow" />
	<meta property="og:image" content="/favicon.png" />
	<meta name="darkreader-lock" />
</svelte:head>

<div class="quick-info">
	<p>a person on the internet</p>
	<p>i like cats and you can probably find me online on discord</p>
</div>

<style>
	.quick-info {
		margin-top: 1%;
	}

	@media (max-width: 600px) {
		.quick-info {
			margin-left: auto;
			margin-right: auto;
			margin-top: 15%;
			max-width: 90%;
		}
	}
</style>
