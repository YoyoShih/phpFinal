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

function goPodcast() {
    window.location.href = 'podcast.html?open=true'
}

var thisURL = document.URL;
var getval = thisURL.split('?')[1];    
var crOpen = getval.split("=")[1];
if(crOpen) chat()

async function chat() {
    const rightTitle = document.querySelector('.right-link-title')
    const rightBody = document.querySelector('.right-link-body')
    rightTitle.innerHTML = '?????????'
    rightBody.innerHTML = ''
    var response = await fetch('http://localhost/final/phpFinal/models/getChattingFriend.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isCLick: true
        })
    })
    var result = await response.json()
    console.log(result)
    var count = "0"
    while (friend = result[count]) {
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
        fName.innerHTML = friend.nickname
        f.append(fImg, fLive, fName)
        f.addEventListener('click', () => {
            chatroom()
        })
        rightBody.append(f)
        count++
    }
}

async function chatroom() {
    const rightBody = document.querySelector('.right-link-body')
    rightBody.remove()
    const right = document.querySelector('.right-link')
    var chatroom = document.createElement('div')
    chatroom.className = 'right-link-chatroom'
    var header = document.createElement('div')
    header.className = 'chatroom-header'
    var name = document.createElement('p')
    name.className = 'header-name'
    name.innerHTML = 'Yoyo'
    var back = document.createElement('img')
    back.className = 'header-back'
    back.src = '../src/goback.png'
    header.append(name,back)
    var texts = document.createElement('div')
    texts.className = 'chatroom-texts'
    var response = await fetch('http://localhost/final/phpFinal/models/getText.php', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    var result = await response.json()
    //console.log(result)
    var nowAcc = result["0"]["owner"]
    var count = "1"
    while (object = result[count]) {
        var text = document.createElement('p')
        text.className = object.owner == nowAcc ? 'text-mine' : 'text-other'
        text.innerHTML = object.content
        texts.append(text)
        count++
    }
    var control = document.createElement('div')
    control.className = 'chatroom-control'
    var textInput = document.createElement('input')
    textInput.className = 'control-text'
    textInput.type = 'text'
    var textSubmit = document.createElement('input')
    textSubmit.className = 'control-submit'
    textSubmit.type = 'submit'
    textSubmit.addEventListener('click',() => {
        sendMessage()
    })
    control.append(textInput,textSubmit)
    chatroom.append(header, texts, control)
    right.append(chatroom)
}

async function sendMessage() {
    const texts = document.querySelector('.chatroom-texts')
    var input = document.querySelector('.control-text').value
    await fetch('http://localhost/final/phpFinal/models/uploadText.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: input
        })
    })
    var text = document.createElement('p')
    text.className = 'text-mine'
    text.innerHTML = input
    texts.append(text)
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
        rightTitle.innerHTML = '?????????????????????FB'
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
    rightTitle.innerHTML = '?????????????????????FB'
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