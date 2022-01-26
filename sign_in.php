<?php
/*
    File: sign_in.php
    Name: Henry Pacheco Cachon
    Class: CS325, January 2022
    Lab: 10
    Due: 25 January 2022
*/

// Importing singleton connection class
require_once("connection.php");

// Creating a new ConnectDB object if there isn't one already
$instance = ConnectDB::getInstance();
// Getting json data from database connection result
echo $instance->getJSON();

?>