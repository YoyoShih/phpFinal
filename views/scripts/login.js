function loginFunc() {
    const form = document.forms['login']
    const account = form.elements.account.value
    const password = form.elements.password.value
    if (!isValidPass(password)) {
        //請輸入合法的密碼
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
                password: password
            })
        }).then(response => {
            response.json().then(result => {
                if (result.loginSucc) {
                    console.log('Login Success!')
                    window.location.href = 'main-page.html'
                }
                else {
                    console.log('Invalid account')
                    const text = document.getElementsByClassName('loginFail')[0]
                    text.style.opacity = 1
                }
            })
        })
    }
}

function isValidPass() {
    return false
}