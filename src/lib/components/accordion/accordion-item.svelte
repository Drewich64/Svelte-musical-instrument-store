<script>
    let { open = $bindable(false), title, content } = $props();
    
</script>

<div class="accordion-item">
    <div class="accordion-toggle" onclick = {() => {open = !open}}>
        <div class="accordion-caret {open ? "active" : ""}">
        </div>
        <div class="accordion-title">
            {@render title()}
        </div>
    </div>
    <div class="accordion-content">
        {#if open}
            <p>{@render content()}</p>
        {/if}
    </div>
</div>

<style>
    .accordion-item {
        box-sizing: border-box;
        background-color: var(--accordion-item-color, none);
        color: inherit;
        padding: var(--accordion-item-padding, 1.5rem) 0 var(--accordion-item-padding, 1.5rem) 0;
        cursor: pointer;
        font-family: Arial, Helvetica, sans-serif;
    }
    .accordion-toggle {
        display: flex;
        align-items: center;
        user-select: none;
        padding: 0 1rem 0 1rem;
    }
    .accordion-caret {
        display: block;
        position: relative;
        width: 2rem;
        height: 2rem;
        margin: 0 min(20px, 1rem) 0 0;
    }

    .accordion-caret::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2rem;
        height: 0.2rem;
        border-radius: 0.1rem;
        background-color: black;
        transform: translate(-50%, -50%);

    }

    .accordion-caret::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2rem;
        height: 0.2rem;
        border-radius: 0.1rem;
        background-color: black;
        transform: translate(-50%, -50%) rotate(90deg);
        transition: 0.1s;

    }

    .accordion-caret.active::after {
        transform: translate(-50%, -50%);
    }

    .accordion-title {
        font-size: var(--accordion-title-fz, 2.5rem);
        font-weight: 200;
    }
    .accordion-content {
        padding: 0 0 0 4rem;
        font-size: var(--accordion-content-fz, 2rem);
    }
</style>