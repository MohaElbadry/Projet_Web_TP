<?php 
        if(isset($_POST)){
            include_once('../../Metier/produit.php');
            if(extract($_POST)){
            $photo=$_FILES['image'];
            $filepath=$photo['tmp_name'];
            $extension= pathinfo($photo['name'], PATHINFO_EXTENSION);
            $newName=$libelle.".".$extension;
            $destination="../../assets/photos/$libelle.$extension";
            move_uploaded_file($filepath,$destination);
            $c = new Produit($reference,$libelle,$prix,$quantite,$achat,$newName,$cat,$desc);
            $c->save();
            session_start();
            $_SESSION['succes']=true;
            }
        }
        header('location: ajouterProduit.php')

    ?>