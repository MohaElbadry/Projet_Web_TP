<?php
include_once "../../DAO/DAO.php";

require_once "personne.php";

class Fournisseur extends Personne{

    function save(){      
        $this->dao->ajouterFournisseur($this);
    }

    static function afficher(){
        $dao = new DAO();
        return $dao->afficherFournisseur();
    }
    
    function setId($idd){
        $this->id = $idd;
    }
    
    function update($cli){
        $this->dao->updateFournisseur($cli);
    }

    function getFournisseur($cli){
        $this->dao->getFournisseur($cli);
    }
    
    static function delete($cli){
        $dao = new DAO();
        $dao->deleteFournisseur($cli);
    }
}

?>