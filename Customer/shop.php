    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Header                                           -->
    <!-- ----------------------------------------------------------------------------------------- -->

    <?php $title = "Shop" ;include "pages/header.php" ?>

    <script>
        let queryString;
        // let categorie;
        if(queryString = window.location.search){
            const urlParams = new URLSearchParams(queryString);
            categorie = urlParams.get('id');
            console.log(categorie);
        }
    </script>
    <style>
        .not-active-prod{
            display: none;
        }
    </style>
    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Container                                        -->
    <!-- ----------------------------------------------------------------------------------------- -->
<?php if(!isset($_GET['id'])){ ?>
<!-- <div class="content-wrapper container ">
                
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
      </div> -->

<?php } ?>

<!-- <div class="page-heading">
    <h3>Horizontal Layout</h3>
</div> -->





<div class="page-content-wrapper">
    <div class="shop-page-action-bar mb-30">
        <div class="container container-wide">
            <div class="action-bar-inner">
                <div class="row align-items-center">
                    <div class="col-sm-10">
                        <div class="shop-layout-switcher mb-15 mb-sm-0">
                            <ul class="layout-switcher nav">
                                <li class="switchergrid active" data-layout="grid"><i class="fa fa-th"></i></li>
                                <li class="switcherlist" data-layout="layout-list" ><i class="fa fa-th-list"></i></li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-sm-2">
                        <div class="sort-by-wrapper">
                            <label for="sort" class="sr-only">Sort By</label>
                            <select name="sort" id="sort" class="nice-select">
                                <option value="sbp">Sort By Popularity</option>
                                <option value="sbn">Sort By Newest</option>
                                <option value="sbt">Sort By Trending</option>
                                <option value="sbr">Sort By Rating</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="shop-page-product">
        <div class="container container-wide">
            <div class="product-wrapper product-layout layout-grid" id="trg">
                <div class="row mtn-30" id="products">
                    
                <?php
                            require "../Metier/produit.php";
                            $tab = Produit::afficher();
                            foreach($tab as $t) {?>
                        <!-- Start Product Item -->
                        <div class="col-xl-2" id="<?=$t->get("c")?>">
                            <div class="product-item">
                                <div class="product-item__thumb">
                                    <a href="single-product.php?ref=<?=$t->get("r")?>">
                                        <img class="thumb-primary" src="../assets/photos/<?=$t->get("i")?>" alt="Product">
                                        <img class="thumb-secondary" src="../assets/photos/<?=$t->get("i")?>"  alt="Product">
                                    </a>
                                </div>

                                <div class="product-item__content">
                                    <div class="product-item__info">
                                        <h4 class="title" style="margin-top:15px;"><a href="single-product.html"><?=$t->get("l")?></a></h4>
                                        <span class="price"><strong>Price:</strong> <?=$t->get("p")?> Dhs</span>
                                    </div>

                                    <div class="product-item__action">
                                        <button class="btn-add-to-cart"><i class="ion-bag"></i></button>
                                        <button class="btn-add-to-cart"><i class="ion-ios-loop-strong"></i></button>
                                        <button class="btn-add-to-cart"><i class="ion-ios-heart-outline"></i></button>
                                        <button class="btn-add-to-cart"><i class="ion-eye"></i></button>
                                    </div>

                                    <div class="product-item__desc">
                                        <p>Pursue pleasure rationally encounter consequences that are extremely painful.
                                            Nor
                                            again is there anyone who loves or pursues or desires to obtain pain of
                                            itself,
                                            because it is pain, but because occasionally circles</p>
                                    </div>
                                </div>

                                <!-- <div class="product-item__sale">
                                    <span class="sale-txt">25%</span>
                                </div> -->
                            </div>
                        </div>
                        <!-- End Product Item -->
                        <?php
                             }
                        ?>
                        <script>
                            if(typeof categorie !== 'undefined'){
                                childs=document.getElementById("products").children;
                                let size = childs.length;
                                console.log(categorie);
                                for(var i=0;i<size;i++) {
                                    if(childs.item(i).getAttribute("id")!=categorie){
                                    childs.item(i).setAttribute("class","not-active-prod");
                                    }
                                    if(childs.item(i).getAttribute("id")==categorie){
                                    childs.item(i).setAttribute("class","col-xl-3 ");
                                    }
                                }
                            }
                        </script>

                </div>
            </div>
        </div>
    </div>

    <div class="shop-page-action-bar mt-30">
        <div class="container container-wide">
            <div class="action-bar-inner">
                <div class="row align-items-center">
                    <div class="col-sm-6">
                        <nav class="pagination-wrap mb-10 mb-sm-0">
                            <ul class="pagination">
                                <li class="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#"><i class="ion-ios-arrow-thin-right"></i></a></li>
                            </ul>
                        </nav>
                    </div>

                    <div class="col-sm-6 text-center text-sm-right">
                        <p>Showing 1–12 of 26 results</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
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
    <script src="../assets/js/pages/horizontal-layout.js"></script>
    
<script src="../assets/extensions/apexcharts/apexcharts.min.js"></script>
<script src="../assets/js/pages/dashboard.js"></script>
<script src="js.js"></script>
<script>
    const grid = document.querySelector(".switchergrid");
    const list = document.querySelector(".switcherlist");
    const t = document.querySelector("#trg");

    grid.addEventListener("click", ()=>{
        t.setAttribute("class","product-wrapper product-layout "+grid.dataset.layout);
        grid.setAttribute("class","switchergrid active");
        list.setAttribute("class","switcherlist");
    });

    list.addEventListener("click", ()=>{
        t.setAttribute("class","product-wrapper product-layout "+list.dataset.layout);
        grid.setAttribute("class","switchergrid");
        list.setAttribute("class","switcherlist active");
    });
</script>

</body>

</html>
