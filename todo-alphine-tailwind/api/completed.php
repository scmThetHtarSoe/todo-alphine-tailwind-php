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
    $getCompletedLists = $lists->get_completed_lists();
    // print_r($getAllLists);
    $allLists['todo'] = [];

    for ($i = 0; $i < count($getCompletedLists); $i++) {
        array_push($allLists['todo'], [
            "id" => $getCompletedLists[$i]['id'],
            "texts" => $getCompletedLists[$i]['texts'],
            "status" => $getCompletedLists[$i]['status'],
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
