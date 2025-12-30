<script>
	import BurgerButton from '$lib/components/burger-menu/burger-button.svelte';
	import BurgerMenu from '$lib/components/burger-menu/burger-menu.svelte';
	import Button from '$lib/components/button/button.svelte';
	import ModalWindow from '../modal-window/modal-window.svelte';
	import NumberInput from '../inputs/number-input.svelte';
	import '$lib/globalstyles.css';
	import user_image from '$lib/img/header/user.png';
	import heart from '$lib/img/header/heart.png';
	import shopping_cart from '$lib/img/header/shopping-cart.png';
	import editor from '$lib/img/header/editor.png';
	import image_placeholder from '$lib/img/no-image-icon.png';
	import trash from '$lib/img/trash-icon.png';
	import empty_icon from '$lib/img/empty-icon.png';
	import bar_chart from '$lib/img/bar-chart.png';
	import orders_icon from '$lib/img/orders-icon.png';
	import { DELIVERY_TYPE } from '$lib/enums';
	import { cart, user, removeItemFromCart, calcCartPrice } from '$lib/store.svelte';
	import { page } from '$app/state';
	import Page from '../../../routes/login/+page.svelte';

	let { components, data, is_cart_open = $bindable(false)} = $props();
	let is_sidebar_open = $state(false);
	let cart_total = $derived.by(() => calcCartPrice());
	let delete_account_popup_active = $state(false);
	let delete_account_form_input = $state();

	let search_term = $state();

	function search() {
		window.location.href=`${page.url.pathname}?search=${search_term}`;
	}

	async function delete_account() {
		await fetch("/api/delete_account", {
			method: "POST",
			body: JSON.stringify({
				password: delete_account_form_input
			})
		});
	}

	async function log_out() {
		await fetch("/api/log_out", {
			method: "POST",
			body: JSON.stringify({})
		});

		window.location.href="/login";
	}
</script>

<header class="header">
	<div class="header__container">
		<div class="header__row">
			<div class="header__left-side">
				<div class="header__user-image_container header__icon ibg">
					<a href="">
						<img src={user_image} alt="" />
					</a>
					<div class="dropdown__account-info">
						<div class="dropdown__account-info_container">
							<div class="dropdown__account-info_top">
								<div class="dropdown__account-info_top-left">
									<div class="ibg dropdown__account-info_top_ibg">
										<img src="{user.current.image_url ?? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"}" alt="">
									</div>
								</div>
								<div class="dropdown__account-info_top-right">
									<p class="user_username">{user.current.username == null ? "Username" : user.current.username}</p>
									<p class="user_email">{user.current.email == null ? "username@username.com" : user.current.email}</p>
								</div>
							</div>
							<div class="dropdown__account-info_middle">
								<p class="user_phone">{user.current.phone ?? "+123 456 78 90"}</p>
							</div>
							<div class="dropdown__account-info_bottom">
								<a href="" onclick={async () => {await log_out()}}>Вихід</a>
								<a href="" onclick={() => {delete_account_popup_active = true}}>Видалити акаунт</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="header__right-side">
				{#if components.includes('search')}
					<form class="header__form">
						<input type="text" class="header__search" placeholder="Пошук" bind:value={search_term}/>
						<button type="submit" hidden onclick={search}></button>
					</form>
				{/if}
				<div class="header__buttons_container">
					{#if components.includes('favourites')}
						<div class="header__favourites header__icon ibg">
							<a href="">
								<img src={heart} alt="" />
							</a>
						</div>
					{/if}
					{#if components.includes('orders')}
						<div class="header_cart header__icon ibg">
							<a href="/orders">
								<img src={orders_icon} alt="" />
							</a>
						</div>
					{/if}
					{#if components.includes('cart')}
						<div class="header__cart header__icon ibg">
							{#if cart.current.length > 0}
								<span class="cart__count-bubble">{cart.current.length}</span>
							{/if}
							<a href="" onclick={() => (is_cart_open = !is_cart_open)}>
								<img src={shopping_cart} alt="" />
							</a>
						</div>
					{/if}
					{#if components.includes('editor')}
						<div class="header__cart header__icon ibg" onclick={() => (cart_open = !cart_open)}>
							<a href="/admin/editor">
								<img src={editor} alt="" />
							</a>
						</div>
					{/if}
					{#if components.includes('report')}
						<div class="header__cart header__icon ibg">
							<a href="/admin/report">
								<img src={bar_chart} alt="" />
							</a>
						</div>
					{/if}
				</div>
				<div class="header__burger_container">
					<BurgerButton bind:active={is_sidebar_open}></BurgerButton>
					<BurgerMenu bind:active={is_sidebar_open}>
						{#snippet content()}
							<div class="burger-menu__content">
								<div class="dropdown__account-info_top">
									<div class="dropdown__account-info_top-left">
										<div class="ibg dropdown__account-info_top_ibg">
											<img src="{user.current.image_url ?? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"}" alt="">
										</div>
									</div>
									<div class="dropdown__account-info_top-right">
										<p class="user_username">{user.current.username == null ? "Username" : user.current.username}</p>
										<p class="user_email">{user.current.email == null ? "username@username.com" : user.current.email}</p>
										<p class="user_phone">{user.current.phone ?? "+123 456 78 90"}</p>
									</div>
								</div>
								<ul class="header__burger_list">
									{#if components.includes('favourites')}
										<li class="header__burger_button">
											<div class="header__burger_img-container ibg">
												<a href="">
													<img src={heart} alt="" />
												</a>
											</div>
											<a class="header__burger_link" href="https://google.com">Улюблені</a>
										</li>
									{/if}
									{#if components.includes('cart')}
										<li
											class="header__burger_button"
											onclick={() => (is_cart_open = !is_cart_open)}
										>
											<div class="header__burger_img-container ibg">
												<a>
													<img src={shopping_cart} alt="" />
												</a>
											</div>
											<a class="header__burger_link">Кошик</a>
										</li>
									{/if}
									{#if components.includes('report')}
										<li class="header__burger_button">
											<div class="header__cart header__icon ibg">
												<a href="/admin/report">
													<img src={bar_chart} alt="" />
												</a>
											</div>
											<a class="header__burger_link" href="/admin/report">Звіт</a>
										</li>
									{/if}
									{#if components.includes('editor')}
										<li class="header__burger_button">
											<div class="header__burger_img-container ibg">
												<a href="">
													<img src={editor} alt="" />
												</a>
											</div>
											<a class="header__burger_link" href="/admin/editor">Редактор</a>
										</li>
									{/if}
								</ul>
							</div>
						{/snippet}
					</BurgerMenu>
				</div>
			</div>
		</div>
	</div>

	{#if components.includes('cart')}
		<div class="cart">
			<ModalWindow bind:active={is_cart_open} name="Кошик">
				{#snippet content()}
					<div class="cart__content">
						<div class="cart__items">
							{#if cart.current.length > 0}
								{#each cart.current as item, i}
									<div class="item">
										<div class="item__row">
											<div class="item__left">
												<div class="ibg item__left_image">
													<img src={item.product.photos[0] ?? image_placeholder} alt="" />
												</div>
												<h2 class="item__title">
													{item.product.title}
												</h2>
											</div>
											<div class="item__right">
												<span class="item__price">{item.product.price} ₴</span>
												<Button
													icon={trash}
													action={() => removeItemFromCart(item.product)}
												></Button>
												<NumberInput bind:count={item.count} min={1} max={item.product.available}></NumberInput>
											</div>
										</div>
									</div>
								{/each}
							{:else}
								<div class="empty__cart_container">
									<img src={empty_icon} alt="" />
								</div>
							{/if}
						</div>
						<div class="cart__footer">
							<div class="cart__footer_row">
								<span>Загалом: {cart_total} ₴</span>
								<a href="/orders">Мої замовлення</a>
								<a href="/orders/order">Замовити</a>
							</div>
						</div>
					</div>
				{/snippet}
			</ModalWindow>
		</div>
	{/if}
	<ModalWindow bind:active={delete_account_popup_active} name="Видалити акаунт">
		{#snippet content()}
			<div class="delete_account_form">
				<p>Введіть пароль для видалення акаунта</p>
				<input type="text" class="delete_account_form_input" name="password" bind:value={delete_account_form_input} placeholder="Пароль">
				<Button action={delete_account} >
					{#snippet text()}
						Підтвердити
					{/snippet}
				</Button>
			</div>
		{/snippet}
	</ModalWindow>
</header>

<style>
	a,
	a:active,
	a:hover {
		color: #eaa662;
		text-decoration: underline;
	}

	.header {
		height: 70px;
		background-color: #eaa662;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
		flex: 0 0 auto;
	}

	.header__container {
		max-width: 1260px;
		padding: 0 30px;
		width: 100%;
		margin: 0 auto;
	}

	.header__row {
		/* background-color: red; */
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.header__icon {
		height: 4.5rem;
		width: 4.5rem;
	}
	.header__icon img {
		object-fit: contain;
	}
	.header__left-side {
		flex: 0 0 33.333%;
		padding: 0 4rem 0 0;
		max-width: 250px;
	}
	.header__right-side {
		display: flex;
		justify-content: flex-end;
		gap: 2rem;
		flex: 1 0 auto;
	}
	.header__burger_container {
		display: none;
	}

	.burger-menu__content {
		padding: 2rem;
	}

	.header__form {
		flex: 1 1 auto;
		position: relative;

	}

	.header__search {
		font-family: 'Lexend', sans-serif;
		font-weight: 200;
		color: #424242;
		border-radius: 50px;
		font-size: 20px;
		padding: 0 20px;
		width: 100%;
		height: 45px;
	}
	.header__favourites {
	}
	.header__cart {
	}
	.header__cart::before {
	}

	.header__buttons_container {
		display: flex;
		gap: 2rem;
	}

	.header__user-image_container {
		position: relative;
	}

	.header__burger_button {
		display: flex;
		gap: 1rem;
		align-items: center;
		font-size: 1.1rem;
	}
	.header__burger_img-container {
		width: 3em;
		height: 3em;
	}
	.header__burger_link {
		color: black;
		text-decoration: none;
		font-size: 2.5em;
	}

	.header__burger_link:hover {
		text-decoration: none;
		color: black;
	}

	.header__burger_list {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 5rem 0 0 0;
	}

	.empty__cart_container {
		width: 100%;
		height: 40rem;
		display: flex;
		justify-content: center;
	}

	.cart {
	}

	.cart__count-bubble {
		display: block;
		background-color: rgb(253, 83, 83);
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		position: absolute;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		right: -20%;
		top: -20%;
	}

	.cart__content {
		padding: 20px;
		width: 100%;
		overflow-y: scroll;
		max-height: 100%;
		display: flex;
		flex-direction: column;
	}

	.cart__items {
	}

	.item {
		background-color: #f4f4f4;
		padding: 1rem;
		border-radius: 1rem;
		margin: 0 0 0.5rem 0;
		/* display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-end; */
	}
	.item__row {
		display: flex;
		justify-content: space-between;
	}
	.item__left {
		display: flex;
		gap: 1rem;
	}
	.item__left_image {
		/* width: 15rem; */
		/* height: 15rem; */
		aspect-ratio: 1 / 1;
		flex: 0 0 auto;
		background-color: #fff;
	}
	.item__left_image img {
		object-fit: contain;
	}
	.item__title {
		font-size: 2.4rem;
		flex: 1 1 auto;
	}
	.item__right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 1rem;
		width: fit-content;
	}
	.item__price {
		flex: 1 0 auto;
	}

	.item__bottom {
		display: flex;
		justify-content: flex-end;
		padding: 1rem 0 0 0;
	}

	.cart__footer {
		margin-top: auto;
	}
	.cart__footer_row {
		display: flex;
		justify-content: space-between;
	}

	/*--------------Account info dropdown--------------*/
	.dropdown__account-info {
		position: absolute;
		top: calc(100% +  1.7rem);
		left: 50%;
		background-color: #fff;
		padding: 1.2rem;
		border-radius: 0.6rem;
		transform: translate(calc(-50%), 0);
		box-shadow: 0 0 7px rgba(0, 0, 0, 0.531);
		z-index: 1000;
		visibility: hidden;
		opacity: 0;
		transition: 0.2s;

	}
	

	.header__user-image_container:hover > .dropdown__account-info {
		visibility: visible;
		opacity: 1;
	}

	.dropdown__account-info::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -100%);
		
		box-sizing: content-box;
		width: 0; 
		height: 0; 
		border-left: 1.6rem solid transparent;
		border-right: 1.6rem solid transparent;
		
		border-bottom: 1.6rem solid white;
	}
	.dropdown__account-info_container {
	}
	.dropdown__account-info_top {
		display: flex;
		gap: 1rem;
		margin: 0 0 0.5rem 0;
	}
	.dropdown__account-info_top-left {
	}
	.ibg {
	}
	.dropdown__account-info_top_ibg {
		width: 7rem;
		height: 7rem;
		border-radius: 50%;
		overflow: hidden;
	}
	.dropdown__account-info_top-right {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.dropdown__account-info_middle {
		padding: 1rem 0;
	}
	.dropdown__account-info_bottom {
		padding: 1rem 0 0 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.user_username {
		font-size: 2.5rem;
	}

	.user_email {
		font-size: 1.5rem;
		color: gray;
	}

	.user_phone {
		font-size: 1.5rem;
	}

	.delete_account_form {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		padding: 5rem 0;
	}

	.delete_account_form_input {
		padding: 0.5rem;
		font-size: 2.3rem;
		border: 1px solid black;
	}

	@media (width <= 1080px) {
		.header__left-side {
			flex: 0 1 auto;
		}
		.header__right-side {
			flex: 1 1 auto;
		}
	}

	@media (width < 670px) {
		.header__left-side {
			display: none;
		}
		.header__buttons_container {
			display: none;
		}
		.header__burger_container {
			display: block;
		}
	}

	@media (width < 1500px) {
		.dropdown__account-info {
			transform: translate(min(max(calc(50% - 100vw*0.15), -50%), -30px), 0);
		}

		.dropdown__account-info::before {
			left: calc(max(calc(0.14 * calc(100vw - 1165px) + 30px), 30px));
		}
	}
</style>
