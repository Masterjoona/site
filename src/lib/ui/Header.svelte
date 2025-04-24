<script lang="ts">
</script>

<header>
	<div class="name">
		<!-- svelte-ignore a11y_img_redundant_alt -->
		<img class="pfp" src="/favicon.png" alt="profile picture i use on most sites" />
		<p>hi, i'm joona</p>
	</div>
	<div class="nav-links">
		<span class="nav-link">
			<a class="page-href" href="/">home</a>
		</span>
		<span class="nav-link">
			<a class="page-href" href="/about">about</a>
		</span>
		<span class="nav-link">
			<a class="page-href" href="/social">social</a>
		</span>
		<span class="nav-link">
			<a class="page-href" href="/projects">projects</a>
		</span>
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

	.name p {
		font-size: 2.5rem;
		font-weight: 700;
		font-family: "Fira Code light";
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
