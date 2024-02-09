<?php 
  session_start();
  if(!isset($_SESSION['login'])){
    header("Location: http://localhost/Mini/");
  }
  include_once('../../Metier/fournisseur.php');
  if(isset($_POST)){
    
    if(extract($_POST)){
    $c = new Fournisseur($nom, $adresse, $telephone, $email);
    $c->setId($id);
    $c->update($c);
    $succes=true;
    unset($_POST);
    }
    unset($_POST);
 }
 header("Location: http://localhost/Mini/Presentation/Fournisseur/afficherFournisseurs.php");
?>