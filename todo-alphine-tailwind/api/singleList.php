<?php
// ini_set("display_errors",1);
//include headers
header("Access-Control-Allow-Origin: *");
//passing json data or data type while calling this API
header("Content-type: application/json; charset: UTF-8"); //for json_decode(file_get_contents)
//data which we r getting inside request
header("Access-Control-Allow-Methods: POST");
include_once("./../config/database.php");
include_once("./../classes/lists.php");
$db = new Database();
$connection = $db->connect();
$lists = new Lists($connection);

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $data = json_decode(file_get_contents("php://input")); //post man mhr body nae param pay poh
    if (!empty($data->id)) {
        $lists->id = $data->id;
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
