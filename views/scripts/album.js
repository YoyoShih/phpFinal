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
    animal = result.animal
    var animalURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/sticker/' + animal + '.png')
    animalURL.getDownloadURL().then((url) => {
        top_block_sticker.src = url
    })
})();

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

const albumImg = document.querySelector('.album-img')
const imgURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/music_cover/This is acting_Sia_Weird.jpg')
imgURL.getDownloadURL().then((url) => {
    albumImg.src = url
})

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

const album = document.querySelector('.album-img')
const topURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/music_cover/This is acting_Sia_Weird.png')
topURL.getDownloadURL().then((url) => {
    album.src = url
})

function goMainpage() {
    window.location.href = 'mainpage.html'
}

function goPodcast() {
    window.location.href = 'podcast.html'
}

var musics = [
    { title: "Bird Set Tree", time: "4:12" },
    { title: "Alive", time: "4:23" },
    { title: "One million Bullets", time: "4:12" },
    { title: "Move Your Body", time: "4:07" },
    { title: "Unstoppable", time: "3:37" },
    { title: "Cheap Thrills", time: "3:31" },
    { title: "Reaper", time: "3:39" },
    { title: "House on Fire", time: "4:01" },
    { title: "Footprints", time: "3:13" },
    { title: "Sweet Design", time: "2:25" },
    { title: "Broken Glass", time: "4:24" },
    { title: "Space Between", time: "4:48" },
]

const list = document.querySelector('.list-wrapper')
var count = "0"
while (music = musics[count]) {
    var title = document.createElement('p')
    title.className = 'album-title'
    title.innerHTML = (parseInt(count)+1).toString() + " " + music.title
    var time = document.createElement('p')
    time.innerHTML = music.time
    list.append(title,time)
    count++
}

const loveImg = document.querySelector('.love')
var temp = false
function love() {
    if (!temp) {
        loveImg.src = '../src/loved.png'
        temp = true
        fetch('http://localhost/final/phpFinal/models/loveAlbum.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                album: "This is acting",
                love: true
            })
        })
    }
    else {
        loveImg.src = '../src/love.png'
        temp = false
        fetch('http://localhost/final/phpFinal/models/loveAlbum.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                album: "This is acting",
                love: false
            })
        })
    }
}