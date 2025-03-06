/* eslint-disable */
import { createStore } from "vuex";
import Cookies from "js-cookie";
import router from '../router'
import Vue from 'vue';

export default createStore({
  state: {
    user: Cookies.get("user_token")
      ? JSON.parse(Cookies.get("user_token"))
      : null, 
    mealKits: null,
    meals: null,
    cart: [],
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
    updateCartItemQuantity(state, { cart_id, quantity, subtotal }) {
      const itemIndex = state.cart.findIndex((cartItem) => cartItem.cart_id === cart_id);
      if (itemIndex !== -1) {
        // Directly replacing the item at the index ensures proper reactivity
        state.cart[itemIndex] = { ...state.cart[itemIndex], quantity, subtotal };
      }
    },
    removeCartItem(state, cart_id) {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.cart_id !== cart_id
      );
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

        // Now fetch the cart after setting the user
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
        const response = await fetch("http://localhost:3000/meals"); // Make sure this is the correct URL
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
      if (!userId) return Promise.resolve(); // Return a resolved promise if no user
    
      return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/cart/${userId}`, {
          credentials: "include",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch cart");
            }
            return response.json();
          })
          .then((data) => {
            commit("setCart", data.cart);
            resolve(data.cart); // Resolve with the cart data
          })
          .catch((error) => {
            console.error("Error fetching cart:", error);
            reject(error); // Reject with the error
          });
      });
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
        subtotal: subtotal,
        stock_quantity: stock_quantity,
      };
    
      try {
        // Add the item to the cart on the backend
        let response = await fetch("http://localhost:3000/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(cartItem),
        });
    
        if (!response.ok) throw new Error("Failed to add item to cart");
    
        // Get the updated cart from the backend
        let updatedCart = await response.json();
    
        // Commit the updated cart data to the store
        commit("setCart", updatedCart.cart);
    
        alert("Item added to cart!");
    
        // Redirect to the cart page
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

        if (!response.ok) {
            throw new Error("Failed to remove item from cart");
        }

        const cartResponse = await fetch(`http://localhost:3000/cart/${userId}`, {
            credentials: "include",
        });

        if (!cartResponse.ok) {
            throw new Error("Failed to fetch updated cart");
        }

        const updatedCart = await cartResponse.json();
        commit("setCart", updatedCart.cart);
    } catch (error) {
        console.error("Error removing item from cart:", error);
        alert("Error removing item from cart. Please try again.");
    }
}, 

async updateCart({ commit, state }, { cart_id, quantity, subtotal }) {
  const userId = state.user?.user_id;
  if (!userId) return;

  try {
    const response = await fetch('http://localhost:3000/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart_id, quantity, subtotal }),
    });

    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }

    if (quantity === 0) {
      commit("removeCartItem", cart_id);
    } else {
      commit("updateCartItemQuantity", { cart_id, quantity, subtotal });
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
    alert('Error updating cart item. Please try again.');
  }
  },
    async addDelivery({ commit, state }, { orderId, driverId, trackingNumber }) {
      const userId = state.user?.user_id;
      if (!userId) {
        alert("Please log in to add a delivery.");
        return;
      }

      const delivery = {
        order_id: orderId,
        driver_id: driverId,
        tracking_number: trackingNumber,
        status: "assigned", // default status
      };

      try {
        let response = await fetch("http://localhost:3000/delivery_information", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(delivery),
        });

        if (!response.ok) throw new Error("Failed to add delivery");

        let data = await response.json();
        console.log("Delivery added:", data);
        alert("Delivery added successfully!");
      } catch (error) {
        console.error("Error adding delivery:", error);
        alert("Error adding delivery. Please try again.");
      }
  },
  async updateDeliveryStatus({ commit }, { deliveryId, status }) {
    try {
      const response = await fetch(`http://localhost:3000/delivery_information/${deliveryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update delivery status");

      let data = await response.json();
      console.log("Delivery status updated:", data);
      alert("Delivery status updated successfully!");
    } catch (error) {
      console.error("Error updating delivery status:", error);
      alert("Error updating delivery status. Please try again.");
    }
  },
  async getDeliveries({ commit }, driverId) {
    try {
      let response = await fetch(`http://localhost:3000/delivery_information/deliveries/${driverId}`);
      if (!response.ok) throw new Error("Failed to fetch deliveries");

      let data = await response.json();
      commit("setDeliveries", data.deliveries);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      alert("Error fetching deliveries. Please try again.");
    }
},
  },
  modules: {},
});

