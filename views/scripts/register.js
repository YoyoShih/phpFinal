function registerFunc() {
    const form = document.forms['register']
    const account = form.elements.account.value
    const password = form.elements.password.value
    const passwordCheck = form.elements.passwordCheck.value
    const email = form.elements.email.value
    if (!isValidPass(password)) {
        console.log(1)
        //請輸入合法的密碼
    }
    else if (!isValidPassCheck(password, passwordCheck)) {
        console.log(2)
        //請確認密碼輸入相同
    }
    else if(!isValidEmail(email)) {
        console.log(3)
        //輸入合法mail
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
                email: email,
            })
        }).then(response => {
            response.json().then(result => {
                if (result.regSucc) {
                    console.log('Register Success!')     
                    window.location.href = 'login.html'  //改到登入畫面
                }
                else {
                    if (result.accountError) {
                        console.log('Invalid account')      
                    }
                    else if (result.emailError) {
                        console.log('Invalid email')       
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
    return !(password.length > 20 || !capital.test(password) || !lower.test(password) || !i.test(password))
}

function isValidPassCheck(password,passwordCheck) {
    return !(password != passwordCheck)
}

function isValidEmail(email){
    var str = /@/
    if(!str.test(email)){
        return false
    }
    return true
}