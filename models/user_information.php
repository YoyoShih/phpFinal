<?php 
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);     

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

$username = $_POST['account'];  
$nickname = $_POST['nickname'];
$sex = $_POST['sex'];
$birthday = $_POST['birthday'];
$relationship = $_POST['relationship'];
$musicGenre = $_POST['music'];
$info = $_POST['info'];
$animal = $_POST['animal'];
modifyData($username,$nickname,$sex,$birthday,$relationship,$musicGenre,$info,$animal,$conn);

function modifyData($username,$nickname,$sex,$birthday,$relationship,$musicGenre,$info,$animal,$conn){
    $sql = "UPDATE user_info
            SET nickname = '$nickname', sex = '$sex', birthday = '$birthday',
                relationship = '$relationship', musicGenre = '$musicGenre',
                animal = '$animal', information = '$info' 
            WHERE username = '$username'";
    $result = mysqli_query($conn,$sql);
    if($result){
        echo json_encode([     
            "updateSucc" => true,
        ]);
    }
}
?>



