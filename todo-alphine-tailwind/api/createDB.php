<?php 
// include_once('./connect_db.php');
$serverName = "localhost";
$userName = "root";
$password = "000000";


try {
    $connection = new PDO("mysql:host=$serverName",$userName,$password);
    $connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    // echo "Successfully Connected";
        if($connection) {
        $sql = "CREATE DATABASE IF NOT EXISTS todo_list_php";
        $connection->exec($sql);
        // echo "Database Created Successfully";
    } else {
        echo "Connection Problem";
    }
} catch(PDOException $e) {
    echo "Connection Failed" . $e->getMessage();
}

?>