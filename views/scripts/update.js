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
                console.log('update Success!')           
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
