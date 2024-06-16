// Importing firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://frezer-plays-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const moviesInDB = ref(database, 'movies');

onValue(moviesInDB, function(snapshot) {
    if (snapshot.exists()){
        let movieArray = Object.entries(snapshot.val());
        clearlist()
        for (let i = 0; i < movieArray.length; i++) {
          let currentItem = movieArray[i];
          let currentID = currentItem[0];
          let currentItemValue = currentItem[1];
          appendItem(currentItem);
        }
    }
    else {
        inputListEl.innerHTML = "No items here.....yet!";
    }

});


const inputFieldEl = document.getElementById('input-field');
const addButtonEl = document.getElementById('add-button');
const inputListEl = document.getElementById('input-list');

addButtonEl.addEventListener('click', function() {
  const inputValue = inputFieldEl.value;
  push(moviesInDB, inputValue);
//   appendItem(inputValue);
  clearInputFieldEl();
  console.log(inputValue);
});

function clearInputFieldEl() {
  inputFieldEl.value = '';
}

function appendItem(item) {
    // inputListEl.innerHTML += `<li>${itemValue}</li>`;
    let itemID = item[0];
    let itemValue = item[1];
    let newEl = document.createElement('li');
    newEl.textContent = itemValue;
    

    newEl.addEventListener('dblclick', function() {
        let exactLocation = ref(database, `movies/${itemID}`);
        remove(exactLocation);
    })

    inputListEl.append(newEl);
}

function clearlist() {
    inputListEl.innerHTML = '';
}

