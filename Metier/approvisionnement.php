<?php
include_once "../../DAO/DAO.php";

require_once "approcom.php" ;

class Approvis extends ApproCom{
    
    public function save(){
        $this->dao->ajouterApprovis($this);
    }

    public static function afficher(){
        $dao = new DAO();
        return $dao->afficherApprovis();
    }

    public static function total(){
        $dao = new DAO();
        return $dao->getApprovisTotal();
    }

    public static function getApprovis($id){
        $dao = new DAO();
        return $dao->getApprovis($id);
    }

    public static function delete($id){
        return $this->dao->deleteApprovis($id);
    }

}

?>