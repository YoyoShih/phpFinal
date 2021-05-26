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

var animals = [
    'bird',
    'cat',
    'chicken',
    'cow',
    'elephant',
    'frog',
    'giraffe',
    'koala',
    'mouse',
]

const len = animals.length

const block = document.getElementsByClassName('animals')[0]

for (var i = 0; i < len; i++){
    const animalImg = document.createElement('img')
    const animal = animals.shift()
    const animalURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/sticker/'+animal+'.png')
    animalURL.getDownloadURL().then((url) => {
        animalImg.src = url
    })
    animalImg.className = 'animal'
    block.append(animalImg)
    animalImg.onclick = () => {
        register(animal)
    }
}

function register(animal) {
    fetch('http://localhost/final/phpFinal/models/registration_check.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            account: account,
            animal: animal
        })
    }).then(response => {
        response.json().then(result => {
            if (result.regSucc) {     
                window.location.href = 'login.html'  //改到登入畫面
            }
            else {
                
            }
        })
    })
}
