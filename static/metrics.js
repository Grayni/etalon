// (
//   function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
//   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}
// )(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

(
  function (w, d, c) {
    (w[c] = w[c] || []).push(function() {
      var options = {
          project: 3116385,
          element: 'top100_widget',
      };
      try {
          w.top100Counter = new top100(options);
      } catch(e) { }
    });
    var n = d.getElementsByTagName("script")[0],
    s = d.createElement("script"),
    f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src =
    (d.location.protocol == "https:" ? "https:" : "http:") +
    "//st.top100.ru/top100/top100.js";
  
    if (w.opera == "[object Opera]") {
      d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
  }
)(window, document, "_top100q")

// ym(29051230, "init", {
//     clickmap:true,
//     trackLinks:true,
//     accurateTrackBounce:true
// })


