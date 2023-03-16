<?php
include_once('connect_db.php');
$connection = new PDO("mysql:host=$db->serverName;dbname=$db->dbName", $db->userName, $db->password);
if ($connection) {
    $sql = "CREATE TABLE IF NOT EXISTS lists(
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        texts VARCHAR(255) NOT NULL,
        status BOOLEAN DEFAULT FALSE
    )";
    if ($sql) {
        $res = $connection->prepare($sql);
        $res->execute([]);
    } else {
        echo "SQL error";
    }
} else {
    echo "Connection Problem";
}
