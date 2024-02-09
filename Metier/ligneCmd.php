<?php
require_once "ligne.php";

class LigneCmd extends Ligne{

    public function save(){
        $this->dao->ajouterLigneCmd($this);
    }

    public static function afficher($id){
        $dao = new DAO();
        return $dao->afficherLigneCmd($id);
    }
    
    public static function total($id){
        $dao = new DAO();
        return $dao->totalCmd($id);
    }
}

?>