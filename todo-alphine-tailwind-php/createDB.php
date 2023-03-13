<?php 
$serverName = "localhost";
$userName = "root";
$password = "000000";

try {
    $connection = new PDO("mysql:host=$serverName",$userName,$password);
    $connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    echo "Successfully Connected";
        if($connection) {
        $sql = "CREATE DATABASE todolistsPHP";
        $connection->exec($sql);
        echo "Database Created Successfully";
    } else {
        echo "Connection Problem";
    }
} catch(PDOException $e) {
    echo "Connection Failed" . $e->getMessage();
}

?>