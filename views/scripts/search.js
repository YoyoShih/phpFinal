var firebaseConfig = {
    apiKey: "AIzaSyBKzDjs8rZ9huxr3hkUsyGWKFYJFqR8ls0",
    authDomain: "phpfinal-2a350.firebaseapp.com",
    projectId: "phpfinal-2a350",
    storageBucket: "phpfinal-2a350.appspot.com",
    messagingSenderId: "158655882955",
    appId: "1:158655882955:web:ae4ac58b858a1167d75d4e"
};
firebase.initializeApp(firebaseConfig);

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

(function getAccount() {
    fetch('http://localhost/final/phpFinal/models/user_information.php', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        response.json().then(result => {
            account = result.account
        })
    })
})();

(function searchPeople() {
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
            //拿到隨機三個人
        })
    })
})()

const like = document.getElementsByClassName('like')[0]

function likeOrDislike(obj) {
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
    //下一個人
}
