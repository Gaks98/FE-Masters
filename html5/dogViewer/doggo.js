const BREED_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector('#breed');
const spinner = document.querySelector('.spinner')
const img = document.querySelector('.doggo-img');

fetch(BREED_URL)
  .then(function (response) {
    return response.json();
  })
  .then(data => {
      const breedsObject = data.message;
      const ObjectArray = Object.keys(breedsObject);
    for (let i = 0; i < ObjectArray.length; i++){
        const option = document.createElement('option');
        option.value = ObjectArray[i];
        option.innerText = ObjectArray[i];
        select.appendChild(option);
      }
    })
  
select.addEventListener('change', function (event) {
  let url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
  getDoggo(url);
});

function getDoggo(url) {
  spinner.classList.add("show");
  img.classList.remove("show");
  fetch(url)
    .then(function (responce) {
      return responce.json();
    })
    .then(function (data) {
      img.src = data.message;
    })
  }
  
  img.addEventListener('load', function () {
    spinner.classList.remove("show");
    img.classList.add("show");
})


