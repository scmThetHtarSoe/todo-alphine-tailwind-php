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
//   $data = json_decode(file_get_contents("php://input"));
// $id = $_POST['tasklistId'];
// $oldSql = "select id,status from lists where id=?";
//     $oldres = $connection->prepare($oldSql);
//     $oldres->execute([$id]);
//     $oldDatas = $oldres->fetch();
//     $getStatus = $oldDatas['status'];
// $status = $getStatus? 0 : 1 ;

// $getId = $oldDatas['id'];
//   if (isset($status) && isset($getId)) {
//     $lists->status = $status;
//     $lists->id = $getId;
    if ($lists->uncheckAll()) {
      http_response_code(200);
      echo json_encode([
        "status" => 1,
        "message" => "List Updated",
        "completed"=>1,
      ]);

    } else {
      http_response_code(500);
      echo json_encode([
        "status" => 0,
        "message" => "Failed to update"
      ]);
    }
 
//   else {
//     http_response_code(404); //503 services unavailable
//     echo json_encode([
//       "status" => 0,
//       "message" => "Lists needed"
//     ]);
//   }
} else {
  http_response_code(503); //503 services unavailable
  echo json_encode([
    "status" => 0,
    "message" => "Access Denied"
  ]);
  // echo "Access Denied";
}
