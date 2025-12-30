<script>
    let {icon, text, action, disabled, no_animation} = $props();
</script>


<button onclick={() => {if (action &&  !disabled) action()}} disabled={disabled} class="{no_animation ? "no_animate" : "animate"}">
    {#if icon}
        <div class="img__container">
            <img src="{icon}" alt="">
        </div>
    {/if}
    {#if text}
        {@render text()}
    {/if}
</button>

<style>
    button {
        box-sizing: border-box;
        display: inline-flex;
        gap: 1rem;
        justify-content: space-between;
        width: var(--button-width, fit-content);
        height: var(--button-height, fit-content);
        align-items: center;
        background-color: var(--button-bg, #d7d7d7);
        color: var(--button-color, #333);
        border: var(--button-border, none);
        border-radius: var(--button-radius, 1.8rem);
        padding: var(--button-padding, 1.2rem);
        cursor: pointer;
        transition: 0.2s;
        font-size: var(--button-fz, 2rem);
        font-family: var(--button-ff, Arial, sans-serif);
    }

    .img__container {
        width: 4rem;
        height: 4rem;
        position: relative;
    }

    .img__container img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        top: 0;
        left: 0;
        overflow: hidden;
    }

    /* .button img {
        max-width: 4rem;

    } */

    
    button.animate:hover:enabled {
        background-color: var(--button-bg-hover, #c3c3c3);
        color: var(--button-color-hover, var(--button-color, #333));
    }

    button.animate:enabled:active {
        background-color: var(--button-bg-click, #e9e9e9);
        color: var(--button-color-click, --button-color);
    }

    button:disabled {
        background-color: #e8d0d0;
        color: #878787;
        cursor: not-allowed;
    }

</style>