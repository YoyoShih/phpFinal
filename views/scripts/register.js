function registerFunc() {
    const form = document.forms['register']
    const account = form.elements.account.value
    const password = form.elements.password.value
    const passwordCheck = form.elements.passwordCheck.value
    const email = form.elements.email.value
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
                email: email,
            })
        }).then(response => {
            response.json().then(result => {
                if (result.regSucc) {     
                    window.location.href = 'login.html'  //改到登入畫面
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
    return password.length <= 20 || capital.test(password) || lower.test(password) || i.test(password)
}

function isValidPassCheck(password,passwordCheck) {
    return password == passwordCheck
}

function isValidEmail(email){
    var str = /@/
    return str.test(email)
}