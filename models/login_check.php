<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);     //接收js那邊傳過來的東西

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

$name = $_POST['account'];     
$password = $_POST['password'];
checkData($name,$password,$conn);

function checkData($name,$password,$conn){
    $sql = "SELECT * FROM user_account WHERE username = '$name'";
    $result = mysqli_query($conn, $sql);
    if(mysqli_num_rows($result) == 0) {
        echo json_encode([      //回傳的東西
            "loginSucc" => false,
            // "validPass" => false,
            // "validAcc" => true
        ]);    
    }
    else{
        $sql = "SELECT * FROM user_account WHERE username = '$name' AND password = '$password'";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result) == 0) {
            echo json_encode([      //回傳的東西
                "loginSucc" => false,
                // "validPass" => true,
                // "validAcc" => false
            ]);    
        }
        else{
            echo json_encode([      //回傳的東西
                "loginSucc" => true,
                // "validPass" => false,
                // "validAcc" => false
            ]); 
        }   
    }
}
?>