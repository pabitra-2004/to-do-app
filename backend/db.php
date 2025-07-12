<?php

require_once 'config.php';

function connect_db()
{
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        die("Connection Failed: " . $conn->connect_error);
    }

    return $conn;
}
