/* eslint-disable */
import { createStore } from "vuex";
import Cookies from "js-cookie";
import router from "../router";

export default createStore({
  state: {
    user: Cookies.get("user_token")
      ? JSON.parse(Cookies.get("user_token"))
      : null,
    mealKits: null,
    meals: null,
    cart: [],
    deliveryInformation: null,
    card_details: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      if (payload) {
        Cookies.set("user_token", JSON.stringify(payload), { expires: 7 });
      } else {
        Cookies.remove("user_token");
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
    setDeliveryInformation(state, payload) {
      state.deliveryInformation = payload;
    },
    setCardDetails(state, payload) {
      state.card_details = payload;
    },
    SET_CART_ITEMS(state, items) {
      state.cart = items;
    },
    addToCart(state, payload) {
      state.cart.push(payload);
    },
    updateCartItemQuantity(state, { cart_id, quantity, subtotal }) {
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.cart_id === cart_id
      );
      if (itemIndex !== -1) {
        state.cart[itemIndex] = {
          ...state.cart[itemIndex],
          quantity,
          subtotal,
        };
      }
    },
    removeCartItem(state, cart_id) {
      state.cart = state.cart.filter((cartItem) => cartItem.cart_id !== cart_id);
    },
  },
  actions: {
    async fetchUser({ commit, dispatch }) {
      const userToken = Cookies.get("user_token");
      if (!userToken) return;

      try {
        const response = await fetch("http://localhost:3000/auth/user", {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        commit("setUser", data.user);
        dispatch("getCart");
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    },
    async postDeliveryInformation({ commit }, deliveryData) {
      try {
        const response = await fetch("http://localhost:3000/delivery_information_checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(deliveryData),
        });

        if (!response.ok) throw new Error("Failed to save delivery info");

        const data = await response.json();
        commit("setDeliveryInformation", data);
        return data;
      } catch (error) {
        console.error("Error posting delivery information:", error);
        throw error;
      }
    },
    async postCardDetails({ commit }, cardData) {
      try {
        const response = await fetch("http://localhost:3000/card_details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cardData),
        });

        if (!response.ok) throw new Error("Failed to save card details");

        const data = await response.json();
        commit("setCardDetails", data);
        return data;
      } catch (error) {
        console.error("Error posting card details:", error);
        throw error;
      }
    },
    async fetchCartItems({ commit }, userId) {
      try {
        const response = await fetch(`http://localhost:3000/cart?user_id=${userId}`);
        const data = await response.json();
        commit("SET_CART_ITEMS", data);
        return data;
      } catch (error) {
        console.error("Error fetching cart items:", error);
        throw error;
      }
    },
    async logout({ commit }) {
      commit("setUser", null);
      commit("setCart", []);
      Cookies.remove("user_token");
    },
    async getMealKits({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/mealkits/");
        const data = await response.json();

        if (data.mealKits) {
          commit("setMealKits", data.mealKits);
        } else {
          console.error("Meal Kits data is missing in the response");
        }
      } catch (error) {
        console.error("Failed to fetch meal kits:", error);
      }
    },
    async getReadyMeals({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/meals");
        const data = await response.json();

        if (data.meals) {
          commit("setMeals", data.meals);
        } else {
          console.error("Ready Meals data is missing in the response");
        }
      } catch (error) {
        console.error("Failed to fetch ready meals:", error);
      }
    },
    async getCart({ commit, state }) {
      const userId = state.user?.user_id;
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:3000/cart/${userId}`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch cart");

        const data = await response.json();
        commit("setCart", data.cart);
        return data.cart;
      } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
      }
    },
    async addToCart(
      { commit, state },
      { meal_kit_id, ready_meal_id, meal_details, subtotal, stock_quantity }
    ) {
      const userId = state.user?.user_id;
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
        subtotal,
        stock_quantity,
      };

      try {
        const response = await fetch("http://localhost:3000/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(cartItem),
        });

        if (!response.ok) throw new Error("Failed to add item to cart");

        const updatedCart = await response.json();
        commit("setCart", updatedCart.cart);
        alert("Item added to cart!");
        router.push("/cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Error adding to cart. Please try again.");
      }
    },
    async removeFromCart({ commit, state }, cart_id) {
      const userId = state.user?.user_id;
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:3000/cart/${cart_id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to remove item from cart");

        commit("removeCartItem", cart_id);
      } catch (error) {
        console.error("Error removing item from cart:", error);
        alert("Error removing item from cart. Please try again.");
      }
    },
    async updateCart({ commit, state }, { cart_id, quantity, subtotal }) {
      const userId = state.user?.user_id;
      if (!userId) return;

      try {
        const response = await fetch("http://localhost:3000/cart", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart_id, quantity, subtotal }),
        });

        if (!response.ok) throw new Error("Failed to update cart item");

        commit("updateCartItemQuantity", { cart_id, quantity, subtotal });
      } catch (error) {
        console.error("Error updating cart item:", error);
        alert("Error updating cart item. Please try again.");
      }
    },
  },
  modules: {},
});
