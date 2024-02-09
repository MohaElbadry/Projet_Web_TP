function FilterProduit() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchProduit");
  filter = input.value.toLowerCase();

  child=document.getElementById("caisse-produits").children;
  let size = child.length;
  for(var i=0;i<size;i++) {
    h6=child.item(i).getElementsByTagName("h6");
    p=child.item(i).getElementsByTagName("p");
    if(h6||p){
      if(h6[0].innerHTML.toLowerCase().indexOf(filter)  > -1 || p[0].innerHTML.toLowerCase().indexOf(filter)  > -1 ){
        child.item(i).setAttribute("class","active-prod");
      }
    }
    if(h6[0].innerHTML.toLowerCase().indexOf(filter)  == -1 && p[0].innerHTML.toLowerCase().indexOf(filter)  == -1 ){
      child.item(i).setAttribute("class","not-active-prod");
    }
  }
}

function FilterkeyWord() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("search");
  filter = input.value.toLowerCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td1 = tr[i].getElementsByTagName("td")[1];
    td2 = tr[i].getElementsByTagName("td")[3];
    td3 = tr[i].getElementsByTagName("td")[4];

    if (td) {
      if (td.innerHTML.toLowerCase().indexOf(filter)  > -1 ||
          td1.innerHTML.toLowerCase().indexOf(filter) > -1 ||
          td2.innerHTML.toLowerCase().indexOf(filter) > -1 ||
          td3.innerHTML.toLowerCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}



const prods=document.getElementById("caisse-produits");
const pr=document.getElementById("caisse-produits").outerHTML;


var lignecmd=0;
var i=1;
var n=0;
var ps=0;

buttons = document.querySelectorAll(".add-to-caisse");
buttons.forEach(button => {
  button.addEventListener("click",() =>{
    ref=button.dataset.ref;
    lib=button.dataset.lib;
    price=button.dataset.price;
    qnt=button.dataset.qnt;
    addRow(ref,lib,price,qnt);
  });
});

function addRow(r,l,p,q){
  exist=false;
  if(tr = document.getElementById("ticket-body").getElementsByTagName("tr")){
    let size = tr.length;
      for(var m=0;m<size;m++) {
          if(tr.item(m).getAttribute("class")==r) exist=true;
      }
  }
  if(!exist){
    document.getElementById("ticket-body").innerHTML += 
    '<tr id="'+i+'" class="'+r+'"> '+
    '<td class="lib-col"> <input type="hidden" name="cart['+i+'][0]" value="'+r+'"><input type="hidden" value="'+l+'" class="form-control libelle"><div>'+l+'</div> </td>'+
    '<td> <div style="font-size: 0.9rem;">'+p+' Dh</div>  <input type="hidden" name="cart['+i+'][1]" id="prix" value="'+p+'" min="1" class="form-control prix" style="font-size: 0.9rem;">  </td> '+
    '<td> <input onclick="total('+i+','+p+')" onchange="total('+i+','+p+')" type="number" name="cart['+i+'][2]" id="qnt'+i+'" value="1" min="1" max="'+q+'" class="form-control" style="font-size: 0.9rem;"> </td>'+
    '<td> <div id="total'+i+'" style="font-size: 0.9rem;">'+p+' Dh</div> </td>'+
    '<td class="deleteIcon"> <svg onclick="deleteRow('+i+')" class="bi" width="1em" height="1em" fill="currentColor"> <use xlink:href="../../assets/images/bootstrap-icons.svg#trash"></use> </svg>'+
    '<input type="hidden" name="cart['+i+'][3]" value="'+q+'"> </td> </tr>';
    i++;
    n++;
    document.getElementById("numCmd").innerHTML = "Num : "+n;
    document.getElementById("numCmdInput").setAttribute("value",String(n));
  }
}


function deleteRow(i){
  document.getElementById(i).remove();
  let m=document.getElementById("numCmdInput").getAttribute("value");
  document.getElementById("numCmdInput").setAttribute("value",String(parseInt(m-1)));
  document.getElementById("numCmd").innerHTML = "Num : "+(m-1);
  n--;
}

function total(id,prix){
  var qnt,iprix;
    qnt = parseInt(document.getElementById("qnt"+id).value);
    iprix = parseInt(prix);
    document.getElementById("total"+id).innerHTML=String(iprix*qnt)+" Dh";
  } 

function Cat(id){
  child=document.getElementById("caisse-produits").children;
  let size = child.length;
  for(var i=0;i<size;i++) {
    if(child.item(i).getAttribute("id")!=id){
      child.item(i).setAttribute("class","not-active-prod");
    }
    if(child.item(i).getAttribute("id")==id){
      child.item(i).setAttribute("class","card d-flex align-items-center");
    }
  }
}

function CatAll(){
  child=document.getElementById("caisse-produits").children;
  let size = child.length;
  for(var i=0;i<size;i++) {
      child.item(i).setAttribute("class","active-prod");
  }
}

