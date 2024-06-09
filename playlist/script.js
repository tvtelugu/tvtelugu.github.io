//just for copy-to-clipboard functionality (add data-link attribute to any element)
(function() {
  document.body.addEventListener('click', copy, true);
  var copyElement = document.createElement("textarea");
  copyElement.style.display = "none";
  document.body.appendChild(copyElement);
  function copy(e) {
    var c = e.target.dataset.link;
    copyElement.value = c;
    if (c && copyElement.select) {
      copyElement.style.display = "block";
      copyElement.select();
      try {
        document.execCommand('copy');
        copyElement.blur();
        gsap.fromTo(e.target.parentNode, {color:"white"}, {duration:0.7, color:"#989898"});
      } catch (err) {
        alert('please press Ctrl/Cmd+C to copy');
      }
      copyElement.style.display = "none";
    }
  }
})();