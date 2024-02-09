<?php 
require("../../Metier/commande.php");
require("../../Metier/ligneCmd.php");
  session_start();
  if(!isset($_SESSION['login'])){
    header("Location: http://localhost/Mini/");
  }

  // var_dump($_POST);
  extract($_POST);
  
  
  $cmd= new Commande(null,$da,$client);
  $cmd->save();
  
  $idcmd = DAO::getCommandeId($da,$client);
  
  foreach($cart as $c){
    $newQnt = ($c[3])-($c[2]);
    $ligne = new LigneCmd($idcmd,$c[0],$c[1],$c[2],null,$newQnt);
    $ligne->save();
  }

  

  // header("Location: http://localhost/Mini/Presentation/Commande/pdf.php?ref=$idcmd");
  header("Location: http://localhost/Mini/Presentation/Caisse/caisse.php?ref=$idcmd");
?>
