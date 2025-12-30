<script>

    let { product, controls } = $props();

</script>


<div class="product__row">
    <div class="left item">
        <div class="image__container">
            <img src="{product.photos[0]}" alt="product">
        </div>
    </div>
    <div class="center item">
        <h2 class="product__title">{product.title.length > 100 ? product.title.slice(0, 100) + "..." : product.title}</h2>
        <p class="product__description">{product.description.length > 250 ? product.description.slice(0, 250) + "..." : product.description}</p>
        <!-- <p class="product__description">{product.description}</p> -->
        <span class="product__available {product.amount > 0 ? "green" : "red"}">{product.amount > 0 ? "Є в наявності" : "Немає в наявності"}</span>
    </div>
    <div class="right item">
        <div class="right__row">
            <h2 class=product__price>{product.price} ₴</h2>
            <div class="controls__row">
                {@render controls()}
            </div>
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
    gap: 2rem;
    width: 100%;
    background-color: #f4f4f4;
    padding: 1rem;
    border-radius: 1rem;
}
.left {
}
.image__container {
    width: 20rem;
    height: 20rem;
    position: relative;
}
.image__container img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    object-position: center center;
}
.center {
    display: flex;
    flex-direction: column;
    margin-right: auto;
    min-width: 20rem;
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
    flex-direction: column;
    gap: 5rem;
}
.product__price {
    font-weight: 600;
    font-size: 3rem;
    line-height: 1;
    padding: 0;
    margin: 0;
    text-align: right;
}
.controls__row {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}


/* @media (max-width: 809px) {
    .product__row {
        flex-direction: column;
        height: 100%;
    }
    
    .image__container {
        width: 100%;
    }

    .center {
        flex: 1 0 auto;
    }

    .right__row {
        gap: 1rem;
    }

} */

</style>