function signinFunc() {
    const form = document.forms['registerinin']
    const account = form.elements.account.value
    const password1 = form.elements.password1.value
    const password2 = form.elements.password2.value
    const mail = form.elements.mail.value
    const sticker = form.elements.sticker.value

    if (!isValidPass(password)) {
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
                password: password,
                mail: mail,
                sticker: sticker
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

function isValidPass(password){
    // var i = /[0-9]+/
    // var capital = /[A-Z]/
    // var lower = /[a-z]/
    //  if(password.length > 20){
    //      return [false,""]
    //  }
    //  else if(!capital.test(password)){
    //     return [false,""]
    //  }
    //  else if(!lower.test(password)){
    //     return [false,""]
    //  }
    //  else if(!i.test(password)){
    //     return [false," "]
    //  }
     return true
}

function isValidMail(mail){
    // var str = /@/
    // if(!str.test(email)){
    //     return [false," "]
    // }
    return true
}