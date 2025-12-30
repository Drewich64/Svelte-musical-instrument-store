<script>
    import error_img from "$lib/img/error.png";
</script>

<div class="wrapper">
    <h2 class="message">Упс, помилочка...</h2>
    <div class="image__container">
        <img src={error_img} alt="" class="image">
    </div>
</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
.message {
    font-size: 7rem;
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
    font-weight: 200;
}
.image__container {
    width: min(30vw, 30vh);
    height: min(30vw, 30vh);
    position: relative;
}
.image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: contain;
}
</style>


