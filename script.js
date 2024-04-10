const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);



// Register Plugins
gsap.registerPlugin(Flip);



// Calling Fns
window.addEventListener('load', () => {
  lenis();
  changeView();
})






// Creating Fus
function lenis() {
  const lenis = new Lenis({
    wheelMultiplier: 1.1,
    duration: 1.5,
    easing: (x) => 1 - Math.pow(1 - x, 5),
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}
function changeView() {
  const changeViewBtn = $('.photoset__nav-view');        
  const navTween = gsap.to('.photoset__nav-view-icon--1 rect', {attr: {rx: 3.5}, scale: 1.2, duration: 0.2, ease: 'ease.inOut', paused: true})

  let count = 1;
  changeViewBtn.addEventListener('click', () => {
    const state = Flip.getState('.photoset__item, main');
    $$('.photoset__item').forEach(item => item.classList.toggle('normal__view'));
    count ? navTween.play() && count-- : navTween.reverse() && count++;
    
    gsap.ticker.add(() => {
      Flip.from(state, {
        delay: -1,
        absolute: true,
        duration: 4,
        ease: 'expo.inOut',
        onComplete: function() {this.revert},
      });
    }, true, true);
    gsap.ticker.lagSmoothing(0);
  });
}



gsap.config({trialWarn: false});
