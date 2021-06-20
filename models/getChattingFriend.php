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
$result = array();

getData($username,$conn);

function getData($username,$conn){
    $sql="SELECT DISTINCT u.nickname, u.animal
          FROM user_info as u, chattingroom as c
          WHERE c.subject='$username' AND c.object=u.username"; 
    $sql_result = mysqli_query($conn,$sql);
    for($i=0;$row = mysqli_fetch_array($sql_result);$i++){   
        $result[$i]['animal'] = $row['animal'];  
        $result[$i]['nickname'] = $row['nickname'];
    }
    // $result[0]['animal'] = "chicken";  
    // $result[0]['nickname'] = "123321";
    echo json_encode( 
        $result     
    ); 
}
?>