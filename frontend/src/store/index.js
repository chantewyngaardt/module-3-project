/* eslint-disable */
import { createStore } from "vuex";
import Cookies from "js-cookie";

export default createStore({
  state: {
    user: Cookies.get("user_token") ? JSON.parse(Cookies.get("user_token")) : null, // Load user from cookies
    mealKits: null,
    meals: null,
    cart: [], // Default to empty array
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      if (payload) {
        Cookies.set("user_token", JSON.stringify(payload), { expires: 7 }); // Store user in cookies for 7 days
      } else {
        Cookies.remove("user_token"); // Remove user cookie on logout
      }
    },
    setMealKits(state, payload) {
      state.mealKits = payload;
    },
    setMeals(state, payload) {
      state.meals = payload;
    },
    setCart(state, payload) {
      state.cart = payload;
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
    async fetchUser({ commit, dispatch }) {
      const userToken = Cookies.get("user_token"); // Get token from cookies
      if (!userToken) return;
  
      try {
          // Fetch user data from backend
          const response = await fetch("http://localhost:3000/auth/user", {
              credentials: "include",
          });
  
          if (!response.ok) throw new Error("Failed to fetch user");
  
          const data = await response.json();
          commit("setUser", data.user); // ✅ Set user in store
  
          // ✅ Now fetch the cart **after** setting the user
          dispatch("getCart");
  
      } catch (error) {
          console.error("Failed to fetch user:", error);
      }
  },
  
    async logout({ commit }) {
      commit("setUser", null); // Clear user from state
      commit("setCart", []); // Clear cart
      Cookies.remove("user_token"); // Remove token cookie
      Cookies.remove("user_id"); // Remove user ID cookie (if used)
    },

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

    async getCart({ commit }) {
      const userId = Cookies.get("user_id");
      if (!userId) return;

      try {
        let response = await fetch(`http://localhost:3000/cart/${userId}`, {
          credentials: "include",
        });
        let data = await response.json();
        commit("setCart", data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },

    async addToCart({ commit, state }, { meal_kit_id, ready_meal_id, meal_details, price }) {
      const userId = Cookies.get("user_id");
      if (!userId) {
        alert("Please log in to add items to your cart.");
        return;
      }

      const cartItem = {
        user_id: userId,
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
          credentials: "include",
          body: JSON.stringify(cartItem),
        });

        if (!response.ok) throw new Error("Failed to add item to cart");

        let updatedCart = await response.json();
        commit("setCart", updatedCart.cart);
        alert("Item added to cart!");
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },

    async removeFromCart({ commit, state }, cart_id) {
      const userId = Cookies.get("user_id");
      if (!userId) return;

      try {
        await fetch(`http://localhost:3000/cart/${cart_id}`, {
          method: "DELETE",
          credentials: "include",
        });

        let response = await fetch(`http://localhost:3000/cart/${userId}`, {
          credentials: "include",
        });
        let updatedCart = await response.json();
        commit("setCart", updatedCart.cart);
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    },
  },
  modules: {},
});
