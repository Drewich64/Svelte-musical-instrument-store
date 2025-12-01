<script>
	import Header from '$lib/components/header/header.svelte';
	import Carousel from '$lib/components/carousel/carousel.svelte';
	import Button from '$lib/components/button/button.svelte';
	import NumberInput from '$lib/components/inputs/number-input.svelte';
	import Path from '$lib/components/navigation/path/path.svelte';
    import trash from "$lib/img/trash-icon.png";
	import { cart, addProductToCart, removeItemFromCart, cartContains } from '$lib/store.svelte';

	import '$lib/globalstyles.css';

	import heart from '$lib/img/header/heart.png';
	let p = $props();
	let instrument = p.data.product;
	let is_sidebar_open = $state(false);
	let count = $state(1);

    let cart_contains_instrument = $derived.by(() => {return cartContains(instrument)});

</script>

<div class="wrapper">
	<Header components={['cart', 'orders']}></Header>
	<div class="path__container">
		<Path text="Головна" action={() => history.back()}></Path>
	</div>
	<main class="main">
		<div class="container">
			<div class="content">
				<div class="content__grid">
					<div class="content__carousel">
						<Carousel images={instrument.photos}></Carousel>
					</div>
					<div class="content__right">
						<div class="content__right_row">
							<h2 class="content__right_title">{instrument.title}</h2>
							<div class="content__right_buttons">
								{#if !cart_contains_instrument}
									<Button
										action={() => {
											addProductToCart(instrument);
										}}
										--button-bg="#E1882E"
										--button-bg-hover="#B66D24"
										--button-bg-click="#E1882f"
										--button-color="#eee"
										--button-radius="6px"
									>
										{#snippet text()} У кошик {/snippet}</Button>
								{:else}
									<Button icon={trash} action={() => removeItemFromCart(instrument)}>
                                    </Button>
								{/if}
							</div>
							<hr />
						</div>
					</div>
					<div class="content__description">
						{#if instrument.description}
							<!-- <pre> -->
							<p class="content__description_text" style="white-space: pre-wrap;">
								{instrument.description}
							</p>
							<!-- </pre> -->
						{/if}
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

<style>
	.content__grid {
		display: grid;
		grid-template-areas: 'carousel r' 'description description';
		grid-template-columns: 2fr 1fr;
		width: 100%;
		gap: 2rem;
	}
	.content__carousel {
		grid-area: carousel;
	}
	.content__right {
		grid-area: r;
	}
	.content__right_row {
	}
	.content__right_title {
		font-size: 3.2rem;
		padding: 0 0 2rem 0;
	}
	.content__right_buttons {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 2rem;
		flex-wrap: wrap-reverse;
	}

	.content__description {
		grid-area: description;
	}
	.content__description_text {
	}

	.path__container {
		padding: 3rem 0;
	}

	@media (width <= 767px) {
		.content__grid {
			grid-template-areas: 'carousel carousel' 'r r' 'description description';
		}
	}
</style>
