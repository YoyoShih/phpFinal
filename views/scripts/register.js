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

var account = ''

const form = document.forms['register']
const accountInput = form.elements.account
const passwordtInput = form.elements.password
const passwordCheckInput = form.elements.passwordCheck
const emailInput = form.elements.email
const sideInfo = document.getElementsByClassName('sideInfo')[0]
const sideInfoTitle = document.getElementsByClassName('sideInfo-title')[0]
const sideInfoIntro = document.getElementsByClassName('sideInfo-intro')[0]

accountInput.onfocus = function () {
    sideInfoTitle.innerHTML = '帳號名稱'
    sideInfoIntro.innerHTML = '每位帳戶的名稱都是獨一無二的!<br>填入專屬於你的名稱吧!<br>但要切記，不能超過20的字喔!'
    sideInfo.classList.add('sideInfo-moveLeft')
    sideInfo.classList.remove('sideInfo-moveRight')
}

accountInput.onblur = function () {
    sideInfo.classList.remove('sideInfo-moveLeft')
    sideInfo.classList.add('sideInfo-moveRight')
}

passwordtInput.onfocus = function () {
    sideInfoTitle.innerHTML = '您的密碼'
    sideInfoIntro.innerHTML = '請輸入包含大小寫英文及數字的10-20位的密碼<br>請務必使用複雜度較高的密碼，並將其牢記!'
    sideInfo.classList.add('sideInfo-moveLeft')
    sideInfo.classList.remove('sideInfo-moveRight')
}

passwordtInput.onblur = function () {
    sideInfo.classList.remove('sideInfo-moveLeft')
    sideInfo.classList.add('sideInfo-moveRight')
}

passwordCheckInput.onfocus = function () {
    sideInfoTitle.innerHTML = '密碼確認'
    sideInfoIntro.innerHTML = '請再次輸入您的密碼!<br>務必確認密碼是否相同!'
    sideInfo.classList.add('sideInfo-moveLeft')
    sideInfo.classList.remove('sideInfo-moveRight')
}

passwordCheckInput.onblur = function () {
    sideInfo.classList.remove('sideInfo-moveLeft')
    sideInfo.classList.add('sideInfo-moveRight')
}

emailInput.onfocus = function () {
    sideInfoTitle.innerHTML = '您的信箱'
    sideInfoIntro.innerHTML = '請輸入您的信箱!<br>特別注意的是，Yahoo的信箱是不被允許的'
    sideInfo.classList.add('sideInfo-moveLeft')
    sideInfo.classList.remove('sideInfo-moveRight')
}

emailInput.onblur = function () {
    sideInfo.classList.remove('sideInfo-moveLeft')
    sideInfo.classList.add('sideInfo-moveRight')
}

function registerFunc() {
    //registerSecond()
    account = accountInput.value
    const password = passwordtInput.value
    const passwordCheck = passwordCheckInput.value
    const email = emailInput.value
    const fail = document.getElementsByClassName('fail')

    if (!isValidPass(password)) {
        const passwordFail = fail[1]
        passwordFail.style.opacity = 1
    }
    else if (!isValidPassCheck(password, passwordCheck)) {
        const passwordCheckFail = fail[2]
        passwordCheckFail.style.opacity = 1
    }
    else if(!isValidEmail(email)) {
        const emailFail = fail[3]
        emailFail.style.opacity = 1
    }
    else {
        fetch('http://localhost/final/phpFinal/models/registration_check.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account: account,
                password: password,
                email: email
            })
        }).then(response => {
            response.json().then(result => {
                if (result.regSucc) {     
                    registerSecond()
                }
                else {
                    if (result.accountError) {
                        const accountFail = fail[0]
                        accountFail.style.opacity = 1     
                    }
                    else if (result.emailError) {
                        const emailFail = fail[3]
                        emailFail.style.opacity = 1    
                    }
                }
            })
        })
    }
}

function isValidPass(password){
    var i = /[0-9]+/
    var capital = /[A-Z]/
    var lower = /[a-z]/
    return password.length <= 20 && capital.test(password) && lower.test(password) && i.test(password)
}

function isValidPassCheck(password,passwordCheck) {
    return password == passwordCheck
}

function isValidEmail(email){
    var str = /@/
    return str.test(email)
}

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

function registerSecond() {
    const wrap = document.getElementsByClassName('wrap')[0]
    const middleMain = document.getElementsByClassName('middle-main')[0]
    middleMain.remove()
    const title = document.createElement('h1')
    title.className = 'title'
    title.innerHTML = '選擇您的動物頭貼吧!'
    const animalWrap = document.createElement('div')
    animalWrap.className = 'animals'
    wrap.append(title, animalWrap)
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
}


function register(animal) {
    fetch('http://localhost/final/phpFinal/models/registration_animal.php', {
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
                window.location.href = 'login.html'
            }
            else {
                
            }
        })
    })
}