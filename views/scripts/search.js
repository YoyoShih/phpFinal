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

(function searchPeople() {
    fetch('http://localhost/final/phpFinal/models/search.php', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
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
