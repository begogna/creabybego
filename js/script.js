$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });


  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.

  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});


// Remove the class 'active' from home and switch to About button
var switchMenuToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Add 'active' to about button if not already there
  classes = document.querySelector("#navAboutButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector("#navAboutButton").className = classes;
  }
};


(function (global) {

    //Context variable to allow using the properties in other pages or scripts
    var cbb = {};
    var homeHtml = "snippets/home-snippet.html";
    var aboutHtml = "snippets/about-snippet.html";


    // Convenience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
      var targetElem = document.querySelector(selector);
      targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
    var showLoading = function (selector) {
      var html = "<div class='text-center'>";
      html += "<i class='fa fa-cog fa-spin fa-3x fa-fw'></i></div>";
      insertHtml(selector, html);
    };

    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {

    // On first load, show home view
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
      },
      false);
    });

    // Load About
    cbb.loadAboutPage = function () {
      showLoading("#main-content");
      $ajaxUtils.sendGetRequest(
      aboutHtml,
      function (aboutHtml) {
     
       // Switch CSS class active to menu button
          switchMenuToActive();
          insertHtml("#main-content", aboutHtml);
        },
        false);
    };

    global.$cbb = cbb;


})(window);//end funtion(global)
