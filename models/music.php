<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';
session_id('phpFinal');
session_start();

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

$username = $_SESSION['account'];
$sql = "SELECT s.song_name, s.singer, s.song_Genre
        FROM song_info as s, music_gamn as m
        WHERE m.username = '$username' AND m.song_id = s.song_id";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
echo json_encode([    
    "name" => $row['song_name'],
    "singer" => $row['singer'],  
    "music_genre" => $row['music_genre']    
]); 
?>