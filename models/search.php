<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
$username = $_POST['account'];
$username = 'yoyo';
$username_array = array();
getData($username,$conn);

function getData($username,$conn){
    $limit = 3;
    do{
        $sql = "SELECT username FROM user_info 
                EXCEPT ((SELECT object FROM search_info WHERE subject = '$username') 
                UNION (SELECT subject FROM search_info WHERE subject = '$username'))
                ORDER BY RAND() LIMIT $limit";
        $username_result = mysqli_query($conn,$sql);
        $limit--;
    }while(!$username_result);
    for($i=1;$row = mysqli_fetch_array($username_result);$i++){     //problem
        $username_array["account$i"] = $row['username'];   
    }
    echo json_encode( 
        $username_array        
    ); 
}
?>