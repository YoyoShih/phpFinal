var sex = '';
var birthday = '';
var emotional = '';
var music = '';

(function getUserInfo() {
    fetch('http://localhost/final/phpFinal/models/getUserInfo.php', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(response => {
        response.json().then(result => {
            sex = result.sex
            birthday = result.birthday
            emotional = result.emotional
            music = result.music
        })
    })
})()

function goUserInfoFunc() {
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
        p1.innerHTML = "性別"
        var input1 = document.createElement('input')
        input1.type = 'text'
        input1.name = 'sex'
        input1.value = sex
        input1.placeholder = '請輸入性別'
        var p2 = document.createElement('p')
        p2.innerHTML = "生日"
        var input2 = document.createElement('input')
        input2.type = 'text'
        input2.name = 'birthday'
        input2.placeholder = '請輸入生日'
        input2.value = birthday
        var p3 = document.createElement('p')
        p3.innerHTML = "感情狀態"
        var input3 = document.createElement('input')
        input3.type = 'text'
        input3.name = 'emotional'
        input3.placeholder = '請輸入感情狀態'
        input3.value = emotional
        var p4 = document.createElement('p')
        p4.innerHTML = "音樂"
        var input4 = document.createElement('input')
        input4.type = 'text'
        input4.name = 'music'
        input4.placeholder = '請輸入音樂類型'
        input4.value = music
        form.append(h2, p1, input1, p2, input2, p3, input3, p4, input4)
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

function updateFunc() {
    const form = document.forms['update']   //從update拿到
    const sex = form.elements.sex.value     //性別
    const birthday = form.elements.birthday.value   //YYYY-MM-DD出生日期
    const emotional = form.elements.emotional.value   //感情狀態
    const music = form.elements.music.value        //喜歡音樂類型
    
    fetch('http://localhost/User_Project/update.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sex: sex,
            birthday: birthday,
            emotional: emotional,
            music: music
        })
    }).then(response => {
        response.json().then(result => {
            if (result.updateSucc) {         
                window.location.href = 'main-page.html'  //改到主頁面
            }
            else {
                if (result.validsex) {                   
                    console.log('Invalid sex')      
                }
                else if (result.validbirthday) {
                    console.log('Invalid birthday')       
                }
                else if (result.validemotional) {
                    console.log('Invalid emotional')       
                }
                else if (result.validmusic) {
                    console.log('Invalid music')       
                }
            }
        })
    })
}