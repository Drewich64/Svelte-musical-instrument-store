<script>

    let { product, controls, href } = $props();
    import no_image from "$lib/img/no-image-icon.png";

</script>


<div class="product__row">
    <div class="left item">
        <div class="image__container">
            <a href="{href}">
                {#if product.photos}
                    <img src="{product.photos[0]?? no_image}" alt="product">
                {/if}
            </a>
        </div>
    </div>
    <div class="center item">
        <a href="{href}">
            <h2 class="product__title">{product.title.length > 100 ? product.title.slice(0, 100) + "..." : product.title}</h2>
        </a>
        {#if product.description}
            <p class="product__description">{product.description.length > 250 ? product.description.slice(0, 250) + "..." : product.description}</p>
        {/if}
        <!-- <p class="product__description">{product.description}</p> -->
        <span class="product__available {product.available > 0 ? "green" : "red"}">{product.available > 0 ? "Є в наявності" : "Немає в наявності"}</span>
    </div>
    <div class="right item">
        <h2 class=product__price>{product.price.toLocaleString()} ₴</h2>
        <div class="right__row">
            {#if controls}
                {@render controls()}
            {/if}
        </div>
    </div>
</div>


<style>
.product__row *{
    box-sizing: border-box;
}
.product__row {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.7rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #f4f4f4;
    padding: 1rem;
    border-radius: 1rem;
    height: 100%;
}
.left {
}
.image__container {
    width: 100%;
    height: 20rem;
    position: relative;
    background-color: #fff;
}
.image__container img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: contain;
    object-position: center center;
}
.center {
    display: flex;
    flex-direction: column;
    margin-right: auto;
    min-width: 20rem;
    flex: 1 0 auto;
    gap: 1rem;
    /* overflow: hidden; */
}
.product__title {
    font-weight: 400;
    font-size: 3rem;
    line-height: 1;
    padding: 0;
    margin: 0;
    text-overflow: ellipsis;
}

a {
    color: inherit;
    text-decoration: none;
}



.product__description {
    flex: 1 0 auto;
    overflow: hidden;
    /* background-color: red; */
}
.product__available {
}

.product__available.red {
    color: red;
}

.product__available.green {
    color: green;
}

.right {
}

.right__row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}
.product__price {
    font-weight: 600;
    font-size: 3rem;
    line-height: 1;
    padding: 0;
    margin-left: auto;
    text-align: right;
    margin-bottom: 10px;
}

</style>