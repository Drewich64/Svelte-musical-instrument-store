<script>
	import { preventDefault } from 'svelte/legacy';

    let {form} = $props();
    let start = $state("...");
    let end = $state();
</script>


<div class="wrapper">
    <form action="?/get_statistics" use:enchance method='POST' name="datum_form" id="datum_form">
        <div>
            <label for="start">Початок</label>
            <input type="date" id="start" name="start" bind:value={start}>
        </div>
        <div>
            <label for="end">Кінець</label>
            <input type="date" id="end" name="end" bind:value={end}>
        </div>
        <button type="submit">Встановити</button>
    </form>
    <div class="content">
        <div class="for_screen">
            <section class="statistics">
                <div class="container">
                    <p>Всього замовлень: {form?.orders?.toLocaleString() ?? 0}</p>
                    <p>Відмінено: {form?.orders_cancelled?.toLocaleString() ?? 0}</p>
                    <p>Обробляється: {form?.orders_processing?.toLocaleString() ?? 0}</p>
                    <p>Відправлено: {form?.orders_sent?.toLocaleString() ?? 0}</p>
                    <br>
                    <p>Загальна ціна замовлень зі статусом...</p>
                    <p>Відмінено: {form?.orders_cancelled_total?.toLocaleString() ?? 0} грн</p>
                    <p>Обробляється: {form?.orders_processing_total?.toLocaleString() ?? 0} грн</p>
                    <p>Відправлено: {form?.orders_sent_total?.toLocaleString() ?? 0} грн</p>
                    <br>
                    <p>Закуплено товару на ціну: {form?.total_supply_price?.toLocaleString() ?? 0} грн</p>
                </div>
            </section>
        </div>
    </div>
</div>


<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
    }
    .content {
        width: 96rem;
        height: 134.4rem;
        background-color: #fff;
        box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.482);
        font-size: 2.3rem;
        font-family: Arial, Helvetica, sans-serif;
        padding: 5rem 3rem;
        margin: 0 auto;
        line-height: 1.5;
    }
    .statistics {
    }
    .container {
    }

    #datum_form {
        padding: 3rem 0;
        margin: 0 auto;
        font-size: 2rem;
        display: flex;
        gap: 4rem;
    }
</style>