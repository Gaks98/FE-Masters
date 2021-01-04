const BREED_URL = "https://dog.ceo/api/breeds/list/all";

function addDoggo() {
  fetch(BREED_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const img = document.createElement('img');
      img.src = data.message;
      img.alt = "doggo";
      document.querySelector('.doggos')
        .appendChild(img);
    });
}

document.querySelector('.add-doggo')
  .addEventListener('click',addDoggo);
