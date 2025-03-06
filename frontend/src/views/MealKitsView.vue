<template>
  <div class="meal-kits-container container mt-4">
    <h2 class="text-center">Meal Kits</h2>

    <!-- Filters -->
    <div class="meal-filters row mb-3">
      <div class="col-12 col-md-6 mb-2">
        <select v-model="selectedDiet" class="form-select" @change="fetchMeals">
          <option value="">All Diets</option>
          <option value="Vegan">Vegan</option>
          <option value="gluten-free">Gluten-Free</option>
        </select>
      </div>
      <div class="col-12 col-md-6">
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
    <div class="meals-grid row g-3">
      <div v-for="meal in filteredProducts" :key="meal.meal_kit_id" class="col-12 col-sm-6 col-md-4">
        <div class="card h-100">
          <img :src="meal.image_url" class="meal-image card-img-top" alt="Meal Image">
          <div class="meal-card-body card-body">
            <h5 class="meal-title card-title">{{ meal.meal_kit_name }}</h5>
            <p class="meal-description car-text">{{ meal.meal_description.substring(0, 100) }}...</p>
            <p><strong>Price:</strong> R{{ meal.price }}</p>
            <span v-if="meal.stock_quantity === 0" class="meal-out-stock badge bg-danger">Out of Stock</span>
            <button class="meal-info-btn btn btn-info w-100 mt-2 mb-2" @click="viewMeal(meal)">View More Info</button>
            <button v-if="meal.stock_quantity > 0" class="meal-add-cart-btn btn btn-primary w-100" @click="addToCart(meal, 'mealKit')">Add to Cart</button>
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
            <p><strong>Category:</strong> {{ selectedMeal.category }}</p>
            <p><strong>Cuisine:</strong> {{ selectedMeal.cuisine }}</p>
            <p><strong>Ingredients:</strong> {{ selectedMeal.ingredients }}</p>
            <p><strong>Calorie:</strong> {{ selectedMeal.calories }} kcal</p>
            <p><strong>Dietary Information:</strong> {{ selectedMeal.dietary_info }}</p>
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
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      selectedDiet: "",
      selectedCuisine: "",
      selectedMeal: null,
    };
  },
  methods: {
    // Open meal details modal
    viewMeal(meal) {
      this.selectedMeal = meal;
    },

    // Add selected meal kit to cart
    addToCart(item, type) {
      const cartItem = {
        user_id: this.$store.state.user?.user_id, // Ensure user is logged in
        meal_kit_id: type === "mealKit" ? item.meal_kit_id : null,
        ready_meal_id: type === "readyMeal" ? item.ready_meal_id : null,
        meal_details: item.meal_description || null,
        quantity: 1, // Default quantity is 1
        subtotal: item.subtotal || item.price, // Calculate subtotal
      };

      fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then(() => this.$store.dispatch("getCart")) // Refresh cart
        .catch((err) => console.error("Error adding to cart:", err));
    },

    ...mapActions(["getMealKits"]),
  },
  computed: {
    ...mapState(["user", "mealKits"]),

    // Filter meal kits based on selected diet and cuisine
    filteredProducts() {
      return this.mealKits?.filter(item =>
        (!this.selectedDiet || item.dietary_info.includes(this.selectedDiet)) &&
        (!this.selectedCuisine || item.cuisine.includes(this.selectedCuisine))
      );
    },
  },
  mounted() {
    this.getMealKits();
  }
};
</script>

<style scoped>
.meal-image {
  height: 200px;
  object-fit: cover;
}
.meal-details-modal {
  background: rgba(0, 0, 0, 0.5);
}
.meal-kits-container {
  margin-top: 80px;
  padding-top: 50px;
}
.card {
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
.btn {
  border-radius: 8px;
  padding: 10px 15px;
  font-weight: bold;
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
p {
    display: list-item;
    list-style-type: none;
    margin-left: 20px;
}
</style>
