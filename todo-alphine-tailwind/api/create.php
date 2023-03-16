<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset: UTF-8");
header("Access-Control-Allow-Methods: POST");
include_once("./config/database.php");
include_once("./classes/lists.php");
$db = new Database();
$connection = $db->connect();
$lists = new Lists($connection);
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    // $data = json_decode(file_get_contents("php://input"));
    $data_texts = $_POST['texts'];
    if (!empty($data_texts)) {
        $lists->texts = $data_texts;
        if ($lists->create_list()) {
            http_response_code(200); //200 OK
            echo json_encode([
                "status" => 0,
                "message" => "List Created",
                "texts" => $lists->texts,
                "id" => $connection->lastInsertId(),
                "done" => 0
            ]);
        } else {
            http_response_code(500); //500 Internal Server Error
            echo json_encode([
                "status" => 0,
                "message" => "Failed"
            ]);
        }
    } else {
        http_response_code(404); //503 services unavailable
        echo json_encode([
            "status" => 0,
            "message" => "Lists needed"
        ]);
    }
} else {
    http_response_code(503); //503 services unavailable
    echo json_encode([
        "status" => 0,
        "message" => "Access Denied"
    ]);
}
