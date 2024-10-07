// fetch all data
const fetchAllData = async (category) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy${
      category ? `/category/${category}` : "/pets"
    }`
  );
  const data = await res.json();
  if (category) {
    displayAllData(data.data);
  } else {
    displayAllData(data.pets);
  }
};

// fetch data for dynamicbtn
const fetchBtnData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await res.json();
  displayBtnData(data.categories);
};

// display all button******************
const displayBtnData = (data) => {
  const btnContainer = document.getElementById("btnContainer");
  data.forEach((element) => {
    const button = document.createElement("button");
    button.innerHTML = `
      <button onclick="categoryBtnClickHandler('${element.category}','${element.id}')" id="btn-${element.id}" class=" mb-2 categoryBtn">
          <div  class=" flex items-center gap-2 btn btn-ghost border-1 border-teal-700 w-36 h-16">
              <img class = "size-8" src="${element.category_icon}" alt="">
              <p class = "font-bold">${element.category}</p>
          </div>
      </button>
            `;
    btnContainer.appendChild(button);
  });
};

// store-data-index-in-array**************************
let storeData = [];
// global-variables***************************
const cardContainer = document.getElementById("cardContainer");
const spinContainer = document.getElementById("spinContainer");

// display all data section********************
const displayAllData = (data) => {
  storeData = data;
  cardContainer.innerHTML = "";
  if (data.length === 0) {
    spinContainer.classList.add("hidden");
    cardContainer.classList.remove("grid");
    const div = document.createElement("div");
    div.innerHTML = `
           <div class="flex flex-col items-center justify-center gap-5">
            <img src="./images/error.webp" alt="error">
            <h3 class="text-3xl font-bold text-red-600">No Information Available</h3>
          </div>
          `;
    cardContainer.appendChild(div);
  } else {
    cardContainer.classList.add("grid");
    spinContainer.classList.add("hidden");

    data.forEach((element, index) => {
      const div = document.createElement("div");
      // Making cards**************************
      div.innerHTML = `
                 <div class="p-3 rounded-md border-2 border-gray-300 ">
                                
                                  <div class="h-[200px] ">
                                      <img class="h-full w-full object-cover rounded-md" src=${
                                        element.image
                                      } alt="">
                                   </div>
                                
                                  <h2 class="text-2xl font-bold">${
                                    element.pet_name
                                  }</h2>                               
                                  <p class=" font-semibold flex items-center gap-2"><img class="size-4" src="https://pic.onlinewebfonts.com/thumbnails/icons_89425.svg" alt="">Breed: ${
                                    element.breed
                                      ? element.breed
                                      : "Not Available"
                                  }</p>                                                                                                                           
                                  <p class=" font-semibold flex items-center gap-2"><img class="size-5 m-[-2px]" src="https://img.icons8.com/?size=24&id=85102&format=png" alt="">Birth: ${
                                    element.date_of_birth
                                      ? element.date_of_birth
                                      : "Not Available"
                                  }</p>
                                  <p class=" font-semibold flex items-center gap-2"><img class="size-4 " src="https://img.icons8.com/?size=24&id=0cGxc0sNk4jD&format=png" alt="">Gender: ${
                                    element.gender
                                      ? element.gender
                                      : "Not Available"
                                  }</p>
                                  <p class=" font-semibold flex items-center gap-2 pb-2 border-b-2 mb-3"><img class="size-5 m-[-2px]" src="https://img.icons8.com/?size=24&id=85782&format=png" alt="">Price: ${
                                    element.price
                                      ? element.price
                                      : "Not Available"
                                  }</p>
                                  <div class="flex items-center justify-between pt-2">
                                    <button class="btn" onclick="likeClickHandler('${
                                      element.image
                                    }')"><img src="https://img.icons8.com/?size=24&id=82788&format=png"></button>
                                    <button onclick="adoptClickHandler()" class="adoptBtn btn  font-semibold">Adopt</button>
                                    <button onclick="detailClickHandler('${index}')" 
                                    class="btn text-highlight  font-semibold">Details</button>
                                  </div>
                                
                              </div>
                `;

      cardContainer.append(div);
    });
  }
};

// Category wise data fetching
const categoryBtnClickHandler = (category, id) => {
  const categoryButton = document.getElementById(`btn-${id}`);

  activeButton();

  categoryButton.classList.add("active");
  spinContainer.classList.remove("hidden");
  cardContainer.innerHTML = "";

  setTimeout(() => {
    fetchAllData(category);
  }, 2000);
};

// remove-style-form-buttons
const activeButton = () => {
  const buttons = document.getElementsByClassName("categoryBtn");
  for (let button of buttons) {
    button.classList.remove("active");
  }
};

// card-like-button-clickHandler
const likeClickHandler = async (image) => {
  const imageContainer = document.getElementById("imageContainer");
  const div = document.createElement("div");
  div.innerHTML = `
        
              <img class="h-[200px] md:h-auto w-full p-1 rounded-lg" src=${image} alt="">
          
        `;
  imageContainer.appendChild(div);
};

// details-button-clickHandler

const detailClickHandler = (index) => {
  const element = storeData[index];
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
        <div class="card w-full ">
                            
                              <img
                                src=${element.image}
                                class="rounded-xl" />
                           
                            <div class="">
                              <h2 class="text-2xl font-bold"> 
                              ${element.pet_name}</h2>
                              <p class="flex items-center gap-2 font-semibold"><img class="size-4" src="https://pic.onlinewebfonts.com/thumbnails/icons_89425.svg" alt="">Breed:  
                              ${
                                element.breed ? element.breed : "Not Available"
                              }</p>
                              <p class="flex items-center gap-2 font-semibold"><img class="size-5 m-[-2px]" src="https://img.icons8.com/?size=24&id=85102&format=png" alt="">Birth: 
                               ${
                                 element.date_of_birth
                                   ? element.date_of_birth
                                   : "Not Available"
                               }</p>
                              <p class="flex items-center gap-2 font-semibold"><img class="size-4 " src="https://img.icons8.com/?size=24&id=0cGxc0sNk4jD&format=png" alt="">Gender:  
                              ${
                                element.gender
                                  ? element.gender
                                  : "Not Available"
                              }</p>
                              <p class="flex items-center gap-2 font-semibold"><img class="size-5 m-[-2px]" src="https://img.icons8.com/?size=24&id=85782&format=png" alt="">Price: 
                               ${
                                 element.price ? element.price : "Not Available"
                               }</p>
                                
                               <div>
                               <h3 class="text-3xl font-bold border-t-2 my-2">Details Information</h3>
                               <p class="font-semibold ">${
                                 element.pet_details
                               }</p>
                               </div>
                               <div class="modal-action">
                      <form method="dialog">
                        <div class="w-[465px]">
                               <button class="btn w-full bg-teal-700">Close</button>
                        </div>
                        
                      </form>
                    </div>
                            </div>
                          </div>
        `;
  modalContainer.append(div);
  my_modal_1.showModal();
};

//adopt-click-handler

const adoptClickHandler = () => {
  const countdownDisplay = document.getElementById("countDown");
  let count = 4;
  
  const countdown = setInterval(() => {
    count--;
    countdownDisplay.textContent = count;
    if (count <= 0) {
      clearInterval(countdown);
      countdownDisplay.innerHTML = "";
      adopt.close();
    }
  }, 1000);
  adopt.showModal();
};

// sort functionality**********************************
const sortedData = () => {
  const sortedData = [...storeData].sort((a, b) => {
    const priceA = a.price ? parseFloat(a.price) : 0;
    const priceB = b.price ? parseFloat(b.price) : 0;
    return priceB - priceA;
  });
  spinContainer.classList.remove("hidden");
  cardContainer.innerHTML = "";
  setTimeout(() => {
    displayAllData(sortedData);
  }, 2000);
};
fetchBtnData();

const loading = () => {
  spinContainer.classList.remove("hidden");
  setTimeout(function () {
    fetchAllData();
  }, 2000);
};
loading();
