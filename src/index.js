let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getAllToys()
  submitToy()
  
});
const getAllToys = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(addCard);
}
const addCard = toy => toy.forEach(createCard);

const createCard = (toy) => {
  const card = document.createElement('div');
  card.className = 'card';
  const cardContainer = document.querySelector('#toy-collection');
  cardContainer.appendChild(card);
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src='${toy.image}' class='toy-avatar'/>
  <p>${toy.likes} Likes</p>
  <button class='like-btn' id='${toy.id}'>Like ❤️</button>
  ` 
  const likeBtn = card.querySelector('.like-btn');
  likeBtn.addEventListener('click', () => {
    toy.likes += 1;
    card.querySelector('p').textContent = `${toy.likes} Likes`
    updateLikes(toy)
  });
}
const submitToy = () => {
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', handleSubmit)
}
const handleSubmit = (e) => {
  e.preventDefault();
  e.target.reset()
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  createCard(toyObj)
  addNewToy(toyObj)
}
const addNewToy = (toyObj) => {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
  Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  })
}
const updateLikes = (toyObj) => {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify(toyObj)
  })
}