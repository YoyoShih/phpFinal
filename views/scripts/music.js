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

const top_block_sticker = document.getElementsByClassName('middle-main-top-block-sticker')[0]
const top_block_name = document.getElementsByClassName('middle-main-top-block-name')[0];

var account = '';
(async function getAccount() {
    renew()
    var response = await fetch('http://localhost/final/phpFinal/models/login_check.php', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    var result = await response.json()
    account = result.account
    top_block_name.innerHTML = account
    var response = await fetch('http://localhost/final/phpFinal/models/getUserInfo.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            account: account
        })
    })
    var result = await response.json()
    var animal = result.animal
    var animalURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/sticker/' + animal + '.png')
     animalURL.getDownloadURL().then((url) => {
        top_block_sticker.src = url
     })
    var response = await fetch('http://localhost/final/phpFinal/models/getMusic.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            account: account
        })
    })
    var result = await response.json()
    var musics = result
    const blocks = document.querySelectorAll('.music-blocks')[0]
    var count = "0"
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
        blocks.prepend(musicBlock)
        count++
    }
})();

function goSearch() {
    window.location.href = 'search.html'
}

var friends = [
    {
        name: "Yoyo",
        animal: "bird",
        live: true
    },
    {
        name: "rick",
        animal: "cat",
        live: true
    },
    {
        name: "amber",
        animal: "frog",
        live: false
    },
    {
        name: "alex",
        animal: "koala",
        live: true
    },
    {
        name: "dennnis",
        animal: "bird",
        live: false
    },
    {
        name: "87white",
        animal: "cow",
        live: true
    }
];

(async function check() {
    const rightTitle = document.querySelector('.right-link-title')
    const rightBody = document.querySelector('.right-link-body')
    const response = await fetch('http://localhost/final/phpFinal/models/fb_connect.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isCLick: false
        })
    })
    var result = await response.json()
    if (result.isFB) {
        rightTitle.innerHTML = '您已連結至您的FB'
        rightBody.innerHTML = ''
        var friend = ''
        var count = "0"
        while (friend = friends[count]) {
            var f = document.createElement('div')
            f.className = 'friend'
            var fImg = document.createElement('img')
            fImg.className = 'friend-img'
            const fURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/sticker/' + friend.animal + '.png')
            await fURL.getDownloadURL().then((url) => {
                fImg.src = url
            })
            var fLive = document.createElement('div')
            friend.live ? fLive.className = 'friend-live' : fLive.className = 'friend-not-live'
            var fName = document.createElement('div')
            fName.innerHTML = friend.name
            f.append(fImg, fLive, fName)
            rightBody.append(f)
            count++
        }
    }
})();

async function goFB() {
    const rightTitle = document.querySelector('.right-link-title')
    const rightBody = document.querySelector('.right-link-body')
    window.open('fb.html')
    fetch('http://localhost/final/phpFinal/models/fb_connect.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isCLick: true
        })
    })
    rightTitle.innerHTML = '您已連結至您的FB'
    rightBody.innerHTML = ''
    var friend = ''
    var count = "0"
    while (friend = friends[count]) {
        var f = document.createElement('div')
        f.className = 'friend'
        var fImg = document.createElement('img')
        fImg.className = 'friend-img'
        const fURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/sticker/'+friend.animal+'.png')
        await fURL.getDownloadURL().then((url) => {
            fImg.src = url
        })
        var fLive = document.createElement('div')
        friend.live ? fLive.className = 'friend-live' : fLive.className = 'friend-not-live'
        var fName = document.createElement('div')
        fName.innerHTML = friend.name
        f.append(fImg,fLive,fName)
        rightBody.append(f)
        count++
    }
}

function goMainpage() {
    window.location.href = 'mainpage.html'
}

function goPodcast() {
    window.location.href = 'podcast.html'
}

async function renew() {
    var count = "0"
    var musicEast = [
        { songName: "This is acting", produce: "Sia", genre: "Weird" },
        { songName: "Night Visions", produce: "Imagine Dragons", genre: "Rock" },
    ]
    const blocksEast = document.querySelectorAll('.music-blocks')[1]
    var count = "0"
    while (music = musicEast[count]) {
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
        blocksEast.prepend(musicBlock)
        count++
    }

    count = "0"
    var musicChinese = [
        { songName: "床邊故事", produce: "周杰倫", genre: "流行" },
        { songName: "She Says", produce: "林俊傑", genre: "流行" },
    ]
    const blocksAbroad = document.querySelectorAll('.music-blocks')[2]
    while (music = musicChinese[count]) {
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
        blocksAbroad.prepend(musicBlock)
        count++
    }
    // const ChiWhite = document.querySelectorAll('.podcast-block')[2]
    // ChiWhite.addEventListener('click', () => {
    //     window.location.href = 'podcaster.html'
    // })
}