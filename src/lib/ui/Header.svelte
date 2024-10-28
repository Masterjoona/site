<script lang="ts">
	import { page } from "$app/stores";
</script>

<header>
	<div class="name">
		<!-- svelte-ignore a11y_img_redundant_alt -->
		<img src="/favicon.png" alt="profile picture i use on most sites" />
		hi, i'm joona
	</div>
	<nav>
		<ul>
			<li><a href="/">home</a></li>
			<li><a href="/about">about</a></li>
			<li><a href="/social">social</a></li>
			<li><a href="/projects">projects</a></li>
		</ul>
	</nav>
</header>

<style>
	.name img {
		border-radius: 50%;
		width: 100px;
		height: 100px;
		margin-right: 20px;
	}

	.name {
		font-size: 2.5rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 2vh;
		font-family: "Fira Code light";
	}

	@media (max-width: 600px) {
		.name {
			margin-left: auto;
			margin-right: auto;
			max-width: 90%;
			flex-direction: column;
		}

		.name img {
			margin-right: 0;
			margin-bottom: 10%;
		}
	}

	nav {
		display: flex;
		justify-content: center;
		margin-top: 2vh;
	}

	nav ul {
		display: flex;
		list-style-type: none;
	}

	nav ul li {
		margin-right: 2vw;
	}

	nav ul li a {
		color: white;
		padding: 10px 15px;
		border-radius: 5px;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	nav ul li a:hover {
		background-color: white;
		color: black;
	}
</style>
