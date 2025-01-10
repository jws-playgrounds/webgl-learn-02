import gsap from 'gsap';

export default class SetupVar {
  constructor() {
    // this.init();
  }

  init() {
    // vwが完了した後にloadHiddenを呼び出す
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${this.scrollbarWidth()}px`,
    );
    window.addEventListener('resize', () => {
      this.vw();
    });
    return this.vw().then(() => {
      return new Promise<void>((resolve) => {
        this.loadHidden();
        console.log('setupVar');
        resolve();
      });
    });
  }

  scrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.remove();

    return scrollbarWidth;
  }
  vw(): Promise<void> {
    return new Promise<void>((resolve) => {
      const width = document.body.getBoundingClientRect().width;
      const height = document
        .querySelector('.l_load')
        .getBoundingClientRect().height;

      const vw = width / 100;
      const vh = height / 100;

      document.documentElement.style.setProperty('--vw', `${vw}`);
      document.documentElement.style.setProperty('--vh', `${vh}`);
      document.documentElement.style.setProperty(
        '--vmin',
        `${Math.min(vw, vh)}`,
      );
      document.documentElement.style.setProperty(
        '--vmax',
        `${Math.max(vw, vh)}`,
      );
      // document.documentElement.style.setProperty('--vpw', `${width}`);
      // document.documentElement.style.setProperty('--vph', `${height}`);
      // document.documentElement.style.setProperty(
      //   '--pcdw',
      //   `${import.meta.env.PUBLIC_PC_DESIGN_SIZE}`,
      // );
      // document.documentElement.style.setProperty(
      //   '--spdw',
      //   `${import.meta.env.PUBLIC_SP_DESIGN_SIZE}`,
      // );
      // document.documentElement.style.setProperty(
      //   '--bp',
      //   `${Number(import.meta.env.PUBLIC_BREAK_POINT)}`,
      // );

      resolve();
    });
  }

  loadHidden(): Promise<void> {
    return new Promise<void>((resolve) => {
      gsap.to('.l_load', {
        autoAlpha: 0,
        duration: 0.1,
        zIndex: -1,
        pointerEvents: 'none',
      });
      resolve();
    });
  }
}
