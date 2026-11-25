$(document).ready(function () {

  // Mobile menu
  $('.hamburger').on('click', function () {
    $('.nav-links').slideToggle(300);
  });

  // Typing effect
  const words = ["feel alive", "convert better", "stand out", "inspire action"];
  let i = 0, j = 0, current = "", isDeleting = false;
  function type() {
    current = words[i];
    let display = isDeleting ? current.substring(0, j--) : current.substring(0, j++);
    $('#typed').text(display);
    if (!isDeleting && j === current.length + 1) {
      isDeleting = true;
      setTimeout(type, 1400);
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % words.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, isDeleting ? 50 : 100);
    }
  }
  if ($('#typed').length) type();

  // Home Carousel
  let currentSlide = 0;
  const $track = $('#homeCarousel .carousel-track');
  const total = $track.children().length;

  function updateCarousel() {
    $track.css('transform', `translateX(-${currentSlide * 100}%)`);
  }
  $('#nextBtn').on('click', function () {
    currentSlide = (currentSlide + 1) % total;
    updateCarousel();
  });
  $('#prevBtn').on('click', function () {
    currentSlide = (currentSlide - 1 + total) % total;
    updateCarousel();
  });
  // Auto play
  setInterval(() => {
    currentSlide = (currentSlide + 1) % total;
    updateCarousel();
  }, 5000);

  // Process carousel (Work page)
  $('.dot').on('click', function () {
    const idx = $(this).data('index');
    $('.process-slide').removeClass('active');
    $('.process-slide').eq(idx).addClass('active');
    $('.dot').removeClass('active');
    $(this).addClass('active');
  });

  // Counter animation
  function animateCounters() {
    $('.counter').each(function () {
      const $this = $(this);
      const target = +$this.data('target');
      $({ count: 0 }).animate({ count: target }, {
        duration: 2000,
        easing: 'swing',
        step: function () { $this.text(Math.floor(this.count)); },
        complete: function () { $this.text(target); }
      });
    });
  }

  // Scroll animations + counters
  function checkVisible() {
    $('[data-aos]').each(function () {
      const top = $(this).offset().top;
      if (top < $(window).scrollTop() + $(window).height() - 80) {
        $(this).addClass('visible');
      }
    });
  }
  $(window).on('scroll', checkVisible);
  checkVisible();

  // Trigger counters when stats section is visible
  let counted = false;
  $(window).on('scroll', function () {
    if ($('.stats').length && !counted) {
      const top = $('.stats').offset().top;
      if (top < $(window).scrollTop() + $(window).height() - 100) {
        animateCounters();
        counted = true;
      }
    }
  });

  // Contact form
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    $('#successModal').addClass('active');
  });
  $('#closeModal').on('click', function () {
    $('#successModal').removeClass('active');
    $('#contactForm')[0].reset();
  });

});
