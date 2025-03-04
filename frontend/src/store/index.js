/* eslint-disable */
import { createStore } from "vuex";

export default createStore({
  state: {
    user: null, // Stores the logged-in user
    mealKits: null,
    meals: null,
    cart: [], // Default to an empty array to prevent errors
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload; // Store logged-in user
    },
    setMealKits(state, payload) {
      state.mealKits = payload;
    },
    setMeals(state, payload) {
      state.meals = payload;
    },
    setCart(state, payload) {
      state.cart = payload; // Update entire cart
    },
    addToCart(state, payload) {
      state.cart.push(payload);
    },
    updateCartItemQuantity(state, { cart_id, quantity }) {
      const item = state.cart.find((cartItem) => cartItem.cart_id === cart_id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeCartItem(state, cart_id) {
      state.cart = state.cart.filter((cartItem) => cartItem.cart_id !== cart_id);
    },
  },
  actions: {
    async getMealKits({ commit }) {
      try {
        let { mealKits } = await (await fetch("http://localhost:3000/mealkits/")).json();
        commit("setMealKits", mealKits);
      } catch (error) {
        console.error("Failed to fetch meal kits:", error);
      }
    },
    async getReadyMeals({ commit }) {
      try {
        let { meals } = await (await fetch("http://localhost:3000/meals/")).json();
        commit("setMeals", meals);
      } catch (error) {
        console.error("Failed to fetch ready meals:", error);
      }
    },
    async getCart({ commit, state }) {
      if (!state.user) return; 
      try {
        let response = await fetch(`http://localhost:3000/cart/${state.user.user_id}`);
        let data = await response.json();
        commit("setCart", data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },
    async addToCart({ commit, state }, { meal_kit_id, ready_meal_id, meal_details, price }) {
      if (!state.user) {
        alert("Please log in to add items to your cart.");
        return;
      }

      const cartItem = {
        user_id: state.user.user_id,
        meal_kit_id: meal_kit_id || null,
        ready_meal_id: ready_meal_id || null,
        meal_details: meal_details || null,
        quantity: 1,
        subtotal: price,
      };

      try {
        let response = await fetch("http://localhost:3000/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartItem),
        });

        if (!response.ok) throw new Error("Failed to add item to cart");

        // get updated cart after adding an item
        let updatedCart = await response.json 
        commit("setCart", updatedCart.cart)
        alert("Item added to cart!")
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
    async removeFromCart({ commit }, cart_id) {
      try {
        await fetch(`http://localhost:3000/cart/${cart_id}`, { method: "DELETE" });

        // fetch updated cart after removal
        let response = await fetch(`http://localhost:3000/cart/${state.user.user_id}`)
        let updatedCart = await response.json()
        commit("setCart", updatedCart.cart)
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    },
  },
  modules: {},
});
