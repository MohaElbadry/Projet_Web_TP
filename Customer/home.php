    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Header                                           -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <?php $title = "Home" ;include "pages/header.php" ?>

    
    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Container                                        -->
    <!-- ----------------------------------------------------------------------------------------- -->

<div class="content-wrapper container ">
                
    <div class="page-content">
        <div id="carouselExampleSlidesOnly" class="carousel slide mb-5" data-bs-ride="carousel" data-bs-interval="2000">
        <div class="carousel-inner">
            <div class="carousel-item">
            <img src="../assets/images/Atlas-Gaming-MSI-Laptop-Banners.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item active">
              <img src="../assets/images/AORUS-MOTHERBOARDS-DESKTOP.jpg" class="d-block w-100" alt="...">
            </div>
        </div>
      </div>

      
<section>
    <div class="row">
        <div class="col-lg-5 m-auto text-center">
            <div class="section-title" style="margin-bottom: 10px;">
                <h2 class="h3">PRODUITS POPULAIRES</h2>
                
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="product-wrapper">
                <div class="product-carousel slick-initialized slick-slider">
                    <!-- Start Product Item -->
                    <div class="slick-list draggable">
                        <div class="slick-track pt-3" style="opacity: 1; width: 1480px; transform: translate3d(0px, 0px, 0px);">
                        <?php
                                include_once("C:\wamp\www\Mini\DAO\DAO.php");
                                require_once("C:\wamp\www\Mini\Metier\produit.php");
                                $tab = DAO::Trending(5);
                                $i=0;
                                foreach($tab as $b) {?>
                            <div class="product-item slick-slide slick-active " data-slick-index="<?=$i?>" aria-hidden="false" style="width: 266px;" tabindex="0">
                                <div class="product-item__thumb">
                                    <a href="single-product.html" tabindex="0">
                                        <img class="thumb-primary" src="../assets/photos/<?=$b->get("i")?>" alt="Product">
                                        <img class="thumb-secondary" src="../assets/photos//<?=$b->get("i")?>" alt="Product">
                                    </a>
                                </div>

                                <div class="product-item__content" style="background-color:#f1f1f1;">
                                    <h4 class="title"><a href="single-product.html" tabindex="0"><?=$b->get("l")?></a></h4>
                                    <span class="price"><strong>Price:</strong> <?=$b->get("p")?> Dhs</span>
                                </div>

                                <div class="product-item__action">
                                    <button class="btn-add-to-cart" tabindex="0"><i class="ion-bag"></i></button>
                                    <button class="btn-add-to-cart" tabindex="0"><i class="ion-ios-loop-strong"></i></button>
                                    <button class="btn-add-to-cart" tabindex="0"><i class="ion-ios-heart-outline"></i></button>
                                    <button class="btn-add-to-cart" tabindex="0"><i class="ion-eye"></i></button>
                                </div>
                            </div>
                    <?php
                                $i++; }
                            ?>
                        </div>
                    </div>
                    <!-- End Product Item -->
                </div>
            </div>
        </div>
    </div>
</section>
<?php
require_once("C:\wamp\www\Mini\DAO\DAO.php");
require_once("C:\wamp\www\Mini\Metier\categorie.php");
$dab = Categorie::afficher();
foreach($dab as $g) {?>

<hr class="mb-5" style="background-color:gray;"/>

<section>
    <div class="row">
        <div class="col-lg-5 ml-5">
            <div class="section-title d-flex" style="margin-bottom: 10px;align-items:center">
                <h4 class="h4"><?=$g->get("n")?></h4>
                <em><a href="shop.php?id=<?=$g->get("n")?>">Voir Plus</a></em>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="product-wrapper">
                <div class="product-carousel slick-initialized slick-slider">
                    <!-- Start Product Item -->
                    <div class="slick-list draggable">
                        <div class="slick-track pt-3" style="opacity: 1; width: 1480px; transform: translate3d(0px, 0px, 0px);">
                        <?php
                                // require "../Metier/produit.php";
                                $tab = DAO::afficherProduitsByCat($g->get("i"));
                                $i=0;
                                foreach($tab as $f) {?>
                            <div class="product-item slick-slide slick-active " data-slick-index="<?=$i?>" aria-hidden="false" style="width: 266px;" tabindex="0">
                                <div class="product-item__thumb">
                                    <a href="single-product.html" tabindex="0">
                                        <img class="thumb-primary" src="../assets/photos/<?=$f->get("i")?>" alt="Product">
                                        <img class="thumb-secondary" src="../assets/photos//<?=$f->get("i")?>" alt="Product">
                                    </a>
                                </div>

                                <div class="product-item__content" style="background-color:#f1f1f1;">
                                    <h4 class="title"><a href="single-product.html" tabindex="0"><?=$f->get("l")?></a></h4>
                                    <span class="price"><strong>Price:</strong> <?=$f->get("p")?> Dhs</span>
                                </div>

                                <div class="product-item__action">
                                    <button class="btn-add-to-cart" tabindex="0"><i class="ion-bag"></i></button>
                                    <button class="btn-add-to-cart" tabindex="0"><i class="ion-ios-loop-strong"></i></button>
                                    <button class="btn-add-to-cart" tabindex="0"><i class="ion-ios-heart-outline"></i></button>
                                    <button class="btn-add-to-cart" tabindex="0"><i class="ion-eye"></i></button>
                                </div>
                            </div>
                        <?php
                                $i++; }
                            ?>
                        </div>
                    </div>
                    <!-- End Product Item -->
                </div>
            </div>
        </div>
    </div>
</section>
<?php
         }
    ?>




            </div>
            

            <footer>
                <div class="container">
                    <div class="footer clearfix mb-0 text-muted">
                        <div class="float-start">
                            <p>2021 &copy; Mazer</p>
                        </div>
                        <div class="float-end">
                            <p>Crafted with <span class="text-danger"><i class="bi bi-heart"></i></span> by <a
                                href="https://saugi.me">Saugi</a></p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    </div>
    <script src="../assets/js/bootstrap.js"></script>
    <script src="../assets/js/app.js"></script>
    <!-- <script src="../assets/js/pages/horizontal-layout.js"></script> -->
    
<!-- <script src="../assets/extensions/apexcharts/apexcharts.min.js"></script> -->
<!-- <script src="../assets/js/pages/dashboard.js"></script> -->
<script src="js.js"></script>


</body>

</html>
