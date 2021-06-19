<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

session_id('phpFinal');
session_start();

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

$username = $_SESSION['account'];
$podcaster = $_POST['name'];
$love = $_POST['love'];
if($love==true) $love = 'like';
else $love = 'dislike';

$sql = "SELECT * FROM podcast_gamn WHERE username='$username' AND podcaster='$podcaster'";
$result = mysqli_query($conn,$sql);
if(mysqli_num_rows($result) == 0){
    $sql = "INSERT INTO podcast_gamn (username,podcaster,LikeorDislike) VALUES ('$username','$podcaster','$love')";
    $result = mysqli_query($conn,$sql);
}
else{
    $sql = "UPDATE podcast_gamn
            SET LikeorDislike = '$love'
            WHERE username = '$username' AND podcaster='$podcaster'";
    $result = mysqli_query($conn,$sql);
}
?>