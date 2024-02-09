<?php
include_once "../../DAO/DAO.php";


class Ligne{
    protected $num;
    protected $reference;
    protected $quantite;
    protected $prixAchat;
    protected $total;
    protected $newQnt;
    protected $dao;


    public function __construct($n,$r,$p,$q,$t,$qi){
        $this->num = $n;
        $this->reference = $r;
        $this->quantite = $q;
        $this->prixAchat = $p;
        $this->total = $t;
        $this->newQnt = $qi;
        $this->dao = new DAO();
    }

    public function get($c){
        switch($c){
            case "n" : return $this->num;
            case "r" : return $this->reference;
            case "q" : return $this->quantite;
            case "p" : return $this->prixAchat;
            case "t" : return $this->total;
            case "i" : return $this->newQnt;
        }
    }

    public function save(){}

    public static function afficher($id){}
    
    public static function total($id){}

}

?>