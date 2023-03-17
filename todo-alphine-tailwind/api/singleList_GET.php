<?php
//include headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
include_once("./../config/database.php");
include_once("./../classes/lists.php");
$db = new Database();
$connection = $db->connect();
$lists = new Lists($connection);

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $data_id = isset($_GET['id']) ? intval($_GET['id']) : "";
    if (!empty($data_id)) {
        $lists->id = $data_id;
        $singleList = $lists->get_single_list();
        if (!empty($singleList)) {
            http_response_code(200);
            echo json_encode([
                "status" => 1,
                "message" => $singleList
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => 0,
                "message" => "List not found"
            ]);
        }
    }
} else {
    http_response_code(503);
    echo json_encode([
        "status" => '0',
        'message' => 'Access Denied'
    ]);
}
