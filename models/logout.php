<?php
require dirname(__FILE__).'\db_connect.php';
require dirname(__FILE__).'\core.php';
session_id('phpFinal');
session_start();
unset($_SESSION['account']);
?>