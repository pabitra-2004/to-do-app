<?php
// database connection
require_once '../db.php';
$conn = connect_db();

// sql query building
$sql = "SELECT * FROM todos";

// fetch data | run query
$result = $conn->query($sql);
$datas = $result->fetch_all(MYSQLI_ASSOC);

// set header
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");

// close database connection
$conn->close();

// return data
echo json_encode($datas);
