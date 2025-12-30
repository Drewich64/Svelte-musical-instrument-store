<script>
    let {text, href, action} = $props();

</script>


<div class="path">
    <div class="container">
        <div class="row" data-sveltekit-reload>
            <a href="{href}" onclick={action}>
                <div class="back-arrow"><span></span></div>
            </a>
            <h2 class="path-text" onclick={action}>
                <a href="{href}">{text}</a>
            </h2>
        </div>
    </div>
</div>


<style>

.path * {
    box-sizing: border-box;
}

.path {
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
.container {
    padding: var(--path-padding, 0 30px);
    margin: 0 auto;
}
.row {
    display: flex;
    align-items: center;
    height: var(--path-height, fit-content);
}
.back-arrow {
    position: relative;
    width: 2vw;
    min-width: 3rem;
    height: 0.3vw;
    min-height: 0.2rem;
    margin: 0 1rem;
    cursor: pointer;
}

.back-arrow span {
    display: block;
    position: absolute;
    width: 100%;
    height: 0.2rem;
    background-color: black;
    top: 50%;
    left: 0%;
    transform: translate(0, -50%);
    border-radius: 0.1rem;
}

.back-arrow::before, .back-arrow::after {
    content: '';
    display: block;
    position: absolute;
    height: 0.1vw;
    min-height: 0.2rem;
    width: 1vw;
    min-width: 1.5rem;
    background-color: black;
    border-radius: 1px;
}

.back-arrow::before {
    top: 50%;
    left: 0;
    transform-origin: 0 50%;
    transform: translate(0.05rem, -50%) rotate(-45deg);
}

.back-arrow::after {
    top: 50%;
    left: 0;
    transform-origin: 0 50%;
    transform: translate(0.05rem, -50%) rotate(45deg);
}

a {
    color: inherit;
    text-decoration: none;
}

a:visited {
    color: inherit;
    text-decoration: none;
}

.path-text {
    font-family: var(--path-ff, Arial, serif);
    font-weight: var(--path-fw, 200);
    font-size: var(--path-fz, 2.5rem);
    cursor: pointer;
}

</style>