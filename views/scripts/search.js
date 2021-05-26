//  firebase用來儲存音檔 下面是設定
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

//  2秒後將開頭動畫的元素刪除
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

//  取得account的函數 進入頁面會馬上執行一次
var account = '1';
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
            console.log(account)
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
        })
    })
}

var start_mask = document.getElementsByClassName('start-mask')[0]
//  音檔撥放
function firstPlay(e) {
    e.remove()
    start_mask.remove()
    audioPlay()
}

function audioPlay() {
    var audioRef = storage.refFromURL('gs://phpfinal-2a350.appspot.com/'+account+'.mp3')
    audioRef.getDownloadURL().then((url) => {
        var audio = new Audio(url)
        audio.play()
    })
}

//  左滑或右滑後的判斷
const like = document.getElementsByClassName('like')[0]
function likeOrDislike(obj) {
    //顯示下一個人和播放下一個人的音檔
    fetch('http://localhost/final/phpFinal/models/likeOrDislike.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            like: (obj === like),
            name: ''
        })
    }).then(response => {
        response.json().then(result => {
            //多拿到一個人
        })
    })
}

function goBack() {
    window.location.href = 'mainPage.html'
}
