<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);     //接收js那邊傳過來的東西

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

$name = $_POST['name'];     //從POST裡 抓取name
$email = $_POST['email'];
$password = $_POST['password'];
$sql = "INSERT INTO user_account(email,username,password) VALUES ('$email','$name','$password')";
$result = mysqli_query($conn, $sql);

echo json_encode([      //回傳的東西
    "succ" => true
]);
?>