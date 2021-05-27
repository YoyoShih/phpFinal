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
for($i=1;$row = mysqli_fetch_assoc($result);$i++){     
    $music_array[$i]['songName'] = $row['song_name'];  
    $music_array[$i]['produce'] = $row['singer'];  
    $music_array[$i]['genre'] = $row['song_Genre']; 
}
echo json_encode(   
    $music_array   
); 
?>