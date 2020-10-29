const songlist = [
  {
    id: 1,
    name: "Gucci Flip Flops",
    artist: "Bhad Bhabie",
    thumbnail: "https://m.media-amazon.com/images/I/71OJTeihcbL._SS500_.jpg",
    song: "./resources/music/gucci-flip-flops.mp3",
  },
  {
    id: 2,
    name: "Black and Yellow",
    artist: "Wiz Khalifa",
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/I/51Cy9l3MNPL.jpg",
    song: "./resources/music/Black-and-Yellow.mp3",
  },
  {
    id: 3,
    name: "Legends",
    artist: "Juice Wrld",
    thumbnail:
      "https://images.genius.com/c6d769cd00143ada31004f9d6d24fd27.1000x1000x1.jpg",
    song: "./resources/music/Juice-WRLD-Legends.mp3",
  },
  {
    id: 4,
    name: "Infinity 888",
    artist: "XXXTENTACION & Joey Bada$$",
    thumbnail:
      "https://images.genius.com/8b673f80818e4cc1b975e8d8cd81344c.1000x1000x1.png",
    song: "./resources/music/infinity-888.mp3",
  },
  {
    id: 5,
    name: "Lost In Translation",
    artist: "Logic",
    thumbnail:
      "https://images.genius.com/b8bc3fc4f330e08a83f5fc20182b092f.1000x1000x1.png",
    song: "./resources/music/Logic-Lost-In-Translat.mp3",
  },
  {
    id: 6,
    name: "Mama / Show Love",
    artist: "Logic (feat. YBN Cordae)",
    thumbnail:
      "https://images.genius.com/b8bc3fc4f330e08a83f5fc20182b092f.1000x1000x1.png",
    song: "./resources/music/Logic-Mama-Show-Love.mp3",
  },
];

const btn_next = document.getElementById("btnForward");
const btn_play = document.getElementById("play-button-icon");
const btn_last = document.getElementById("btnBackward");
const lbl_artist = document.getElementById("lblArtist");
const lbl_songName = document.getElementById("lblSongName");
const thumbnail = document.getElementById("imgThumbnail");
const audio = document.getElementById("myAudio");
const lbl_audioMinTime = document.getElementById("songDurationMin");
const lbl_audioMaxTime = document.getElementById("songDurationMax");
const timeSlider = document.getElementById("audioDuration");

let numSongCounter = 1;
let audioState = 0;
audio.volume = 0.25;

changeSong();
songDuration();
setInterval(() => {
  songActualTime(audioState);
}, 1000);

/* Este metodo permite pasar a la siguiente cancion
    En caso de que el contador sea mayor al numero de
    canciones se le redirige a la primera cancion
    en otro caso el contador aumenta normalmente. */
function SkipForward() {
  if (numSongCounter > songlist.length - 1) {
    numSongCounter = 1;
  } else {
    numSongCounter++;
  }
  changeSong();
}

/* Este metodo permite pasar a la anterior cancion
    En caso de que el contador sea menor a 0 la cancion
    pasara a ser la ultima cancion de la playlist
    de lo contrario el metodo funciona normalmente,
    permite retroceder la cancion. */
function SkipBackward() {
  if (numSongCounter <= 1) {
    numSongCounter = songlist.length;
  } else {
    numSongCounter--;
  }
  changeSong();
}

function changeSong() {
  thumbnail.style.display = "none";
  thumbnail.classList.remove("fade-in");
  songlist.map((song) => {
    if (numSongCounter === song.id) {
      songDuration();
      lbl_songName.innerHTML = song.name;
      lbl_artist.innerHTML = song.artist;
      thumbnail.src = song.thumbnail;
      audioSource.src = song.song;
      audio.load();
      audio.play();
      audioState = 1;
      timeSlider.value = 0;
      lbl_audioMinTime.innerHTML = `0:00`;
      btn_play.src = "./resources/img/pause-fill.svg";
      FadeImage(0);
    }
  });
}

function playAudio() {
  audioState++;

  if (audioState === 1) {
    audio.play();
    btn_play.src = "./resources/img/pause-fill.svg";
  } else if (audioState === 2) {
    audio.pause();
    btn_play.src = "./resources/img/play-fill.svg";
  } else if (audioState === 3) {
    audioState = 1;
    btn_play.src = "./resources/img/pause-fill.svg";
    audio.play();
  }
}

function songDuration() {
  setTimeout(() => {
    timeSlider.max = Math.round(audio.duration);
    let minutes = Math.floor(audio.duration / 60);
    let seconds = Math.round(audio.duration - minutes * 60);
    if (seconds > 0 && seconds < 10) {
      seconds = `0${seconds}`;
    }
    lbl_audioMaxTime.innerHTML = `${minutes}:${seconds}`;
  }, 100);
}

function songActualTime(audioState) {
  if (audioState == 1) {
    timeSlider.value++;
    if (timeSlider.value < 10) {
      lbl_audioMinTime.innerHTML = `0:0${timeSlider.value}`;
    } else if (timeSlider.value < 60) {
      lbl_audioMinTime.innerHTML = `0:${timeSlider.value}`;
    } else {
      let minutes = Math.floor(timeSlider.value / 60);
      let seconds = Math.round(timeSlider.value - minutes * 60);
      if (seconds >= 0 && seconds < 10) {
        seconds = `0${seconds}`;
      }
      lbl_audioMinTime.innerHTML = `${minutes}:${seconds}`;
    }
  } else if (audioState == 2) {
    timeSlider.value == 0;
  }

  if (timeSlider.value === timeSlider.max) {
    if (numSongCounter > songlist.length) {
      numSongCounter = 1;
    } else {
      numSongCounter++;
    }
    changeSong();
  }
}

function changeAudioTime() {
  audio.currentTime = timeSlider.value;
}

/* Metodo que permite poner la animación de fade-in
en el album de la canción. */
function FadeImage(time) {
  setTimeout(() => {
    thumbnail.style.display = "block";
    thumbnail.classList.add("fade-in");
  }, time);
}
