const btn = document.querySelector("#next");
const mealContainer = document.querySelector(".container");

mealContainer.innerHTML = "";

const dataMeal = (data) => {
  const meal = data.meals[0];
  const mealName = meal.strMeal;
  const countryArea = meal.strArea;
  const imgMeal = meal.strMealThumb;
  const mealInstruction = meal.strInstructions;
  const mealYoutube = meal.strYoutube;
  let ingredientsMeals = [];
  let measuresMeals = [];

  for (let i = 1; i < 20; i++) {
    const ingredient = meal["strIngredient" + i];
    if (ingredient) {
      ingredientsMeals.push(ingredient);
    }
    const measure = meal["strMeasure" + i];
    if (measure) measuresMeals.push(measure);
  }
  //console.log(ingredientsMeals);
  console.log(measuresMeals);

  const html = `<div class="container">
    <div class="name">
     <h2>${mealName}</h2>
    </div>
   <div class="country">
     <h2>${countryArea}</h2>
    </div>
    <div class="containerImg">
        <div class="image">
            <img src= "${imgMeal}" alt="Pasta">
             <div class="ingredient">
                <h2>Ingredient</h2>
                    <p>${ingredientsMeals}${measuresMeals}</p>
            </div>
        </div>
    </div> 
   <div class="recette">
    <h2>Instruction</h2>
        <p>
        ${mealInstruction}
        </p>
   </div>
   <div class="video">
        <a href=${mealYoutube}>${mealYoutube}</a>
    </div>`;

  mealContainer.insertAdjacentHTML("beforeend", html);
};

// variable de stockage pour lancer et faire apparaitre 15 pokemon
const meal = async () => {
  try {
    const resMeal = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    if (!resMeal.ok) throw new Error("Problem getting meal data");
    const data = await resMeal.json();
    console.log(data);
    dataMeal(data);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

meal();

btn.addEventListener("click", () => {
  meal();
});
