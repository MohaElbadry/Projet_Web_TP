<?php 
  session_start();
  include_once('../../Metier/categorie.php');
  if(!isset($_SESSION['login'])){
    header("Location: http://localhost/Mini/");
  }


        Categorie::delete($_GET['id']);
  

    header("Location: http://localhost/Mini/Presentation/Categorie/afficherCategories.php");
?>