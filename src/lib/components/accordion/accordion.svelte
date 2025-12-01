<script>
    let { children } = $props();
</script>


<div class="accordion">
    {@render children()}
</div>


<style>
    .accordion {
        box-sizing: border-box;
        width: var(--accordion-width, 100%);
        padding: var(--accordion-padding, 1rem);
        color: var(--accordion-clr, #333);
        background-color: var(--accordion-bg, #fff);
        border-radius: var(--accordion-radius, 6px);
        box-shadow: var(--accordion-shadow, none);
    }
</style>