<script lang="ts">
	const chars = "hi, i'm joona".split("");
	const pages = [
		{ name: "home", href: "/" },
		{ name: "about", href: "/about" },
		{ name: "social", href: "/social" },
		{ name: "projects", href: "/projects" }
	];
</script>

<header>
	<div class="name">
		<!-- svelte-ignore a11y_img_redundant_alt -->
		<img class="pfp" src="/favicon.png" alt="profile picture i use on most sites" />
		<div class="chars">
			{#each chars as char}
				<span class="char">{char}</span>
			{/each}
		</div>
	</div>
	<div class="nav-links">
		{#each pages as page}
			<span class="nav-link">
				<a class="page-href" href={page.href}>{page.name}</a>
			</span>
		{/each}
	</div>
</header>

<style>
	.pfp {
		border-radius: 50%;
		width: 100px;
		height: 100px;
		margin-right: 20px;
	}

	.name {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.chars {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;
		font-family: "Fira Code light";
		font-size: 2.5rem;
		font-weight: 700;
	}

	.char {
		white-space: pre;
		display: inline-block;
		transition: transform 0.3s ease;
	}
	.char:hover {
		transform: translateY(-5px);
	}

	.nav-links {
		margin-top: 2vh;
		margin-bottom: 3vh;
	}

	.page-href {
		color: white;
		padding: 10px 15px;
		border-radius: 5px;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.page-href:hover {
		background-color: white;
		color: black;
	}

	@media (max-width: 600px) {
		.name {
			margin-left: auto;
			margin-right: auto;
			flex-direction: column;
			gap: 0;
		}

		.pfp {
			margin-right: 0;
			margin-bottom: 10%;
		}

		.nav-links {
			display: grid;
			grid-template-columns: repeat(2, auto);
			gap: 10px;
			justify-content: center;
			text-align: center;
			padding: 0;
		}

		.nav-link {
			display: flex;
			justify-content: center;
		}
	}
</style>
