<template>
    <br><br>
    <div class="ready-meals container mt-4">
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
                        <button class="meal-info-btn btn btn-info w-100 mt-2" @click="viewMeal(meal)">View More Info</button>
                        <button v-if="meal.stock_quantity > 0" class="meal-add-cart-btn btn btn-primary w-100" @click="$store.commit('addToCart', {...readyMeal, type:'readyMeal'})">Add to Cart</button>
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
            }
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
</style>