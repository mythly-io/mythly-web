<script lang="ts">
	import Header from "./components/Header.svelte";
	let isTrue = true;

	const getData = () => {
		isTrue = !isTrue;
	}; 
</script>

<div>
	<Header/>
	{#if isTrue}
		<p>Click and I disappear</p>
	{/if}

	<button on:click={getData}>Click Me</button>
</div>

<style>
	
</style>
