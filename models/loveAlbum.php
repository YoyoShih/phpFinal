<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

session_id('phpFinal');
session_start();

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

$username = $_SESSION['account'];
$album = $_POST['album'];
$love = $_POST['love'];
// if($love==true) $love = 'like';
// else $love = 'dislike';

if($love==true){
    $id_sql = "SELECT song_id FROM song_info WHERE song_name='$album'";
    $id_result = mysqli_query($conn,$id_sql);
    $row = mysqli_fetch_assoc($id_result);
    $id = $row['song_id'];
    $sql = "INSERT INTO music_gamn (username,song_id) VALUES ('$username','$id')";  
    $result = mysqli_query($conn,$sql);
}
else{
    $id_sql = "SELECT song_id FROM song_info WHERE song_name='$album'";
    $id_result = mysqli_query($conn,$id_sql);
    $row = mysqli_fetch_assoc($id_result);
    $id = $row['song_id'];
    $sql = "DELETE FROM music_gamn WHERE username='$username' AND song_id='$id'";  
    $result = mysqli_query($conn,$sql);
}
?>