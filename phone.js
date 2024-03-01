const loadPhone = async (searchText='sam') => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = ``;
  const pagination = document.getElementById("pagination");
  phones.length > 12
    ? pagination.classList.remove("hidden")
    : pagination.classList.add("hidden");
  // phones = phones.slice(0,12)
  phones.forEach((phone) => {
    // console.log(phone);

    //step 2 : Create a div

    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-blue-100 p-4 shadow-xl`;

    //step 3: Set innerHTML

    phoneCard.innerHTML = `<figure><img class='bg-opacity-0' src=${phone.image} alt=${phone.image} /></figure>
        <div class="card-body">
          <h2 class="card-title text-center">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary" onclick="handleShowDetails('${phone.slug}')">Show Details</button>
          </div>
        </div>`;

    //step 4: Append Child
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingDots(false);
};

/* const handleSearch = () => {
    console.log(`handleSearch Activated`)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText)
}
 */

const handleAnotherSearch = () => {
  toggleLoadingDots(true);
  const searchField = document.getElementById("another-search");
  const searchText = searchField.value;
  loadPhone(searchText);
};

const toggleLoadingDots = (isLoading) => {
  const dots = document.getElementById("dots");
  isLoading ? dots.classList.remove("hidden") : dots.classList.add("hidden");
};

const handleShowDetails = async (id) => {
  console.log(`Clicked Details from ${id}`);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  let data = await response.json();
  data = data.data
  // console.log(data);
  showPhoneDetails(data)
};
loadPhone()


const showPhoneDetails = (details) => {
  const phoneName = document.getElementById('phone-name')
  phoneName.innerText = `${details.name}`

  const showDetailContainer = document.getElementById('show-detail-container')
  showDetailContainer.innerHTML = `
  <figure class='flex justify-center py-4'><img src=${details.image} alt=${details.name} /></figure>
  <p><span class='font-bold'>Storage: </span>${details?.mainFeatures?.storage}</p>
  <p><span class='font-bold'>Display Size: </span>${details?.mainFeatures?.displaySize}</p>
  <p><span class='font-bold'>Chipset: </span>${details?.mainFeatures?.chipSet}</p>
  <p><span class='font-bold'>Memory: </span>${details?.mainFeatures?.memory}</p>
  <p><span class='font-bold'>Release Date: </span>${details?.mainFeatures?.releasedate}</p>
  <p><span class='font-bold'>Brand: </span>${details?.brand}</p>
  <p><span class='font-bold'>GPS: </span>${details?.others?.GPS}</p>
  `

  show_details_modal.showModal();
}

