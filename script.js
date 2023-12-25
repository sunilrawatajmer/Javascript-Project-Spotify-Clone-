let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
// let audioElement = document.getElementById("songItem2");
let masterPlay = document.getElementById('masterPlay');
let myProgessBar = document.getElementById('myProgessBar');
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songName: "Tere Sang Yaara", filePath: "song/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Mera Ishq he tu", filePath: "song/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Mera Ishq he tu", filePath: "song/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "heeriye-heeriye", filePath: "song/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Ham to Diwane", filePath: "song/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Malang Sajna", filePath: "song/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Meri Jaan", filePath: "song/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Malang Sajna", filePath: "song/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Mera Ishq he Tu", filePath: "song/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Tu Mile Jaha ", filePath: "song/10.mp3", coverPath: "covers/10.jpg" },
];

songItems.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();

        makeAllPlays();//make all icons as play
        let playingSong = document.getElementsByClassName('curentPlay');
        playingSong[songIndex].classList.remove('fa', 'fa-play-circle-o');
        playingSong[songIndex].classList.add('fa', 'fa-pause');

        masterPlay.classList.remove('fa', 'fa-play-circle-o');
        masterPlay.classList.add('fa', 'fa-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa', 'fa-pause');
        masterPlay.classList.add('fa', 'fa-play-circle-o');
    }
});

audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    var progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgessBar.value = progress;
});

myProgessBar.addEventListener('change', () => {
    audioElement.currentTime = myProgessBar.value * audioElement.duration / 100;
});

//make all icons as play
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('curentPlay')).forEach((element) => {
        element.classList.remove('fa', 'fa-pause');
        element.classList.add('fa', 'fa-play-circle-o');
    })
}

Array.from(document.getElementsByClassName('curentPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if (audioElement.paused) {
            e.target.classList.remove('fa', 'fa-play-circle-o');
            e.target.classList.add('fa', 'fa-pause');
            audioElement.play();
            masterPlay.classList.remove('fa', 'fa-play-circle-o');
            masterPlay.classList.add('fa', 'fa-pause');
        } else {
            makeAllPlays();//make all icons as play
            e.target.classList.remove('fa', 'fa-pause');
            e.target.classList.add('fa', 'fa-play-circle-o');
            audioElement.pause();
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            // audioElement.play();
            masterPlay.classList.remove('fa', 'fa-pause');
            masterPlay.classList.add('fa', 'fa-play-circle-o');
        }
        // audioElement.src=`songs/${songIndex+1}.mp3`;
        // masterSongName.innerText = songs[songIndex].songName;
        // audioElement.currentTime=0;
        // audioElement.play();
        // masterPlay.classList.remove('fa', 'fa-play-circle-o');
        // masterPlay.classList.add('fa', 'fa-pause');
    });
});


document.getElementById('forward').addEventListener('click', () => {
    songIndex = (songIndex - 1) % songs.length;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    makeAllPlays();//make all icons as play
    let playingSong = document.getElementsByClassName('curentPlay');
    playingSong[songIndex].classList.remove('fa', 'fa-play-circle-o');
    playingSong[songIndex].classList.add('fa', 'fa-pause');

    masterPlay.classList.remove('fa', 'fa-play-circle-o');
    masterPlay.classList.add('fa', 'fa-pause');
});


document.getElementById('backward').addEventListener('click', () => {
    songIndex = (songIndex + 1 + songs.length) % songs.length;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    makeAllPlays();//make all icons as play
    let playingSong = document.getElementsByClassName('curentPlay');
    playingSong[songIndex].classList.remove('fa', 'fa-play-circle-o');
    playingSong[songIndex].classList.add('fa', 'fa-pause');

    masterPlay.classList.remove('fa', 'fa-play-circle-o');
    masterPlay.classList.add('fa', 'fa-pause');
});


//for play next Song
audioElement.addEventListener('ended', () => {
    playNextSong();
});
const playNextSong = () => {
    makeAllPlays();
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    let playingSong = document.getElementsByClassName('curentPlay');
    playingSong[songIndex].classList.remove('fa', 'fa-play-circle-o');
    playingSong[songIndex].classList.add('fa', 'fa-pause');

    masterPlay.classList.remove('fa', 'fa-play-circle-o');
    masterPlay.classList.add('fa', 'fa-pause');
};
//end for play next Song