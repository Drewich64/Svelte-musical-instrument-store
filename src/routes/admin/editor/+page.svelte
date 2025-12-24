<script>
	import Button from "$lib/components/button/button.svelte";
	import Carousel from "$lib/components/carousel/carousel.svelte";
	import Header from "$lib/components/header/header.svelte";
    import ModalWindow from "$lib/components/modal-window/modal-window.svelte";
    import "$lib/globalstyles.css";

    import add_icon from "$lib/img/add-icon.png";
    import trash_icon from "$lib/img/trash-icon.png";
    import add_image_icon from "$lib/img/add-image-icon.png";
	import Path from "$lib/components/navigation/path/path.svelte";
	import NumberInput from "$lib/components/inputs/number-input.svelte";
    
    let { form } = $props();
    
    let img = $state([]);
    let img_ready = $derived.by(() => {
        if (img.length <= 0) {
            return [add_image_icon];
        } else {
            return img;
        }
    });
    let file_input = $state();
    let current = $state(0);
    let characteristics = $state([
        {id: 0, name: null, value: null}
    ]);
    $effect(() => {
        if (characteristics[characteristics.length-1].name != null && characteristics[characteristics.length-1].value != null) {
            characteristics.push({id: characteristics.length, name: null, value: null});
        }
    });
    // let edited_characteristic = $state(-1);


    function updateUrls() {
        let files = [...file_input.files];
        if (files.length <= 0) return;
        let urls = [];
        for (let i = 0; i < files.length; i++) {
            urls.push(URL.createObjectURL(files[i]));
        }
        img.push(...urls);
    }

    function deleteImage() {
        if (img.length > 0)
            img.splice(current, 1);
        current--;
    }


</script>


<div class="wrapper">
    <Header components={['report']}></Header>
    <div class="path__container">
        <Path text="Головна" href="/admin/products/0"></Path>
    </div>
    <div class="main">
        <div class="container">
            <form action="?/addProduct" use:enchanced method="POST" class="form" autocomplete="off" autocorrect="off">
            <div class="content-grid">
                <div class="carousel__container">
                    <div class="carousel">
                        <Carousel bind:images={img_ready} bind:current={current}></Carousel>
                    </div>
                    <input type="file" accept=".jpg, .jpeg, .png, .webp" bind:this={file_input} onchange={updateUrls} class="file-input" name="product_images">
                    <Button icon={trash_icon} no_animation="true" --button-bg="transparent" action={deleteImage}>
                        {#snippet text()}
                            Видалити зображення
                        {/snippet}
                    </Button>
                </div>
                <div class="form__container">
                    {#if form?.errors}
                        <div class="form-errors">
                            {#each Object.values(form.errors) as error}
                                <p class="form-errors__paragraph">Помилка: {error}</p>
                            {/each}
                        </div>
                    {/if}
                    <div>
                        <div class="form__name-price form__horizontal-container">
                            <div class="form__item">
                                <label for="" class="label">Назва</label>
                                <input type="text" class="textinput" name="title">
                            </div>
                            <div class="form__item">
                                <label for="" class="label">Ціна</label>
                                <!-- <input type="number" class="textinput" name="price" min="0"> -->
                                 <NumberInput min={1} name="price" --number-input-field-width="9rem"></NumberInput>
                            </div>    
                        </div>
                        <div class="form__item">
                            <label for="" class="label">Опис</label>
                            <textarea class="textarea" name="description">

                            </textarea>
                        </div>
                        <div class="form__item">
                            <label for="" class="label">Кількість на складі</label>
                            <NumberInput min={0} name="amount"></NumberInput>
                        </div>
                        <div class="form__item">
                            <label for="" class="label">Виробник</label>
                            <input type="text" class="textinput" name="manufacturer">
                        </div>
                        <div class="form__horizontal-container">
                            <div class="form__item">
                                <label for="" class="label">Категорія</label>
                                <input type="text" class="textinput" name="category">
                            </div>
                        </div>
                        <div class="form__characteristics_container">
                            <h2>Характеристики</h2>
                            {#each characteristics as ch, i}
                                <div class="characteristic__container" onclick={() => edited_characteristic = i}>
                                    <div class="characteristic__name_container">
                                        <input type="text" name="characteristic_key_{i}" class="characteristic__name_input characteristic-input" bind:value={ch.name} placeholder="Характеристика">
                                    </div>
                                    <div class="characteristic__value_container">
                                        <input type="text" name="characteristic_value_{i}" class="characteristic__value_input characteristic-input" bind:value={ch.value} placeholder="Значення">
                                    </div>
                                </div>
                            {/each}
                        </div>
                        <Button type="Submit">
                            {#snippet text()}
                                Підтвердити
                            {/snippet}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
        </div>
    </div>

    <footer class="footer">
        <div class="container footer__container">
            <div class="footer__row">
                <div class="footer__copyright">
                    <a href="https://www.flaticon.com/free-icons/investment" title="investment icons">Investment icons created by Freepik - Flaticon</a>
                    <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a>
                    <a href="https://www.flaticon.com/free-icons/no-photo" title="no photo icons">No photo icons created by Wyasa.Design - Flaticon</a>
                    <a href="https://www.flaticon.com/free-icons/trash" title="trash icons">Trash icons created by Freepik - Flaticon</a>
                </div>
            </div>
        </div>
    </footer>
</div>


<style>
    input {
        background-color: #f4f4f4;
        width: 100%;
    }

    input:disabled {
        background-color: #DBDBDB;
    }

.content-grid {
    display: grid;
    grid-template-areas: "carousel form";
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 5rem;
}
.carousel__container {
    grid-area: carousel;
    min-width: 0;
    min-height: 0;
}
.carousel {
}
.form__container {
    grid-area: form;
}
.form {
    width: 100%;
    display: flex;
    flex-direction: column;

}

.form__horizontal-container {
    display: flex;
    gap: 2rem;
    width: 100%;
}
.form__item {
    display: flex;
    flex-direction: column;
    margin: 0 0 2rem 0;
    gap: 0.5rem;
    flex: 1 1 auto;
}

.label {
}

.file-input {
    background-color: #f4f4f4;
    padding: 0.6rem;
    border-radius: 0.6rem;
    font-size: 2rem;
    margin: 1rem 0;
}

.textarea {
    background-color: #f4f4f4;
    resize: vertical;
    min-height: 15rem;
    padding: 0.6rem;
    font-size: 2rem;
}
.form__characteristics_container {
}

    .path__container {
        padding: 3rem 0;
    }

.characteristic__container {
    display: flex;
    margin: 2rem 0;
}

.characteristic__container>* {
    
}

.characteristic__name_container {
    padding: 0 1rem 0 0;
    position: relative;
    flex: 1 0 50%;
    overflow: hidden;
}

.characteristic__value_container {
    padding: 0 0 0 1rem;
    flex: 1 0 50%;
    position: relative;
    overflow: hidden;
}

.characteristic__name {
    background-color: #f4f4f4;
    height: 6rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    width: 100%;
    overflow: scroll;
}
.characteristic__value {
    background-color: #f4f4f4;
    height: 6rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    width: 100%;
    overflow: scroll;
}

.inactive {
    display: none;
}


.characteristic-input {
    font-size: 2rem;
    padding: 1rem 0.5rem;
}

.form-errors {
    padding: 0 0 3rem 0;
}

.form-errors__paragraph {
    font-size: 2.3rem;
    color: red;
} 

@media (width < 1024px) {
    .content-grid {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
}

@media (width < 810px) {
    .content-grid {
        grid-template-areas: "carousel" "form";
        grid-template-columns: 1fr;
    }
}
</style>