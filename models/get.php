<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

$sql = "SELECT * FROM test WHERE name = '87white'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($result,MYSQLI_ASSOC);

echo json_encode([      //回傳的東西
    "name" => $row["name"]
]);
?>