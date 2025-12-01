<script>
    import {cart} from "$lib/store.svelte";
    let next = $state("");
</script>


<div class="wrapper">
    <div class="header">
        <a href="/test/other">Other</a>
    </div>
    <div class="content">
        <p>{cart.current.length}</p>
        <input type="text" bind:value={next}>
        <button onclick={() => {cart.current.push("1")}}>Add</button>
    </div>
</div>