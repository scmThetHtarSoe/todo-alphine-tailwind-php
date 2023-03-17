<?php
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset: UTF-8");
header("Access-Control-Allow-Methods: POST");
include_once("./config/database.php");
include_once("./classes/lists.php");
$db = new Database();
$connection = $db->connect();
$lists = new Lists($connection);
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if ($lists->checkAll()) {
        http_response_code(200);
        echo json_encode([
            "status" => 1,
            "message" => "List Updated",
            "completed" => 1,
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => 0,
            "message" => "Failed to update"
        ]);
    }
} else {
    http_response_code(503); //503 services unavailable
    echo json_encode([
        "status" => 0,
        "message" => "Access Denied"
    ]);
}
