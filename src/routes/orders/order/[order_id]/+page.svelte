<script>
	import Button from "$lib/components/button/button.svelte";
	import Header from "$lib/components/header/header.svelte";
	import NumberInput from "$lib/components/inputs/number-input.svelte";
	import Product from "$lib/components/product-card/product.svelte";
	import { DELIVERY_TYPE } from "$lib/enums";
    import "$lib/globalstyles.css";
    import Path from "$lib/components/navigation/path/path.svelte";
    import { ORDER_STATUS } from "$lib/enums";

    let p = $props();
    let { order } = p.data;

    async function cancellOrder() {
        await fetch("/api/cancell_order", {
            method: "POST",
            body: JSON.stringify({order_id: order.id}) 
        });
    }
</script>


<div class="wrapper">
    <Header components={[]}></Header>
    <div class="path__container">
        <Path text="Замовлення" href="/orders"></Path>
    </div>
    <main class="main">
        <div class="content">
            <div class="container">
                <div class="content-grid">
                    <div class="product__list">
                        <div class="product__list_container">
                            {#each order.products as product}
                                    <Product product={product} href={`/product/${product.product_id}`}>
                                        {#snippet controls()}
                                            <span>{product.amount} шт.</span>
                                        {/snippet}
                                    </Product>
                            {/each}
                        </div>
                    </div>
                    <div class="info">
                        <div class="info__container">
                            <h2 class="total-sum">Всього: {order.products.reduce((prev, current) => prev + Number(current.price), 0)} грн</h2>
                            <div class="info__item">
                                <p class="info__label">Адреса</p>
                                {#if order.delivery_type == DELIVERY_TYPE.HOME}
                                    <p class="info__value">{`${order.address.post_code} ${order.address.city}, вул. ${order.address.street} ${order.address.building}, кв. ${order.address.apartment}`}</p>
                                    {#if order.address.to_apartment}
                                        <p>Доставка на поверх</p>
                                    {/if}
                                {:else}
                                    <p class="info__value">{`Відділення Нової пошти ${order.address.department_code}`}</p>
                                {/if}
                            </div>
                            <div class="info__item">
                                <p class="info__label">Статус</p>
                                <p class="info__value">{order.status}</p>
                            </div>
                        </div>
                        {#if order.status == ORDER_STATUS.PROCESSING}
                            <div class="orangebutton button">
                                <Button
                                action={
                                    async () => {await cancellOrder(); window.location.reload();}
                                }
                                >{#snippet text()}Відмінити замовлення{/snippet}</Button>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div> 
    </main>
</div>


<style>
.wrapper {
}
.content {
}
.container {
}
.content-grid {
    display: grid;
    grid-template-areas: "products info";
    grid-template-columns: 1.5fr 1fr;
    gap: 5rem;
}
.product__list {
    grid-area: products;
}
.product__list_container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
}
.info {
    grid-area: info;
}
.total-sum {
    font-size: 4rem;
    font-weight: 700;
}
.info__container {
    display: flex;
    flex-direction: column;
    gap: 2.2rem;
    /* min-width: 25rem; */
}
.info__item {
}
.info__label {
    font-size: 1.5rem;
    color: #6E6E6E;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
}
.info__value {
    font-size: 2rem;
    color: black;
}
.bold {
    font-weight: 700;
}
.button {
    margin: 3rem 0 0 0;
}

.path__container {
	padding: 3rem 0;
}

@media (width < 1300px) {
    .product__list_container {
        grid-template-columns: 1fr 1fr;
    }
}

@media (width < 970px) {
    .content-grid {
        grid-template-areas: "products" "info";
        grid-template-columns: 1fr;
        gap: 5rem;
    }
}

@media (width < 615px) {
    .product__list_container {
        grid-template-columns: 1fr;
    }
}

</style>
