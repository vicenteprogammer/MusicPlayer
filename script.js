const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const cover = document.getElementById("cover");
const song = document.getElementById("audio");
const play = document.getElementById("play")
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const totalTime = document.getElementById("total-time");
const songTime = document.getElementById("song-time");
const oPato = {
    songName : "O Pato",
    artist: "João Gilberto",
    file: "o_pato"
};

const sixDays = {
    songName : "Six Days",
    artist : "DJ Shadow",
    file: "six_days"
};

const sunflower = {
    songName : "Sunflower",
    artist : "Post Malone",
    file : "sunflower"
};
const playlist = [oPato, sixDays, sunflower];
let sortedPlaylist = [...playlist];
let index = 0;

let isPlaying = false;
let isShuffle = false;
let repeatOn = false;

function playSong(){
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play();
    isPlaying = true;
    
}

function pauseSong(){
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }else{
        playSong();
    }
}

function loadSong(){
    cover.src = `img/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerHTML = sortedPlaylist[index].songName;
    bandName.innerHTML = sortedPlaylist[index].artist;
}

function previousSong(){
    if (index === 0){
        index = sortedPlaylist.length - 1;
    }else{
        index -= 1
    }
    loadSong();
    playSong();
    
}

function nextSong(){
    if( index === sortedPlaylist.length - 1){
        index = 0;
    }else{
        index += 1;
    }
    loadSong();
    playSong();
    
}

function updateProgress(){
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty("--progress", `${barWidth}%`);

    songTime.innerHTML = toHHMMSS(song.currentTime);
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let indexrandom = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[indexrandom];
        preShuffleArray[indexrandom] = aux;
        currentIndex -= 1;
    }

}

function shuffleButtonClicked(){
    if(isShuffle === false){
        isShuffle = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add("button-activate");
    }else{
        isShuffle = false;
        shuffleArray(playlist);
        shuffleButton.classList.remove("button-activate")
    }
}

function repeatSong(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add("button-activate");
    }else{
        repeatOn = false;
        repeatButton.classList.remove("button-activate");
    }
}

function nextOrRepeat(){
    if(repeatOn === false){
        nextSong();
    }else{
        playSong();
    }
}

function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let sec = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, "0")}:${min.toString().padStart(2 , "0")}:${sec.toString().padStart(2, "0")}`

}

function updateTotalTime(){
    totalTime.innerHTML = toHHMMSS(song.duration);
}


loadSong();

play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgress);
song.addEventListener("ended", nextOrRepeat);
song.addEventListener("loadedmetadata", updateTotalTime);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click",shuffleButtonClicked);
repeatButton.addEventListener("click", repeatSong)