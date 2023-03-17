<?php
include_once('connect_db.php');
$db = new DB();
try {
    $connection = new PDO("mysql:host=$db->serverName", $db->userName, $db->password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if ($connection) {
        $sql = "CREATE DATABASE IF NOT EXISTS todo_list_php";
        $connection->exec($sql);
    } else {
        echo "Connection Problem";
    }
} catch (PDOException $e) {
    echo "Connection Failed" . $e->getMessage();
}
