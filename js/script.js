// Collapsible elements
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// Disable context menu in iframe
function disableContextMenuInIframe() {
  const iframe = document.getElementById("my-iframe");
  iframe.contentWindow.document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

// Syntax highlighting
if (window.hljs) {
  hljs.configure({ languages: [] });
  hljs.initHighlightingOnLoad();
  if (document.readyState && document.readyState === "complete") {
    window.setTimeout(function () {
      hljs.initHighlighting();
    }, 0);
  }
}

// Manage active state of menu based on current page
$(document).ready(function () {
  // Active menu anchor
  href = window.location.pathname;
  href = href.substr(href.lastIndexOf("/") + 1);
  if (href === "") href = "index.html";
  var menuAnchor = $('a[href="' + href + '"]');

  // Mark the anchor link active (and if it's in a dropdown, also mark that active)
  var dropdown = menuAnchor.closest("li.dropdown");
  if (window.bootstrap) {
    // Bootstrap 4+
    menuAnchor.addClass("active");
    dropdown.find("> .dropdown-toggle").addClass("active");
  } else {
    // Bootstrap 3
    menuAnchor.parent().addClass("active");
    dropdown.addClass("active");
  }

  // Navbar adjustments
  var navHeight = $(".navbar").first().height() + 15;
  var style = document.createElement("style");
  var pt = "padding-top: " + navHeight + "px; ";
  var mt = "margin-top: -" + navHeight + "px; ";
  var css = "";
  // Offset scroll position for anchor links (for fixed navbar)
  for (var i = 1; i <= 6; i++) {
    css += ".section h" + i + "{ " + pt + mt + "}\n";
  }
  style.innerHTML = "body {" + pt + "padding-bottom: 40px; }\n" + css;
  document.head.appendChild(style);

  // Lazy loading for embedded files
  const embedContainers = document.querySelectorAll(".embed-container");

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function loadEmbed(element) {
    const src = element.getAttribute("data-src");
    const type = element.getAttribute("data-type");

    if (type === "html") {
      const iframe = document.createElement("iframe");
      iframe.src = src;
      element.appendChild(iframe);
    } else if (type === "pdf") {
      PDFObject.embed(src, element);
    }

    element.setAttribute("data-loaded", "true");
  }

  function checkEmbeds() {
    embedContainers.forEach((container) => {
      if (isInViewport(container) && !container.getAttribute("data-loaded")) {
        loadEmbed(container);
      }
    });
  }

  checkEmbeds();

  window.addEventListener("scroll", function () {
    checkEmbeds();
  });

  window.addEventListener("resize", function () {
    checkEmbeds();
  });
});


// add bootstrap table styles to pandoc tables
function bootstrapStylePandocTables() {
  $('tr.odd').parent('tbody').parent('table').addClass('table table-condensed');
}
$(document).ready(function () {
  bootstrapStylePandocTables();
});



$(document).ready(function () {
  window.buildTabsets("TOC");
});

$(document).ready(function () {
  $('.tabset-dropdown > .nav-tabs > li').click(function () {
    $(this).parent().toggleClass('nav-tabs-open');
  });
});

//dynamically load mathjax for compatibility with self-contained -->
  (function () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src  = "https://mathjax.rstudio.com/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
    document.getElementsByTagName("head")[0].appendChild(script);
  })();
