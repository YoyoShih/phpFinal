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
    var podcasts = result.podcasts
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
        animalURL.getDownloadURL().then((url) => {
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
]

async function goFB() {
    const rightTitle = document.querySelector('.right-link-title')
    const rightBody = document.querySelector('.right-link-body')
    window.open('fb.html')
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

async function renew() {
    var count = "0"
    var podcastsHot = [
        { animal: "mouse", nickname: "ChiWhite", title: "我和我學生時期認識的老婆的戀愛辛酸史" },
        { animal: "elephant", nickname: "YaoLinShu", title: "台三線私房景點大公開!" }
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
        { animal: "frog", nickname: "YiShao", title: "我在出國留學前的準備" },
        { animal: "bird", nickname: "BoBo", title: "疫情時期出國留學需要注意的大小事" }
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
}