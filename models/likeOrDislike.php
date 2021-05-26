<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';
session_id('phpFinal');
session_start();

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
//$username = $_SESSION['account'];
$username = "87white";
$feeling = $_POST['like'];
$object = $_POST['name'];
//$account1 = $_SESSION['account1'];
$account2 = $_SESSION['account2'];
$account3 = $_SESSION['account3'];
$flag = $_SESSION['flag'];
if($feeling){
    $feeling = "Like";
}
else{
    $feeling = "UnLike";
}

insertData($username,$object,$feeling,$conn);
getData($username,$object,$feeling,$conn,$account2,$account3,$flag);

function insertData($username,$object,$feeling,$conn){
    $sql = "INSERT INTO search_info (subject,object,feeling) VALUES ('$username','$object','$feeling')";
    $result = mysqli_query($conn,$sql); 
}

function getData($username,$object,$feeling,$conn,$account2,$account3,$flag){
    $sql = "SELECT u.username,u.nickname,u.animal,u.information
            FROM user_info as u
            WHERE NOT EXISTS(SELECT * 
                             FROM search_info as s
                             WHERE s.subject = '$username' AND (u.username = s.object 
                             OR u.username = '$account2' OR u.username = '$account3'))
            EXCEPT(SELECT username,nickname,animal,information FROM user_info WHERE username = '$username')
            ORDER BY RAND() LIMIT 1";
    $username_result = mysqli_query($conn,$sql);           //
    $row = mysqli_fetch_array($username_result);
    $user_array["account"]['account'] = $row['username'];  
    $user_array["account"]['nickname'] = $row['nickname'];  
    $user_array["account"]['animal'] = $row['animal']; 
    $user_array["account"]['information'] = $row['information'];
    // echo $account2;
    // echo $account3;
    if($flag==0){
        $_SESSION['account2'] = $row['username'];
        $_SESSION['flag'] = 1;
    }
    else{
        $_SESSION['account3'] = $row['username'];
        $_SESSION['flag'] = 0;
    }
    echo json_encode( 
        $user_array        
    ); 
   
}
?>