window.addEventListener('scroll', function() {
    var scrollButton = document.getElementById('scroll-top');
    
    if (window.innerHeight + window.pageYOffset + 500 >= document.body.offsetHeight) {
      scrollButton.style.visibility = 'visible';
    } else {
      scrollButton.style.visibility = 'hidden';
    }
  });