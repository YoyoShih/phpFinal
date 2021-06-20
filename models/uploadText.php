<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';
session_id('phpFinal');
session_start();

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName); 
$content = $_POST['content'];
$object = "yoyo";
$username = $_SESSION['account'];
//$username = "rick";

uploadData($username,$object,$content,$conn);

function uploadData($username,$object,$content,$conn){
    $sql="INSERT INTO chattingroom (subject,object,content) VALUES ('$username','$object','$content')"; 
    $result = mysqli_query($conn,$sql);
}
?>