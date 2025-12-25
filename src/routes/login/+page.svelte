<script>
	import Button from "$lib/components/button/button.svelte";
    import PasswordInput from "$lib/components/password-input/password_input.svelte";
    import user_login from "$lib/img/user_login.png";
    import "$lib/globalstyles.css";
    import { user } from "$lib/store.svelte";

    let { form } = $props();
</script>


<div class="wrapper">
    <div class="form__container">

        <div class="ibg user-login_pic">
            <img src="{user_login}" alt="user">
        </div>
        <form action="?/login" method="POST" class="form" name="login_form" use:enchance bind:this={form}>
            <input placeholder="Логін" type="text" class="textinput" name="login" value={form?.errors?.user ?? ""}>
            <PasswordInput name="password" value={form?.errors?.password ?? ""}/>
            <div class="submin-button__container orangebutton">
                <Button action={() => {form.submit()}}>{#snippet text()}Увійти{/snippet}</Button>
            </div>
        </form>
        <a href="./sign-up" class="register-link">Зареєструватися</a>
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
.register-link {
}
</style>