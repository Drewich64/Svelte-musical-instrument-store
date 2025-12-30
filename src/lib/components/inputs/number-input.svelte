<script>
    let {min, max, count = $bindable(min??0), name=$bindable(null)} = $props();

    function update() {
        count = Number(count);
        if (count < min) count = min;
        if (count > max) count = max;
    }

    function increment() {
        if (max == null) {
            count++;
            return;
        }
        if (count + 1 <= max) {
            count++;
        }
    }
    function decrement() {
        if (min == null) {
            count--;
            return;
        }
        if (count - 1 >= min) {
            count--;
        }
    }

</script>

<div class="input__container">
    <button onclick={decrement} type="button" disabled="{min != null ? count <= min : false}">-</button>
        <input type="text" bind:value={count} oninput={update} name={name?? ""}>
    <button onclick={increment} type="button" disabled="{max != null ? count >= max : false}">+</button>
</div>

<style>
    .input__container * {
        box-sizing: border-box;
    }

    .input__container {
        box-sizing: border-box;
        display: inline-flex;
        border: 1px solid black;
        padding: 0.2rem;
        border-radius: 4rem;
        height: fit-content;
        background-color: #fff;
        width: fit-content;
    }
    
    button {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        outline: none;
        border: none;
        text-align: center;
        vertical-align: middle;
        line-height: 1;
        font-size: 2.5rem;
        font-family: var(--ff, Arial, Helvetica, sans-serif);
    }

    input {
        width: 100%;
        width: var(--number-input-field-width, 4rem);
        text-align: center;
        border-radius: 0;
        outline: none;
        border: none;
        font-size: 2rem;
        font-family: var(--ff, Arial, Helvetica, sans-serif);
    }


</style>
