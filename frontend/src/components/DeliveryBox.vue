<template>
  <div class="container">
    <form class="content-border">
      <img src="../assets/bbq-chicken-with-chakalaka-1-825x510.png" class="img-fluid rounded-start" alt="Recipe">
      <br><br>
      <h5>What's inside Ready Recipes Delivery Box?</h5><br>
      <p class="card-text"><strong>Fresh, quality:</strong> Crisp vegetables and ripe fruits selected to bring vibrant flavors to every dish.</p>
      <p><strong>Simple recipe cards:</strong> Step-by-step recipes with nutritional information that takes the guesswork out of cooking, no matter your skill level.</p>
      <p><strong>Top-notch protein:</strong> From succulent chicken to lean beef, we deliver the best to elevate your meal.</p>
      <p><strong>Customizable add-ons:</strong> Choose from a range of toppings, sauces, and extras to make your meal truly unique and delicious.</p>
    </form>
  </div>
</template>

<style>
/* Flexbox parent container */
.container {
  display: flex;
  justify-content: center; /* Centers the content horizontally */
  align-items: center; /* Centers the content vertically */
  height: 100vh; /* Ensures the section takes the full viewport height */
}

.content-border {
  display: inline-block;
  border: 5px solid black;
  padding: 15px 20px;
  border-radius: 15px;
  text-align: center;
  justify-content: center;
  margin: auto; /* Automatically centers the form horizontally */
}

h5 {
  text-decoration: underline;
}

p {
  display: list-item;
  list-style-type: disc;
  margin-left: 20px;
}
</style>
