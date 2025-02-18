<template>
    <div>
        <h1>Why Ready Recipes Meal Kits?</h1>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">
    <div class="card">
      <img src="../assets/Pumpkin-fritters-ns.jpg" class="card-img-top" alt="Meal">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="../assets/chakalaka-chicken.jpg" class="card-img-top" alt="Meal">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="../assets/grilledworsandveggies.jpg" class="card-img-top" alt="Meal">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="../assets/ostrichmeat-sweetpotato.jpeg" class="card-img-top" alt="Meal">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>
<br><br>
<button class="button">Get Offers</button>
</template>
<script>
export default {
    
}
</script>
<style>
    .card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-img-top {
  height: 200px; /* Ensures all images are the same size */
  object-fit: cover; /* Prevents distortion */
}
.button{
    background-color: #573b8a;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
}
</style>