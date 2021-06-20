<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';
session_id('phpFinal');
session_start();

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName); 
$username = $_SESSION['account'];
//$username = "rick";
$musics = array();

getData($username,$conn);

function getData($username,$conn){
    $sql="SELECT s.song_name, s.singer ,s.song_Genre
          FROM song_info as s, music_gamn as m
          WHERE m.username='$username' AND m.song_id=s.song_id"; 
    $result = mysqli_query($conn,$sql);
    for($i=0;$row = mysqli_fetch_array($result);$i++){   
        $musics [$i]['songName'] = $row['song_name'];  
        $musics [$i]['produce'] = $row['singer'];  
        $musics [$i]['genre'] = $row['song_Genre']; 
    }
    // $musics [0]['songName'] = "This is acting";  
    // $musics [0]['produce'] = "Sia";  
    // $musics [0]['genre'] = "Weird"; 
    echo json_encode( 
        $musics     
    ); 
}
?>