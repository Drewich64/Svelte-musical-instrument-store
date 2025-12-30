<script>
    import Header from "$lib/components/header/header.svelte";
    import "$lib/globalstyles.css";
    import no_image_icon from "$lib/img/no-image-icon.png";
    import Path from "$lib/components/navigation/path/path.svelte";

    // let orders = [
    //     {
    //         "id": 0,
    //         "date": "2025-05-17T22:00:00.000Z",
    //         "products": [
    //             {
    //                 id: 0,
    //                 category_id: 0,
    //                 title: "Bass",
    //                 price: 100.00,
    //                 available: 55,
    //                 manufacturer_id: 3,
    //                 description: "This is a very good instrument. Every bass player is a confirmed alcoholic :)",
    //                 photos: ["https://vintageguitarsrus.com/cdn/shop/products/V495SB_1_a5d7bf25-202f-4e8b-8d0d-07761fdfeeb2_1024x1024.jpg?v=1670241279", "https://vintageguitarsrus.com/cdn/shop/products/V495SB_2_630ec49a-b881-45cc-ae46-f3a4b93f152a_1024x1024.jpg?v=1670241279", "https://vintageguitarsrus.com/cdn/shop/products/V495SB_4_5de66bda-8a0c-49e1-b977-00e936ac47b0_1024x1024.jpg?v=1717514651"]
    //             },
    //             {
    //                 id: 1,
    //                 category_id: 0,
    //                 title: "Bass",
    //                 price: 100.00,
    //                 available: 55,
    //                 manufacturer_id: 3,
    //                 description: "This is not a very good instrument. Every bass player is a confirmed alcoholic :)",
    //                 photos: ["https://vintageguitarsrus.com/cdn/shop/products/V60CAB_1_ec0780d9-2399-47b3-bd8a-dc407feb6d27_1024x1024.jpg?v=1670241391", "https://vintageguitarsrus.com/cdn/shop/products/V60CAB_2_1024x1024.jpg?v=1670241391", "https://vintageguitarsrus.com/cdn/shop/products/V60CAB_4_c2232c79-6428-4458-a491-f92d142d602f_1024x1024.jpg?v=1717498208"]
    //             }
    //         ]
    //     },
    //     {
    //         "id": 0,
    //         "date": "2025-05-17T22:00:00.000Z",
    //         "products": [
    //             {
    //                 id: 0,
    //                 category_id: 0,
    //                 title: "Bass",
    //                 price: 100.00,
    //                 available: 55,
    //                 manufacturer_id: 3,
    //                 description: "This is a very good instrument. Every bass player is a confirmed alcoholic :)",
    //                 photos: ["https://vintageguitarsrus.com/cdn/shop/products/V495SB_1_a5d7bf25-202f-4e8b-8d0d-07761fdfeeb2_1024x1024.jpg?v=1670241279", "https://vintageguitarsrus.com/cdn/shop/products/V495SB_2_630ec49a-b881-45cc-ae46-f3a4b93f152a_1024x1024.jpg?v=1670241279", "https://vintageguitarsrus.com/cdn/shop/products/V495SB_4_5de66bda-8a0c-49e1-b977-00e936ac47b0_1024x1024.jpg?v=1717514651"]
    //             },
    //             {
    //                 id: 1,
    //                 category_id: 0,
    //                 title: "Bass",
    //                 price: 100.00,
    //                 available: 55,
    //                 manufacturer_id: 3,
    //                 description: "This is not a very good instrument. Every bass player is a confirmed alcoholic :)",
    //                 photos: ["https://vintageguitarsrus.com/cdn/shop/products/V60CAB_1_ec0780d9-2399-47b3-bd8a-dc407feb6d27_1024x1024.jpg?v=1670241391", "https://vintageguitarsrus.com/cdn/shop/products/V60CAB_2_1024x1024.jpg?v=1670241391", "https://vintageguitarsrus.com/cdn/shop/products/V60CAB_4_c2232c79-6428-4458-a491-f92d142d602f_1024x1024.jpg?v=1717498208"]
    //             }
    //         ]
    //     }
    // ];

    let {data} = $props();
    let orders = data.orders;

    function parseDate(d) {
        let inp = new Date(d);
        let [year, month, day] = inp.toISOString().split("T")[0].split("-");
        return `${day}.${month}.${year}`;
    }

    let status_map = {
        "PROCESSING": "⚙️",
        "SENT": "✅️",
        "CANCELLED": "❌️",
    };
</script>

<div class="wrapper">
    <Header components={["cart"]}></Header>
    <div class="path__container">
        <Path href="/products/0" text="Головна"></Path>
    </div>
    <div class="main">
        <div class="content">
            <div class="container">
                {#each orders as order}
                    <a class="order-card" href={`orders/order/${order.id}`}>
                        <div class="order-card__container">
                            <div class="order-card__info">
                                <p>Замовлення №{order.id.toString().padStart(10, '0')}</p>
                                <p>{parseDate(order.order_date)} {status_map[order.status]}</p>
                            </div>
                            <div class="order-card__preview_container" >
                                {#each order.products as product}
                                    <div class="order-card__image_container ibg">
                                        <img src={product.photos[0]?? no_image_icon} alt="">
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    </div>
</div>



<style>
.wrapper {
}
.main {
}
.content {
}
.container {
    width: 100%;
}
.order-card {
    background-color: #f4f4f4;
    padding: 1.2rem;
    border-radius: 0.6rem;
    margin: 0 0 1.5rem 0;
    display: block;
    color: black;
}
.order-card__container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
}
.order-card__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 6rem;
}
.order-card__preview_container {
    display: flex;
    flex-direction: row-reverse;
    gap: 1.5rem;
    flex: 1 0 auto;
    overflow: hidden;
    flex-wrap: wrap;
}
.order-card__image_container {
    width: 7.5rem;
    height: 7.5rem;
    background-color: #fff;
}

.order-card__image_container img {
    object-fit: contain;
}

.path__container {
    padding: 3rem 0;
}

</style>

