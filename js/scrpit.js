// Function to fetch dog breeds from The Dog API
async function fetchDogBreeds() {
  const apiKey =
        "live_orbmXUtSTUPQjifwGvEDi9mHFIa09uqVx5ItTGcuwh2b6r0StzheWxBY4886m7yv";
    const apiUrl = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    return [];
  }
}

// Function to populate the breed dropdown menu
async function populateBreedDropdown() {
  const breedSelect = document.getElementById("breedSelect");
  const breeds = await fetchDogBreeds();

  // Populate the dropdown menu with breed options
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

// Event listener for the breed select dropdown
document.getElementById('breedSelect').addEventListener('change', function() {
    const selectedBreed = this.value;
    displayDogImages(selectedBreed); 
});

// Function to fetch dog images based on the selected breed
async function fetchDogImages(breedId) {
    const apiKey =
      "live_orbmXUtSTUPQjifwGvEDi9mHFIa09uqVx5ItTGcuwh2b6r0StzheWxBY4886m7yv"; 
    let apiUrl = `https://api.thedogapi.com/v1/images/search?api_key=${apiKey}&limit=10`;

    if (breedId) {
        apiUrl += `&breed_ids=${breedId}`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dog images:', error);
        return [];
    }
}

// Function to display dog images on the webpage
async function displayDogImages(breedId) {
  const dogContainer = document.getElementById("dogContainer");
  const dogImages = await fetchDogImages(breedId);

  // Clear previous dog images
  dogContainer.innerHTML = "";

  // Display each dog image
  dogImages.forEach((dog) => {
    const dogImage = document.createElement("img");
    dogImage.classList.add("col-md-4", "mb-3");
    dogImage.src = dog.url;
    dogContainer.appendChild(dogImage);
  });
}

// Call the populateBreedDropdown function when the page loads
window.onload = populateBreedDropdown;
