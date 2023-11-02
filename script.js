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

  for (let i = 1; i < 20; i++) {
    const ingredient = meal["strIngredient" + i];
    const measure = meal["strMeasure" + i];
    /* if (ingredient) {
      ingredientsMeals.push(ingredient);
    }
    if (measure) measuresMeals.push(measure);*/
    if (measure && ingredient) {
      ingredientsMeals += `<li>${measure} - ${ingredient}</li>`;
    } else if (ingredient) {
      ingredientsMeals += `<li>${ingredient}</li>`;
    }
  }
  //console.log(ingredientsMeals);

  const html = `
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
                    <ul>${ingredientsMeals}</ul>
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
        <a href=${mealYoutube}>Watch the video here</a>
    </div>`;

  //mealContainer.insertAdjacentHTML("afterbegin", html);
  mealContainer.innerHTML = html;
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

btn.addEventListener("click", () => {
  meal();
});
