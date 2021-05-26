var firebaseConfig = {
    apiKey: "AIzaSyBKzDjs8rZ9huxr3hkUsyGWKFYJFqR8ls0",
    authDomain: "phpfinal-2a350.firebaseapp.com",
    projectId: "phpfinal-2a350",
    storageBucket: "phpfinal-2a350.appspot.com",
    messagingSenderId: "158655882955",
    appId: "1:158655882955:web:ae4ac58b858a1167d75d4e"
};
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage()

setTimeout(() => {
    var mask = document.getElementsByClassName('mask')[0]
    var logo = document.getElementsByClassName('logo')[0]
    var left = document.getElementsByClassName('left')[0]
    var right = document.getElementsByClassName('right')[0]
    mask.remove()
    logo.remove()
    left.remove()
    right.remove()
}, 2000);

var account = '';
var accountArr = []     // account, nickname, animal, info
var accountObj = '';
    
(function getAccount() {
    fetch('http://localhost/final/phpFinal/models/login_check.php', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        response.json().then(result => {
            account = result.account
            searchPeople()
        })
    })
})();

//  取的隨機三個人的資料 馬上執行
function searchPeople() {
    fetch('http://localhost/final/phpFinal/models/search.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            account: account
        })
    }).then(response => {
        response.json().then(result => {
            console.log(result.account1)
            console.log(result.account2)
            console.log(result.account3)
            accountArr.push(result.account2, result.account3)
            accountObj = result.account1
        })
    })
}

var start_mask = document.getElementsByClassName('start-mask')[0]
//  音檔撥放
function firstPlay(e) {
    audioPlay()
    e.remove()
    start_mask.remove()
}

var animal = ''
var audio = ''

const accountSticker = document.getElementsByClassName('main-block-sticker')[0]
const accountName = document.getElementsByClassName('main-block-name')[0]
const accountInfo = document.getElementsByClassName('main-block-info')[0]

function audioPlay() {
    var objName = accountObj.nickname
    var audioRef = storage.refFromURL('gs://phpfinal-2a350.appspot.com/audio/'+objName+'.mp3')
    audioRef.getDownloadURL().then((url) => {
        audio = new Audio(url)
        audio.play()
    })
    animal = accountObj.animal
    var animalURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/sticker/'+animal+'.png')
    animalURL.getDownloadURL().then((url) => {
        accountSticker.src = url
    })
    accountName.innerHTML = accountObj.nickname
    accountInfo.innerHTML = accountObj.information
}

//  左滑或右滑後的判斷
const like = document.getElementsByClassName('like')[0]
function likeOrDislike(obj) {
    audio.pause()
    accountObj = accountArr.shift()
    audioPlay()
    fetch('http://localhost/final/phpFinal/models/likeOrDislike.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            like: (obj === like),
            name: accountObj.account
        })
    }).then(response => {
        response.json().then(result => {
            console.log(account);
            //accountArr.push(result.account)
        })
    })
}

function goBack() {
    window.location.href = 'mainPage.html'
}
