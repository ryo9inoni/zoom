import MODE from '../config/mode'; 
import EL from '../config/element';

export default class Zoom {
  constructor() {
    this.max = 1.3;
    this.range = 700;
    this.index = 0;
    this.lastIndex = EL.satisGpicAll.length - 1;
    
    this.Init();
    this.Scroll();
    this.Slide();
  }
  
  Init() {
    // 画像ズーム
    for (let i = 0; i < EL.parallaxAll.length; i++) {
      const offset = window.pageYOffset;
      const top = EL.parallaxAll[i].getBoundingClientRect().top;
      const height = EL.parallaxAll[i].clientHeight;
      const pos = offset + top + height;
      const flagImg = EL.parallaxAll[i].classList.contains('image');
      if (flagImg && offset > pos) {
        EL.parallaxAll[i].querySelectorAll('img').forEach(el => {
          el.style.transform = 'scale(1)';
        });
      }
    }
  }

  Scroll() {
    window.addEventListener('scroll', () => {
      this.Model();
    });
  }

  Model() {
    for (let i = 0; i < EL.parallaxAll.length; i++) {
      const offset = window.pageYOffset;
      const top = EL.parallaxAll[i].getBoundingClientRect().top;
      const client = document.documentElement.clientHeight;
      const pos = (offset + top) - client;
      
      if (offset >= pos) {
        EL.parallaxAll[i].dataset.parallax = true;
      } else {
        EL.parallaxAll[i].dataset.parallax = false;
      }

      // 画像ズーム
      const flagImg = EL.parallaxAll[i].classList.contains('image');
      if (flagImg && top > 0 && offset > pos) {
        const zoom = 1 + (this.max - 1) * -1 * (top / -this.range);
        EL.parallaxAll[i].querySelectorAll('img').forEach(el => {
          el.style.transform = 'scale(' + zoom + ')';
        });
      }
    }
  }

}