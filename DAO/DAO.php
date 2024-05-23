<?php
// require("../Metier/client.php");
function getPDO(){
            return new PDO("mysql:host=localhost:3306;dbname=projet_gestion_stock", "root", "");
        
        }   
    class DAO{

        function getPDO(){
            return new PDO("mysql:host=localhost:3306;dbname=projet_gestion_stock", "root", "");
        
        }   

        function authentification($login, $password){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare("SELECT * FROM administrateurs WHERE login = ? AND password = ?");
            $stmt->execute(array($login,$password));
            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $_GET=$row;
                return 1;
            }else return 0;
        }

        function executeQuery($sql){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare($sql);
            $stmt->execute();
            $clients=[];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $clients[]=$row;
            }
            return $clients;
        }


//CLIENT////////

        function ajouterClient($obj){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare("INSERT INTO client(nom,adresse,telephone,email) VALUES(?,?,?,?)");
            $stmt->execute(array($obj->get("n"),$obj->get("a"),$obj->get("t"),$obj->get("e")));
            //header("location:../Presentation/afficherClients.php");
        }

        function afficherClient(){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare("SELECT * FROM client");
            $stmt->execute();
            $clients=[];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $cli=new Client($nom,$adresse,$telephone,$email);
                $cli->setId($idClient);
                $clients[]=$cli;
            }
            return $clients;
        }

        static function getClient($id){
            $pdo=getPDO();
            $stmt=$pdo->prepare("SELECT * FROM client where idClient=?;");
            $stmt->execute(array($id));
    
            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                return new Client($nom,$adresse,$telephone,$email);
            }
            return null;
        }

        function getClientTotal(){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("SELECT count(*) as number FROM client;");
            $stmt->execute();
    
            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                return $number;
            }
            return 0;
        }

        function updateClient($obj){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("UPDATE client SET nom=?,adresse=?,telephone=?,email=? where idClient=?; ");
            $stmt->execute(array($obj->get("n"),$obj->get("a"),$obj->get("t"),$obj->get("e"),$obj->get("i")));
        }

        static function deleteClient($id){
            $pdo=getPDO();
            $stmt=$pdo->prepare("DELETE FROM client where idClient=?; ");
            $stmt->execute(array($id));
        }

//FOURNISSEUR////////

        function ajouterFournisseur($obj){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare("INSERT INTO fournisseur(nom,adresse,telephone,email) VALUES(?,?,?,?)");
            $stmt->execute(array($obj->get("n"),$obj->get("a"),$obj->get("t"),$obj->get("e")));
            //header("location:../Presentation/afficherClients.php");
        }

        function afficherFournisseur(){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare("SELECT * FROM fournisseur");
            $stmt->execute();
            $forn=[];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $cli=new Fournisseur($nom,$adresse,$telephone,$email);
                $cli->setId($idFournisseur);
                $forn[]=$cli;
            }
            return $forn;
        }

        static function getFournisseur($id){
            $pdo=getPDO();
            $stmt=$pdo->prepare("SELECT * FROM fournisseur where idFournisseur=?;");
            $stmt->execute(array($id));
    
            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                return new Fournisseur($nom,$adresse,$telephone,$email);
            }
            return null;
        }

        function updateFournisseur($obj){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("UPDATE fournisseur SET nom=?,adresse=?,telephone=?,email=? where idFournisseur=?; ");
            $stmt->execute(array($obj->get("n"),$obj->get("a"),$obj->get("t"),$obj->get("e"),$obj->get("i")));
        }

        function deleteFournisseur($id){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("DELETE FROM fournisseur where idFournisseur=?; ");
            $stmt->execute(array($id));
        }

//PRODUIT///////////

        function ajouterProduit($obj){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare("INSERT INTO produit(reference,libelle,prixUnitaire,quantiteStock,prixAchat,image,idCategorie) VALUES(?,?,?,?,?,?,?)");
            $stmt->execute(array($obj->get("r"),$obj->get("l"),$obj->get("p"),$obj->get("q"),$obj->get("a"),$obj->get("i"),$obj->get("c")));
            header("location:../Presentation/Produit/afficherProduits.php");
        }

        function afficherProduits(){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("SELECT * FROM produit natural join categorie");
            $stmt->execute();
            $produits=[];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $produits[]=new Produit($reference,$libelle,$prixUnitaire,$quantiteStock,$prixAchat,$image,$nomCategorie);
            }
            return $produits;
        }

        static function afficherProduitsByCat($cat){
            $pdo = getPDO();
            $stmt=$pdo->prepare("SELECT * FROM produit natural join categorie where idCategorie='$cat'");
            $stmt->execute();
            $produits=[];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $produits[]=new Produit($reference,$libelle,$prixUnitaire,$quantiteStock,$prixAchat,$image,$nomCategorie,$idCategorie);
            }
            return $produits;
        }

        static function getProduit($ref){
            $pdo = getPDO();
            $stmt=$pdo->prepare("SELECT * FROM produit where reference=?;");
            $stmt->execute(array($ref));
    
            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                return new Produit($reference,$libelle,$prixUnitaire,$quantiteStock,$prixAchat,$image,$idCategorie,$description);
            }
            return null;
        }

        function updateProduit($obj){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("UPDATE produit SET libelle=?,prixUnitaire=?,quantiteStock=?,prixAchat=?,image=?,idCategorie=? where reference=?; ");
            $stmt->execute(array($obj->get("l"),$obj->get("p"),$obj->get("q"),$obj->get("a"),$obj->get("i"),$obj->get("c"),$obj->get("r")));
        }

        function deleteProduit($id){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("DELETE FROM produit where reference=?; ");
            $stmt->execute(array($id));
        }

//COMMANDE////////

        function ajouterCommande($obj){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare("INSERT INTO commande(date,idClient) VALUES(?,?)");
            $stmt->execute(array($obj->get("d"),$obj->get("i")));
            //header("location:../Presentation/afficherClients.php");
        }

        function afficherCommande(){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare("SELECT * FROM commande");
            $stmt->execute();
            $cmd=[];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $cli=new Commande($numeroCmd,$date,$idClient);
                $cmd[]=$cli;
            }
            return $cmd;
        }

        function getCommande($id){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("SELECT * FROM commande where numeroCmd=?;");
            $stmt->execute(array($id));
    
            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                return new Commande($numeroCmd,$date,$idClient);
            }
            return null;
        }

        function getCommandeTotal(){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("SELECT count(*) as number FROM commande;");
            $stmt->execute();
    
            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                return $number;
            }
            return 0;
        }

        static function getCommandeId($date,$idClient){
            $pdo = getPDO();
            $stmt=$pdo->prepare("SELECT numeroCmd FROM commande where date=? AND idClient=?;");
            $stmt->execute(array($date,$idClient));
    
            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                return $numeroCmd;
            }
            return null;
        }

        function deleteCommande($id){
            $pdo = getPDO();
            $stmt=$pdo->prepare("DELETE FROM commande where numeroCmd=?; ");
            $stmt->execute(array($id));
        }

        // static function Stats(){
        //     $pdo = getPDO();
        //     $stmt=$pdo->prepare("SELECT date_format(commande.date,'%m-%y') as monthnum,date_format(commande.date,'%M %Y') as month,sum(prixVente) as prix 
        //                         FROM commande natural join lignecmd group by monthname(commande.date) order by `monthnum` ASC;");
        //     $stmt->execute();
        //     return $stmt;
            
        //     return 0;
        // }

        static function Income(){
            $pdo = getPDO();
            $stmt=$pdo->prepare("SELECT sum(prixVente) as prix FROM commande natural join lignecmd ;");
            $stmt->execute();
    
            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                return $prix;
            }
            return null;
        }
        // static function Trending($nbr){
        //     $pdo = getPDO();  // Ensure this method exists and correctly initializes a PDO instance.
        //     $stmt = $pdo->prepare("SELECT reference, MAX(commande.date) as latest_date, COUNT(reference) as num
        //                             FROM commande
        //                             NATURAL JOIN lignecmd
        //                             WHERE commande.date < NOW() AND commande.date > DATE_SUB(NOW(), INTERVAL 7 DAY)
        //                             GROUP BY reference
        //                             ORDER BY num DESC, latest_date DESC
        //                             LIMIT ?");
        //     $stmt->execute([$nbr]);
        //     $produits = [];
        //     while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        //         $produits[] = DAO::getProduit($row['reference']);
        //     }
        //     return $produits;
        // }

       
//Approvisionnement////////

        function ajouterApprovis($obj){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare("INSERT INTO approvisionnement(date,idFournisseur) VALUES(?,?)");
            $stmt->execute(array($obj->get("d"),$obj->get("i")));
            //header("location:../Presentation/afficherApprovis.php");
        }

        function afficherApprovis(){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare("SELECT * FROM approvisionnement");
            $stmt->execute();
            $cmd=[];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $cli=new Approvis($numeroAppro,$date,$idFournisseur);
                $cmd[]=$cli;
            }
            return $cmd;
        }

        function getApprovis($id){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("SELECT * FROM approvisionnement where numeroAppro=?;");
            $stmt->execute(array($id));

            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                return new Approvis($numeroAppro,$date,$idFournisseur);
            }
            return null;
        }

        function getApprovisTotal(){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("SELECT count(*) as number FROM approvisionnement;");
            $stmt->execute();

            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                return $number;
            }
            return 0;
        }

        static function getApprovisId($date,$idFournisseur){
            $pdo=getPDO();
            $stmt=$pdo->prepare("SELECT numeroAppro FROM approvisionnement where date=? AND idFournisseur=?;");
            $stmt->execute(array($date,$idFournisseur));

            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                return $numeroAppro;
            }
            return null;
        }

        function deleteApprovis($id){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("DELETE FROM approvisionnement where numeroAppro=?; ");
            $stmt->execute(array($id));
        }
        
//CATEGORIE////////

        function ajouterCategorie($obj){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare("INSERT INTO categorie(idCategorie,nomCategorie) VALUES(?,?)");
            $stmt->execute(array($obj->get("i"),$obj->get("n")));
            //header("location:../Presentation/afficherClients.php");
        }
        
        function afficherCategorie(){
            $pdo = $this->getPDO();
            $stmt=$pdo->prepare("SELECT * FROM categorie");
            $stmt->execute();
            $cat=[];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $cli=new Categorie($idCategorie,$nomCategorie);
                $cat[]=$cli;
            }
            return $cat;
        }

        function getCategorie($id){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("SELECT * FROM categorie where idCategorie=?;");
            $stmt->execute(array($id));
    
            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                return new Client($idCategorie,$nomCategorie);
            }
            return null;
        }

        function updateCategorie($obj){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("UPDATE categorie SET nomCategorie=? where idCategorie=?; ");
            $stmt->execute(array($obj->get("n"),$obj->get("i")));
        }
        
        function deleteCategorie($id){
            $pdo=$this->getPDO();
            $stmt=$pdo->prepare("DELETE FROM categorie where idCategorie='$id'");
            $stmt->execute();
        }

//LIGNE DE CMD////////////////////////
function ajouterLigneCmd($obj){
    $pdo = $this->getPDO();
    $stmt=$pdo->prepare("INSERT INTO lignecmd VALUES(?,?,?,?)");
    $stmt->execute(array($obj->get("n"),$obj->get("q"),$obj->get("r"),$obj->get("p")));
    $stm=$pdo->prepare("UPDATE produit SET quantiteStock = ? where reference = ?;");
    $stm->execute(array($obj->get("i"),$obj->get("r")));
    //header("location:../Presentation/afficherClients.php");
}

function afficherLigneCmd($id){
    $pdo = $this->getPDO();
    $stmt=$pdo->prepare("SELECT reference,libelle,quantite,prixVente,(quantite*prixVente) as total FROM lignecmd natural join produit where numeroCmd=$id");
    $stmt->execute();
    $clients=[];
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $clients[]=$row;
    }
    return $clients;
}

function totalCmd($id){
    $pdo = $this->getPDO();
    $stmt=$pdo->prepare("SELECT sum(prixVente*quantite) as total FROM lignecmd where numeroCmd=$id");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);
        return $total;
 
}

//LIGNE DE APPRO////////////////////////
function ajouterLigneAppro($obj){
    $pdo = $this->getPDO();
    $stmt=$pdo->prepare("INSERT INTO ligneappro VALUES(?,?,?,?)");
    $stmt->execute(array($obj->get("n"),$obj->get("q"),$obj->get("r"),$obj->get("p")));
    $stm=$pdo->prepare("UPDATE produit SET quantiteStock = ? where reference = ?;");
    $stm->execute(array($obj->get("i"),$obj->get("r")));
    // header("location:../Presentation/afficherClients.php");
}

function afficherLigneAppro($id){
    $pdo = $this->getPDO();
    $stmt=$pdo->prepare("SELECT produit.reference,libelle,quantite,ligneappro.prixAchat,(quantite*ligneappro.prixAchat) as total FROM ligneAppro join produit where numeroAppro=$id");
    $stmt->execute();
    $clients=[];
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $clients[]=$row;
    }
    return $clients;
}

function totalAppro($id){
    $pdo = $this->getPDO();
    $stmt=$pdo->prepare("SELECT sum(prixAchat*quantite) as total FROM ligneappro where numeroAppro=$id");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);
        return $total;
 
}



}
?>
