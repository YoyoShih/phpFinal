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
$podcasts = array();

getData($username,$conn);

function getData($username,$conn){
    $sql="SELECT i.podcaster, i.title ,u.animal
          FROM podcast_info as i, podcast_gamn as g, user_info as u
          WHERE g.username = '$username' AND g.podcaster=i.podcaster 
                AND g.LikeorDislike = 'like' AND g.podcaster=u.nickname"; 
    $result = mysqli_query($conn,$sql);
    for($i=0;$row = mysqli_fetch_array($result);$i++){   
        $podcasts[$i]['animal'] = $row['animal'];  
        $podcasts[$i]['nickname'] = $row['podcaster'];  
        $podcasts[$i]['title'] = $row['title']; 
    }
    echo json_encode( 
        $podcasts       
    ); 
}
?>