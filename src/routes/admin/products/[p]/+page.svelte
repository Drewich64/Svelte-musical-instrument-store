<script>
	import Accordion from '$lib/components/accordion/accordion.svelte';
	import AccordionItem from '$lib/components/accordion/accordion-item.svelte';
	import Button from '$lib/components/button/button.svelte';
	import { InputNum } from '$lib/components/inputs';
	import Product from '$lib/components/product-card/product.svelte';
	import BurgerButton from '$lib/components/burger-menu/burger-button.svelte';
	import BurgerMenu from '$lib/components/burger-menu/burger-menu.svelte';
	import ModalWindow from '$lib/components/modal-window/modal-window.svelte';
	import Header from '$lib/components/header/header.svelte';
	import '$lib/globalstyles.css';
	import filter_icon from '$lib/img/filters-icon.png';
	import Path from '$lib/components/navigation/path/path.svelte';
	import { page } from '$app/state';
	let data = $props();
	let { products, total_pages } = data.data;
	let is_filter_open = $state(false);
	let filters = $state([
		{
			name: 'Фільтр один',
			type: 'checkbox', // checkbox || radio
			options: [
				{ name: 'опція 1', value: 'optionone', is_selected: false },
				{ name: 'опція 2', value: 'optiontwo', is_selected: false },
				{ name: 'опція 3', value: 'optionthree', is_selected: false }
			]
		},
		{
			name: 'Фільтр два',
			type: 'checkbox',
			options: [
				{ name: 'опція 1', value: 'optionone', is_selected: false },
				{ name: 'опція 2', value: 'optiontwo', is_selected: false },
				{ name: 'опція 3', value: 'optionthree', is_selected: false }
			]
		},
		{
			name: 'Фільтр три',
			type: 'checkbox',
			options: [
				{ name: 'опція 1', value: 'optionone', is_selected: false },
				{ name: 'опція 2', value: 'optiontwo', is_selected: false },
				{ name: 'опція 3', value: 'optionthree', is_selected: false }
			]
		}
	]);
	let is_sidebar_open = $state(false);

	async function deleteProduct(product_id) {
		let confirmation = confirm("Ви бажаєте видалити товар?");
		
		if (confirmation) {
			await fetch("/api/delete_product", {
				method: "POST",
				body: JSON.stringify({product_id: product_id})
			});
		}

		window.location.reload();
	}
</script>

<div class="wrapper">
	<Header components={['search', 'editor', 'report']}></Header>
	{#if encodeURI(page.url.searchParams) != ''}
		<div class="path__container">
			<Path text="Назад" action={() => history.back()}></Path>
		</div>
	{/if}
	<!---------------------------------------->
	<main class="main">
		<div class="container">
			<div class="filters-button-container">
				<Button action={() => (is_filter_open = !is_filter_open)} icon={filter_icon}></Button>
			</div>
			<div class="content">
				<!----------------Фільтри----------------->
				<aside class="content__filters">
					<h2>Фільтри</h2>
					<Accordion>
						{#each filters as filter}
							<AccordionItem class="filters__filter">
								{#snippet title()}
									<span class="filters__filter-name">{filter.name}</span>
								{/snippet}
								{#snippet content()}
									<div>
										{#each filter.options as option, i}
											{@const id = `${filter.name}_${option.name}`}
											<div class="filters__filter-option">
												<input
													type="checkbox"
													value={option.value}
													bind:checked={option.is_selected}
													{id}
												/>
												<label for={id}>{option.name}</label>
											</div>
										{/each}
									</div>
								{/snippet}
							</AccordionItem>
						{/each}
					</Accordion>
				</aside>
				<BurgerMenu bind:active={is_filter_open}>
					{#snippet content()}
						<div class="burger-menu__content">
							<div class="burger__filters">
								<h2>Фільтри</h2>
								<Accordion>
									{#each filters as filter}
										<AccordionItem class="filters__filter">
											{#snippet title()}
												<span class="filters__filter-name">{filter.name}</span>
											{/snippet}
											{#snippet content()}
												<div>
													{#each filter.options as option, i}
														{@const id = `${filter.name}_${option.name}`}
														<div class="filters__filter-option">
															<input
																type="checkbox"
																value={option.value}
																bind:checked={option.is_selected}
																{id}
															/>
															<label for={id}>{option.name}</label>
														</div>
													{/each}
												</div>
											{/snippet}
										</AccordionItem>
									{/each}
								</Accordion>
							</div>
						</div>
					{/snippet}
				</BurgerMenu>
				<!---------------/Фільтри----------------->

				<!-- Секція з інструментами-->
				<div class="content__instruments">
					{#each products as product, i}
						<Product {product} href="/admin/editor/{product.id}">
							{#snippet controls()}
								<Button --button-bg="transparent" no_animation="true" action={() => {deleteProduct(product.id)}}>
									{#snippet text()}
										<span class="button-remove"></span>
									{/snippet}
								</Button>
							{/snippet}
						</Product>
					{/each}
				</div>
				<!--/Секція з інструментами-->
			</div>
			<div class="page-navigation-block">
				<ul class="page-navigation-block__list">
					{#each { length: total_pages } as _, i}
					{@const search_params = encodeURI(page.url.searchParams)}
						<li class="page-navigation-block__item">
							<a
								href="/admin/products/{i}"
								onclick={() => window.location.href = `/admin/products/${i}${search_params ? "?"+search_params : "" }`}
								class="page-navigation-block__item_link">{i}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</main>
	<!---------------------------------------->
	<footer class="footer">
		<div class="container footer__container">
			<div class="footer__row">
				<div class="footer__card">
					<div class="footer__card_body">
						<h2 class="footer__card_title">Lorem ipsum</h2>
						<ul class="footer__card_list">
							<li class="footer__card_item">Lorem ipsum</li>
							<li class="footer__card_item">Lorem ipsum</li>
							<li class="footer__card_item">Lorem ipsum</li>
							<li class="footer__card_item">Lorem ipsum</li>
						</ul>
					</div>
				</div>
				<div class="footer__card">
					<div class="footer__card_body">
						<h2 class="footer__card_title">Lorem ipsum</h2>
						<ul class="footer__card_list">
							<li class="footer__card_item">Lorem ipsum</li>
							<li class="footer__card_item">Lorem ipsum</li>
							<li class="footer__card_item">Lorem ipsum</li>
							<li class="footer__card_item">Lorem ipsum</li>
						</ul>
					</div>
				</div>
				<div class="footer__card">
					<div class="footer__card_body">
						<h2 class="footer__card_title">Lorem ipsum</h2>
						<ul class="footer__card_list">
							<li class="footer__card_item">Lorem ipsum</li>
							<li class="footer__card_item">Lorem ipsum</li>
							<li class="footer__card_item">Lorem ipsum</li>
							<li class="footer__card_item">Lorem ipsum</li>
						</ul>
					</div>
				</div>
				<div class="footer__card">
					<div class="footer__card_body">
						<h2 class="footer__card_title">Lorem ipsum</h2>
						<ul class="footer__card_list">
							<li class="footer__card_item">Lorem ipsum</li>
							<li class="footer__card_item">Lorem ipsum</li>
							<li class="footer__card_item">Lorem ipsum</li>
							<li class="footer__card_item">Lorem ipsum</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="footer__copyright">
				<a href="https://www.flaticon.com/free-icons/list" title="list icons">List icons created by Kiranshastry - Flaticon</a>
				<a href="https://www.flaticon.com/free-icons/product" title="product icons">Product icons created by Freepik - Flaticon</a>
				<a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a>
			</div>
		</div>
	</footer>
</div>

<style>
	.path__container {
		padding: 3rem 0;
	}

	.content__instruments {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1rem;
	}

	.burger-menu__content {
		padding: 2rem;
	}

	.filters-button-container {
		--button-bg: #e1882e;
		--button-bg-hover: #b66d24;
		--button-bg-click: #e1882f;
		--button-color: #eee;
		padding: 2rem 0;
	}

	.filters-button-container {
		display: none;
	}

	.button-remove {
		display: block;
		position: relative;
		width: 3rem;
		height: 3rem;
	}

	.button-remove::before {
		content: '';
		display: block;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 10%;
		background: red;
	}

	.page-navigation-block {
		padding: 5rem 3rem;
	}
	.page-navigation-block__list {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		margin: 0 auto;
	}
	.page-navigation-block__item {
	}
	.page-navigation-block__item_link {
		font-size: 2.5rem;
	}

	@media (width <= 1080px) {
		.content__filters {
			display: none;
		}

		.filters-button-container {
			display: block;
		}
		.main {
			padding: 0;
		}
	}

	@media (width < 810px) {
		.content__instruments {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (width < 510px) {
		.content__instruments {
			grid-template-columns: 1fr;
		}
	}
</style>
