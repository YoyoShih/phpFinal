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

var account = '';
var nickname = '';
var sex = '';
var birthday = '';
var relationship = '';
var music = '';
var animal = '';

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
            profile_name.innerHTML = account
            top_block_name.innerHTML = account
            getUserInfo()
        })
    })
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
    },300)

    setTimeout(() => {
        const middle = document.getElementsByClassName('middle-main')[0]
        middle.remove()
    },400)
    
    setTimeout(() => {
        var userInfoBelow = document.createElement('div')
        userInfoBelow.className = 'userInfo-below'
        var form = document.createElement('form')
        form.className = 'form'
        form.name = 'update'
        var h2 = document.createElement('h2')
        h2.innerHTML = "帳戶資訊"
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
        form.append(h2, p1, input1, p2, input2, p3, input3, p4, input4, p5, input5)
        var btn = document.createElement('button')
        btn.className = 'update-btn'
        btn.innerHTML = "更新"
        btn.addEventListener('click',updateFunc)
        userInfoBelow.append(form,btn)
        wrap.append(userInfoBelow)

        var img = document.createElement('img')
        img.className = 'background'
        img.src = "../src/userInfo_background.png"
        wrap.append(img)
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
            music: music
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