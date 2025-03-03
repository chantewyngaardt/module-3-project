<template><br><br>
    <section class="promotion">
        <h9>Get our deals at a very afforable price</h9>
    </section>
    <br><br>
    <section>
        <div class="d-flex justify-content-between align-items-start">
            <img src="../assets/oxtail.png" class="rounded" alt="Meal" style="width: 30%; height: auto;">

            <div class="promotion-text">
                <h2>Ready Recipes</h2>
                <p>Get 30% off your first Meal Kit order with doe</p>
                <p>#WELCOME TO READY RECIPES</p>
                <button class="btn" @click="$router.push('/ready-made-meals')">LETS BEGIN</button>
            </div>

            <img src="../assets/oxtail.png" class="rounded" alt="Meal" style="width: 30%; height: auto;">
        </div>
    </section>  
</template>

<style scoped>
.d-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.promotion-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.promotion-text p {
    margin: 10px 0;
    /* Adds space between <p> tags */
}

.promotion {
    background-color: black;
    color: white;
    padding: 40px 0;
    /* Increases the top and bottom padding for more space */
    height: 100px;
    /* Sets a fixed height for the section */
    text-align: center;
    /* Centers the text */
}

.btn {
    background-color: black;
    color: white;
}
</style>
