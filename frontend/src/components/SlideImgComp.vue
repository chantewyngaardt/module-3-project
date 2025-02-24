<template>
  <br><br><br>
  <section class="carousel-container">
    <div id="carouselExampleRide" class="carousel slide" data-bs-ride="true">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/Goldi-ChickenLiversInSauceWithPap-scaled.jpg" class="d-block carousel-img" alt="Recipe">
        </div>
        <div class="carousel-item">
          <img src="../assets/Beef-stew-dombolo.jpg" class="d-block carousel-img" alt="Recipe">
        </div>
        <div class="carousel-item">
          <img src="../assets/coconut-chicken-curry-1-10.jpg" class="d-block carousel-img" alt="Recipe">
        </div>
        <div class="carousel-item">
          <img src="../assets/bunny-chow-3-of-3.jpg" class="d-block carousel-img" alt="Recipe">
        </div>
        <div class="carousel-item">
          <img src="../assets/Vetkoek-mince.jpg" class="d-block carousel-img" alt="Recipe">
        </div>
        <div class="carousel-item">
          <img src="../assets/samp and beans.png" class="d-block carousel-img" alt="Recipe">
        </div>
        <div class="carousel-item">
          <img src="../assets/bbq-chicken-with-chakalaka-1-825x510.png" class="d-block carousel-img" alt="Recipe">
        </div>
        <div class="carousel-item">
          <img src="../assets/grilled_fishedand_rice.jpg" class="d-block carousel-img" alt="Recipe">
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
/* Set a smaller max-width and center the carousel */
.carousel-container {
  max-width: 70%;
  /* Adjust this value as needed */
  margin: auto;
  padding: 20px;
}

/* Reduce image size */
.carousel-img {
  max-width: 75%;
  /* Adjust this to make it smaller */
  height: auto;
  margin: auto;
}

@media (max-width: 768px) {
  .carousel-container {
    max-width: 90%;
  }

  .carousel-img {
    max-width: 90%;
  }
}
</style>
