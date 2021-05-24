function loginFunc() {
    const form = document.forms['login']
    const account = form.elements.account.value
    const password = form.elements.password.value
    const text = document.getElementsByClassName('loginFail')[0]

    if (!isValidPass(password)) {
        text.style.opacity = 1
    }
    else {
        fetch('http://localhost/final/phpFinal/models/login_check.php', { //white:http://localhost/phpFinal/models/login_check.php
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account: account,
                password: password
            })
        }).then(response => {
            response.json().then(result => {
                if (result.loginSucc) {
                    console.log(result.account);
                    window.location.href = 'mainPage.html'
                }
                else {
                    text.style.opacity = 1
                }
            })
        })
    }
}

function isValidPass(password) {
    var i = /[0-9]+/
    var capital = /[A-Z]/
    var lower = /[a-z]/
    return (password.length > 20 || capital.test(password) || lower.test(password) || i.test(password))
}

function goRegisterFunc() {
    window.location.href = 'register.html'
}

function goForgetPassFunc() {
    window.location.href = 'forgetPassword.html'
}