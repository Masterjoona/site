<script lang="ts">
	let { src, alt } = $props();
</script>

<img class="icon" {src} {alt} />

<style>
	.icon {
		padding: 5px 10px;
		background-color: #333;
		border-radius: 5px;
		width: 25px;
		height: 25px;
		margin-right: 1%;
		transition: all 0.3s ease;
	}

	.icon:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
	}
</style>
