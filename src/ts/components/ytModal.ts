import gsap from 'gsap';

// classにjs-ytmodalbtn data-ytにYoutubeIDを入れたボタンを設置する。
// <button data-yt="9kMGyCMBOsg" class="js-ytmodalbtn">YouTube</button>
export default function ytModal() {
  const movBtns = document.querySelectorAll('.js-ytmodalbtn');
  const modal = document.querySelector('.c_modal');
  const iframeYt = document.querySelector('.c_modal_yt iframe');
  const modalMask = document.querySelector('.c_modal_mask');

  movBtns.forEach((movBtn) => {
    movBtn.addEventListener('click', () => {
      const yt = movBtn.getAttribute('data-yt');
      iframeYt.setAttribute('src', `https://www.youtube.com/embed/${yt}`);
      const tl = gsap.timeline();
      tl.to(modal, { display: 'block', duration: 0 }).to(modal, {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'expo.out',
      });
    });
  });

  modalMask.addEventListener('click', () => {
    iframeYt.setAttribute('src', '');
    const tl = gsap.timeline();
    tl.to(modal, { autoAlpha: 0, duration: 0.5, ease: 'expo.out' }).to(modal, {
      display: 'none',
      duration: 0,
    });
  });
}
