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

const podcaster = document.querySelector('.podcaster-img')
const topURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/sticker/chicken.png')
topURL.getDownloadURL().then((url) => {
    podcaster.src = url
})

var pods = [
    { title: "職場戀愛史(中)", date: "6/19", time: "43:20" },
    { title: "職場戀愛史(上)", date: "6/18", time: "31:12" },
    { title: "度蜜月的回憶", date: "6/15", time: "50:47" },
    { title: "關於情侶這件事...", date: "6/10", time: "29:03" },
    { title: "畢業後的選擇(下)", date: "6/08", time: "42:31" },
    { title: "畢業後的選擇(上)", date: "6/07", time: "41:02" },
    { title: "學生時期戀愛史(下)", date: "6/05", time: "57:26" },
    { title: "學生時期戀愛史(中)", date: "6/04", time: "1:02:23" },
    { title: "學生時期戀愛史(上)", date: "6/01", time: "55:54" },
    { title: "第一次吵架(下)", date: "5/31", time: "15:20" },
    { title: "第一次吵架(上)", date: "5/29", time: "46:53" },
    { title: "在一起後的大小事", date: "5/28", time: "37:28" },
    { title: "耶誕晚會和耶誕城", date: "5/26", time: "51:01" },
    { title: "8年前的「520」", date: "5/20", time: "1:00:23" },
    { title: "8年前的「520」的前一天", date: "5/19", time: "1:13:47" },
    { title: "我們認識的第一天", date: "5/16", time: "50:06" },
    { title: "在談戀以前...(下)", date: "5/12", time: "38:52" },
    { title: "在談戀以前...(上)", date: "5/10", time: "37:19" },
    { title: "為甚麼想錄這個podcast", date: "5/7", time: "39:16" }
]
const list = document.querySelector('.list-wrapper')
var count = "0"
while (pod = pods[count]) {
    var title = document.createElement('p')
    title.className = 'pod-title'
    title.innerHTML = (parseInt(count)+1).toString() + " " + pod.title
    var date = document.createElement('p')
    date.innerHTML = pod.date
    var time = document.createElement('p')
    time.innerHTML = pod.time
    list.append(title,date,time)
    count++
}

const loveImg = document.querySelector('.love')
var temp = false
function love() {
    if (!temp) {
        loveImg.src = '../src/loved.png'
        temp = true
        fetch('http://localhost/final/phpFinal/models/lovePodcast.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:"ChiWhite",
                love: true
            })
        })
    }
    else {
        loveImg.src = '../src/love.png'
        temp = false
        fetch('http://localhost/final/phpFinal/models/lovePodcast.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:"ChiWhite",
                love: false
            })
        })
    }
}