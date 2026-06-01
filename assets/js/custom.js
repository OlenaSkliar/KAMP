


let lastScrollTop = 0;
let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Скрол вниз — ховаємо хедер
        header.classList.add('scroll');
    } else if (scrollTop === 0) {
        // Тільки коли на самому верху — прибираємо клас
        header.classList.remove('scroll');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Захист від мінусових значень
});

addEventListener('DOMContentLoaded', function (){
    let aboutNumbers = document.querySelectorAll('[data-count="count"]')

    aboutNumbers.forEach(function(item) {
        // Add new attributes to the elements with the '.scroll-counter' HTML class
        item.counterAlreadyFired = false
        item.counterSpeed = 30
        item.counterTarget = +item.innerHTML
        item.counterCount = 0
        item.counterStep = item.counterTarget / item.counterSpeed

        item.updateCounter = function() {
            item.counterCount = item.counterCount + item.counterStep
            item.innerText = Math.ceil(item.counterCount)

            if (item.counterCount < item.counterTarget) {
                setTimeout(item.updateCounter, item.counterSpeed)
            } else {
                item.innerText = item.counterTarget
            }
        }
    })
    // Function to determine if an element is visible in the web page
    let isElementVisible = function isElementVisible(el) {
        let scroll = window.scrollY || window.pageYOffset
        let boundsTop = el.getBoundingClientRect().top + scroll
        let viewport = {
            top: scroll,
            bottom: scroll + window.innerHeight,
        }
        let bounds = {
            top: boundsTop,
            bottom: boundsTop + el.clientHeight,
        }
        return (
            (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
            (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
        )
    }

    // Funciton that will get fired uppon scrolling
    let handleScroll = function handleScroll() {
        aboutNumbers.forEach(function(item, id) {
            if (true === item.counterAlreadyFired) return
            if (!isElementVisible(item)) return
            item.updateCounter()
            item.counterAlreadyFired = true
        })
    }

    // Fire the function on scroll
    window.addEventListener("scroll", handleScroll)
})


addEventListener('click', function (e){
    let t = e.target;
    if(
        t.closest('.header.only-mob .menu-btns')
        && document.querySelector('.header-mobile-wrap')
        && document.querySelector('.menu-btn-open')
        && document.querySelector('.menu-btn-close')
    ){
        t.closest('.header.only-mob').classList.toggle('menu-translate');
        document.querySelector('.header.only-mob .menu-btns').classList.toggle('open');
    }
    if(
        t.closest('.header .menu-btns')
        && document.querySelector('.header-mobile-wrap')
        && document.querySelector('.menu-btn-open')
        && document.querySelector('.menu-btn-close')
    ){
        t.closest('.header').classList.toggle('menu-translate');
        document.querySelector('.header .menu-btns').classList.toggle('open');
    }
   

})
document.addEventListener('DOMContentLoaded', () => {

    const menuMobile = document.querySelector('.header-mobile-wrap');
    const x = window.matchMedia('(max-width: 991px)');

    document.querySelectorAll('.scroll-link').forEach(link => {

        link.addEventListener('click', function(e) {
            e.preventDefault();

            const hash = this.getAttribute('href');

            if (hash) {
                scrollToTargetAdjusted(hash.substring(1));
            }

            if (menuMobile) {
                const header = menuMobile.closest('.header.only-mobile');
                const menuBtns = document.querySelector('.header.only-mobile .menu-btns');

                if (header) {
                    header.classList.toggle('menu-translate');
                }

                if (menuBtns) {
                    menuBtns.classList.toggle('open');
                }
            }
        });

    });

    function scrollToTargetAdjusted(elemId) {

        const element = document.getElementById(elemId);

        if (!element) return;

        const headerOffset = x.matches ? 74 : 74;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

});

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}