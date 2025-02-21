<template>
  <div class="meal-kits-container container mt-4">
    <h2 class="text-center">Meal Kits</h2>

    <!-- Meal Kits Filters Section -->
    <div class="meal-kits-filters row mb-3">
      <div class="diet-filter col-md-4">
        <select
          v-model="selectedDiet"
          class="form-select"
          @change="fetchMealKits"
        >
          <option value="">All Diets</option>
          <option value="Vegan">Vegan</option>
          <option value="gluten-free">Gluten-Free</option>
        </select>
      </div>

      <div class="cuisine-filter col-md-4">
        <select
          v-model="selectedCuisine"
          class="form-select"
          @change="fetchMealKits"
        >
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
      <div
        v-for="mealKit in filteredProducts"
        :key="mealKit.meal_kit_id"
        class="meal-kit-card col-md-4 mb-4"
      >
        <div class="card h-100">
          <img
            :src="mealKit.image_url"
            class="meal-kit-image card-img-top"
            alt="Meal Kit Image"
          />
          <div class="meal-kit-card-body card-body">
            <h5 class="meal-kit-title card-title">
              {{ mealKit.meal_kit_name }}
            </h5>
            <p class="meal-kit-description card-text">
              {{ mealKit.meal_description.substring(0, 100) }}...
            </p>
            <p><strong>Price:</strong> R{{ mealKit.price }}</p>
            <span
              v-if="mealKit.stock_quantity === 0"
              class="meal-kit-out-stock badge bg-danger"
              >Out of Stock</span
            >
            <button
              class="meal-kit-info-btn btn btn-info w-100 mt-2"
              @click="viewMealKit(mealKit)"
            >
              View More Info
            </button>
            <button
              v-if="mealKit.stock_quantity > 0"
              class="meal-kit-add-cart-btn btn btn-primary w-100"
              @click="$store.commit('addToCart', {...readyMeal, type:'readyMeal'})"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Meal Kit Details Modal -->
    <div
      v-if="selectedMealKit"
      class="meal-kit-details-modal modal fade show d-block"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedMealKit.meal_kit_name }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="selectedMealKit = null"
            ></button>
          </div>
          <div class="modal-body">
            <img
              :src="selectedMealKit.image_url"
              class="meal-kit-detail-image img-fluid mb-3"
              alt="Meal Kit Image"
            />
            <p><strong>Category:</strong> {{ selectedMealKit.category }}</p>
            <p><strong>Cuisine:</strong> {{ selectedMealKit.cuisine }}</p>
            <p>
              <strong>Ingredients:</strong> {{ selectedMealKit.ingredients }}
            </p>
            <p>
              <strong>Calories:</strong> {{ selectedMealKit.calories }} kcal
            </p>
            <p>
              <strong>Dietary Info:</strong> {{ selectedMealKit.dietary_info }}
            </p>
            <p><strong>Stock:</strong> {{ selectedMealKit.stock_quantity }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="meal-kit-close-btn btn btn-secondary"
              @click="selectedMealKit = null"
            >
              Close
            </button>
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
    viewMealKit(mealKit){
      this.selectedMealKit = mealKit
    }
  },
  computed:{
    filteredProducts(){
      return this.$store.state.mealKits?.filter(item=>item.dietary_info.includes(this.selectedDiet) && item.cuisine.includes(this.selectedCuisine) )
    }
  },
  mounted(){
    this.$store.dispatch('getMealKits')
  },
};
</script>

<style scoped>
.meal-kit-image {
  height: 200px;
  object-fit: cover;
}
.meal-kit-details-modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
