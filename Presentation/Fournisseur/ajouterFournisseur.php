    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Header                                           -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <?php $title = "Fournisseurs" ;include "../templates/header.php" ?>
    

    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Container                                        -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <div id="main">
        <br>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Fournisseurs</h3>
                        <!-- <p class="text-subtitle text-muted">Ajout d'un client </p> -->
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="../dashboard.php">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Fournisseurs</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">



                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Ajout d'un fournisseur</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <?php
                        if(isset($_SESSION['succes'])){
                          echo '<div class="alert alert-light-success color-success">
                          <i class="bi bi-check-circle"></i> Fournisseur ajouté.
                        </div>';
                        }
                        unset($_SESSION['succes']);
                    ?>
                                <form class="form form-vertical" method="post" action="ajout.php">
                                    <div class="form-body">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="first-name-vertical">Nom</label>
                                                    <input type="text" id="first-name-vertical" class="form-control"
                                                        name="nom" placeholder="Nom">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="password-vertical">Adresse</label>
                                                    <input type="text" id="password-vertical" class="form-control"
                                                        name="adresse" placeholder="Adresse">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="contact-info-vertical">Telephone</label>
                                                    <input type="number" id="contact-info-vertical" class="form-control"
                                                        name="telephone" placeholder="Telephone">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="email-id-vertical">Email</label>
                                                    <input type="email" id="email-id-vertical" class="form-control"
                                                        name="email" placeholder="Email">
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

        <footer>
            <div class="footer clearfix mb-0 text-muted">
                <div class="float-start">
                    <p>2022 &copy; JELLOULI Youness - ESTS</p>
                </div>
            </div>
        </footer>
    </div>
    </div>
    <script src="../../assets/js/bootstrap.js"></script>
    <script src="../../assets/js/app.js"></script>

</body>

</html>