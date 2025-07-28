const API_KEY = 'a25b5cfc6153433585db938cbf2f581b';
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

const form = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');
const paginationDiv = document.getElementById('pagination');

// Pagination
let currentPage = 1;
let totalResults = 0;
let recipesPerPage = 4;
let currentSearchParams = {};

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  currentPage = 1; 
  resultsDiv.innerHTML = '<p>Loading...</p>';
  paginationDiv.innerHTML = '';

  const ingredients = document.getElementById('ingredients').value.trim();
  const cuisine = document.getElementById('cuisine').value;
  const diet = document.getElementById('diet').value;

  // Store search params for pagination
  currentSearchParams = {
    ingredients,
    cuisine,
    diet
  };

  await searchRecipes();
});

async function searchRecipes() {
  const { ingredients, cuisine, diet } = currentSearchParams;

  // Build query params
  const params = new URLSearchParams({
    apiKey: API_KEY,
    includeIngredients: ingredients,
    cuisine: cuisine,
    diet: diet,
    number: recipesPerPage,
    offset: (currentPage - 1) * recipesPerPage,
    addRecipeInformation: true // To get instructions
  });

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    
    totalResults = data.totalResults || 0;
    displayResults(data.results);
    displayPagination();
  } catch (error) {
    resultsDiv.innerHTML = `<p class="error">Error fetching recipes. Please try again later.</p>`;
    paginationDiv.innerHTML = '';
  }
}

function displayResults(recipes) {
  if (!recipes || recipes.length === 0) {
    resultsDiv.innerHTML = '<p>No recipes found. Try different ingredients or filters.</p>';
    return;
  }
  resultsDiv.innerHTML = recipes.map(recipe => `
    <div class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <button onclick="location.href='./pages/recipe.html?id=${recipe.id}'">View More</button>
    </div>
  `).join('');
}

function displayPagination() {
  if (totalResults <= recipesPerPage) {
    paginationDiv.innerHTML = '';
    return;
  }

  const totalPages = Math.ceil(totalResults / recipesPerPage);
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  let paginationHTML = '<div class="pagination">';
  
  // Previous button
  if (currentPage > 1) {
    paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage - 1})">Previous</button>`;
  }

  // First page
  if (startPage > 1) {
    paginationHTML += `<button class="pagination-btn" onclick="changePage(1)">1</button>`;
    if (startPage > 2) {
      paginationHTML += '<span class="pagination-ellipsis">...</span>';
    }
  }

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    if (i === currentPage) {
      paginationHTML += `<button class="pagination-btn active">${i}</button>`;
    } else {
      paginationHTML += `<button class="pagination-btn" onclick="changePage(${i})">${i}</button>`;
    }
  }

  // Last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHTML += '<span class="pagination-ellipsis">...</span>';
    }
    paginationHTML += `<button class="pagination-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
  }

  // Next button
  if (currentPage < totalPages) {
    paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})">Next</button>`;
  }

  paginationHTML += '</div>';
  
  // Add results info
  const startResult = (currentPage - 1) * recipesPerPage + 1;
  const endResult = Math.min(currentPage * recipesPerPage, totalResults);
  paginationHTML += `<div class="pagination-info">Showing ${startResult}-${endResult} of ${totalResults} recipes</div>`;
  
  paginationDiv.innerHTML = paginationHTML;
}

async function changePage(page) {
  currentPage = page;
  resultsDiv.innerHTML = '<p>Loading...</p>';
  await searchRecipes();
  // Scroll to top of results
  document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
} 