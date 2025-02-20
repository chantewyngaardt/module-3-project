<template>
    <br><br><br>
    <h4>Whatever you're craving, we've got you covered</h4>
    <br><br>

    <div class="d-flex justify-content-between gap-3">
        <!-- Card 1 -->
        <div class="card">
            <img src="../assets/Beef-stew-dombolo.jpg" class="card-img-top" alt="Meal">
            <div class="card-body">
                <h5 class="card-title">Beef Stew & Dombolo</h5>
                <p class="card-text">A rich and hearty beef stew with traditional dumplings.</p>
            </div>
        </div>

        <!-- Card 2 -->
        <div class="card">
            <img src="../assets/coconut-chicken-curry-1-10.jpg" class="card-img-top" alt="Meal">
            <div class="card-body">
                <h5 class="card-title">Coconut Chicken Curry</h5>
                <p class="card-text">A creamy coconut curry with tender chicken pieces.</p>
            </div>
        </div>

        <!-- Card 3 -->
        <div class="card">
            <img src="../assets/Indian-Curry-Chicken-Recipe-1200-EatSimpleFood.com_.jpg" class="card-img-top"
                alt="Meal">
            <div class="card-body">
                <h5 class="card-title">Indian Curry Chicken</h5>
                <p class="card-text">A flavorful Indian-style chicken curry with rich spices.</p>
            </div>
        </div>

        <!-- Card 4 -->
        <div class="card">
            <img src="../assets/oxtail.png" class="card-img-top" alt="Meal">
            <div class="card-body">
                <h5 class="card-title">Slow Cooked Oxtail</h5>
                <p class="card-text">Tender and juicy oxtail slow-cooked to perfection.</p>
            </div>
        </div>

        <!-- Card 5 -->
        <div class="card">
            <img src="../assets/Goldi-ChickenLiversInSauceWithPap-scaled.jpg" class="card-img-top" alt="Meal">
            <div class="card-body">
                <h5 class="card-title">Chicken Livers & Pap</h5>
                <p class="card-text">Delicious chicken livers cooked in a savory sauce.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 18rem;
    /* Fixed width for cards to keep them uniform */
}

.d-flex {
    display: flex;
    justify-content: space-between;
    /* Space between cards */
    flex-wrap: wrap;
    /* Wraps cards when there's not enough space */
}

.gap-3 {
    gap: 1rem;
    /* Adds space between cards */
}
</style>