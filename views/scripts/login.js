function loginFunc() {
    const form = document.forms['login']
    const account = form.elements.account.value
    const password = form.elements.password.value
    if (!isValidPass(password)) {
        //請輸入合法的密碼
    }
    else {
        fetch('http://localhost/final/phpFinal/models/login_check.php', { //yoyo:http://localhost/User_Project/login.php
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // email: email,
                account: account,
                password: password
            })
        }).then(response => {
            response.json().then(result => {
                if (result.loginSucc) {
                    console.log('Login Success!')
                    window.location.href = 'main-page.html'
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

function isValidPass() {
    return true
}