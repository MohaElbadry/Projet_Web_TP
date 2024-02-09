<?php
include_once "C:\wamp\www\Mini\DAO\DAO.php";


class ApproCom{
    protected $numCmd;
    protected $date;
    protected $id;
    protected $dao;


    public function __construct($n,$d,$i){
        $this->numCmd = $n;
        $this->date = $d;
        $this->id = $i;
        $this->dao = new DAO();

    }

    public function get($c){
        switch($c){
            case "n" : return $this->numCmd;
            case "d" : return $this->date;
            case "i" : return $this->id;
        }
    }

    public function save(){}

    public static function afficher(){}

    public static function total(){}

    public static function delete($idd){}

}

?>