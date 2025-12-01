<script>
	import Button from "$lib/components/button/button.svelte";
	import Header from "$lib/components/header/header.svelte";
	import Product from "$lib/components/product-card/product.svelte";
    import {Path} from "$lib/components/navigation/path";
    import "$lib/globalstyles.css";
    import {DELIVERY_TYPE, ORDER_STATUS} from "$lib/enums";

    let p = $props();
    let { order } = p.data;

    function parseDate(d) {
        let inp = new Date(d);
        let [year, month, day] = inp.toISOString().split("T")[0].split("-");
        return `${day}.${month}.${year}`;
    }

    async function sendOrder() {
        await fetch("/api/send_order", {
            method: "POST",
            body: JSON.stringify({order_id: order.id})
        });
        window.location.href="/employee/0";
    }
</script>


<div class="wrapper">
    <Header components={[]}></Header>
    <div class="path__container">
        <Path action={() => history.back()} text="Назад"></Path>
    </div>
    <main class="main">
        <div class="content">
            <div class="container">
                <div class="content-grid">
                    <div class="product__list">
                        <div class="product__list_container">
                            {#each order.products as product}
                                    <Product product={product} href={`/product/${product.product_id}`}></Product>
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
                                <p class="info__label">Отримувач</p>
                                <p class="info__value"><span class="bold">{order.username}</span> - #{order.user_id.toString().padStart(10, '0')} <br> {order.user_email}</p>
                            </div>
                            <div class="info__item">
                                <p class="info__label">Статус</p>
                                <p class="info__value"><span class="bold">{order.status}</span></p>
                            </div>
                            <div class="info__item">
                                <p class="info__label">Дата</p>
                                <p class="info__value"><span class="bold">{parseDate(order.order_date)}</span></p>
                            </div>
                        </div>
                        <div class="orangebutton button">
                            {#if order.status == ORDER_STATUS.PROCESSING}
                                <Button action={sendOrder}>{#snippet text()}Відправити{/snippet}</Button>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </main>
</div>


<style>

.path__container {
    padding: 3rem 0;
}
.wrapper {
}
.content {
}
.container {
}
.content-grid {
    display: grid;
    grid-template-areas: "products info";
    grid-template-columns: 2fr 1fr;
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

@media (width < 1140px) {
    .product__list_container {
        grid-template-columns: 1fr 1fr;
    }
}

@media (width < 850px) {
    .content-grid {
        grid-template-areas: "products" "info";
        grid-template-columns: 1fr;
        gap: 5rem;
    }
}

@media (width < 512px) {
    .product__list_container {
        grid-template-columns: 1fr;
    }
}
</style>
