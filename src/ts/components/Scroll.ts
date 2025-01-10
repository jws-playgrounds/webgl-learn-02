import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars';

gsap.registerPlugin(ScrollTrigger);
OverlayScrollbars.plugin(ClickScrollPlugin);

export default class Scroll {
  scroller: Lenis;

  constructor() {
    this.scroller = new Lenis();
    this.setupLenis();
    document.querySelectorAll('.js-scroll').forEach((elm) => {
      OverlayScrollbars(elm as HTMLElement, {
        scrollbars: {
          clickScroll: true,
        },
      });
    });
  }

  getLenis() {
    return this.scroller;
  }

  setupLenis() {
    this.scroller.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      this.scroller.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  stopLenis(elm) {
    this.scroller.stop();
  }

  startLenis(elm) {
    this.scroller.start();
  }
}
