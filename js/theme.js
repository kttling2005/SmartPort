/* Theme: follows the OS, remembers a manual choice across pages. */
(function(){
  var t=null;try{t=localStorage.getItem('sp-theme')}catch(e){}
  if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
  document.documentElement.dataset.theme=t;
})();
