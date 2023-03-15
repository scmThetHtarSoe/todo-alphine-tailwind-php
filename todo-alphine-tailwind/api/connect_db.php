<?php 
$serverName = "localhost";
$userName = "root";
$password = "000000";

$connection = new PDO("mysql:host=$serverName",$userName,$password);
$connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
?>