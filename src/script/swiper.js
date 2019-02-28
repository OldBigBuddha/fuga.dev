window.onload = () => {
  const swiper = new Swiper ('.swiper-container',{
    // Optional parameters
    direction: 'vertical',
    loop: false,
    pagination: {
      // If we need pagination
      el: '.swiper-pagination'
    },
    scrollbar: {
      // And if we need scrollbar
      el: '.swiper-scrollbar'
    },
    keyboard: {
      enable: true,
      onlyInViewport: false
    },
    mousewheel: true
  })
}
