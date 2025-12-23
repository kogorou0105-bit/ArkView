/**
 * ArkView 核心逻辑模块
 */ const carouselData = [
    {
        serial: "01",
        title: "CH'ENS BLADE",
        desc: "\u708E\u56FD\u8FD1\u536B\u5C40\u7279\u522B\u7763\u5BDF\u7EC4\u957F // \u8FD9\u79CD\u6218\u672F\uFF0C\u53EA\u6709\u4F60\u80FD\u7406\u89E3\u3002",
        img: "assets/images/carousel_1.png"
    },
    {
        serial: "02",
        title: "PENGUIN LOGISTICS",
        desc: "\u51C6\u70B9\u9001\u8FBE\uFF0C\u4F7F\u547D\u5FC5\u8FBE // \u6211\u4EEC\u5728\u9F99\u95E8\u968F\u65F6\u4E3A\u4F60\u670D\u52A1\u3002",
        img: "https://cdn.jsdelivr.net/gh/hakadao/ArknightsParallaxCarousel@main/img/carousel_9.png"
    },
    {
        serial: "03",
        title: "RHINE LAB",
        desc: "\u79D1\u5B66\u7684\u5C3D\u5934\uFF0C\u662F\u672A\u77E5\u7684\u6DF1\u6E0A // \u83B1\u8335\u751F\u547D\u4E3A\u60A8\u63A2\u7D22\u53EF\u80FD\u3002",
        img: "https://cdn.jsdelivr.net/gh/hakadao/ArknightsParallaxCarousel@main/img/carousel_4.png"
    },
    {
        serial: "04",
        title: "NEARL THE RADIANT",
        desc: "\u8000\u5149\u91CD\u73B0\u6218\u573A // \u53EA\u8981\u8FD8\u6709\u4EBA\u5728\u53D7\u82E6\uFF0C\u8FD9\u5251\u4FBF\u4E0D\u4F1A\u505C\u4E0B\u3002",
        img: "https://cdn.jsdelivr.net/gh/hakadao/ArknightsParallaxCarousel@main/img/carousel_14.png"
    },
    {
        serial: "05",
        title: "KJERAG TRADE",
        desc: "\u96EA\u5C71\u4E4B\u4E0A\u7684\u76DF\u7EA6 // \u8C22\u62C9\u683C\u7684\u5BD2\u98CE\u5C06\u89C1\u8BC1\u8FD9\u4E00\u5207\u3002",
        img: "https://cdn.jsdelivr.net/gh/hakadao/ArknightsParallaxCarousel@main/img/carousel_15.png"
    }
];
let currentIndex = 0;
// DOM 元素引用
const elements = {
    mainImage: document.getElementById("main-image"),
    bgBlur: document.getElementById("bg-blur-sync"),
    serial: document.getElementById("serial-num"),
    title: document.getElementById("title-text"),
    desc: document.getElementById("desc-text"),
    container: document.getElementById("view-container"),
    indicators: document.getElementById("indicators"),
    prevBtn: document.getElementById("prev-btn"),
    nextBtn: document.getElementById("next-btn")
};
/**
 * 乱码解码动画效果
 */ function scramble(el, text) {
    const chars = "!<>-_\\/[]{}\u2014=+*^?#________";
    let frame = 0;
    const length = Math.max((el.innerText || "").length, text.length);
    if (el.scrambleInterval) clearInterval(el.scrambleInterval);
    el.scrambleInterval = setInterval(()=>{
        let output = "";
        let complete = 0;
        for(let i = 0; i < length; i++)if (i < frame / 2) {
            output += text[i] || "";
            complete++;
        } else output += chars[Math.floor(Math.random() * chars.length)];
        el.innerText = output;
        if (complete === length) clearInterval(el.scrambleInterval);
        frame++;
    }, 25);
}
/**
 * 更新轮播显示
 */ function updateSlide(index, glitch = true) {
    const data = carouselData[index];
    // 更新背景同步
    elements.bgBlur.style.backgroundImage = `url(${data.img})`;
    // 转场特效
    if (glitch) {
        elements.mainImage.classList.add("glitch-flash");
        setTimeout(()=>elements.mainImage.classList.remove("glitch-flash"), 400);
    }
    // 更新主图
    elements.mainImage.style.opacity = "0";
    setTimeout(()=>{
        elements.mainImage.style.backgroundImage = `url(${data.img})`;
        elements.mainImage.style.opacity = "1";
    }, 50);
    // 触发解码动画
    scramble(elements.serial, data.serial);
    scramble(elements.title, data.title);
    scramble(elements.desc, data.desc);
    // 更新指示器
    document.querySelectorAll(".indicator-dot").forEach((dot, i)=>{
        dot.classList.toggle("active", i === index);
    });
}
/**
 * 视差反馈初始化
 */ function initParallax() {
    document.addEventListener("mousemove", (e)=>{
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;
        // 3D 偏转
        elements.container.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
        // 内部图片平移
        elements.mainImage.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
    });
}
/**
 * 粒子背景初始化
 */ function initParticles() {
    if (window.particlesJS) particlesJS("particles-js", {
        particles: {
            number: {
                value: 45,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#00f2ff"
            },
            shape: {
                type: "edge"
            },
            opacity: {
                value: 0.4,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1
                }
            },
            size: {
                value: 2,
                random: true
            },
            line_linked: {
                enable: false
            },
            move: {
                enable: true,
                speed: 10,
                direction: "bottom",
                straight: true,
                out_mode: "out"
            }
        }
    });
}
/**
 * 导航初始化
 */ function initNavigation() {
    carouselData.forEach((_, i)=>{
        const dot = document.createElement("div");
        dot.className = `indicator-dot ${i === 0 ? "active" : ""}`;
        dot.onclick = ()=>{
            currentIndex = i;
            updateSlide(i);
        };
        elements.indicators.appendChild(dot);
    });
    elements.prevBtn.onclick = ()=>{
        currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        updateSlide(currentIndex);
    };
    elements.nextBtn.onclick = ()=>{
        currentIndex = (currentIndex + 1) % carouselData.length;
        updateSlide(currentIndex);
    };
}
// 页面加载后启动
window.onload = ()=>{
    initNavigation();
    updateSlide(0, false);
    initParallax();
    initParticles();
};

//# sourceMappingURL=ArkView.c719088e.js.map
