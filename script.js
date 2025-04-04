const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const cover = document.getElementById("cover");
const song = document.getElementById("audio");
const play = document.getElementById("play")
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const currentProgress = document.getElementById("current-progress");
const progressConatiner = document.getElementById("progress-container");

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
const playslist = [oPato, sixDays, sunflower];
let index = 0;

let isPlaying = false;

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
    cover.src = `img/${playslist[index].file}.jpg`;
    song.src = `songs/${playslist[index].file}.mp3`;
    songName.innerHTML = playslist[index].songName;
    bandName.innerHTML = playslist[index].artist;
}

function previousSong(){
    if (index === 0){
        index = playslist.length - 1;
    }else{
        index -= 1
    }
    loadSong();
    playSong();
    
}

function nextSong(){
    if( index === playslist.length - 1){
        index = 0;
    }else{
        index += 1;
    }
    loadSong();
    playSong();
    
}

function updateProgressBar(){
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty("--progress", `${barWidth}%`);
}

function jumpTo(event){
    const width = progressConatiner.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}


loadSong();

play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgressBar);
progressConatiner.addEventListener("click", jumpTo)