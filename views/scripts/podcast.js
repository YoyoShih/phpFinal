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
    var response = await fetch('http://localhost/final/phpFinal/models/getPastPodcast.php', {
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
    var podcasts = result
    const blocks = document.querySelectorAll('.podcast-blocks')[0]
    var count = "0"
    while (podcast = podcasts[count]) {
        animal = podcast.animal
        var nickname = podcast.nickname
        var title = podcast.title
        var block = document.createElement('div')
        block.className = 'podcast-block'
        var blockImg = document.createElement('img')
        blockImg.className = 'podcast-block-img'
        var animalURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/sticker/' + animal + '.png')
        await animalURL.getDownloadURL().then((url) => {
            blockImg.src = url
        })
        var blockName = document.createElement('div')
        blockName.className = 'podcast-block-name'
        blockName.innerHTML = nickname
        var blockTitle = document.createElement('div')
        blockTitle.className = 'podcast-block-title'
        blockTitle.innerHTML = title
        block.append(blockImg,blockName,blockTitle)
        blocks.prepend(block)
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

function goMainpage() {
    window.location.href = 'mainpage.html'
}

function goPodcast() {
    window.location.href = 'podcast.html'
}

async function renew() {
    var count = "0"
    var podcastsHot = [
        { animal: "chicken", nickname: "ChiWhite", title: "??????????????????????????????????????????????????????" },
        { animal: "elephant", nickname: "YaoLinShu", title: "??????????????????????????????!" }
    ]
    const blocksHot = document.querySelectorAll('.podcast-blocks')[1]
    while (podcast = podcastsHot[count]) {
        animal = podcast.animal
        var nickname = podcast.nickname
        var title = podcast.title
        var block = document.createElement('div')
        block.className = 'podcast-block'
        var blockImg = document.createElement('img')
        blockImg.className = 'podcast-block-img'
        var animalURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/sticker/' + animal + '.png')
        await animalURL.getDownloadURL().then((url) => {
            blockImg.src = url
        })
        var blockName = document.createElement('div')
        blockName.className = 'podcast-block-name'
        blockName.innerHTML = nickname
        var blockTitle = document.createElement('div')
        blockTitle.className = 'podcast-block-title'
        blockTitle.innerHTML = title
        block.append(blockImg,blockName,blockTitle)
        blocksHot.prepend(block)
        count++
    }

    count = "0"
    var podcastsAbroad = [
        { animal: "frog", nickname: "YiShao", title: "??????????????????????????????" },
        { animal: "bird", nickname: "BoBo", title: "????????????????????????????????????????????????" }
    ]
    const blocksAbroad = document.querySelectorAll('.podcast-blocks')[2]
    while (podcast = podcastsAbroad[count]) {
        animal = podcast.animal
        var nickname = podcast.nickname
        var title = podcast.title
        var block = document.createElement('div')
        block.className = 'podcast-block'
        var blockImg = document.createElement('img')
        blockImg.className = 'podcast-block-img'
        var animalURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/sticker/' + animal + '.png')
        await animalURL.getDownloadURL().then((url) => {
            blockImg.src = url
        })
        var blockName = document.createElement('div')
        blockName.className = 'podcast-block-name'
        blockName.innerHTML = nickname
        var blockTitle = document.createElement('div')
        blockTitle.className = 'podcast-block-title'
        blockTitle.innerHTML = title
        block.append(blockImg,blockName,blockTitle)
        blocksAbroad.prepend(block)
        count++
    }
    const ChiWhite = document.querySelectorAll('.podcast-block')[2]
    ChiWhite.addEventListener('click', () => {
        window.location.href = 'podcaster.html'
    })
}