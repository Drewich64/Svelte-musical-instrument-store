<script>
    import PasswordInput from "$lib/components/password-input/password_input.svelte";
	import Button from "$lib/components/button/button.svelte";
    import user_login from "$lib/img/user_login.png";
    import "$lib/globalstyles.css";

    let {form} = $props();
</script>


<div class="wrapper">
    <div class="form__container">
        <div class="ibg user-login_pic">
            <img src="{user_login}" alt="user">
        </div>
        <form action="?/register" use:enchance method="POST" class="form" name="signup_form">
            {#if form?.status == 200} 
                <p style="color: green;">Успішно зареєстровано</p>
            {/if}
            <input placeholder="Логін" type="text" class="textinput" name="login" value={form?.errors?.user ?? ""}>
            <PasswordInput name="password"/>
            <input placeholder="Електронна пошта" type="text" class="textinput" name="email" value={form?.errors?.email ?? ""}>
            <input placeholder="Телефон*" type="tel" class="textinput" name="phone" value={form?.errors?.phone ?? ""}>
            {#if form?.errors?.input_data}
                <div class="form-errors">
                    <p>{form.errors.input_data}</p>
                </div>
            {/if}
            {#if form?.errors?.password}
                <div class="form-errors">
                    <ul>
                        <p>Пароль введено неправильно.</p>
                        <p>Перевірте що:</p>
                        <li>Пароль не коротше за 8 символів.</li>
                        <li>Має якнайменше одну велику літеру.</li>
                        <li>Має якнайменше одну малу літеру.</li>
                        <li>Має якнайменше одну цифру.</li>
                        <li>Має якнайменше один спеціальний символ. (@$!%*?&)</li>
                    </ul>
                </div>
            {/if}
            <div class="submin-button__container orangebutton">
                <Button>{#snippet text()}Зареєструватися{/snippet}</Button>
            </div>
        </form>
        <a href="./login" class="register-link">Увійти</a>
    </div>
</div>
<footer class="footer">
    <div class="container footer__container">
        <div class="footer__row">
            <div class="footer__copyright">
                <a href="https://www.flaticon.com/free-icons/man-avatar" title="man avatar icons">Man avatar icons created by Smashicons - Flaticon</a>
            </div>
        </div>
    </div>
</footer>


<style>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0 3rem;
}
.form__container {
    background-color: #f4f4f4;
    padding: 2.5rem;
    width: 50rem;
    max-width: 100%;
    border-radius: 1.2rem;
}
.user-login_pic {
    width: 15rem;
    height: 15rem;
    margin: 0 auto;
}
.form {
    display: flex;
    flex-direction: column;
    padding: 5rem 0;
    gap: 3rem;
    margin: 0 0 2rem 0;
}

.submin-button__container {
    margin: 0 auto;
}

.form-errors {
    color: red;
    font-size: 2rem;
}

.register-link {
}
</style>