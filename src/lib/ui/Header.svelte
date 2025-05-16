<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/state";

	const chars = "hi, i'm joona".split("");
	const pages = [
		{ name: "home", href: "/" },
		{ name: "about", href: "/about" },
		{ name: "social", href: "/social" },
		{ name: "projects", href: "/projects" }
	];

	let typed = $state("");

	const rotatePfp = (el: HTMLImageElement) => {
		let rotation = 0;
		let intervalId: number | null = null;
		let animationFrameId: number | null = null;

		const rotate = () => {
			rotation = (rotation + 3) % 360;
			el.style.transform = `rotate(${rotation}deg)`;
		};

		const startRotation = () => {
			if (intervalId !== null) return;
			intervalId = setInterval(rotate, 16);
		};

		const stopRotation = () => {
			if (intervalId !== null) {
				clearInterval(intervalId);
				intervalId = null;
			}

			let current = rotation % 360;
			if (current < 0) current += 360;

			const target = 360;
			const diff = target - current;

			const start = current;
			const startTime = performance.now();

			const animateBack = (now: number) => {
				const elapsed = now - startTime;
				const progress = Math.min(elapsed / 800, 1);
				const eased = 1 - Math.pow(1 - progress, 2);
				const angle = start + diff * eased;

				el.style.transform = `rotate(${angle}deg)`;

				if (progress < 1) {
					animationFrameId = requestAnimationFrame(animateBack);
				} else {
					rotation = 0;
					el.style.transform = "rotate(0deg)";
					animationFrameId = null;
				}
			};

			if (animationFrameId !== null) {
				cancelAnimationFrame(animationFrameId);
			}
			animationFrameId = requestAnimationFrame(animateBack);
		};

		el.addEventListener("mouseenter", startRotation);
		el.addEventListener("mouseleave", stopRotation);
	};

	onMount(() => {
		let index = 0;
		const intervalId = setInterval(() => {
			if (index < chars.length) {
				typed += chars[index];
				index++;
			} else {
				clearInterval(intervalId);
			}
		}, 100);

		return () => clearInterval(intervalId);
	});
</script>

<header>
	<div class="name">
		<!-- svelte-ignore a11y_img_redundant_alt -->
		<img
			class="pfp"
			src="/favicon.png"
			alt="profile picture i use on most sites"
			{@attach rotatePfp} />
		<div class="chars">
			{#each typed as char}
				<span class="char">{char}</span>
			{/each}
		</div>
	</div>
	<div class="nav-links">
		{#each pages as route}
			<span class="nav-link">
				<a
					class={`page-href ${(page.route.id ?? "") === route.href ? "current-page" : ""}`}
					href={route.href}>{route.name}</a>
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
		font-family: "Fira Code light";
		font-size: 2.5rem;
		font-weight: 700;
		gap: 0.1em;
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

	.nav-link {
		padding: 5px;
	}

	.page-href {
		color: white;
		padding: 10px 15px;
		border-radius: 5px;
		text-decoration: none;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.page-href:hover {
		background-color: white;
		color: black;
		text-decoration: underline;
		text-underline-offset: 6px;
	}

	.current-page {
		text-decoration: underline;
		text-underline-offset: 6px;
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
			padding: 0px;
		}

		.chars {
			font-size: 1.5rem;
			justify-content: center;
			gap: 0.2em;
		}
	}
</style>
