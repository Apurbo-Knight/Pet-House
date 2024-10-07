// fetch categories
const loadCategories = () =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}


const loadAllPets = () => {
    document.getElementById("spin").classList.add("hidden");
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error))
}

const removeActiveClass = ()=>{
    const button = document.getElementsByClassName("categoryBtn");
    // console.log(button);
    for(let btn of button){
        btn.classList.remove("active");
    }
} 

const loadPetCategories = (id) =>{
    
    
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) =>{
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active")
        // console.log(activeBtn);
        displayPets(data.data);
    })
    .catch((error) => console.log(error))
}


    


// display categories
const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById("categories");

categories.forEach(item => {
    // console.log(item);

    const button = document.createElement("button");
    // button.classList = "btn";
    button.innerHTML = `
    <button  id="btn-${item.category}" class= "categoryBtn" onclick = "loadPetCategories('${item.category}')">
        <div  class=" flex items-center gap-2 btn btn-ghost border-1 border-teal-700 w-36 h-16">
            <img class = "size-8" src="${item.category_icon}" alt="">
            <p class = "font-bold">${item.category}</p>
        </div>
    </button>
    `;

    categoryContainer.append(button);
});
}



const displayPets = (pets) => {
    const petsContainer = document.getElementById("display");
    petsContainer.innerHTML= " " ;

    if(pets.length === 0){
        
        petsContainer.classList.remove("grid");
        petsContainer.innerHTML = `
        <div class="max-h-screen bg-gray-100 p-10 rounded-lg flex flex-col gap-5 justify-center items-center">
            <img src="./images/error.webp"/>
            <p class= "font-bold text-3xl">No Information Available</p>
        </div>
        `;
        return;
    }
    else{
        petsContainer.classList.add("grid");
    }
    // console.log(pets);
    pets.forEach(pet =>{
        // document.getElementById("spin").classList.remove("hidden");
        // console.log(pet);
        const card = document.createElement("div"); 
        card.innerHTML= `
        <div class="p-3 rounded-md border-2 border-gray-300 ">
            <div class="h-[200px] ">
                <img class="h-full w-full object-cover rounded-md" src=${pet.image} alt="">
            </div>
            <div class="border-b-2 pb-4">
                <h2 class="font-bold text-2xl">${pet.pet_name}</h2>
                <P class="flex items-center gap-2"><img class="size-4" src="https://pic.onlinewebfonts.com/thumbnails/icons_89425.svg" alt="">Breed: ${pet.breed? pet.breed : pet.breed === "null"? "Not Available" : "Not Available"}</P>
                <P class="flex items-center gap-2"><img class="size-5 m-[-2px]" src="https://img.icons8.com/?size=24&id=85102&format=png" alt="">Birth: ${pet.date_of_birth? pet.date_of_birth: pet.date_of_birth === "null" ? "Not Available":"Not Available"}</P>
                <P class="flex items-center gap-2"><img class="size-4 " src="https://img.icons8.com/?size=24&id=0cGxc0sNk4jD&format=png" alt="">Gender: ${pet.gender? pet.gender : pet.gender ==="null" ? "Not Available" : "Not Available"}</P>
                <P class="flex items-center gap-2"><img class="size-5 m-[-2px]" src="https://img.icons8.com/?size=24&id=85782&format=png" alt="">Price: ${pet.price? pet.price :pet.price === "null" ? "Not Available" : "Not Available"}</P>
            </div>
            <div class="flex justify-between mt-3">
                <button onclick = "handleLike('${pet.image}')"class="btn btn-ghost border-1 border-teal-700"><img src="https://img.icons8.com/?size=24&id=82788&format=png" alt=""></button>
                <button  onclick = "adopt()"  class="btn btn-ghost border-1 border-teal-700">Adopt</button>
                <button onclick = "petDetails('${pet.petId}')"class="btn btn-ghost border-1 border-teal-700">Details</button>
            </div>
        </div>
        `;

        petsContainer.append(card);
    })
}
// 888888888888888888888888888888888888888888888888888888******************************
const adopt = () =>{
   const countdownModal = document.getElementById("modal-countdown");

   

   countdownModal.innerHTML=`
        <dialog id="my_modal_2" class="modal">
            <div class="modal-box">
                <div class="flex justify-center p-5">
                    <img src="https://img.icons8.com/?size=48&id=q6BlPrJZmxHV&format=png">
                </div>
                <h2 class="text-center font-bold text-3xl mb-4">Congratulation</h2>
                <h2 class="text-center mb-4">Adoption Process is start For Your Pet</h2>
                <p id="countdown" class="text-center font-bold text-5xl mb-5">3</p>
                        
            </div>
        </dialog>
   `;
     
   
   
    const countdownDisplay = document.getElementById('countdown');
    let countdown = 3;

    my_modal_2.showModal();
    
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownModal.innerHTML=``;
        }
    }, 1000);

} 
    // Show the message


const handleLike = (image)=>{
    const imageContainer = document.getElementById("display2");
    
   const div = document.createElement("div");

    div.innerHTML=`
        
            <img class="rounded-md" src="${image}" alt="">
        
    `;
    imageContainer.append(div)
    document.getElementById("innerp").classList.add("hidden");
    
}


const petDetails = async(id) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await response.json();
 
 const {image,pet_name, breed, gender, date_of_birth, price, vaccinated_status,pet_details} = data.petData;

 const modalContainer = document.getElementById("modal-container");

 modalContainer.innerHTML=`
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
   <img class = "w-full rounded-md" src=${image} alt="">
     <h2 class="font-bold text-2xl">${pet_name}</h2>
     <P class="flex items-center gap-2"><img class="size-4" src="https://pic.onlinewebfonts.com/thumbnails/icons_89425.svg" alt="">Breed: ${breed? breed : breed === "null"? "Not Available" : "Not Available"}</P>
     <P class="flex items-center gap-2"><img class="size-5 m-[-2px]" src="https://img.icons8.com/?size=24&id=85102&format=png" alt="">Birth: ${date_of_birth? date_of_birth: date_of_birth === "null" ? "Not Available":"Not Available"}</P>
     <P class="flex items-center gap-2"><img class="size-4 " src="https://img.icons8.com/?size=24&id=0cGxc0sNk4jD&format=png" alt="">Gender: ${gender? gender : gender ==="null" ? "Not Available" : "Not Available"}</P>
     <P class="flex items-center gap-2"><img class="size-5 m-[-2px]" src="https://img.icons8.com/?size=24&id=85782&format=png" alt="">Price: ${price? price :price === "null" ? "Not Available" : "Not Available"}</P>
     <P class="flex items-center gap-2 border-b-2 pb-4 mb-4"><img class="size-5 m-[-2px]" src="https://img.icons8.com/?size=48&id=qQO6lVjT5coA&format=png" alt="">Vaccinated Status: ${vaccinated_status? vaccinated_status :vaccinated_status === "null" ? "Not Available" : "Not Available"}</P>
     <div>
        <h2 class="font-bold">Details Information</h2>
        <p>${pet_details}</p>
     </div>
    <div class="modal-action">
      <form method="dialog">
        <div class = " rounded-md w-[465px] bg-teal-700">
            <button class="text-white h-10  w-full">Close</button>
        </div>
      </form>
    </div>
  </div>
</dialog>
 `;


 my_modal_1.showModal()
}



loadCategories();
// loadAllPets();
loadPetCategories();
const loading = () =>{
    setTimeout(function (){
        loadAllPets()
    },2000)
}
loading();

// document.getElementById(`btn-${item.category}`).addEventListener(click,function(){
//     document.getElementById("spin").classList.remove("hidden");

//     setTimeout(function(){
//         loadPetCategories(id)
//     },3000)
// });