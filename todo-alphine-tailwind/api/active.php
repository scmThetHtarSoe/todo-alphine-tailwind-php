<?php
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset: UTF-8");
header("Access-Control-Allow-Methods: GET");
include_once("./config/database.php");
include_once("./classes/lists.php");
$db = new Database();
$connection = $db->connect();
$lists = new Lists($connection);
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $getActiveLists = $lists->get_active_lists();
    $allLists['todo'] = [];
    for ($i = 0; $i < count($getActiveLists); $i++) {
        array_push($allLists['todo'], [
            "id" => $getActiveLists[$i]['id'],
            "texts" => $getActiveLists[$i]['texts'],
            "status" => $getActiveLists[$i]['status'],
        ]);
    }

    http_response_code(200);
    echo json_encode([
        "status" => 1,
        "data" => $allLists['todo'],
    ]);
} else {
    http_response_code(503);
    echo json_encode([
        "status" => 0,
        "message" => "Access Denied",
    ]);
}
