<?php 
include_once "C:\wamp\www\Mini\DAO\DAO.php";


class Personne{
    protected $id;
    protected $nom;
    protected $adresse;
    protected $telephone;
    protected $email;
    protected $dao;

    public function __construct($n,$a,$t,$e){
        $this->nom = $n;
        $this->adresse = $a;
        $this->telephone = $t;
        $this->email = $e;
        $this->dao = new DAO();
        
        
    }

    public function get($c){
        switch($c){
            case "i" : return $this->id; break;
            case "n" : return $this->nom; break;
            case "a" : return $this->adresse; break;
            case "t" : return $this->telephone; break;
            case "e" : return $this->email; break;
        }
    }

    public function save(){}

    public static function afficher(){}

    public function setId($idd){}

    public function update($cli){}

    public static function delete($cli){}
}
?>