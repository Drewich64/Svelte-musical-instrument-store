<script>
    import {cart} from "$lib/store.svelte";
    let next = $state("");
</script>


<div class="wrapper">
    <div class="header">
        <a href="/test/home">Home</a>
    </div>
    <div class="content">
        <p>{cart.current.value}</p>
        <input type="text" bind:value={next}>
        <button onclick={() => {cart.current.push("1")}}>Add</button>
    </div>
</div>