<script>
	import Button from '$lib/components/button/button.svelte';
	import Header from '$lib/components/header/header.svelte';
	import NumberInput from '$lib/components/inputs/number-input.svelte';
	import Product from '$lib/components/product-card/product.svelte';
	import '$lib/globalstyles.css';
	import { cart, calcCartPrice } from '$lib/store.svelte';
	import { DELIVERY_TYPE } from '$lib/enums';
	import Path from '$lib/components/navigation/path/path.svelte';

	let delivery = $state(null);
	let address_home = $state({
		city: null,
		post_code: null,
		street: null,
		building: null,
		apartment: null,
		to_apartment: false,
		has_elevator: false
	});
	let address_pickup = $state({
		department_code: null
	});

	let res = $state();

	async function order() {
        let address;
        if (delivery == DELIVERY_TYPE.HOME) {
            address = address_home;
        } else if (delivery == DELIVERY_TYPE.PICKUP) {
            address = address_pickup;
        } else {
            address = null;
        }

		res = await (await fetch('/api/issue_order', {
			method: 'POST',
			body: JSON.stringify({
				cart: cart.current,
				delivery: delivery,
				address: address
			})
		})).json();

		if (res?.errors) {
			if (res.errors.department_code) {
				address_pickup.department_code = res.errors.department_code;
			}
		}

		if (res.status == 200) {
			cart.current = [];
	
			window.location.href = "/products/0";
		}

	}

    function removeItemFromCart(product) {
		let index = cart.current.findIndex((item) => JSON.stringify(item.product) == JSON.stringify(product));
		cart.current.splice(index, 1);
    }

</script>

<div class="wrapper">
	<Header components={[]}></Header>
	<div class="path__container">
		<Path href="/products/0" text="Назад"></Path>
	</div>
	<main class="main">
		<div class="content">
			<div class="container">
				<div class="content-grid">
					<div class="product__list">
						<div class="product__list_container">
                            {#if cart.current.length > 0}
                                {#each cart.current as item}
                                    <Product product={item.product} href={`/product/${item.product.id}`}>
                                        {#snippet controls()}
                                            <NumberInput min={1} max={item.product.available} bind:count={item.count}></NumberInput>
                                            <Button --button-bg="transparent" no_animation="true" action={() => {removeItemFromCart(item.product)}}>
                                                {#snippet text()}
                                                    <span class="button-remove"></span>
                                                {/snippet}
                                            </Button>
                                        {/snippet}
                                    </Product>
                                {/each}
                            {:else}
                                <p>Додайте продукти у кошик. <a href="/products/0">Головна</a></p>
                            {/if}
							
						</div>
					</div>
					<div class="info">
						<div class="info__container">
							<h2 class="cart_price">Всього: {calcCartPrice()} грн</h2>
							<div class="submit__order">
								<select name="delivery" id="delivery" bind:value={delivery}>
									<option value={DELIVERY_TYPE.HOME}>Додому</option>
									<option value={DELIVERY_TYPE.PICKUP} selected>На адресу відділення</option>
								</select>
								<div class="info__item" id="address_fields">
									<p class="info__label">Адреса</p>

									{#if delivery == DELIVERY_TYPE.HOME}
										<div class="info__value">
											<input
												type="checkbox"
												name="to_apartment"
												id="to_apartment"
												bind:checked={address_home.to_apartment}
											/>
											<label for="to_apartment">Підняти на поверх?</label>
										</div>
										{#if address_home.to_apartment}
											<div class="info__value">
												<input
													type="checkbox"
													name="has_elevator"
													id="has_elevator"
													bind:checked={address_home.has_elevator}
												/>
												<label for="has_elevator">Наявний вантажний ліфт?</label>
											</div>
										{/if}

										<div class="info__value">
											<input
												type="text"
												placeholder="Місто"
												name="city"
												bind:value={address_home.city}
											/>
										</div>
										<div class="info__value">
											<input
												type="text"
												placeholder="Поштовий код"
												name="post_code"
												bind:value={address_home.post_code}
											/>
										</div>
										<div class="info__value">
											<input
												type="text"
												placeholder="Вулиця"
												name="street"
												bind:value={address_home.street}
											/>
										</div>
										<div class="info__value">
											<input
												type="text"
												placeholder="№ Будинку"
												name="building"
												bind:value={address_home.building}
											/>
										</div>
										<div class="info__value">
											<input
												type="text"
												placeholder="№ Квартири"
												name="apartment"
												bind:value={address_home.apartment}
											/>
										</div>
									{:else if delivery == DELIVERY_TYPE.PICKUP}
										<input
											type="text"
											placeholder="Номер відділення"
											bind:value={address_pickup.department_code}
										/>
									{/if}
								</div>
								<div class="orangebutton button">
									<Button action={order}>{#snippet text()}Замовлення підтверджую{/snippet}</Button>
								</div>
								{#if res?.errors}
										<div class="errors">
											{#if res.errors.cart}
												<p>{res.errors.cart}</p>
											{/if}
											{#if res.errors.delivery}
												<p>{res.errors.delivery}</p>
											{/if}
											{#if res.errors.cart}
												<p>{res.errors.cart}</p>
											{/if}
											{#if res.errors.address}
												<p>{res.errors.address}</p>
											{/if}
											{#if res.errors.products}
												<p>{res.errors.products}</p>
											{/if}
										</div>
									{/if}
							</div>
						</div>
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
	.cart_price {
		font-size: 4rem;
		font-weight: 700;
	}
	.content-grid {
		display: grid;
		grid-template-areas: 'products info';
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
		color: #6e6e6e;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
	}
	.info__value {
		font-size: 2rem;
		color: black;
		margin: 0 0 0.5rem 0;
	}
	.bold {
		font-weight: 700;
	}
	.button {
		margin: 3rem 0 0 0;
	}

	input[type='text'] {
		font-size: 2rem;
		border: 1px solid #ababab;
		padding: 0.2rem;
		width: 100%;
		max-width: 50rem;
	}

	label {
		font-size: 2rem;
	}

	select {
		font-size: 2rem;
		padding: 0.5rem;
		margin: 0 0 1rem 0;
	}

	.errors {
		padding: 3rem 0 0 0;
		color: red;
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
			grid-template-areas: 'products' 'info';
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
