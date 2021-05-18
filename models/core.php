<?php
//可能要改的地方有兩個
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');      //看一下你的html開啟的網頁位置 這部分有問題跟我講 因為我不確定會遇到什麼麻煩
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Credentials: true');
    die();
}
header('Access-Control-Allow-Origin: *');      //要改成跟上面那行一樣
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
?>