document.addEventListener('turbo:load', () => {
  // Header for the hero section
  const variableHero = document.querySelector('#hero__variable-text');
  if (variableHero) {
      const headers = ["UX/UI", "Graphic", "Product", "Brand", "Website"];
      let lastHeaderHero = -1;

      function newHeader() {
          lastHeaderHero = (lastHeaderHero + 1) % headers.length;
          variableHero.innerText = headers[lastHeaderHero];
      }

      newHeader();
      setInterval(newHeader, 1500);
  } else {
      console.log("Hero header element not found, skipping header logic.");
  }

  // Header for the contact section
  const variableContact = document.querySelector('#contact__variable-text');
  if (variableContact) {
      const contactWords = ["meaningful", "fun", "creative", "impactful", "daring", "exciting", "original"];
      let lastHeaderContact = -1;

      function contactHeader() {
          lastHeaderContact = (lastHeaderContact + 1) % contactWords.length;
          variableContact.innerText = contactWords[lastHeaderContact];
      }

      contactHeader();
      setInterval(contactHeader, 1500);
  } else {
      console.log("Contact header element not found, skipping contact header logic.");
  }

  // Navbar burger logic
  const navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));
  if (navbarBurgers.length > 0) {
      navbarBurgers.forEach(el => {
          el.addEventListener('click', () => {
              const target = el.dataset.target;
              const targetElement = document.getElementById(target);
              if (targetElement) {
                  el.classList.toggle('is-active');
                  targetElement.classList.toggle('is-active');
              }
          });
      });
  }
});
