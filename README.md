# 🍽️ READY RECIPES MEAL KIT E-COMMERCE
A Vue.js & Node.js-powered meal kit and ready-meal e-commerce platform that allows customers to purchase pre-measured ingredients with step-by-step recipes or ready-to-eat meals. Users can customize ingredients based on dietary needs such as gluten-free, keto, or high-protein preferences. Sustainability is a key focus, with locally sourced ingredients. Future expansion plans include corporate meal plans and partnerships with wellness retreats and hotels.

## 🚀 TECHNOLOGIES USED
### Backend
1. Node.js (Express.js)
2. MySQL Database
3. bcryptjs (for password hashing)
4. cors (Cross-Origin Resource Sharing)
5. dotenv (for environment variables)
### Frontend
1. Vue.js (Progressive JavaScript framework)
2. Vuex (State management)
3. Vue Router (Frontend routing)
4. Bootstrap (UI styling)
5. js-cookie (Cookie management)
## ✨ FEATURES
1. User Authentication (Login, Register, Logout)
2. Browse and Search Meal Kits & Ready Meals
3. Add to Cart (Syncs with Backend)
4. Update Cart (Quantity Adjustments, Remove Items)
5. Checkout & Order Placement
6. One-Time Purchase Options
7. Dietary Customization (Gluten-Free)
8. Stock Availability
9. Admin Panel for Managing Products & Orders
10. Locally Sourced Ingredient Focus
## 🖼️ SCREENSHOTS
📌 Add meal kit screenshots in the screenshots/ folder and reference them here.

## 🛠️ HOW TO SET UP & RUN
### 🖥️ Backend Setup
#### Navigate to the backend directory:
cd backend

##### Install dependencies:
npm install express cors mysql2 bcryptjs dotenv
Create a .env file in the backend directory and set up your database credentials:
HOST=localhost
USERNAME=your_mysql_username  # Use USER if on Windows
PASSWORD=your_mysql_password
DATABASE=ready_recipes
PORT=3308  # Use 3306 for Windows

##### Run the backend:
node --watch index.js

### 🌍 Frontend Setup
Navigate to the frontend directory:
cd frontend

##### Install dependencies:
npm install bootstrap core-js js-cookie vue vue-router vuex

##### Run the frontend:
npm run serve

## 📂 FILE STRUCTURE
### Backend
1. config/config.js - Database configuration
2. controller/ - Backend controllers (e.g., authController.js, cartController.js)
3. model/ - Database models (e.g., authModel.js, cartModel.js)
4. routes/ - Express routes (e.g., authRouter.js, cartRouter.js)
5. .env - Environment variables
6. index.js - Main backend entry point

### Frontend
1. public/ - Static assets (e.g., index.html)
2. src/ - Vue.js components and views
3. components/ - Reusable Vue components (e.g., CheckoutComp.vue, MealKitComp.vue)
4. router/ - Vue Router configuration
5. store/ - Vuex state management
6. views/ - Page views (e.g., HomeView.vue, CartView.vue)

## ❤️ Authors
1. Bukho Sean Ntlabathi
2. Chanté Wyngaardt
3. Rafiek Booysen
4. Yandile Matyityilili
