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
                "status" => 1,
                "message" => "List Created",
                "texts" => $lists->texts,
                "id" => $connection->lastInsertId(),
            ]);
            // echo "List Created";
        } else {
            http_response_code(500); //500 Internal Server Error
            echo json_encode([
                "status" => 0,
                "message" => "Failed"
            ]);
            // echo "Failed";
        }
    } else {
        http_response_code(404); //503 services unavailable
        echo json_encode([
            "status" => 0,
            "message" => "Lists needed"
        ]);
    }
    // print_r($data);die;

} else {
    http_response_code(503); //503 services unavailable
    echo json_encode([
        "status" => 0,
        "message" => "Access Denied"
    ]);
    // echo "Access Denied";
}
