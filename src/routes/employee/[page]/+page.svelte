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
	import filter_icon from '$lib/img/filters-icon.ico';
	import {page} from "$app/state";
	import Path from '$lib/components/navigation/path/path.svelte';
	let data = $props();
	let { orders, total_pages } = data.data;
	let filters = $state([
		{
			name: 'Оплачено',
			type: 'checkbox', // checkbox || radio
			options: [
				{ name: 'Так', value: '0', is_selected: false },
				{ name: 'Ні', value: '1', is_selected: false },
			]
		},
		{
			name: 'Статус',
			type: 'checkbox',
			options: [
				{ name: 'В обробці', value: '0', is_selected: false },
				{ name: 'Відправлено', value: '1', is_selected: false },
				{ name: 'Доставлено', value: '2', is_selected: false },
				{ name: 'Відмінено', value: '3', is_selected: false }
			]
		},
		{
			name: 'Спосіб доставки',
			type: 'checkbox',
			options: [
				{ name: 'Додому', value: '0', is_selected: false },
				{ name: 'У відділення', value: '1', is_selected: false },
				{ name: 'Самовивіз', value: '2', is_selected: false }
			]
		}
	]);
	let cart = $state([]);
	let is_cart_open = $state(false);
	let is_sidebar_open = $state(false);

	function parseDate(d) {
		let inp = new Date(d);
		let [year, month, day] = inp.toISOString().split('T')[0].split('-');
		return `${day}.${month}.${year}`;
	}
</script>

<div class="wrapper">
	<Header components={['search']}></Header>
	{#if encodeURI(page.url.searchParams) != ''}
		<div class="path__container">
			<Path action={() => history.back()} text="Назад"></Path>
		</div>
	{/if}
	<!---------------------------------------->
	<main class="main">
		<div class="container">
			<div class="filters-button-container">
				<Button action={() => (is_cart_open = !is_cart_open)} icon={filter_icon}></Button>
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
											<div class="filters__filter-option">
												<input
													type="checkbox"
													value={option.value}
													bind:checked={option.is_selected}
													id={`check_${i}`}
												/>
												<label for={`check_${i}`}>{option.name}</label>
											</div>
										{/each}
									</div>
								{/snippet}
							</AccordionItem>
						{/each}
					</Accordion>
				</aside>
				<BurgerMenu bind:active={is_cart_open}>
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
														<div class="filters__filter-option">
															<input
																type="checkbox"
																value={option.value}
																bind:checked={option.is_selected}
																id={`check_${i}`}
															/>
															<label for={`check_${i}`}>{option.name}</label>
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
				<div class="content__orders">
					<!------------------Orders------------------------>
					{#each orders as order}
                    <!-- <a href={`/employee/order/${order.id}`}> -->
						<div class="content__orders_order" onclick={() => window.location.href=`/employee/order/${order.id}`}>
								<div class="order__left">
									<div class="order__left_top">
										<div>
											<span class="order-id">#{order.id}</span>
										</div>
										<div>
											<span class="order-user">Користувач {order.user_id}</span>
										</div>
									</div>
									<div class="order__left_status status-{order.status}">{order.status}</div>
								</div>
								<div class="order__right">
									<span class="order-date">{parseDate(order.order_date)}</span>
								</div>
                            </div>
					{/each}
					<!------------------Orders/----------------------->
				</div>
				<!--/Секція з інструментами-->
			</div>
			<div class="page-navigation-block">
                <ul class="page-navigation-block__list">
                    {#each {length: total_pages} as _, i}
                        <li class="page-navigation-block__item">
                            <a href="" onclick={() => window.location.href = `/employee/${i}${search_params ? "?"+search_params : "" }`} class="page-navigation-block__item_link">{i}</a>
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
		</div>
	</footer>
</div>

<style>
	.path__container {
		padding: 3rem 0;
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

	.content__orders {
		width: 100%;
	}

	.content__orders_order {
		display: flex;
		flex-direction: row;
		background: #f4f4f4;
		height: 15rem;
		margin: 0 0 2rem 0;
		padding: 1rem;
		border-radius: 0.6rem;
		cursor: pointer;
	}
	.order__left {
		display: flex;
		flex-direction: column;
		flex: 1 0 auto;
	}
	.order__left_top {
		flex: 1 1 auto;
	}

	.order__left_top * {
		margin: 0 0 0.5rem 0;
	}

	.order-id {
	}
	.order-user {
	}
	.order__left_status {
	}
	.order__right {
	}
	.order-date {
	}
	.status-PROCESSING {
		color: green;
	}
	.status-CANCELLED {
		color: red;
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
