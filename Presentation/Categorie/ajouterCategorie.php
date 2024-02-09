
    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Header                                           -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <?php $title = "Categories" ;include "../templates/header.php" ?>
    

    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Container                                        -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <div id="main">
        <br>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Categorie</h3>
                        <!-- <p class="text-subtitle text-muted">Ajout d'un client </p> -->
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="../dashboard.php">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Categorie</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">



                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Ajout d'une categorie</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <?php
                        if(isset($_SESSION['succes'])){
                          echo '<div class="alert alert-light-success color-success">
                          <i class="bi bi-check-circle"></i> Categorie ajouté.
                        </div>';
                        unset($_SESSION['succes']);
                        }
                    ?>
                                <form class="form form-vertical" method="post" action="ajout.php">
                                    <div class="form-body">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="password-vertical">Id Categorie</label>
                                                    <input type="text" id="password-vertical" class="form-control"
                                                        name="idCategorie" placeholder="Id Categorie">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="first-name-vertical">Nom Categorie</label>
                                                    <input type="text" id="first-name-vertical" class="form-control"
                                                        name="nomCategorie" placeholder="Nom Categorie">
                                                </div>
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