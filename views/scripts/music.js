var firebaseConfig = {
    apiKey: "AIzaSyBKzDjs8rZ9huxr3hkUsyGWKFYJFqR8ls0",
    authDomain: "phpfinal-2a350.firebaseapp.com",
    projectId: "phpfinal-2a350",
    storageBucket: "phpfinal-2a350.appspot.com",
    messagingSenderId: "158655882955",
    appId: "1:158655882955:web:ae4ac58b858a1167d75d4e"
};
if (!firebase.apps.length) {
   firebase.initializeApp({});
}else {
   firebase.app();
}
var storage = firebase.storage()

setTimeout(() => {
    const mask = document.getElementsByClassName('mask')[0]
    mask.remove()
}, 2000)

const musicBlocks = document.getElementsByClassName('music-blocks')[0];
(async function getMusic() {
    var musics = []
    const response = await fetch('http://localhost/final/phpFinal/models/getUserMusic.php', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    musics = await response.json()
    var music = ''
    var count = "1"
    while (music = musics[count]) {
        var musicName = music.songName
        var musicPro = music.produce
        var musicType = music.genre

        var musicBlock = document.createElement('div')
        musicBlock.className = 'music-block'
        var musicBlockCover = document.createElement('img')
        musicBlockCover.className = 'music-block-cover'
        const musicURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/music_cover/'+musicName+'_'+musicPro+'_'+musicType+'.jpg')
        await musicURL.getDownloadURL().then((url) => {
            musicBlockCover.src = url
        })
        var musicBlockIntro = document.createElement('div')
        musicBlockIntro.className = 'music-block-intro'
        var musicBlockIntroMain = document.createElement('div')
        musicBlockIntroMain.className = 'music-block-intro-main'
        var musicBlockIntroMainName = document.createElement('div')
        musicBlockIntroMainName.className = 'music-block-intro-main-name'
        musicBlockIntroMainName.innerHTML = musicName
        var musicBlockIntroMainProduce = document.createElement('div')
        musicBlockIntroMainProduce.className = 'music-block-intro-main-produce'
        musicBlockIntroMainProduce.innerHTML = musicPro
        musicBlockIntroMain.append(musicBlockIntroMainName, musicBlockIntroMainProduce)
        var musicBlockIntroBlank = document.createElement('div')
        musicBlockIntroBlank.className = 'music-block-intro-blank'
        var musicBlockIntroType = document.createElement('div')
        musicBlockIntroType.className = 'music-block-intro-type'
        musicBlockIntroType.innerHTML = musicType
        musicBlockIntro.append(musicBlockIntroMain, musicBlockIntroBlank, musicBlockIntroType)
        musicBlock.append(musicBlockCover, musicBlockIntro)
                
        musicBlocks.prepend(musicBlock)
        count++
    }
})()

function logout() {
    fetch('http://localhost/final/phpFinal/models/logout.php', { //rick:http://localhost/final/phpFinal/models/login_check.php     white:http://localhost/phpFinal/models/login_check.php      yoyo:http://localhost/User_Project/login_check.php
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(window.location.href = 'login.html')
}

function goSearch() {
    window.location.href = 'search.html'
}

function goFB() {
    window.open('fb.html','test')
}