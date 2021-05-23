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

$username = "87white";
$tnickname = $_POST['nickname'];
$sex = $_POST['sex'];
$birthday = $_POST['birthday'];
$relationship = $_POST['relationship'];
$musicGenre = $_POST['musicGenre'];
modifyData($username,$nickname,$sex,$birthday,$relationship,$musicGenre,$conn);

function modifyData($username,$nickname,$sex,$birthday,$relationship,$musicGenre,$conn){
    $username_sql = "SELECT * FROM user_info WHERE username = '$username'";
    $username_result = mysqli_query($conn, $username_sql);
    if(mysqli_num_rows($username_result) == 0){   //第一次紀錄個人資訊
        $sql = "INSERT INTO user_info
                VALUES ('$username','$nickname','$sex','$birthday','$relationship','$musicGenre')";
        $result = mysqli_query($conn,$sql);
    }
    else{                                         //修改個人資訊
        $sql = "UPDATE user_info
                SET nickname = '$nickname', sex = '$sex', birthday = '$birthday',
                    relationship = '$relationship', musicGenre = '$musicGenre' 
                WHERE username = '$username'";
        $result = mysqli_query($conn,$sql);
    }
}
echo json_encode([     
    "updateSucc" => true
]);


?>



