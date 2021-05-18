function push() {   //上傳函數
    fetch('http://localhost/final/phpFinal/models/push.php', {   //使用xampp開啟的php 記得改成你要使用的php檔
        method: "POST",     //POST函數才能含有body
        headers: {      //不用動
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({      //用JSON包起來傳送
<<<<<<< HEAD
            name: '87white',        //想要傳給php的東西
            email: 'rickwu123@gmail.com',
            password: '12345'
=======
            name: '877white'     //想要傳給php的東西
>>>>>>> 3e6207db8827a7640b17e83c0afb533eaf299016
        })
    }).then(response => {       //從php傳回來的東西
        response.json().then(result => {    //傳回來的東西有用過JSON_encode包裝 所以接收的時候要用json()來解開包裝
            console.log(result)     //可以在chrome按F12 看一下result長什麼樣
            if (result.succ) {
                console.log('Ya!')
            }
        })
    })
}

function get() {    //抓取函數
    var text = document.getElementsByClassName('text')[0]   //在html找到text這個東西
    fetch('http://localhost/final/phpFinal/models/get.php', {
        method: "GET",      //GET函數不能含有body
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
<<<<<<< HEAD
        },
=======
        }
>>>>>>> 3e6207db8827a7640b17e83c0afb533eaf299016
    }).then(response => {
        //console.log(response)
        response.json().then(result => {
            var email = result.email
            var name = result.name
            var password = result.password
            text.textContent = email+'\n'+name+'\n'+password     //更改text的內容
        })
    })
}