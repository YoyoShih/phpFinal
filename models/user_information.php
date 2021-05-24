<?php 
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);     //接收js那邊傳過來的東西

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);

// $username = "rick";
// $nickname = "handsome";
// $sex = "Male";
// $birthday = "2001-06-24";
// $relationship = "single";
// $musicGenre = "Jazz";

$username = $_POST['account'];   // 還是空的
$nickname = $_POST['nickname'];
$sex = $_POST['sex'];
$birthday = $_POST['birthday'];
$relationship = $_POST['relationship'];
$musicGenre = $_POST['music'];
modifyData($username,$nickname,$sex,$birthday,$relationship,$musicGenre,$conn);

function modifyData($username,$nickname,$sex,$birthday,$relationship,$musicGenre,$conn){
    $sql = "UPDATE user_info
            SET nickname = '$nickname', sex = '$sex', birthday = '$birthday',
                relationship = '$relationship', musicGenre = '$musicGenre' 
            WHERE username = '$username'";
    $result = mysqli_query($conn,$sql);
    if($result){
        echo json_encode([     
            "updateSucc" => true,
            "account" => $username
        ]);
    }
}
?>



