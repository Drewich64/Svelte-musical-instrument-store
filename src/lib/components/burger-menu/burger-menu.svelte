<script>
    let {content, active = $bindable(false), breakpoint = 1080} = $props();
    let window_width = $state();
</script>

<svelte:window bind:innerWidth={window_width}></svelte:window>

<div class="menu" class:active={active} class:disabled={window_width > breakpoint}>
    <div class="menu__content">
        <div class="header">
            <div class="header__row">
                <div class="cross" onclick={()=> active = !active}></div>
            </div>
        </div>
        {#if content}
            {@render content()}
        {/if}
    </div>
    <div class="menu__outside" onclick={()=> active = !active}></div>
</div>

<style>

    .menu {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        transition: var(--menu-transition, 0.5s);
        left: -100%;
        z-index: 999;
        display: flex;
    }

    .menu__content {
        background-color: var(--menu-bg, #fff);
        width: var(--menu-width, fit-content);
        min-width: 27rem;
        max-width: 50rem;
        height: 100%;
        box-shadow: var(--menu-shadow, 0px 0px 20px rgba(2, 2, 2, 0.448));
    }

    .menu__outside {
        height: 100%;
        flex: 1 0 auto;
    }

    .menu.active {
        left: 0;
        backdrop-filter: var(--menu-backdrop-filter ,none);
    }

    .header {
        background-color: var(--manu-header-background, #f4f4f4);
    }

    .header__row {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 1rem;
    }

    .cross {
        width: 4rem;
        height: 4rem;
        position: relative;
        cursor: pointer;
    }

    .cross::before {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 7%;
        background-color: black;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        border-radius: 3rem;
    }

    .cross::after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 7%;
        background-color: black;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        border-radius: 3rem;
    }

    .menu.disabled {
        display: none;
    }




</style>