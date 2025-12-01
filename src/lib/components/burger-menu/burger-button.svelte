<script>
    let {active = $bindable(false), breakpoint = 1080} = $props();
    let window_width = $state();
</script>

<svelte:window bind:innerWidth={window_width}></svelte:window>

<div class="burger" class:active={active} onclick={() => active = !active} class:disabled={window_width > breakpoint}>
    <span></span>
</div>


<style>
    .burger {
        width: 7vw;
        height: 7vw;
        max-width: 7rem;
        max-height: 7rem;
        min-width: 5rem;
        min-height: 5rem;
        position: relative;
        cursor: pointer;
    }

    

    .burger span {
        display: block;
        position: absolute;
        width: 100%;
        height: 7%;
        border-radius: 10rem;
        background-color: black;
        top: 50%;
        transform: translate(0, -50%);
        transition: var(--button-transition, 0.2s);
    }

    .burger::before, .burger::after {
        content: '';
        display: block;
        position: absolute;
        background-color: black;
        height: 7%;
        width: 100%;
        border-radius: 10rem;
        transition: var(--button-transition, 0.2s);
    }

    .burger::before {
        top: 7%;

    }

    .burger::after {
        top: 93%;
        transform: translate(0, -100%);
    }

    .burger.active span {
        transform: translate(0, -50%) rotate(45deg);
    }

    .burger.active::before {
        top: 50%;
        transform: translate(0, -50%) rotate(45deg);
    }

    .burger.active::after {
        top: 50%;
        transform: translate(0, -50%) rotate(-45deg);
    }

    .burger.disabled {
        display: none;
    }
</style>