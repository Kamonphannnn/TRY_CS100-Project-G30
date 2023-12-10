let prevScrollPos = window.pageYOffset;

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        document.getElementById("navbar").classList.add("sticky");
    } else {
        document.getElementById("navbar").classList.remove("sticky");
    }

    prevScrollPos = currentScrollPos;
};

function toggleHam(x) {
    x.classList.toggle("change");
  
    let myMenu = document.getElementById('myMenu');
    if (myMenu.className === 'menu'){
      myMenu.className += ' menu-active'
    } else {
      myMenu.className = 'menu'
    }
}

function toggle(){
    var blur = document.getElementById('myMenu');
    blur.classList.toggle('active');
}