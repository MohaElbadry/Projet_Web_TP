<?php

require_once "approcom.php" ;

class Commande extends ApproCom{
    
    public function save(){
        $this->dao->ajouterCommande($this);
    }

    public static function afficher(){
        $dao = new DAO();
        return $dao->afficherCommande();
    }

    public static function total(){
        $dao = new DAO();
        return $dao->getCommandeTotal();
    }

    public static function getCommande($id){
        $dao = new DAO();
        return $dao->getCommande($id);
    }

    public static function delete($id){
        return $this->dao->deleteCommande($id);
    }

}

?>