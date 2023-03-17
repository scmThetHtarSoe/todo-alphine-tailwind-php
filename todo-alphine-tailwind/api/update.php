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
    $id = $_POST['tasklistId'];
    $oldSql = "select id,texts from lists where unquid_id=?";
    $oldres = $connection->prepare($oldSql);
    $oldres->execute([$id]);
    $oldDatas = $oldres->fetch();
    $getOldTexts = $oldDatas['texts'];
    $data_texts = $_POST['gettexts'];
    if (trim($data_texts) != "") {
        $data_texts = $_POST['gettexts'];
    } else {
        $data_texts =  $getOldTexts;
    }

    // $data = json_decode(file_get_contents("php://input"));
    if (!empty($data_texts) && !empty($id)) {
        $lists->texts = $data_texts;
        $lists->unquid_id =  $id;
        if ($lists->update_list()) {
            http_response_code(200);
            echo json_encode([
                "status" => 1,
                "message" => "List Updated"
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => 0,
                "message" => "Failed to update"
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
