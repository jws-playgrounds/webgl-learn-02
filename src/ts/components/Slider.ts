import Splide from '@splidejs/splide';

export default class Slider {
  constructor({
    elm: elm,
    isArrows: isArrows = false,
    isAutoplay: isAutoplay = false,
    isPagination: isPagination = false,
  }) {
    this.init(elm, isArrows, isAutoplay, isPagination);
  }

  init(elm, isArrows, isAutoplay, isPagination) {
    const splide = new Splide(elm, {
      type: 'fade',
      rewind: true,
      speed: 1000,
      autoWidth: true,
      autoHeight: true,
      arrows: isArrows,
      autoplay: isAutoplay,
      pagination: isPagination,
      pauseOnHover: false,
      pauseOnFocus: false,
      interval: 5000,
    });

    splide.mount();
  }
}
