Ready Recipes Meal Kit E-commerce
Project Description
Our business operates under a Business-to-Consumer (B2C) model, offering a platform for subscription-based and one-time purchases of fresh, pre-measured ingredients with step-by-step recipes for home-cooked meals. We also provide ready-to-eat meal options. Customers can customize ingredients based on dietary needs such as gluten-free, keto, or high-protein preferences. Sustainability is a key focus, with locally sourced ingredients. Future expansion will include corporate meal plans and partnerships with wellness retreats and hotels.

Technologies Used
Backend: Node.js, Express, MySQL, bcryptjs, cors, dotenv
Frontend: Vue.js, Vuex, Vue Router, Bootstrap

Modules Installed
Frontend
bootstrap: UI framework
core-js, js-cookie, vue, vue-router, vuex

Backend
express, cors, mysql2, bcryptjs, dotenv

Setup Instructions
Backend:
Navigate to the backend directory:
cd backend

Install dependencies:
npm install express cors mysql2 bcryptjs dotenv

Set up the .env file with your database credentials:
HOST: localhost
USERNAME: Your MySQL username (use USER if on Windows)
PASSWORD: Your MySQL password
DATABASE: ready_recipes
PORT: 3308 for macOS, 3306 for Windows

Run the backend:
node --watch index.js

Frontend:
Navigate to the frontend directory:
cd frontend

Install dependencies:
npm install bootstrap core-js js-cookie vue vue-router vuex

Run the frontend:
npm run serve

File Structure
Backend:
config/config.js: Configuration file for DB
controller/: Contains controller files (e.g., authController.js, cartController.js)
model/: Contains model files (e.g., authModel.js, cartModel.js)
routes/: Contains router files (e.g., authRouter.js, cartRouter.js)
.env: Environment variables
index.js: Main entry point for the backend

Frontend:
public/: Static assets (e.g., index.html)
src/: Contains all Vue components and views
components/: Reusable Vue components (e.g., CheckoutComp, MealKitComp)
router/: Vue Router configuration
store/: Vuex state management
views/: View files for each page (e.g., HomeView, CartView)
