<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';
session_start();

if(isset($_SESSION['account'])){              //!empty($_SESSION['account'])
    echo json_encode([      
        "account" => "87"
    ]);   
}
else{
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);     //接收js那邊傳過來的東西

    $conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

    $username = $_POST['account'];     
    $password = $_POST['password'];
    checkData($username,$password,$conn);
}
function checkData($username,$password,$conn){
    $sql = "SELECT * FROM user_account WHERE username = '$username' AND password = '$password'";
    $result = mysqli_query($conn, $sql);
    if(mysqli_num_rows($result) == 0) {
        echo json_encode([     
        "loginSucc" => false
        ]);    
    }
    else{
        $_SESSION['account'] = $username;
        echo json_encode([      
            "loginSucc" => true,
            "account" => $_SESSION['account']
        ]);
    }
}
?>