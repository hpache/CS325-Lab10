<?php

/*
    File: submit.html
    Name: Henry Pacheco Cachon
    Class: CS325, January 2022
    Lab: 10
    Due: 25 January 2022
*/

// Importing singleton connection class
require_once("connection.php");

// Creating one connection to the database with the given credentials
$instance = ConnectDB::getInstance();
// Getting the connection to the database
$db = $instance->getConnection();

// Getting the queery string
$query_string = $_POST["queryText"];


try {
    // Preparing the string
    $statement = $db->prepare($query_string);
    // Executing the command
    $statement->execute();
    // Fetching unqie results
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    // Converting unique results to a json object
    $json = json_encode($results);
    // Returning the json object to the js file
    echo $json;
}

catch (Exception $e){
    
    // Send 111 if query fails
    // Nothing special about 111 I just picked a random integer that isn't 0 or 1
    echo "111";
}


?>