<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';
session_id('phpFinal');
session_start();

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
$username = $_SESSION['account'];
$friends = array();
//$username = "rick";

getFriend($username,$conn);

function getFriend($username,$conn){
    $sql = "SELECT friend FROM fb_friend WHERE username = '$username'";
    $result = mysqli_query($conn,$sql);
    for($i=0;$row = mysqli_fetch_array($result);$i++){     
        $friends["$i"] = $row['friend'];    
    }
    echo json_encode( 
        $friends       
    ); 
}

?>