function user_informationFunc() {
    const form = document.forms['user_imformation']   
    const nickname = form.elemant.nickname.value //暱稱
    const sex = form.elements.sex.value     //性別
    const birthday = form.elements.birthday.value   //YYYY-MM-DD出生日期
    const relationship = form.elements.relationship.value   //感情狀態
    const musicGenre = form.elements.musicGenre.value        //喜歡音樂類型
    
    fetch('http://localhost/User_Project/user_imformation.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nickname: nickname,
            sex: sex,
            birthday: birthday,
            relationship: relationship,
            musicGenre: musicGenre
        })
    }).then(response => {
        response.json().then(result => {
            if (result.updateSucc) {
                console.log('update Success!')           
                window.location.href = 'main-page.html'  //改到主頁面
            }
            else {
                if (result.validnickname){
                    console.log('Invalid nickname')     
                }
                else if (result.validsex) {                   
                    console.log('Invalid sex')      
                }
                else if (result.validbirthday) {
                    console.log('Invalid birthday')       
                }
                else if (result.validrelationship) {
                    console.log('Invalid relationship')       
                }
                else if (result.validmusicGenre) {
                    console.log('Invalid musicGenre')       
                }
            }
        })
    })
    
}