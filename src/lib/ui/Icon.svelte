<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		text: string;
		hover: boolean;
	}
	let { src, alt, text, hover }: Props = $props();
	let hovered = $state(hover);
</script>

<div class="icon-wrapper">
	<img
		class="icon {hovered ? 'hovered' : ''}"
		{src}
		{alt}
		onmouseenter={() => (hovered = true)}
		onmouseleave={() => (hovered = false)} />
	{#if hovered}
		<span class="icon-text">{text}</span>
	{/if}
</div>

<style>
	.icon-wrapper {
		display: inline-block;
		position: relative;
	}

	.icon {
		padding: 5px 10px;
		background-color: #333;
		border-radius: 5px;
		width: 25px;
		height: 25px;
		margin-right: 1%;
		transition: all 0.3s ease;
	}

	.icon.hovered {
		transform: translateY(-5px);
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
	}

	.icon-text {
		position: absolute;
		left: 50%;
		top: 110%;
		transform: translateX(-50%);
		background: #222;
		color: #fff;
		padding: 4px 10px;
		border-radius: 4px;
		white-space: nowrap;
		font-size: 0.95em;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}
</style>
