!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),a=null;function n(t){t.parentNode.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}e.addEventListener("click",(function(e){var n=e.target;clearInterval(a),t.disabled=!1,n.disabled=!0})),t.addEventListener("click",(function(t){var r=t.target;a=setInterval(n,1e3,r),r.disabled=!0,e.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.4c5b5627.js.map