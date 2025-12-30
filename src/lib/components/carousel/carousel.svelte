<script>
    import no_image from "$lib/img/no-image-icon.png"
    let {images = $bindable(), current = $bindable(0)} = $props();
    $effect(() => {
        if (current < 0) {
            current = images.length-1;
        } else if (current > images.length-1) {
            current = 0;
        }
    });

    let el = $state();
    let image_width = $state();
    let container_width = $state();
    let topImageWidth = $state();

    function scrollToCurrent() {
        el.scrollTo(current * image_width - container_width/2, 0);
    }


</script>

<div class="carousel">
    <div class="carousel__top">
        <button onclick={()=>{current--; scrollToCurrent();}}><div class="btn-nav btn-back"></div></button>
        <div class="image__container image__container_top" bind:clientWidth={topImageWidth} style="--size-w: {topImageWidth}px;">
            {#if images.length > 0}
                <img src="{images[current]}" alt="">
            {:else}
                <img src="{no_image}" alt="absent">
            {/if}
        </div>
        <button onclick={()=>{current++; scrollToCurrent();}}><div class="btn-nav btn-forward"></div></button>
    </div>
    {#if images.length > 0}
        <div class="carousel__bottom">
            <div class="carousel__bottom_container" bind:this={el} bind:clientWidth={container_width}>
                {#each images as image, i}
                    <div class="image__container image__container_bottom">
                        <a onclick={()=> {current = i}}>
                            <img bind:clientWidth={image_width} src="{image}" alt="" class="{current == i ? "active" : ""}">
                        </a>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>


<style>

    .carousel * {
        box-sizing: border-box;
    }

    .carousel {
        box-sizing: border-box;
        display: inline-block;
        width: 100%;
        min-width: 30rem;
    }

    .carousel__top {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        margin: 0 0 15px 0;
    }

    .carousel__bottom {
        width: 100%;
        height: fit-content;
        background-color: #f4f4f4;
        padding: 1rem 1rem 0 1rem;
        border-radius: 1.5rem;
    }

    .carousel__bottom_container {
        overflow: scroll;
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0 0 1.5rem 0;
    }

    /* BUTTONS */

    button {
        min-height: calc(30rem - 10rem);
        background-color: transparent;
        width: 5rem;
        font-size: 2rem;
        outline: none;
        border: none;
        flex: 1 0 auto;
        cursor: pointer;
        padding: 0;
    }

    .btn-nav {
        width: 3rem;
        height: 3rem;
        margin: 0 auto;
        position: relative;
    }
    .btn-back {
        transform: translate(25%, 0) rotate(45deg);
    }
    .btn-forward {
        transform: translate(-25%, 0) rotate(-45deg);
    }

    .btn-nav::after, .btn-nav::before {
        content: '';
        display: block;
        position: absolute;
        height: 100%;
        width: 0.1rem;
        background-color: black;
    }

    .btn-forward::before {
        top: 50%;
        left: 50%;
        transform: rotate(90deg);
    }
    .btn-forward::after {
        top: 0;
        left: 100%;
    }
    .btn-back::before {
        top: 50%;
        left: 50%;
        transform: rotate(90deg);
    }
    .btn-back::after {
        top: 0;
        left: 0;
    }

    /* BUTTONS/ */

    .image__container.image__container_top {
        width: 100%;
        /* height: calc(36vw - 10rem); */
        height: var(--size-w, calc(36vw - 10rem));
        min-height: calc(30rem - 10rem);
        position: relative;
    }
    .image__container.image__container_bottom {
        /* min-width: 7.2rem;
        min-height: 7.2rem; */
        /* width: 10vw;
        height: 10vw; */
        /* width: 10vh;
        height: 10vh; */
        width: 10rem;
        height: 10rem;
        position: relative;
        flex: 0 0 auto;
        cursor: pointer;
        background-color: #fff;
    }

    .image__container.image__container_top img{
        object-fit: contain;
    }

    .image__container img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
    }

    .image__container.image__container_bottom img {
        padding: 0.5rem;
    }

    img.active {
        /* background-color: rgb(171, 171, 171); */
        border-radius: 0.5rem;
        border: 2px solid rgb(171, 171, 171);
    }

    /* @media(width <= 810px) {
        .carousel {
            width: 90vw;
        }

        .image__container.image__container_top {
            height: calc(90vw - 10rem);
        }

        button {
            height: calc(90vw - 10rem);
            min-height: calc(30rem - 10rem);
        }


    } */
</style>