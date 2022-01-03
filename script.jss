//button event listeners for create new song, add new song to page, close popup
const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addSongToLibrary);

const newSongBtn = document.querySelector('#newBtn');
newSongBtn.addEventListener('click', () => popUpForm.style.display = 'block');

const popUpForm = document.getElementById('popUp');
const closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click', () => popUpForm.style.display = 'none');

//Song Constructor
class Song {
    constructor(title, artist, genre, repeat) {
        this.title = form.title.value; 
        this.artist = form.artist.value; 
        this.genre = form.genre.value; 
        this.repeat = form.repeat.checked; 
    }
}

//creates song from Song Constructor, adds to library
let myLibrary = [];
let newSong;

function addSongToLibrary() {
    event.preventDefault();
    popUpForm.style.display = 'none';

    newSong = new Song(title, artist, genre, repeat); 
    myLibrary.push(newSong); 
    setData();  //saves updated array in local storage
    render(); 
    form.reset();
}

//Creates song info visual in browser
function render() {
    const display = document.getElementById('Library-container');
    const songs = document.querySelectorAll('.song');
    songs.forEach(song => display.removeChild(song));
   
    for (let i=0; i<myLibrary.length; i++){
        createSong(myLibrary[i]);
    }
}

//creates song DOM elements, to use in render();
function createSong(item) {
    const library = document.querySelector('#Library-container');
    const songDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const artistDiv = document.createElement('div');
    const genreDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    
    
    songDiv.classList.add('song');
    songDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    songDiv.appendChild(titleDiv);

    artistDiv.textContent = item.artist;
    artistDiv.classList.add('artist');
    songDiv.appendChild(artistDiv);

    genreDiv.textContent = item.genre;
    genreDiv.classList.add('genre');
    songDiv.appendChild(genreDiv);

    readBtn.classList.add('readBtn')    
    songDiv.appendChild(readBtn);
    if(item.repeat===false) {
        readBtn.textContent = '';
        readBtn.style.backgroundColor = '#e04f63';
    }else {
        readBtn.textContent = 'On Repeat';
        readBtn.style.backgroundColor = '#63da63'
    }

    removeBtn.textContent = 'Remove'; 
    removeBtn.setAttribute('id', 'removeBtn');
    songDiv.appendChild(removeBtn);
    
    library.appendChild(songDiv);

    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        setData()
        render();
    });

    //add toggle ability to each book 'read' button on click
    readBtn.addEventListener('click', () => { 
        item.repeat = !item.repeat; 
        setData(); 
        render();
    }); 
};

// setting Library to be stored in local storage
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls songs from local storage when page is refreshed
function restore() {
    if(!localStorage.myLibrary) {
        render();
    }else {
        let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();
