<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';
session_id('phpFinal');
session_start();

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
$username = $_SESSION['account'];
$feeling = $_POST['like'];
$object = $_POST['name'];
$flag = $_SESSION['flag'];
if($feeling){
    $feeling = "Like";
}
else{
    $feeling = "UnLike";
}


insertData($username,$object,$feeling,$conn);
getData($username,$object,$feeling,$conn,$flag);

function insertData($username,$object,$feeling,$conn){
    $sql = "UPDATE search_info
            SET feeling = '$feeling'
            WHERE subject = '$username' AND object = '$object'";
    $result = mysqli_query($conn,$sql); 
}

function getData($username,$object,$feeling,$conn,$flag){
    $sql = "SELECT u.username,u.nickname,u.animal,u.information
            FROM user_info as u
            WHERE NOT EXISTS(SELECT * 
                             FROM search_info as s
                             WHERE s.subject = '$username' AND u.username = s.object )
            EXCEPT(SELECT username,nickname,animal,information FROM user_info WHERE username = '$username')
            ORDER BY RAND() LIMIT 1";
    $username_result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($username_result) != 0){ 
        $row = mysqli_fetch_array($username_result);
        $user_array["account"]['account'] = $row['username'];  
        $user_array["account"]['nickname'] = $row['nickname'];  
        $user_array["account"]['animal'] = $row['animal']; 
        $user_array["account"]['information'] = $row['information'];
        // $user_array["account"]['match'] = true;
        $match = dmatch($username,$object,$feeling,$conn);
        $user_array["account"]['match'] = $match;
        $acc = $row['username'];
        $sql = "INSERT INTO search_info (subject,object) VALUES ('$username','$acc')";
        $result = mysqli_query($conn,$sql);
        echo json_encode( 
            $user_array  
        );  
    }  
    else{
        $flag = $_SESSION['flag'];
        if($flag>0){
            $flag--;
            $_SESSION['flag'] = $flag;
            $user_array["account"]['account'] = NULL; 
            $user_array["account"]['nickname'] = NULL;  
            $user_array["account"]['animal'] = NULL; 
            $user_array["account"]['information'] = NULL;
            $user_array["account"]['match'] = NULL;
            echo json_encode( 
                $user_array    
            ); 
        }
        else{
            $empty_array = array();
            echo json_encode( 
                $empty_array     //回傳錯誤
            ); 
        }      
    }  
}   

function dmatch($username,$object,$feeling,$conn){
    if($feeling=='Like'){
        $sql = "SELECT * FROM search_info WHERE subject='$object' AND object='$username' AND feeling='Like'";
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result) == 0)
            return false;     
        return true;
    }
    return false;
}
?>