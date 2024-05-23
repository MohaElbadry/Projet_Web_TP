
    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Header                                           -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <?php $title = "Produits" ;include "../templates/header.php" ?>
    

    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Container                                        -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <div id="main">
        <br>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Produits</h3>
                        <!-- <p class="text-subtitle text-muted">Ajout d'un client </p> -->
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="../dashboard.php">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Produits</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">



                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Ajout d'un produit</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <?php
                        if(isset($_SESSION['succes'])){
                          echo '<div class="alert alert-light-success color-success">
                          <i class="bi bi-check-circle"></i> Produit ajouté.
                        </div>';
                        }
                        unset($_SESSION['succes']);
                    ?>
                                <form class="form form-vertical" method="post" enctype="multipart/form-data" action="ajout.php">
                                    <div class="form-body">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="first-name-vertical">Reference</label>
                                                    <input type="text" id="first-name-vertical" class="form-control"
                                                        name="reference" placeholder="Reference">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="password-vertical">Libelle</label>
                                                    <input type="text" id="password-vertical" class="form-control"
                                                        name="libelle" placeholder="Libelle">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="contact-info-vertical">Prix unitaire</label>
                                                    <input type="number" id="contact-info-vertical" class="form-control"
                                                        name="prix" placeholder="Prix unitaire">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="email-id-vertical">Quantite en stock</label>
                                                    <input type="number" id="email-id-vertical" class="form-control"
                                                        name="quantite" placeholder="Quantite en stock">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="email-id-vertical">Prix d'achat</label>
                                                    <input type="number" id="email-id-vertical" class="form-control"
                                                        name="achat" placeholder="Prix d'achat">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="email-id-vertical">Categorie</label>
                                                    <div class="input-group mb-3">
                                                        <label class="input-group-text"
                                                            for="inputGroupSelect01">Options</label>
                                                        <select id="inputGroupSelect01" class="form-control" name="cat">
                                                            <?php
                                      $tab = Categorie::afficher();
                                                foreach($tab as $t) {
                                                    echo "<option value='".$t->get("i")."'>".$t->get("n")."</option>";}
                                ?>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="inputGroupFile04">Image</label>
                                                <input type="file" class="form-control" id="inputGroupFile04"
                                                    name="image" aria-describedby="inputGroupFileAddon04"
                                                    aria-label="Upload">
                                            </div>
                                            
                                            <div class="col-12 d-flex justify-content-end">
                                                <input type="submit" value="Ajouter" class="btn btn-primary me-1 mb-1"
                                                    name="submit">
                                                <button type="reset" class="btn btn-light-secondary me-1 mb-1">
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>




                </div>
            </section>
        </div>

        <!-- ----------------------------------------------------------------------------------------- -->
        <!--                                          Footer                                          -->
        <!-- ----------------------------------------------------------------------------------------- -->

        <?php include "../templates/footer.php" ?>