<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';
session_id('phpFinal');
session_start();

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
$username = $_SESSION['account'];
$user_array = array();

getData($username,$conn);

function getData($username,$conn){
    $limit = 3;
    do{
        $sql = "SELECT u.username,u.nickname,u.animal,u.information
                FROM user_info as u
                WHERE NOT EXISTS(SELECT * 
                                 FROM search_info as s
                                 WHERE s.subject = '$username' AND u.username = s.object)
                EXCEPT(SELECT username,nickname,animal,information FROM user_info WHERE username = '$username')
                ORDER BY RAND() LIMIT $limit";
        $username_result = mysqli_query($conn,$sql);
        $_SESSION['flag'] = $limit;
        $limit--;
    }while(!$username_result);
    for($i=1;$row = mysqli_fetch_array($username_result);$i++){     
        $user_array["account$i"]['account'] = $row['username'];  
        $user_array["account$i"]['nickname'] = $row['nickname'];  
        $user_array["account$i"]['animal'] = $row['animal']; 
        $user_array["account$i"]['information'] = $row['information'];
        $acc = $row['username'];
        $sql = "INSERT INTO search_info (subject,object) VALUES ('$username','$acc')";
        $result = mysqli_query($conn,$sql);
    }
    echo json_encode( 
        $user_array        
    ); 
 }
?>