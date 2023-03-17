<?php
class Lists
{
    public $texts;
    public $unquid_id;
    public $status;
    public $id;

    private $connection;
    private $tableName;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tableName = "lists";
    }

    public function create_list()
    {
        $sql = "insert into " . $this->tableName . "(texts,unquid_id) values(?,?)";
        $res = $this->connection->prepare($sql);
        $this->texts = htmlspecialchars(strip_tags($this->texts));
        if ($res->execute([$this->texts, $this->unquid_id])) {
            return true;
        } else {
            return false;
        }
    }

    public function get_all_lists()
    {
        $sql = "select * from " . $this->tableName;
        $res =  $this->connection->prepare($sql);
        $res->execute([]);
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_active_lists()
    {
        $sql = "select * from " . $this->tableName . " where status=0";
        $res =  $this->connection->prepare($sql);
        $res->execute([]);
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_completed_lists()
    {
        $sql = "select * from " . $this->tableName . " where status=1";
        $res =  $this->connection->prepare($sql);
        $res->execute([]);
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_single_list()
    {
        $sql = "select * from " . $this->tableName . " where id=?";
        $res = $this->connection->prepare($sql);
        $res->execute([$this->id]);
        return $res->fetch(PDO::FETCH_ASSOC);
    }

    public function update_list()
    {
        $sql = "update " . $this->tableName . " set texts=? where unquid_id=?";
        $res = $this->connection->prepare($sql);
        $this->texts = htmlspecialchars(strip_tags($this->texts));
        if ($res->execute([$this->texts, $this->unquid_id])) {
            return true;
        } else {
            return false;
        }
    }

    public function delete()
    {
        $sql = "delete from " . $this->tableName . " where unquid_id=?";
        $id = $_POST['tasklistId'];
        $res = $this->connection->prepare($sql);
        if ($res->execute([$id])) {
            return true;
        } else {
            return false;
        }
    }

    public function deleteCompleted()
    {
        $sql = "delete from " . $this->tableName . " where status=1";
        $res = $this->connection->prepare($sql);
        if ($res->execute([])) {
            return true;
        } else {
            return false;
        }
    }

    public function update_status()
    {
        $sql = "update " . $this->tableName . " set status=? where unquid_id=?";
        $res = $this->connection->prepare($sql);
        if ($res->execute([$this->status, $this->unquid_id])) {
            return true;
        } else {
            return false;
        }
    }

    public function checkAll()
    {
        $sql = "update " . $this->tableName . " set status=1 where status=0";
        $res = $this->connection->prepare($sql);
        if ($res->execute([])) {
            return true;
        } else {
            return false;
        }
    }

    public function uncheckAll()
    {
        $sql = "update " . $this->tableName . " set status=0 where status=1";
        $res = $this->connection->prepare($sql);
        if ($res->execute([])) {
            return true;
        } else {
            return false;
        }
    }
}
