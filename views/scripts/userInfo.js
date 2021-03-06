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

var account = '';
var nickname = '';
var sex = '';
var birthday = '';
var relationship = '';
var music = '';
var info = '';
var animal = '';

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
var animalsCopy = []
const len = animals.length
for (var i = 0; i < len;i++) animalsCopy.push(animals[i])
var animalSelect = 0

const profile_name = document.getElementsByClassName('profile-info-name')[0]
const profile_nickname = document.getElementsByClassName('profile-info-nickname')[0]
const profile_sex = document.getElementsByClassName('profile-info-sex')[0]
const profile_birthday = document.getElementsByClassName('profile-info-birthday')[0]
const profile_relationship = document.getElementsByClassName('profile-info-relationship')[0]
const profile_music = document.getElementsByClassName('profile-info-music')[0]
const profile_sticker = document.getElementsByClassName('profile-sticker')[0]
const top_block_sticker = document.getElementsByClassName('middle-main-top-block-sticker')[0]
const top_block_name = document.getElementsByClassName('middle-main-top-block-name')[0];

//  取得account的函數 進入頁面會馬上執行一次
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
    profile_name.innerHTML = account
    top_block_name.innerHTML = account
    getUserInfo()
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
    const blocks = document.querySelectorAll('.podcast-blocks')[0]
    var count = "0"
    while (podcast = result[count]) {
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

//  如果已經改過資料 將資料填入input裡
function getUserInfo() {
    fetch('http://localhost/final/phpFinal/models/getUserInfo.php', {
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
            animal = result.animal
            var animalURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/sticker/'+animal+'.png')
            animalURL.getDownloadURL().then((url) => {
                profile_sticker.src = url
                top_block_sticker.src = url
            })
            nickname = result.nickname
            profile_nickname.innerHTML = 'Nickname: ' + nickname
            sex = result.sex
            profile_sex.innerHTML = 'Sex: ' + sex
            birthday = result.birthday
            profile_birthday.innerHTML = 'Birthday: ' + birthday
            relationship = result.relationship
            profile_relationship.innerHTML = 'Relationship: ' + relationship
            music = result.music
            profile_music.innerHTML = 'Music: ' + music
            info = result.info
            animal = result.animal
            animalSelect = animals.indexOf(animal)
        })
    })
}

//  第一次按下帳戶資訊時執行動畫 並更改頁面
var temp = false
function goUserInfoFunc() {
    if (temp) return
    temp = true
    const backround = document.createElement('img')
    backround.src = '../src/userInfo_background_other.png'
    backround.className = 'background-other'
    const wrap = document.getElementsByClassName('wrap')[0]
    wrap.append(backround)

    setTimeout(() => {
        const right = document.getElementsByClassName('right-link')[0]
        right.remove()
        const top = document.getElementsByClassName('middle-main-top')[0]
        top.remove()
    },250)

    setTimeout(() => {
        const middle = document.getElementsByClassName('middle-main')[0]
        middle.remove()
    },400)
    
    setTimeout(async () => {
        var userInfoBelow = document.createElement('div')
        userInfoBelow.className = 'userInfo-below'

        var h2 = document.createElement('h2')
        h2.innerHTML = "帳戶資訊"

        var form = document.createElement('form')
        form.className = 'form'
        form.name = 'update'

        var p1 = document.createElement('p')
        p1.innerHTML = "暱稱"
        var input1 = document.createElement('input')
        input1.type = 'text'
        input1.name = 'nickname'
        input1.value = nickname
        input1.placeholder = '請輸入暱稱'
        var p2 = document.createElement('p')
        p2.innerHTML = "性別"
        var input2 = document.createElement('input')
        input2.type = 'text'
        input2.name = 'sex'
        input2.value = sex
        input2.placeholder = '請輸入性別'
        var p3 = document.createElement('p')
        p3.innerHTML = "生日"
        var input3 = document.createElement('input')
        input3.type = 'text'
        input3.name = 'birthday'
        input3.placeholder = '請輸入生日'
        input3.value = birthday
        var p4 = document.createElement('p')
        p4.innerHTML = "感情狀態"
        var input4 = document.createElement('input')
        input4.type = 'text'
        input4.name = 'relationship'
        input4.placeholder = '請輸入感情狀態'
        input4.value = relationship
        var p5 = document.createElement('p')
        p5.innerHTML = "音樂"
        var input5 = document.createElement('input')
        input5.type = 'text'
        input5.name = 'music'
        input5.placeholder = '請輸入音樂類型'
        input5.value = music
        var p6 = document.createElement('p')
        p6.innerHTML = "簡介"
        var input6 = document.createElement('textarea')
        input6.name = 'info'
        input6.placeholder = '請輸入簡介'
        input6.value = info
        var p7 = document.createElement('p')
        p7.innerHTML = "動物"
        var animalWrap = document.createElement('div')
        animalWrap.className = 'animals'

        form.append(p1, p2, input1, input2, p3, p4,input3,  input4, p5, p6, input5, input6, p7, animalWrap)
        var btn = document.createElement('button')
        btn.className = 'update-btn'
        btn.innerHTML = "更新"
        btn.addEventListener('click', updateFunc)
        userInfoBelow.append(h2,form, btn)
        wrap.append(userInfoBelow)
        var img = document.createElement('img')
        img.className = 'background'
        img.src = "../src/userInfo_background.png"
        wrap.append(img)

        animalWrap = document.getElementsByClassName('animals')[0]
        for (var i = 0; i < len; i++){
            const animalImg = document.createElement('img')
            const animal = animalsCopy.shift()
            const animalURL = storage.refFromURL('gs://phpfinal-2a350.appspot.com/sticker/'+animal+'.png')
            await animalURL.getDownloadURL().then((url) => {
                animalImg.src = url
            })
            animalImg.className = 'animal'
            if(i == animalSelect) animalImg.classList.add('animal-selected')
            animalWrap.append(animalImg)
            animalImg.onclick = () => {
                var target = document.getElementsByClassName('animal')[animalSelect]
                target.classList.remove('animal-selected')
                animalSelect = animals.indexOf(animal)
                target = document.getElementsByClassName('animal')[animalSelect]
                target.classList.add('animal-selected')
            }
        }
    }, 700)
    
    setTimeout(() => {
        var userInfoWrap = document.createElement('div')
        userInfoWrap.className = 'userInfo-wrap'
        wrap.append(userInfoWrap)

        const backround = document.getElementsByClassName('background-other')[0]
        backround.remove()
    },800)
}

//  填寫完畢後 將資料上傳
function updateFunc() {
    const form = document.forms['update']   //從update拿到
    const nickname = form.elements.nickname.value     //暱稱
    const sex = form.elements.sex.value     //性別
    const birthday = form.elements.birthday.value   //YYYY-MM-DD出生日期
    const relationship = form.elements.relationship.value   //感情狀態
    const music = form.elements.music.value        //喜歡音樂類型
    const info = form.elements.info.value
    fetch('http://localhost/final/phpFinal/models/user_information.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            account: account,
            nickname: nickname,
            sex: sex,
            birthday: birthday,
            relationship: relationship,
            music: music,
            info: info,
            animal: animals[animalSelect]
        })
    }).then(response => {
        response.json().then(result => {
            if (result.updateSucc) {   
                //console.log(result.account);      
                window.location.href = 'mainPage.html'  //改到主頁面
            }
            else {
                if (result.validSex) {                   
                    console.log('Invalid sex')      
                }
                else if (result.validBirthday) {
                    console.log('Invalid birthday')       
                }
                else if (result.validRelationship) {
                    console.log('Invalid relationship')       
                }
                else if (result.validMusic) {
                    console.log('Invalid music')       
                }
            }
        })
    })
}