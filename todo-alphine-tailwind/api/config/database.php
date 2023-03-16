<?php
include_once('connect_db.php');
$db = new DB();
class Database extends DB
{
    private $hostName;
    private $database;
    private $user;
    private $psw;
    private $connection;

    public function connect()
    {
        $this->hostName = $this->serverName;
        $this->database = $this->dbName;
        $this->user = $this->userName;
        $this->psw = $this->password;
        $this->connection = new PDO("mysql:host=$this->hostName;dbname=$this->database", $this->user, $this->psw);
        if ($this->connection) {
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
