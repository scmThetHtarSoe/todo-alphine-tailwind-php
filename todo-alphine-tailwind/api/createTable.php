<?php 
// include_once('./connect_db.php');
$serverName = "localhost";
$userName = "root";
$password = "000000";
$dbName = "todo_list_php";
$connection = new PDO("mysql:host=$serverName;dbname=$dbName",$userName,$password);
if($connection) {
    $sql = "CREATE TABLE IF NOT EXISTS lists(
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        texts VARCHAR(255) NOT NULL,
        status BOOLEAN DEFAULT FALSE
    )";
    if($sql) {
        $res = $connection->prepare($sql);
        $res->execute([]);
        echo "lists table created successfully";
    } else {
        echo "SQL error";
    }
} else {
    echo "Connection Problem";
}
?>