<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);    

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
$username = "rick";
$like = $_POST['like'];
$object = $_POST['name'];
updateData($username,$object,$like,$conn);

function updateData($username,$object,$like,$conn){

}

}
?>