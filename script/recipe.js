import { API_KEY } from "../apiKey";

function getRecipeIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function fetchRecipeDetails(id) {
  const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch recipe details');
  return res.json();
}

async function fetchRelatedRecipes(id) {
  const res = await fetch(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${API_KEY}&number=3`);
  if (!res.ok) throw new Error('Failed to fetch related recipes');
  return res.json();
}

function renderRecipe(recipe) {
  document.getElementById('recipe-details').innerHTML = `
    <h2>${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}" style="border-radius:0.5rem;" />
    <p><strong>Summary:</strong> ${recipe.summary}</p>
    <p><strong>Diets:</strong> ${recipe.diets && recipe.diets.length ? recipe.diets.join(', ') : 'None'}</p>
    <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
    <p><strong>Servings:</strong> ${recipe.servings}</p>
    <p><a href="${recipe.sourceUrl}" target="_blank">View full recipe on original site</a></p>
  `;
}

function renderRelatedRecipes(related) {
  document.getElementById('related-recipes').innerHTML = related.map(r =>
    `<li><a href="recipe.html?id=${r.id}">${r.title}</a></li>`
  ).join('');
}

document.getElementById('back-btn').onclick = () => {
  window.history.back();
};

async function main() {
  const id = getRecipeIdFromUrl();
  if (!id) {
    document.getElementById('recipe-details').innerHTML = '<p>Recipe not found.</p>';
    return;
  }
  try {
    const [recipe, related] = await Promise.all([
      fetchRecipeDetails(id),
      fetchRelatedRecipes(id)
    ]);
    renderRecipe(recipe);
    renderRelatedRecipes(related);
  } catch (e) {
    document.getElementById('recipe-details').innerHTML = '<p>Error loading recipe details.</p>';
  }
}

main(); 