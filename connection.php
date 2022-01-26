<?php
/*
    File: connection.php
    Name: Henry Pacheco Cachon
    Class: CS325, January 2022
    Lab: 10
    Due: 25 January 2022
*/

// Following the singleton pattern to avoid duplication
class ConnectDB {

    // Holding the class instance
    private static $instance = null;
    // Holding the database pdo object
    private $db;
    // Holding json output
    private $myJSON;

    // Private constructor responsible for creating the pdo connection
    // Also outputs the corresponding json data
    private function __construct(){

        // Creating stdClass for output
        $outputData = new stdClass();
        try {

            // Getting username
            $username = $_POST["username"];
            // Getting password
            $password = $_POST["password"];
            // Getting database
            $database = $_POST["database"];

            // Creating a connection
            $this->db = new PDO("mysql:dbname=${database};host=localhost", "${username}", "${password}" );
            // Setting error exceptions
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Formatting output data
            $outputData->username = $username;
            $outputData->password = $password;
            $outputData->database = $database;
            // Successful Redirect url for js script
            $outputData->url = "mysql_ask.html";
            // Encoding stdClass as a json object
            $this->myJSON = json_encode($outputData);
        }

        catch (PDOException $ex){

            // Unsuccessful url for js script 
            $outputData->url = "error_page.html";

            // Returning json data to js file
            $this->myJSON = json_encode($outputData);
        }
    }

    // Function creates a ConnectDb object if it's new 
    // Or returns the already existing object if it isn't new
    public static function getInstance(){

        // Checking if instance is null
        if(! self::$instance){
            
            // Creates new ConnectDb object if it isn't null
            self::$instance = new ConnectDB();
        }

        // Returns the ConnectDb object
        return self::$instance;

    }

    // Method returns the database connection
    public function getConnection(){
        return $this->db;
    }

    // Method returns JSON data from the creation
    // of the database connection
    public function getJSON(){
        return $this->myJSON;
    }

}
?>
