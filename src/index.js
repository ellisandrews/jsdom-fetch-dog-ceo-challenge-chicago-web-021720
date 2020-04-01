document.addEventListener('DOMContentLoaded', fetchAndAddImages)
document.addEventListener('DOMContentLoaded', fetchAndAddBreeds)
document.addEventListener('DOMContentLoaded', addClickListenerToBreeds)
document.addEventListener('DOMContentLoaded', addSelectListenerToDropdown)

function getJSONMessage(url) {
    // Returns a Promise!
    return fetch(url)
            .then(response => response.json())
            .then(json => json['message']);
}

function fetchAndAddImages() {
    getJSONMessage('https://dog.ceo/api/breeds/image/random/4')
        .then(imageLinks => {
            const imgContainer = document.querySelector('#dog-image-container');

            for (const link of imageLinks) {
                const imgTag = document.createElement('img');
                imgTag.src = link;
                imgContainer.appendChild(imgTag);
            }
        });
}

function fetchAndAddBreeds() {
    getJSONMessage('https://dog.ceo/api/breeds/list/all')
        .then(breeds => {
            const breedsUL = document.querySelector('#dog-breeds');

            for (const breed in breeds) {
                const li = document.createElement('li');
                li.innerText = breed;
                breedsUL.appendChild(li);
            }
        });
}

function breedClick(event) {
    event.target.style.color = 'green';
}

function addClickListenerToBreeds() {
    const breedsUL = document.querySelector('#dog-breeds');
    breedsUL.addEventListener('click', breedClick);
}

function addSelectListenerToDropdown() {
    const breedSelect = document.querySelector('#breed-dropdown');
    breedSelect.addEventListener('change', filterBreeds);
}

function filterBreeds() {
    const breedSelect = document.querySelector('#breed-dropdown');
    const selection = breedSelect.options[breedSelect.selectedIndex].value;
    const breedsUL = document.querySelector('#dog-breeds');

    const children = [...breedsUL.childNodes];
    children.shift()  // Remove the first (non-li) item

    children.forEach(li => {
        if (li.innerText[0] != selection) {
            li.style.display = "none";
        } else {
            li.style.display = "block";
        }
    });
}
