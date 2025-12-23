/**
 * ArkView 核心逻辑模块 - 适配 Parcel 资源管理
 */

// 使用 Parcel 的资源引用语法定义 10 张图片的数据
const carouselData = [
  {
    serial: "01",
    title: "CH'ENS BLADE",
    desc: "炎国近卫局特别督察组长 // 这种战术，只有你能理解。",
    img: new URL("../assets/images/carousel_1.png", import.meta.url).href,
    color: "#ff3333", // 陈的主题色：赤红
  },
  {
    serial: "02",
    title: "PENGUIN LOGISTICS",
    desc: "企鹅物流档案 // 德克萨斯、能天使，龙门最可靠的派送员。",
    img: new URL("../assets/images/carousel_2.png", import.meta.url).href,
    color: "#ffcc00", // 企鹅物流：亮黄
  },
  {
    serial: "03",
    title: "THE MESSENGER",
    desc: "INCOMING TRANSMISSION // 这里的风雪，从未停止过。",
    img: new URL("../assets/images/carousel_3.png", import.meta.url).href,
    color: "#ff4e00", // 传讯者：橙红
  },
  {
    serial: "04",
    title: "RHINE LAB",
    desc: "科学的尽头，是未知的深渊 // 莱茵生命为您探索可能。",
    img: new URL("../assets/images/carousel_4.png", import.meta.url).href,
    color: "#00f2ff", // 莱茵生命：原有的科技青
  },
  {
    serial: "05",
    title: "RIVER FESTIVAL",
    desc: "岁节将至 // 阿米娅与凯尔希的片刻闲暇。",
    img: new URL("../assets/images/carousel_5.png", import.meta.url).href,
    color: "#77ffaa", // 岁节：淡绿
  },
  {
    serial: "06",
    title: "LUNGMEN NIGHT",
    desc: "龙门繁华背后的阴影 // 特别督察组正在巡逻。",
    img: new URL("../assets/images/carousel_6.png", import.meta.url).href,
    color: "#ffae00", // 龙门霓虹：琥珀色
  },
  {
    serial: "07",
    title: "ORIGINIUM CRYSTAL",
    desc: "THE ONLY MONSTER IS YOUR MIND // 源石结晶的危险魅力。",
    img: new URL("../assets/images/carousel_7.png", import.meta.url).href,
    color: "#ffffff", // 源石：纯白/浅灰
  },
  {
    serial: "08",
    title: "RHODES ISLAND",
    desc: "罗德岛领袖阿米娅 // 我们必须为了理想而战。",
    img: new URL("../assets/images/carousel_8.png", import.meta.url).href,
    color: "#00baff", // 罗德岛：深天蓝
  },
  {
    serial: "09",
    title: "LOGISTICS OFFICE",
    desc: "企鹅物流龙门分部 // 这里总是充满着热闹与混乱。",
    img: new URL("../assets/images/carousel_9.png", import.meta.url).href,
    color: "#ff66aa", // 办公室：粉色/品红
  },
  {
    serial: "10",
    title: "THE OBSERVATORY",
    desc: "仰望星空的人 // 博士，您在看什么？",
    img: new URL("../assets/images/carousel_10.png", import.meta.url).href,
    color: "#aaffff", // 观测站：极光色
  },
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
  nextBtn: document.getElementById("next-btn"),
};

/**
 * 乱码解码动画效果
 */
function scramble(el, text) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  let frame = 0;
  const length = Math.max((el.innerText || "").length, text.length);

  if (el.scrambleInterval) clearInterval(el.scrambleInterval);

  el.scrambleInterval = setInterval(() => {
    let output = "";
    let complete = 0;
    for (let i = 0; i < length; i++) {
      if (i < frame / 2) {
        output += text[i] || "";
        complete++;
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.innerText = output;
    if (complete === length) clearInterval(el.scrambleInterval);
    frame++;
  }, 25);
}

/**
 * 更新轮播显示
 */
function updateSlide(index, glitch = true) {
  const data = carouselData[index];
  document.documentElement.style.setProperty("--primary-color", data.color);
  // 更新背景同步
  elements.bgBlur.style.backgroundImage = `url(${data.img})`;

  // 转场特效
  if (glitch) {
    elements.mainImage.classList.add("glitch-flash");
    setTimeout(() => elements.mainImage.classList.remove("glitch-flash"), 400);
  }

  // 更新主图
  elements.mainImage.style.opacity = "0";
  setTimeout(() => {
    elements.mainImage.style.backgroundImage = `url(${data.img})`;
    elements.mainImage.style.opacity = "1";
  }, 50);

  // 触发解码动画
  scramble(elements.serial, data.serial);
  scramble(elements.title, data.title);
  scramble(elements.desc, data.desc);

  // 更新指示器
  const dots = document.querySelectorAll(".indicator-dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

/**
 * 视差反馈初始化
 */
function initParallax() {
  document.addEventListener("mousemove", (e) => {
    // 将除数从 40 改为 80 或 100，数值越大，幅度越小
    const x = (window.innerWidth / 2 - e.pageX) / 100; // 调整这里
    const y = (window.innerHeight / 2 - e.pageY) / 100; // 调整这里

    // 3D 偏转 (控制外框的倾斜幅度)
    // 如果觉得倾斜还是太明显，可以给 y 和 -x 再乘以一个 0.5 等系数
    elements.container.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`; //

    // 内部图片平移 (控制背景图的滑动幅度)
    // 这里的 translate 决定了图片在框内挪动的像素值
    elements.mainImage.style.transform = `scale(1.1) translate(${x}px, ${y}px)`; //
  });
}

/**
 * 粒子背景初始化
 */
function initParticles() {
  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 45, density: { enable: true, value_area: 800 } },
        color: { value: "#00f2ff" },
        shape: { type: "edge" },
        opacity: {
          value: 0.4,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.1 },
        },
        size: { value: 2, random: true },
        line_linked: { enable: false },
        move: {
          enable: true,
          speed: 10,
          direction: "bottom",
          straight: true,
          out_mode: "out",
        },
      },
    });
  }
}

/**
 * 导航初始化
 */
function initNavigation() {
  // 清空现有指示器（防止热更新重复添加）
  elements.indicators.innerHTML = "";

  carouselData.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = `indicator-dot ${i === 0 ? "active" : ""}`;
    dot.onclick = () => {
      currentIndex = i;
      updateSlide(i);
    };
    elements.indicators.appendChild(dot);
  });

  elements.prevBtn.onclick = () => {
    currentIndex =
      (currentIndex - 1 + carouselData.length) % carouselData.length;
    updateSlide(currentIndex);
  };
  elements.nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % carouselData.length;
    updateSlide(currentIndex);
  };
}

// 页面加载后启动
window.onload = () => {
  initNavigation();
  updateSlide(0, false);
  initParallax();
  initParticles();
};
