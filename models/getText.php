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
$response = array();

getData($username,$conn);

function getData($username,$conn){
    $sql="SELECT subject,content
          FROM chattingroom
          WHERE subject='$username' OR object='$username'"; 
    $result = mysqli_query($conn,$sql);
    $response [0]['owner'] = "$username";
    for($i=1;$row = mysqli_fetch_array($result);$i++){    
        $response [$i]['owner'] = $row['subject'];  
        $response [$i]['content'] = $row['content'];  
    }
    // $response [0]['owner'] = "yoyo";  
    // $response [0]['content'] = "520"; 
    echo json_encode( 
        $response       
    ); 
}
?>