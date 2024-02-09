<?php

require_once "personne.php";

class Client extends Personne{

    function save(){      
        $this->dao->ajouterClient($this);
    }

    static function afficher(){
        $dao = new DAO();
        return $dao->afficherClient();
    }

    static function total(){
        $dao = new DAO();
        return $dao->getClientTotal();
    }

    function setId($idd){
        $this->id = $idd;
    }

    function update($cli){
        $this->dao->updateClient($cli);
    }

    function getClient($cli){
        $this->dao->getClient($cli);
    }

    static function delete($cli){
        $dao = new DAO();
        $dao->deleteClient($cli);
    }
}

?>