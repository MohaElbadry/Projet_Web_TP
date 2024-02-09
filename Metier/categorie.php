<?php
include_once "C:\wamp\www\Mini\DAO\DAO.php  ";

class Categorie{
    private $idCategorie;
    private $nomCategorie;
    private $dao;


    function __construct($i,$n){
        $this->idCategorie = $i;
        $this->nomCategorie = $n;
        $this->dao = new DAO();
    }

    function get($c){
        switch($c){
            case "i" : return $this->idCategorie;
            case "n" : return $this->nomCategorie;
        }
    }

    function save(){
        $this->dao->ajouterCategorie($this);
    }

    static function afficher(){
        $dao = new DAO();
        return $dao->afficherCategorie();
    }

    function getCategorie($id){
        return $this->dao->getCategorie($id);
    }

    function update($cli){
        $this->dao->updateCategorie($cli);
    }

    static function delete($cli){
        $dao = new DAO();
        $dao->deleteCategorie($cli);
    }

}

?>