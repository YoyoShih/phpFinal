<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

$username = $_POST['account'];
$animal = $_POST['animal'];
$sql = "UPDATE user_info
        SET animal = '$animal'
        WHERE username = '$username'";
$result = mysqli_query($conn, $sql);
if($result){
    echo json_encode([    
        "regSucc" => true
    ]); 
}
else{
    echo json_encode([    
        "regSucc" => false
    ]); 
}
?>