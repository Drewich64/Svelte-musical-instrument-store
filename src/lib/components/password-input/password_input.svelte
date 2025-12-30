<script>
    import closed_eye_icon from '$lib/img/closed-eye.png';
    import open_eye_icon from '$lib/img/open-eye.png';
    let {name, value} = $props();
    let preview_enabled = $state(false);

    function onInputChange() {
        if (preview_enabled) {
            preview_enabled = false;
        }
    }
</script>

<div class="password-input">
    <input class="textinput password-input__input" type={preview_enabled?"text":"password"} name={name} placeholder="Пароль" value={value} oninput={onInputChange}>
    <img class="password-input__image" src={preview_enabled? closed_eye_icon : open_eye_icon} alt={preview_enabled?"Password preview enabled":"Password preview disabled"} onclick={preview_enabled=!preview_enabled}>
</div>


<style>
    .password-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: white;
    }
    .password-input__input {
        flex-grow: grow;
    }
    .password-input__image {
        height: 20px;
        padding-right: 5px;
        cursor: pointer;
    }
</style>