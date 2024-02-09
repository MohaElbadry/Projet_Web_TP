<?php 
  session_start();
  include_once('../../Metier/fournisseur.php');
  if(!isset($_SESSION['login'])){
    header("Location: http://localhost/Mini/");
  }

    if(isset($_GET)){
      Fournisseur::delete($_GET['id']);
    }

    header("Location: http://localhost/Mini/Presentation/Fournisseur/afficherFournisseurs.php");
?>