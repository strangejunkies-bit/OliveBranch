  const weekendSlides = [
    {
      name: "Breakfast for 2",
      price: "$25.99",
      desc: "A shared Middle Eastern breakfast plate with falafel, cheese arayes, eggs, hummus, labneh, chicken liver, olives, pita bread & tea or coffee."
    },
    {
      name: "Breakfast for 4",
      price: "$45.99",
      desc: "A large family-style breakfast plate with falafel, cheese arayes, eggs, hummus, baba ghanoush, labneh, chicken liver, olives, pita bread & tea or coffee."
    }
  ];

  let currentSlide = 0;
  let slideTimer = setInterval(advanceWeekend, 6000);

  function drawWeekendSlide() {
    const slide = weekendSlides[currentSlide];
    document.getElementById('weekend-name').innerHTML = slide.name + ' <span class="accent">· ' + slide.price + '</span>';
    document.getElementById('weekend-note').textContent = slide.desc;

    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });

    const tag = document.getElementById('optionTag');
    if (tag) {
      tag.textContent = 'Option ' + (currentSlide + 1) + ' of ' + weekendSlides.length;
    }
  }

  function showWeekendSlide(index) {
    currentSlide = index;
    clearInterval(slideTimer);
    slideTimer = setInterval(advanceWeekend, 6000);
    drawWeekendSlide();
  }

  function advanceWeekend() {
    showWeekendSlide((currentSlide + 1) % weekendSlides.length);
  }

  function rewindWeekend() {
    showWeekendSlide((currentSlide - 1 + weekendSlides.length) % weekendSlides.length);
  }

  function openSection(name, anchor) {
    document.querySelectorAll('.page').forEach(panel => panel.classList.remove('active'));
    document.getElementById('view-' + name).classList.add('active');

    document.getElementById('homeLink').classList.toggle('active', name === 'home');
    document.getElementById('menuLink').classList.toggle('active', name === 'menu');

    const compactHome = document.getElementById('homeLinkCompact');
    if (compactHome) {
      compactHome.classList.toggle('active', name === 'home');
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (anchor) {
      setTimeout(() => {
        const target = document.getElementById(anchor);
        if (target) {
          const headerOffset = 68 + 42;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - headerOffset,
            behavior: 'smooth'
          });
        }
      }, 50);
    }
  }

  const menuGroups = document.querySelectorAll('#view-menu .menu-group');
  const categoryLinks = document.querySelectorAll('.category-link');
  const categoryTrack = document.querySelector('.category-bar-track');
  const headerOffset = 68 + 42;

  function currentGroup() {
    let activeId = menuGroups[0] ? menuGroups[0].id : null;
    menuGroups.forEach(group => {
      if (group.getBoundingClientRect().top <= headerOffset + 40) {
        activeId = group.id;
      }
    });
    return activeId;
  }

  function markActiveCategory(id) {
    categoryLinks.forEach(link => link.classList.toggle('active', link.dataset.target === id));

    const activeLink = document.querySelector('.category-link[data-target="' + id + '"]');
    if (activeLink && categoryTrack) {
      const left = activeLink.offsetLeft - (categoryTrack.clientWidth / 2) + (activeLink.clientWidth / 2);
      categoryTrack.scrollTo({ left: left, behavior: 'smooth' });
    }
  }

  let scrollQueued = false;
  window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      if (document.getElementById('view-menu').classList.contains('active')) {
        markActiveCategory(currentGroup());
      }
      scrollQueued = false;
    });
  }, { passive: true });

  categoryLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.dataset.target);
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - headerOffset,
          behavior: 'smooth'
        });
      }
    });
  });

  Object.assign(window, {
    openSection,
    showWeekendSlide,
    advanceWeekend,
    rewindWeekend
  });
