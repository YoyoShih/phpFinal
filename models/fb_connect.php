<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';
session_id('phpFinal');
session_start();

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$click = $_POST['isCLick'];
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
$username = $_SESSION['account'];
$username = "rick";
if($click==true){
    $sql = "UPDATE user_account
            SET fb_connect = 'true'
            WHERE username = '$username'";
    $result = mysqli_query($conn,$sql);
}
else{
    checkConnect($username,$conn);
}

function checkConnect($username,$conn){
    $sql = "SELECT fb_connect FROM user_account WHERE username = '$username'";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    if($row['fb_connect']=='false'){
        echo json_encode([    
            "isFB"=>false
        ]);
    }
    else{
        echo json_encode([    
            "isFB"=>true
        ]);
    }
}

?>