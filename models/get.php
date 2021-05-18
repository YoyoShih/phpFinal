<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

$sql = "SELECT * FROM user_account WHERE username = '87white'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($result,MYSQLI_ASSOC);

echo json_encode([      //回傳的東西
    "email" => $row["email"],
    "name" => $row["username"],
    "password" => $row["password"]
]);
?>