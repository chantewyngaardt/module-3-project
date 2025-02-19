<template>
<section>
<div id="carouselExampleRide" class="carousel slide" data-bs-ride="true">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../assets/Goldi-ChickenLiversInSauceWithPap-scaled.jpg" class="d-block w-100" alt="Recipe">
      </div>
      <div class="carousel-item">
        <img src="../assets/Beef-stew-dombolo.jpg" class="d-block w-100" alt="Recipe">
      </div>
      <div class="carousel-item">
        <img src="../assets/coconut-chicken-curry-1-10.jpg" class="d-block w-100" alt="Recipe">
      </div>
      <div class="carousel-item">
        <img src="../assets/bunny-chow-3-of-3.jpg" class="d-block w-100" alt="Recipe">
      </div>
      <div class="carousel-item">
        <img src="../assets/Vetkoek-mince.jpg" class="d-block w-100" alt="Recipe">
      </div>
      <div class="carousel-item">
        <img src="../assets/samp and beans.png" class="d-block w-100" alt="Recipe">
      </div>
      <div class="carousel-item">
        <img src="../assets/bbq-chicken-with-chakalaka-1-825x510.png" class="d-block w-100" alt="Recipe">
      </div>
      <div class="carousel-item">
        <img src="../assets/grilled_fishedand_rice.jpg" class="d-block w-100" alt="Recipe">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</section>
</template>

<style scoped>
.half-page-container {
  width: 50%; /* Covers half of the page */
  height: 100vh; /* Full height */
  background-color: #f4f4f4; /* Light background */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centers content vertically */
  align-items: center; /* Centers content horizontally */
  position: absolute;
  left: 0; /* Aligns to the left side */
  top: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1); /* Optional shadow effect */
}
.card {
  max-width: 300px; /* Set a smaller max width */
  height: auto; /* Maintain natural height */
  margin: auto; /* Center the cards */
}

.card-img-top {
  height: 180px; /* Reduce image height */
  object-fit: cover; /* Ensure images fit properly */
}

@media (max-width: 768px) {
  .card {
    max-width: 250px; /* Even smaller on smaller screens */
  }
}

</style>