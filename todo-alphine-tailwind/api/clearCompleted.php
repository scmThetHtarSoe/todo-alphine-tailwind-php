<?php
// ini_set("display_errors",1);
//include headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
include_once("./config/database.php");
include_once("./classes/lists.php");
$db = new Database();
$connection = $db->connect();
$lists = new Lists($connection);

if ($_SERVER['REQUEST_METHOD'] === "POST") {
//   $listid = isset($_POST['tasklistId']) ? $_POST['tasklistId'] : "";
//   if (!empty($listid)) {
//     $lists->id = $listid;
    if($lists->deleteCompleted()) {
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
//   } else {
//     http_response_code(404);
//     echo json_encode([
//       "status" => 0,
//       "message" => 'List not found'
//     ]);
//   }
} else {
  http_response_code(503);
  echo json_encode([
    "status" => '0',
    'message' => 'Access Denied'
  ]);
}
