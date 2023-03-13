<?php
class Database{
    private $hostName;
    private $dbName;
    private $userName;
    private $password;
    private $connection;

    public function connect() {
        $this->hostName = "localhost";
        $this->dbName = "todolistsphp";
        $this->userName = "root";
        $this->password = "000000";
        $this->connection = new PDO("mysql:host=$this->hostName;dbname=$this->dbName",$this->userName,$this->password);
        if($this->connection) {
                //  echo "Connected Successfully";
                    return $this->connection;  
        } else {
                       print_r($this->connection);
            exit;
        }
    }
} 

$db =  new Database();
$db->connect();
?>