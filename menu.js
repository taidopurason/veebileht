function menu(){
    var checkbox = document.getElementById("checkbox");
    var menuItems = document.getElementById("menuitems");
    var body = document.body;
    if (checkbox.checked == true){
        menuItems.style.opacity="1";
      } else {
        menuItems.style.opacity = "0";
      }
}