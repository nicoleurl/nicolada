window.onload = function() {
    var headers = ["UX/UI", "Graphic", "Product", "Brand", "Website"];
    var lastheader = -1;

    function newHeader() {
        if (++lastheader >= headers.length)
            lastheader = 0;
        document.getElementById("hero__variable-text").innerText = headers[lastheader];
    }

    newHeader();
    setInterval(newHeader, 1500);
    
  };

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  });

window.onload = function() {

    var contactwords = ["meaningful", "fun", "creative", "impactful", "daring", "exciting", "original"];
    var lastheader = -1;

    function contactHeader() {
      if (++lastheader >= contactwords.length)
          lastheader = 0;
      document.getElementById("contact__variable-text").innerText = contactwords[lastheader];
    }

    contactHeader();
    setInterval(contactHeader, 1500);
};

