<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);     //接收js那邊傳過來的東西

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

$name = $_POST['name'];     //從POST裡 抓取name
$email = $_POST['email'];
$password = $_POST['password'];
insertData($email,$name,$password,$conn);

function insertData($email,$name,$password,$conn){
    $email_sql = "SELECT * FROM user_account WHERE email = '$email'";
    $username_sql = "SELECT * FROM user_account WHERE username = '$username'";
    $email_result = mysqli_query($conn, $email_sql);
    $username_result = mysqli_query($conn, $username_sql);
    if(mysqli_num_rows($email_result) > 0) {
        echo json_encode([      
            "emailError" => true
        ]);        
    }
    else if(mysqli_num_rows($username_result) > 0) {
        echo json_encode([   
            "accountError" => true
        ]);        
    }
    else{
        $sql = "INSERT INTO user_account (email, username, password)
        VALUES ('$email', '$username', '$password')";
        if (mysqli_query($conn, $sql)) {
            echo json_encode([   
                "regSucc" => true
            ]);
        } 
        else{
            echo json_encode([   
                "regError" => true
            ]);    
        }
    }
}

// echo json_encode([      //回傳的東西
//     "succ" => true
// ]);

?>