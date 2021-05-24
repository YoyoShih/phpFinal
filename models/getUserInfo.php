<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

$username = $_POST["account"];
$sql = "SELECT * FROM user_info WHERE username = '$username'";
$username_result = mysqli_query($conn, $username_sql);
$row = mysqli_fetch_assoc($result);
echo json_encode([      
    "nickname" => $row['nickname'],
    "sex" => $row['sex'],
    "birthday" => $row['birthday'],
    "relationship" => $row['relationship'],
    "music" => $row['musicGenre']
]); 
?>