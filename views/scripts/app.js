function push() {   //上傳函數
    fetch('http://localhost/User_Project/push.php', {   //使用xampp開啟的php 記得改成你要使用的php檔
        method: "POST",     //POST函數才能含有body
        headers: {      //不用動
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({      //用JSON包起來傳送
            name: '877white'     //想要傳給php的東西
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
    fetch('http://localhost/User_Project/get.php', {
        method: "GET",      //GET函數不能含有body
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        response.json().then(result => {
            var name = result.name
            text.textContent = name     //更改text的內容
        })
    })
}