function registerFunc() {
    const form = document.forms['register']
    const account = form.elements.account.value
    const password1 = form.elements.password1.value
    const password2 = form.elements.password2.value
    const mail = form.elements.mail.value
    if (!isValidPass(password1,password2)) {
        //請輸入合法的密碼
    }
    else if(!isValidEmail(email)) {
        //輸入合法mail
    }
    else {
        fetch('http://localhost/User_Project/login.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account: account,
                password: password1,
                mail: mail,
            })
        }).then(response => {
            response.json().then(result => {
                if (result.loginSucc) {
                    console.log('login Success!')     
                    window.location.href = 'login.html'  //改到登入畫面
                }
                else {
                    if (result.validAcc) {
                        console.log('Invalid account')      
                    }
                    else if (result.validPass) {
                        console.log('Invalid password')       
                    }
                }
            })
        })
    }
}

function isValidPass(password1,password2){
    var i = /[0-9]+/
    var capital = /[A-Z]/
    var lower = /[a-z]/
    if(password1!=password2){
        return false
    }
    else if(password1.length > 20){
        return false
    }
    else if(!capital.test(password1)){
        return false
    }
    else if(!lower.test(password1)){
        return false
    }
    else if(!i.test(password1)){
        return false
    }
    return true
}

function isValidMail(mail){
    var str = /@/
    if(!str.test(email)){
        return false
    }
    return true
}