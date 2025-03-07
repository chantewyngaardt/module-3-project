<template>
  <br>
  <div>
    <h1>Why Ready Recipes Meal Kits?</h1>
  </div>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">
      <div class="card">
        <img src="../assets/Pumpkin-fritters-ns.jpg" class="card-img-top" alt="Meal">
        <div class="card-body">
          <h5 class="card-title">Pumpkin Fitter
          </h5>
          <p class="card-text">Spice up your fall with our delicious pumpkim fitters ! Freshly made , crispy on the the outside , and perfectly fluffy on the inside.Perfect for a cozy treat! Order now and enjoy the seasonal flovor delivered right to your door.</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img src="../assets/chakalaka-chicken.jpg" class="card-img-top" alt="Meal">
        <div class="card-body">
          <h5 class="card-title">Chicken with Chakalaka</h5>
          <p class="card-text">Craving something savory? Try our juicy chicken paired with spicy chakalaka! A perfect combination of tender chicken and bold flavours.Order now and enjoy this mouthwatering dish delivered straight to you.</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img src="../assets/chakalaka-chicken.jpg" class="card-img-top" alt="Meal">
        <div class="card-body">
          <h5 class="card-title">Beef Stew with dombolo</h5>
          <p class="card-text">Savor the rich flovour of our tender beef stew , served with soft , fluffy dombolo. A comforting and hearty meal that's sure to satisfy.Order now and enjoy this delicious combo delivered to you door.</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img src="../assets/grilledworsandveggies.jpg" class="card-img-top" alt="Meal">
        <div class="card-body">
          <h5 class="card-title">Grilled wors with vegetables </h5>
          <p class="card-text">SAvor the rich flovour of the tender of grilled wors served with nice and fresh veggies. A nice healthy and refreshing meal thats sure to satisfy.Order now and enjoy this delicious combo deliverd to your door.</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img src="../assets/ostrichmeat-sweetpotato.jpeg" class="card-img-top" alt="Meal">
        <div class="card-body">
          <h5 class="card-title">Ostrich meat with sweet potato</h5>
          <p class="card-text">Indulge in the rich , tender flavour of ostrich meat, perfectly paired with sweet potato. A unique and delicious combo thats both hearty and healthy .Order now and enjoy this gourmet meal deliverd to you.</p>
        </div>
      </div>
    </div>
  </div>
  <br><br>
  <button class="button" @click="$router.push('/ready-made-meals')">Get Started</button>
  <br><br>
</template>
<style>
.row {
  justify-content: center;
}

.card {
  max-width: 320px;
  /* Adjust this for smaller card width */
  margin: auto;
  /* Centers the cards */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  /* Adds a subtle shadow for better visibility */
  border-radius: 10px;
  /* Slightly rounded corners */
}

.card-img-top {
  height: 180px;
  /* Reduce image height */
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-body {
  flex-grow: 1;
  padding: 15px;
  /* Reduces padding for a more compact look */
  text-align: center;
  /* Centers the text */
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.button {
  display: block;
  margin: 20px auto;
  padding: 10px 25px;
  background-color: #573b8a;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.button:hover {
  background-color: #402a6e;
}

@media (max-width: 768px) {
  .row-cols-md-2>.col {
    flex: 0 0 50%;
    max-width: 50%;
    /* Ensures two columns on medium screens */
  }

  .card {
    max-width: 280px;
    /* Further reduce width on smaller screens */
  }
}

@media (max-width: 480px) {
  .row-cols-md-2>.col {
    flex: 0 0 100%;
    max-width: 100%;
    /* Stacks cards on very small screens */
  }

  .card {
    max-width: 90%;
    /* Adapts to smaller screens */
  }
}
</style>