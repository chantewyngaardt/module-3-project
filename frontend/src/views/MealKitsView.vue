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
        :key="mealKit"
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
              @click="addToCart(mealKit.meal_kit_id)"
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
      mealKits: [
  {
    "meal_kit_name": "Grilled Fish with Mielie Rice & Spinach Kit",
    "meal_description": "A light and nutritious South African meal featuring grilled fish, mielie (corn) rice, and sautéed spinach.",
    "price": 85.99,
    "category": "meal-kit",
    "cuisine": "South African",
    "ingredients": "Hake fillet, mielie rice (corn-infused rice), fresh spinach, onions, garlic, lemon, olive oil, salt, pepper, paprika",
    "calories": 650,
    "dietary_info": "Halal-certified; gluten-free",
    "image_url": "https://www.healthyfood.com/wp-content/uploads/2016/09/Grilled-fish-and-vege-rice-1024x660.jpg",
    "stock_quantity": 30,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Bobotie Kit",
    "meal_description": "A traditional South African dish made with spiced minced meat and a creamy egg-based topping, served with yellow rice and chutney.",
    "price": 149.99,
    "category": "meal-kit",
    "cuisine": "South African",
    "ingredients": "Minced beef, onions, garlic, curry powder, turmeric, bay leaves, bread, milk, eggs, apricot jam, vinegar, raisins, yellow rice, chutney",
    "calories": 650,
    "dietary_info": "Contains dairy, eggs, gluten; halal-certified",
    "image_url": "https://foodieonboard.com/wp-content/uploads/2014/11/dsc_6572.jpg",
    "stock_quantity": 25,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Bunny Chow Kit",
    "meal_description": "A Durban classic! This kit includes all the ingredients needed to make an authentic Bunny Chow—a hollowed-out bread loaf filled with rich, spicy curry.",
    "price": 129.99,
    "category": "meal-kit",
    "cuisine": "South African",
    "ingredients": "White bread loaf, lamb, onions, tomatoes, garlic, ginger, curry powder, chili, bay leaves, potatoes, fresh coriander",
    "calories": 720,
    "dietary_info": "Contains gluten; halal-certified",
    "image_url": "https://lh3.googleusercontent.com/5P0YABUfVTsSB_b4Uw4UX90LB0HqB5JmDnpL8PyYKMr2sNeiCRxHWkk3kbizdKPEQXmYRxkvND_gK2DEpRUyZBs=s1500-pp",
    "stock_quantity": 30,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Umngqusho Kit",
    "meal_description": "A hearty South African dish made with slow-cooked samp and beans, served with a flavorful beef stew.",
    "price": 199.99,
    "category": "meal-kit",
    "cuisine": "South African",
    "ingredients": "Samp, sugar beans, halal beef, onions, tomatoes, garlic, ginger, bay leaves, salt, pepper, vegetable stock",
    "calories": 650,
    "dietary_info": "Halal-certified; contains legumes",
    "image_url": "https://www.thesouthafrican.com/wp-content/uploads/2020/07/087f68fa-umgquasho-samp-and-beans-with-lamb-and-chakalaka.jpg",
    "stock_quantity": 30,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Chakalaka & Pap Kit",
    "meal_description": "A South African favorite! This kit includes everything needed to prepare a hearty meal of spicy vegetable chakalaka and soft maize pap.",
    "price": 89.99,
    "category": "meal-kit",
    "cuisine": "South African",
    "ingredients": "Maize meal, onions, tomatoes, carrots, baked beans, bell peppers, garlic, curry powder, chili, salt, vegetable stock",
    "calories": 550,
    "dietary_info": "Vegan; gluten-free",
    "image_url": "https://www.kitchenfrau.com/wp-content/uploads/2021/06/IMG_1058es.jpg",
    "stock_quantity": 40,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Potjiekos Kit",
    "meal_description": "A classic slow-cooked South African stew made with tender beef, vegetables, and rich flavors.",
    "price": 99.99,
    "category": "meal-kit",
    "cuisine": "South African",
    "ingredients": "Beef, potatoes, carrots, onions, mielies, tomatoes, garlic, beef stock, bay leaves, curry powder, salt, pepper, rice",
    "calories": 750,
    "dietary_info": "Halal-certified; contains gluten",
    "image_url": "https://afternoonexpress.co.za/website/admin/UserFiles/Image/2023/Bredie.jpg",
    "stock_quantity": 35,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Vetkoek with Mince",
    "meal_description": "A delicious South African classic! This kit includes everything needed to make crispy, golden vetkoek filled with savory mince.",
    "price": 94.99,
    "category": "meal-kit",
    "cuisine": "South African",
    "ingredients": "Flour, yeast, sugar, salt, cooking oil, halal beef mince, onions, tomatoes, garlic, spices",
    "calories": 680,
    "dietary_info": "Halal-certified; contains gluten",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGCQvEDbe1bYwCR3e3LoiJEi7xLnacjIPE8A&s",
    "stock_quantity": 40,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Grilled Boerewors & Veggies with Brown Rice Kit",
    "meal_description": "A hearty and flavorful South African meal featuring grilled halal boerewors, roasted vegetables, and wholesome brown rice.",
    "price": 79.99,
    "category": "meal-kit",
    "cuisine": "South African",
    "ingredients": "Boerewors, brown rice, bell peppers, zucchini, carrots, onions, garlic, olive oil, salt, pepper, paprika",
    "calories": 720,
    "dietary_info": "Halal-certified; gluten-free",
    "image_url": "https://taste.co.za/wp-content/uploads/2024/11/Boerewors-traybake.jpg",
    "stock_quantity": 35,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Taco Kit",
    "meal_description": "Make your own tacos with a mix of soft and hard shells, spiced beef, and fresh toppings.",
    "price": 99.99,
    "category": "meal-kit",
    "cuisine": "Mexican",
    "ingredients": "Soft tortillas, hard taco shells, ground beef, taco seasoning, lettuce, tomatoes, cheese, sour cream, salsa",
    "calories": 650,
    "dietary_info": "Contains dairy, gluten; halal-certified",
    "image_url": "https://thebakermama.com/wp-content/uploads/2022/03/IMG_0389-scaled.jpg",
    "stock_quantity": 30,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Enchilada Kit",
    "meal_description": "Corn tortillas filled with seasoned chicken and covered in a flavorful enchilada sauce.",
    "price": 109.99,
    "category": "meal-kit",
    "cuisine": "Mexican",
    "ingredients": "Corn tortillas, shredded chicken, enchilada sauce, cheese, sour cream, cumin, chili powder",
    "calories": 700,
    "dietary_info": "Contains dairy; halal-certified",
    "image_url": "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2024-05-mexican-enchiladas%2Fmexican-enchiladas-435",
    "stock_quantity": 30,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Quesadilla Kit",
    "meal_description": "A crispy, cheesy quesadilla with steak and fresh toppings.",
    "price": 94.99,
    "category": "meal-kit",
    "cuisine": "Mexican",
    "ingredients": "Flour tortillas, cheese, grilled steak, onions, bell peppers, sour cream, salsa",
    "calories": 680,
    "dietary_info": "Contains dairy, gluten; halal-certified",
    "image_url": "https://cdn.loveandlemons.com/wp-content/uploads/2024/01/quesadilla-500x500.jpg",
    "stock_quantity": 35,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Fajita Kit",
    "meal_description": "Sizzling marinated steak fajitas with bell peppers and onions, served with warm tortillas.",
    "price": 109.99,
    "category": "meal-kit",
    "cuisine": "Mexican",
    "ingredients": "Flour tortillas, marinated steak, bell peppers, onions, fajita seasoning, sour cream, salsa",
    "calories": 730,
    "dietary_info": "Contains dairy, gluten; halal-certified",
    "image_url": "https://theyummybowl.com/wp-content/uploads/TYB-FEATURED-1.jpg",
    "stock_quantity": 30,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Burrito Bowl Kit",
    "meal_description": "A simple and filling burrito bowl with rice, beans, and chicken.",
    "price": 94.99,
    "category": "meal-kit",
    "cuisine": "Mexican",
    "ingredients": "Rice, black beans, grilled chicken or beef, salsa, cheese",
    "calories": 700,
    "dietary_info": "Contains dairy; gluten-free",
    "image_url": "https://feelgoodfoodie.net/wp-content/uploads/2023/09/Chicken-Burrito-Bowl-TIMG.jpg",
    "stock_quantity": 35,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Salsa & Guacamole Snack Kit",
    "meal_description": "Fresh homemade salsa and guacamole served with crispy tortilla chips.",
    "price": 74.99,
    "category": "meal-kit",
    "cuisine": "Mexican",
    "ingredients": "Tomatoes, avocados, lime, garlic, onions, tortilla chips, cilantro",
    "calories": 450,
    "dietary_info": "Vegan; gluten-free",
    "image_url": "https://www.thedailymeal.com/img/gallery/roasted-garlic-guacamole-with-homemade-air-fryer-tortilla-chips/guac-chips.jpg",
    "stock_quantity": 50,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Chiles Rellenos Kit",
    "meal_description": "Stuffed poblano peppers with cheese, served with a rich tomato sauce.",
    "price": 89.99,
    "category": "meal-kit",
    "cuisine": "Mexican",
    "ingredients": "Poblano peppers, cheese, tomato sauce, garlic, onions, flour",
    "calories": 580,
    "dietary_info": "Vegetarian; contains gluten and dairy",
    "image_url": "https://www.chilipeppermadness.com/wp-content/uploads/2024/09/Chiles-Rellenos-Recipe-SQ.jpg",
    "stock_quantity": 30,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Tamale Kit",
    "meal_description": "Easy-to-make tamales with corn masa and a simple meat filling.",
    "price": 94.99,
    "category": "meal-kit",
    "cuisine": "Mexican",
    "ingredients": "Corn masa, chicken, corn husks, chili sauce",
    "calories": 590,
    "dietary_info": "Gluten-free",
    "image_url": "https://temeculablogs.com/wp-content/uploads/2023/03/how-to-make-red-tamales.jpeg",
    "stock_quantity": 30,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Ramen Kit",
    "meal_description": "Enjoy a comforting bowl of ramen with fresh noodles, miso broth, and classic toppings.",
    "price": 99.99,
    "category": "meal-kit",
    "cuisine": "Asian",
    "ingredients": "Fresh ramen noodles, miso paste, soy sauce, spring onions, nori, boiled egg, sesame seeds",
    "calories": 550,
    "dietary_info": "Contains gluten; halal-certified",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIh00BItzuOQQi-CYYGXL_LbY-nwbV9h0Fpg&s",
    "stock_quantity": 30,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Stir-Fry Kit",
    "meal_description": "A quick and delicious stir-fry with chicken, fresh veggies, and soy sauce.",
    "price": 99.99,
    "category": "meal-kit",
    "cuisine": "Asian",
    "ingredients": "Chicken, bell peppers, carrots, broccoli, garlic, soy sauce, rice/noodles",
    "calories": 600,
    "dietary_info": "Contains gluten, halal-certified",
    "image_url": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/pork-noodle-stir-fry-3cb19c3.jpg",
    "stock_quantity": 35,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Dumpling Kit",
    "meal_description": "Handmade dumplings with a vegetable filling, served with a dipping sauce.",
    "price": 109.99,
    "category": "meal-kit",
    "cuisine": "Asian",
    "ingredients": "Dumpling wrappers, veggies, ginger, soy sauce, sesame oil, garlic",
    "calories": 580,
    "dietary_info": "Contains gluten; halal-certified",
    "image_url": "https://images.squarespace-cdn.com/content/v1/55be995de4b071c106b3b4c0/6af0cbeb-8a58-4993-ab68-8e9919d6d04c/Salmon+Dumplings-6.jpg",
    "stock_quantity": 30,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Teriyaki Chicken Kit",
    "meal_description": "Marinated teriyaki chicken stir-fried with fresh veggies and served with rice.",
    "price": 109.99,
    "category": "meal-kit",
    "cuisine": "Asian",
    "ingredients": "Halal chicken, soy sauce, honey, garlic, ginger, sesame seeds, rice",
    "calories": 720,
    "dietary_info": "Contains gluten; halal-certified",
    "image_url": "https://www.thereciperebel.com/wp-content/uploads/2021/09/teriyaki-chicken-www.thereciperebel.com-1200-6-of-31.jpg",
    "stock_quantity": 30,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Bao Bun Kit",
    "meal_description": "Soft and fluffy bao buns filled with tender marinated beef.",
    "price": 99.99,
    "category": "meal-kit",
    "cuisine": "Asian",
    "ingredients": "Bao buns, halal beef, hoisin sauce, pickled cucumbers",
    "calories": 680,
    "dietary_info": "Halal-certified; contains gluten",
    "image_url": "https://eatlittlebird.com/wp-content/uploads/2022/09/korean-fried-chicken-bao-buns-5-225x225.jpg",
    "stock_quantity": 25,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Homemade Pizza Kit",
    "meal_description": "Make your own delicious pizza at home with a fresh dough base, tomato sauce, and mozzarella cheese.",
    "price": 119.99,
    "category": "meal-kit",
    "cuisine": "Italian",
    "ingredients": "Pizza dough mix, tomato sauce, mozzarella cheese, dried oregano",
    "calories": 750,
    "dietary_info": "Contains gluten, dairy",
    "image_url": "https://prettysimplesweet.com/wp-content/uploads/2015/12/classic_margherita_pizza.jpg",
    "stock_quantity": 40,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Lasagna Kit",
    "meal_description": "A rich and hearty lasagna with layers of pasta, tomato sauce, minced beef, and creamy cheese.",
    "price": 139.99,
    "category": "meal-kit",
    "cuisine": "Italian",
    "ingredients": "Lasagna sheets, tomato sauce, minced beef, mozzarella cheese, onion, garlic, béchamel sauce",
    "calories": 820,
    "dietary_info": "Contains gluten, dairy",
    "image_url": "https://static01.nyt.com/images/2023/08/31/multimedia/RS-Lasagna-hkjl/RS-Lasagna-hkjl-googleFourByThree-v2.jpg",
    "stock_quantity": 35,
    "created_at": "CURRENT_TIMESTAMP"
  },
  {
    "meal_kit_name": "Gnocchi Kit",
    "meal_description": "Soft potato gnocchi served with a light tomato sauce.",
    "price": 109.99,
    "category": "meal-kit",
    "cuisine": "Italian",
    "ingredients": "Potato gnocchi, parmesan cheese, garlic, olive oil, tomato sauce",
    "calories": 650,
    "dietary_info": "Vegetarian; contains gluten, dairy",
    "image_url": "https://cookinglsl.com/wp-content/uploads/2021/04/creamy-gnocchi-2.jpg",
    "stock_quantity": 30,
    "created_at": "CURRENT_TIMESTAMP"
  }
],
      selectedDiet: "",
      selectedCuisine: "",
      selectedMealKit: null,
    };
  },
  methods: {
    viewMealKit(mealKit){
      this.selectedMealKit = mealKit
      console.log('Selected Meal Kit:', this.selectedMealKit)
    }
  },
  computed:{
    filteredProducts(){
      return this.$store.state.mealKits.filter(item=>item.dietary_info.includes(this.selectedDiet) && item.cuisine.includes(this.selectedCuisine) )
    }
  },
  mounted(){
    this.$store.dispatch('getData')
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
