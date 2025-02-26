<template>
    <div class="ready-meals-container container mt-4">
        <h2 class="text-center">Ready-Made Meals</h2>

        <!-- Filters -->
        <div class="meal-filters row mb-3">
            <div class="diet-filet col-md-4">
                <select v-model="selectedDiet" class="form-select" @change="fetchMeals">
                    <option value="">All Diets</option>
                    <option value="Vegan">Vegan</option>
                    <option value="gluten-free">Gluten-Free</option>
                </select>
            </div>
            <div class="cuisine-filter col-md-4">
                <select v-model="selectedCuisine" class="form-select" @change="fetchMeals">
                    <option value="">All Cuisines</option>
                    <option value="South-African">South African</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Asian">Asian</option>
                    <option value="Italian">Italian</option>
                </select>
            </div>
        </div>

        <!-- Meals Display Grid -->
        <div class="meals-grid row">
            <div v-for="meal in filteredProducts" :key="meal" class="meal-card col-md-4 md-4">
                <div class="card h-100">
                    <img :src="meal.image_url" class="meal-image card-img-top" alt="Meal Image">
                    <div class="meal-card-body card-body">
                        <h5 class="meal-title card-title">{{ meal.meal_name }}</h5>
                        <p class="meal-description car-text">{{ meal.description.substring(0, 100) }}...</p>
                        <p><strong>Price:</strong>R{{ meal.price }}</p>
                        <span v-if="meal.stock_quantity === 0" class="meal-out-stock badge bg-danger">Out of Stock</span>
                        <button class="meal-info-btn btn btn-info w-100 mt-2 mb-2" @click="viewMeal(meal)">View More Info</button>
                        <button v-if="meal.stock_quantity > 0" class="meal-add-cart-btn btn btn-primary w-100" @click="addToCart(meal, 'readyMeal')">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Meal Details Modal -->
        <div v-if="selectedMeal" class="meal-details-modal modal fade show d-block" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ selectedMeal.meal_name }}</h5>
                        <button type="button" class="btn-close" @click="selectedMeal = null"></button>
                    </div>
                    <div class="modal-body">
                        <img :src="selectedMeal.image_url" class="meal-detail-image img-fluid mb-3" alt="Meal Image">
                        <p><strong>Category:</strong>{{ selectedMeal.category }}</p>
                        <p><strong>Cuisine:</strong>{{ selectedMeal.cuisine }}</p>
                        <p><strong>Ingredients:</strong>{{ selectedMeal.ingredients }}</p>
                        <p><strong>Calorie:</strong>{{ selectedMeal.calories }} kcal</p>
                        <p><strong>Dietary Information:</strong>{{ selectedMeal.dietary_info }}</p>
                        <p><strong>Stock:</strong>{{ selectedMeal.stock_quantity }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="meal-close-btn btn btn-secondary" @click="selectedMeal = null">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                meals: [

                ],
                selectedDiet: "",
                selectedCuisine: "",
                selectedMeal: null
            };       
        },
        methods:{
            viewMeal(meal){
                this.selectedMeal = meal
            },
            addToCart(item, type){
                this.$store.dispatch("addToCart",{
                    ...item,
                    type,
                    quantity: 1,
                    subtotal: item.price
                })
            },
        },
        computed:{
            filteredProducts(){
                return this.$store.state.meals?.filter(item=>item.dietary_info.includes(this.selectedDiet) && item.cuisine.includes(this.selectedCuisine))
            }
        },
        mounted(){
            this.$store.dispatch('getReadyMeals')
        }
    };
</script>

<style scoped>
.meal-image{
    height: 200px;
    object-fit: cover;
}
.meal-details-modal{
    background: rgba(0, 0, 0, 0.5);
}
.modal-body p {
  list-style: none;
  display: block;
}
.modal-body p::marker {
  content: none;
  display: none;
}
.meal-card-body p::marker {
  content: none;
  display: none;
}

.meal-card-body p {
  list-style: none;
  display: block;
}
.ready-meals-container {
  margin-top: 80px; /* Adjust based on your navbar height */
  padding-top: 50px; /* Ensures content isn't too close */
}
/* General Page Styling */
body {
    background: linear-gradient(135deg, #FFB703, #8ECAE6);
    font-family: inherit;
    color: #333;
    margin: 0;
    padding: 0;
}

/* Navbar Styling */
.navbar {
    background: #2671BC;
    padding: 10px 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.navbar-brand, .nav-link {
    color: #fff !important;
    font-weight: bold;
}
.nav-link:hover {
    color: #FFB703 !important;
}

/* Card Styling */
.card {
    border: none;
    border-radius: 15px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
}
.card:hover {
    transform: scale(1.03);
}
.card-body {
    background: #FFFFFF;
    border-radius: 0 0 15px 15px;
    padding: 15px;
}
.meal-kit-image, .meal-image {
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

/* Buttons Styling */
.btn {
    border: none;
    border-radius: 8px;
    padding: 10px 15px;
    font-weight: bold;
    transition: all 0.3s ease;
}
.btn-primary {
    background: linear-gradient(135deg, #E97700, #D1470B);
    color: #fff;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
}
.btn-primary:hover {
    background: linear-gradient(135deg, #D1470B, #E97700);
}
.btn-info {
    background: #8ECAE6;
    color: #000;
}
.btn-info:hover {
    background: #2671BC;
    color: #fff;
}

/* Badge Styling */
.badge {
    padding: 5px 10px;
    font-size: 0.9em;
    border-radius: 5px;
}
.bg-danger {
    background: #D1470B !important;
}

/* Modal Styling */
.modal-content {
    border-radius: 10px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}
.modal-header {
    background: #2671BC;
    color: #fff;
    border-radius: 10px 10px 0 0;
}
.modal-footer {
    background: #F8F9FA;
}

/* Filters */
.form-select {
    border-radius: 8px;
    border: 2px solid #2671BC;
}

/* Responsive Fix */
@media (max-width: 768px) {
    .meal-kit-card, .meal-card {
        width: 100%;
    }
}

</style>