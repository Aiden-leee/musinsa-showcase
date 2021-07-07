// style 적용
const translate = document.querySelectorAll('.translate');
const intro2_translate = document.querySelectorAll('.intro2_translate');
const shadow = document.querySelector(".shadow");   // main 하단 그림자
const opacity = document.querySelectorAll(".opacity");
// section 
const main = document.querySelector('.main');
const intro1 = document.querySelector('.intro1');
const intro2 = document.querySelector('.intro2');
// text
const m_intro01 = document.querySelector(".m_intro01");
const m_intro03 = document.querySelector(".m_intro03");
// intro2 관련 translate 
const trans01 = document.querySelector('.trans01');
const trans02 = document.querySelector('.trans02');
// rolling img 
const rollingImg = document.querySelectorAll(".rollingImg");
const test = document.querySelector(".m_img01_1");
// section height
let main_height = main.offsetHeight;
let intro1_height = intro1.offsetHeight;
let intro2_height = intro2.offsetHeight;

// rolling
const rolling = function (data) {
    let count = 1;  // 이미지 데이터의 current count 
    let time = 1800; // rolling 의 시간

    // setInterval 을 사용하지 않고 중첩 setTimeout을 사용한 이유
    // 호출 결과에 따라 다음 호출을 원하는 방식으로 스케쥴링 가능
    // ex) 초 간격으로 서버에 요청을 보내 데이터를 가져올때 서버가 과부하 상태라면 초 조절 가능
    // 이미지 전환 시 fadeIn 기능 
    let auto = setTimeout(function autoChange() {
        count > 2 ? count = 0 : count;
        let list = data[count].list // 이미지 목록 

        // rolling img url 교체 
        rollingImg.forEach(function (obj, index) {
            obj.src = "./assets/img/" + list[index];
            fadeIn(obj)
        })
        count++;
        setTimeout(autoChange, time);
    }, time)
}
// 이미지 전환 fadeIn 효과 함수
const fadeIn = function (target) {
    let opacity = 0;
    let auto = null;
    auto = setInterval(function () {
        if (opacity > 0.9) {
            clearInterval(auto);
            return
        }
        target.style.opacity = opacity += 0.1
    }, 60)
}

// scroll 로직
window.addEventListener('scroll', function () {
    let scroll = window.pageYOffset;
    let introY = intro1.getBoundingClientRect();
    let intro2Y = intro2.getBoundingClientRect();

    // translate 효과 적용
    translate.forEach(function (el) {
        let speed = el.dataset.speed;
        el.style.transform = `translateY(${scroll * speed}px)`;
    })

    // 투명도 적용 ( section 의 높이값과 element top 값 )
    opacity.forEach(function (el) {
        el.style.opacity = scroll / (main_height + introY.top) * 0.8;
    })
    // main 에서 intro 넘어갈때 그림자 효과
    shadow.style.height = `${scroll * 0.5 + 100}px`;

    // intro 넘어갈때 
    if (scroll > main_height / 2) {
        let intro_translate = scroll / (intro1_height + introY.top) * 385 * 0.8;
        if (intro_translate >= 385) {
            m_intro01.style.transform = `translateX(-375px)`;
            m_intro03.style.transform = `translateX(385px)`;
            return
        }
        m_intro01.style.transform = `translateX(${Math.floor(scroll / (main_height + introY.top) * - 385 * 0.8)}px)`;
        m_intro03.style.transform = `translateX(${Math.floor(scroll / (main_height + introY.top) * 385 * 0.8)}px)`;
    }

    // intro2 
    let margin_height = 635;    // intro2 의 margin-top
    if (scroll > main_height + intro1_height + margin_height) {
        // intro section 에 scroll 값에 따라 ex) 0 ~ 1000 사이의 값으로 y 값 설정 * 속도
        let intro2_line = scroll / (main_height + intro1_height + intro2_height + margin_height + intro2Y.top);
        trans01.style.transform = `translateY(${Math.floor(intro2_line * 1000 - 1000 * 0.5)}px)`;
        trans02.style.transform = `translateY(${Math.floor(intro2_line * 1000 - 1000 * 0.8)}px)`;
    }
})