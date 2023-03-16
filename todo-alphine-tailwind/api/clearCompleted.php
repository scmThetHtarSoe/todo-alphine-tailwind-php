<?php
//include headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
include_once("./config/database.php");
include_once("./classes/lists.php");
$db = new Database();
$connection = $db->connect();
$lists = new Lists($connection);

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if ($lists->deleteCompleted()) {
        http_response_code(200);
        echo json_encode([
            "status" => 1,
            "message" => 'list deleted successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => 0,
            "message" => 'Failed to delete'
        ]);
    }
} else {
    http_response_code(503);
    echo json_encode([
        "status" => '0',
        'message' => 'Access Denied'
    ]);
}
