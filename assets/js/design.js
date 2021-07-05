// translate 적용
const translate = document.querySelectorAll('.translate')
const shadow = document.querySelector(".shadow");
const opacity = document.querySelectorAll(".opacity");
const intro1 = document.querySelector('.intro1');
const m_intro01 = document.querySelector(".m_intro01");
const m_intro02 = document.querySelector(".m_intro02");
const m_intro03 = document.querySelector(".m_intro03");
let intro1_height = intro1.offsetHeight;

window.addEventListener('scroll', function () {
    let scroll = window.pageYOffset;
    let introY = intro1.getBoundingClientRect();

    console.log(scroll)
    // translate 효과 적용
    translate.forEach(function (el) {
        let speed = el.dataset.speed;
        el.style.transform = `translateY(${scroll * speed}px)`;
    })

    // 투명도 적용 ( intro1 의 높이값과 top 값 )
    opacity.forEach(function (el) {
        el.style.opacity = scroll / (intro1_height + introY.top) * 0.8;
    })
    // main 에서 intro 넘어갈때 그림자 효과
    shadow.style.height = `${scroll * 0.5 + 100}px`;


    //intro1.style.transform = `translateY(${scroll / (intro1_height + introY.top) * 125 - 125}px)`;
})