/**
 * Portfolio Website - Aviral Bhardwaj
 * Data Engineer & Open Source Contributor
 * JavaScript for interactivity and animations
 */

// Smooth Scroll Function
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Add fade-in animation on scroll
$(document).ready(function() {

  // Function to check if element is in viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to add fade-in class when element is in viewport
  function checkFadeIn() {
    $('.skill-item, .project-card, .cert-item, .timeline-item').each(function() {
      if (isElementInViewport(this)) {
        $(this).addClass('fade-in');
      }
    });
  }

  // Check on scroll and page load
  $(window).on('scroll', checkFadeIn);
  checkFadeIn();

  // Add active state to navigation links
  $(window).scroll(function() {
    var scrollDistance = $(window).scrollTop();

    // Assign active class to nav links while scrolling
    $('section').each(function(i) {
      if ($(this).position().top <= scrollDistance + 100) {
        $('.nav a.active').removeClass('active');
        $('.nav a').eq(i).addClass('active');
      }
    });
  }).scroll();

  // Typing effect for intro tagline (optional enhancement)
  var taglineText = "6 Years of Experience in Big Data Engineering";
  var taglineElement = $('.intro-tagline');

  if (taglineElement.length) {
    var originalText = taglineElement.text();
    if (originalText === taglineText) {
      taglineElement.text('');
      var i = 0;

      function typeWriter() {
        if (i < taglineText.length) {
          taglineElement.text(taglineElement.text() + taglineText.charAt(i));
          i++;
          setTimeout(typeWriter, 50);
        }
      }

      // Start typing effect after page loads
      setTimeout(typeWriter, 1000);
    }
  }

  // Counter animation for stats
  function animateValue(element, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));

    var timer = setInterval(function() {
      current += increment;
      $(element).text(current + '+');
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  // Trigger counter animation when stats section is in view
  var statsAnimated = false;
  $(window).scroll(function() {
    var statsSection = $('.stats-row');
    if (statsSection.length && !statsAnimated) {
      var statsSectionTop = statsSection.offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > statsSectionTop) {
        statsAnimated = true;
        animateValue('.stat-number:eq(0)', 0, 6, 2000);
        animateValue('.stat-number:eq(1)', 0, 10000, 2000);
        animateValue('.stat-number:eq(2)', 0, 500, 2000);
      }
    }
  });

  // Particle effect for intro section (lightweight version)
  function createParticle() {
    var particle = $('<div class="particle"></div>');
    var size = Math.random() * 3 + 1;
    var startX = Math.random() * $(window).width();
    var duration = Math.random() * 3 + 2;

    particle.css({
      position: 'absolute',
      width: size + 'px',
      height: size + 'px',
      background: 'rgba(26, 188, 156, 0.5)',
      borderRadius: '50%',
      left: startX + 'px',
      bottom: '0',
      pointerEvents: 'none',
      zIndex: 1
    });

    $('.intro').append(particle);

    particle.animate({
      bottom: $(window).height() + 'px',
      opacity: 0
    }, duration * 1000, function() {
      particle.remove();
    });
  }

  // Create particles periodically (disabled by default for performance)
  // Uncomment below to enable particle effect
  // setInterval(createParticle, 500);

  // Add hover effect to project cards
  $('.project-card').hover(
    function() {
      $(this).find('.project-icon i').addClass('animated-icon');
    },
    function() {
      $(this).find('.project-icon i').removeClass('animated-icon');
    }
  );

  // Add dynamic year to copyright
  var currentYear = new Date().getFullYear();
  $('.copyright').html('&copy; ' + currentYear + ' Aviral Bhardwaj. All rights reserved.');

  // Progress bar for page scroll (optional)
  $(window).scroll(function() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;

    // Create progress bar if it doesn't exist
    if ($('.scroll-progress').length === 0) {
      $('body').prepend('<div class="scroll-progress"></div>');
      $('.scroll-progress').css({
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        background: '#1abc9c',
        zIndex: 9999,
        transition: 'width 0.3s ease'
      });
    }

    $('.scroll-progress').css('width', scrolled + '%');
  });

  // Console message for developers
  console.log('%c👋 Hello, Developer!', 'color: #1abc9c; font-size: 20px; font-weight: bold;');
  console.log('%cThis portfolio is built by Aviral Bhardwaj', 'color: #7f8c8d; font-size: 14px;');
  console.log('%cInterested in Big Data and Open Source? Let\'s connect!', 'color: #1abc9c; font-size: 14px;');
  console.log('%cLinkedIn: https://www.linkedin.com/in/aviralb/', 'color: #7f8c8d; font-size: 12px;');
  console.log('%cGitHub: https://github.com/aviral-bhardwaj', 'color: #7f8c8d; font-size: 12px;');

  // Lazy load images (if any additional images are added)
  $('img[data-src]').each(function() {
    var img = $(this);
    img.attr('src', img.attr('data-src'));
    img.on('load', function() {
      img.removeAttr('data-src');
    });
  });

  // Add smooth transitions to all sections
  $('section').css({
    'opacity': '0',
    'transform': 'translateY(20px)',
    'transition': 'opacity 0.6s ease, transform 0.6s ease'
  });

  // Animate sections as they come into view
  function animateSections() {
    $('section').each(function() {
      var sectionTop = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > sectionTop + 100) {
        $(this).css({
          'opacity': '1',
          'transform': 'translateY(0)'
        });
      }
    });
  }

  // Initial check and scroll listener
  animateSections();
  $(window).scroll(animateSections);

  // Add CSS for animated icon
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      .animated-icon {
        animation: pulse 0.5s ease-in-out;
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
    `)
    .appendTo('head');

  // Handle external links
  $('a[target="_blank"]').click(function() {
    // Track external link clicks (can be integrated with analytics)
    var linkUrl = $(this).attr('href');
    console.log('External link clicked:', linkUrl);
  });

  // Add tooltips to social icons (optional)
  $('.social a, .social-footer a').each(function() {
    var title = $(this).attr('title');
    if (title) {
      $(this).tooltip({
        placement: 'bottom',
        trigger: 'hover'
      });
    }
  });

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  // Apply debounce to scroll-heavy functions
  $(window).on('scroll', debounce(function() {
    // Scroll-dependent code here runs less frequently
  }, 100));

});

// Handle page load performance
$(window).on('load', function() {
  // Remove any loading screen if present
  $('.loading-screen').fadeOut(500);

  // Log page load time for performance monitoring
  var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
  console.log('Page loaded in ' + loadTime + 'ms');
});

// Service Worker registration for PWA (optional - uncomment if needed)
/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      console.log('ServiceWorker registered:', registration);
    })
    .catch(function(error) {
      console.log('ServiceWorker registration failed:', error);
    });
}
*/
