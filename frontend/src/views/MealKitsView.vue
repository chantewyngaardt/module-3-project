<template>
  <div class="meal-kits-container container mt-4">
    <h2 class="text-center">Meal Kits</h2>

    <!-- Meal Kits Filters Section -->
    <div class="meal-kits-filters row mb-3">
      <div class="col-12 col-sm-6 mb-2">
        <select v-model="selectedDiet" class="form-select" @change="fetchMealKits">
          <option value="">All Diets</option>
          <option value="Vegan">Vegan</option>
          <option value="gluten-free">Gluten-Free</option>
        </select>
      </div>
      <div class="col-12 col-sm-6">
        <select v-model="selectedCuisine" class="form-select" @change="fetchMealKits">
          <option value="">All Cuisines</option>
          <option value="South African">South African</option>
          <option value="Mexican">Mexican</option>
          <option value="Asian">Asian</option>
          <option value="Italian">Italian</option>
        </select>
      </div>
    </div>

    <!-- Meal Kits Display Grid -->
    <div class="meal-kits-grid row">
      <div v-for="mealKit in filteredProducts" :key="mealKit" class="col-12 col-sm-6 col-md-4 mb-4">
        <div class="card h-100">
          <img :src="mealKit.image_url" class="meal-kit-image card-img-top" alt="Meal Kit Image" />
          <div class="card-body">
            <h5 class="card-title">{{ mealKit.meal_kit_name }}</h5>
            <p class="card-text">{{ mealKit.meal_description.substring(0, 100) }}...</p>
            <p><strong>Price:</strong> R{{ mealKit.price }}</p>
            <span v-if="mealKit.stock_quantity === 0" class="badge bg-danger">Out of Stock</span>
            <button class="btn btn-info w-100 mt-2" @click="viewMealKit(mealKit)">View More Info</button>
            <button v-if="mealKit.stock_quantity > 0" class="btn btn-primary w-100 mt-2" @click="addToCart(mealKit, 'mealKit')">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Meal Kit Details Modal -->
    <div v-if="selectedMealKit" class="meal-kit-details-modal modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedMealKit.meal_kit_name }}</h5>
            <button type="button" class="btn-close" @click="selectedMealKit = null"></button>
          </div>
          <div class="modal-body">
            <img :src="selectedMealKit.image_url" class="img-fluid mb-3" alt="Meal Kit Image" />
            <p><strong>Category:</strong> {{ selectedMealKit.category }}</p>
            <p><strong>Cuisine:</strong> {{ selectedMealKit.cuisine }}</p>
            <p><strong>Ingredients:</strong> {{ selectedMealKit.ingredients }}</p>
            <p><strong>Calories:</strong> {{ selectedMealKit.calories }} kcal</p>
            <p><strong>Dietary Info:</strong> {{ selectedMealKit.dietary_info }}</p>
            <p><strong>Stock:</strong> {{ selectedMealKit.stock_quantity }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="selectedMealKit = null">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDiet: "",
      selectedCuisine: "",
      selectedMealKit: null,
    };
  },
  methods: {
    viewMealKit(mealKit) {
      this.selectedMealKit = mealKit;
    },
    addToCart(item, type) {
      this.$store.dispatch("addToCart", {
        ...item,
        type,
        quantity: 1,
        subtotal: item.price,
      });
    },
  },
  computed: {
    filteredProducts() {
      return this.$store.state.mealKits?.filter(
        (item) =>
          item.dietary_info.includes(this.selectedDiet) &&
          item.cuisine.includes(this.selectedCuisine)
      );
    },
  },
  mounted() {
    this.$store.dispatch("getMealKits");
  },
};
</script>

<style scoped>
.meal-kit-image {
  height: 200px;
  object-fit: cover;
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

.btn {
  border-radius: 8px;
  padding: 10px 15px;
  font-weight: bold;
}

.btn-primary {
  background: linear-gradient(135deg, #e97700, #d1470b);
  color: #fff;
}
.btn-primary:hover {
  background: linear-gradient(135deg, #d1470b, #e97700);
}

@media (max-width: 768px) {
  .meal-kits-filters {
    flex-direction: column;
  }
  .modal-dialog {
    max-width: 90%;
  }
}
</style>