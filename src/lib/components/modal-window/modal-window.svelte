<script>
    let { name, active = $bindable(false), content } = $props();
    function close(e) {
        active = false;
        e.stopPropagation();
    }
</script>

<div class="modal-window__container {active ? "active" : "disabled"}">
    <div class="modal-window {active ? "active" : "disabled"}">
        <header class="header">
            <h2 class="name">{name}</h2>
            <div class="cross" onclick={(e)=> {close(e)}}></div>
        </header>
        <div class="content">
            {#if content}
                {@render content()}
            {/if}
        </div>
    </div>
</div>


<style>
    .modal-window__container * {
        box-sizing: border-box;
    }

    .modal-window__container {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        backdrop-filter: var(--modal-backdrop-filter, brightness(0.8) blur(1px));
        display: none;
        z-index: 999;
        padding: 2rem;
    }

    .modal-window__container.active {
        display: flex;
    }

    .modal-window {
        display: block;
        /* min-height: 50rem; */
        min-width: 50rem;
        max-width: 70rem;
        max-height: 90vh;
        flex: 1 1 auto;
        background-color: var(--modal-bg, #fff);
        border-radius: var(--modal-border-radius, 0.6rem);
        box-shadow: var(--modal-shadow, 0px 0px 1rem #0000008d);
        /* margin: var(--modal-margin, 0.6rem); */
        transition: 0.2s;
        width: 0;
        height: 0;
        overflow: hidden;
    }

    .modal-window .content {
        width: 100%;
        /* height: fit-content; */
        
        max-height: var(--modal-height, 80vh);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        background: #f4f4f4;
        border-bottom: var(--modal-header-border, 1px solid #c7c7c7);
        padding: var(--modal-padding, 1.3rem);
    }

    .name {
        color: var(--modal-color, #000);
        padding: 0;
        margin: 0;
        font-size: var(--modal-fz, 2rem);
        font-family: var(--modal-ff, Arial, sans-serif);
    }

    .modal-window.active {
        display: block;
        width: fit-content;
        height: fit-content;
    }

    .cross {
        width: 3rem;
        height: 3rem;
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

    @media (width <= 768px) {

        .modal-window {
            margin: 0;
            min-width: 1px;
        }

        .modal-window.active {
            width: 100%;
            height: 100%;
        }
    }
</style>