const input =  document.getElementById("searchbox");
const searchbtn =  document.getElementById("searchbtn");
const title =  document.getElementById("title");
const closeBtn = document.getElementById("closeBtn");
const RecipeItem = document.querySelector(".recipe-item")
const RecipeDetails = document.querySelector(".recipe-deatils")
const recipeContainer = document.getElementById("recipr-container")
let recipe ;


searchbtn.addEventListener("click", (e) => {
     e.preventDefault();
    recipe = input.value;
    getrecipe()
});

async function getrecipe() {
        
     title.innerText = `Fetching ${recipe} Recipe...`
    
    const API_URL =  `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`;

    const res = await fetch(API_URL)
    const data = await res.json()
    console.log(data.meals)
    data.meals.forEach(meal => {
       
        const ReciprDiv = document.createElement("div")
        ReciprDiv.classList.add("recipediv")
        ReciprDiv.innerHTML = `
        <img src="${meal.strMealThumb}"/>
        <h3>${meal.strMeal}</h3>
        <p>Country : ${meal.strArea}</p>
        <p>Category : ${meal.strCategory}</p>
        `
       const button = document.createElement("button")
       button.textContent = "Veiw Details"
       recipeContainer.appendChild(ReciprDiv)
       ReciprDiv.appendChild(button)
      title.innerText = `All ${recipe} Recipe`


      button.addEventListener("click", () => {
         RecipeDetails.style.opacity = 1;

        RecipeItem.innerHTML = `<h2>${meal.strMeal}</h2>
        <h3>Ingredents</h3>
        <ul>${getItem(meal)}</ul>
        <div>
         <h3>Instructions:</h3>
         <p>${meal.strInstructions}</p>
        </div>
        `
      })
    });
    
     
      
      closeBtn.addEventListener("click", () => {
         RecipeDetails.style.opacity = 0;
      })

      const getItem = (meal) => {
         console.log(meal)
        let IngredentsList = "";

        for (let i = 1; i <= 20; i++) {
            const Ingredents = meal[`strIngredient${i}`]
            
            if(Ingredents){
                const measure = meal[`strMeasure${i}`]
                IngredentsList += `<li>${measure} ${Ingredents}</li>`
            }else{
                break
            }
           
            
        }
         return IngredentsList
      }
}