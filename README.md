# ArkView | 明日方舟风格视差轮播终端

这是一个受《明日方舟》UI 启发而设计的赛博朋克风格交互终端。项目核心是一个具有 3D 视差效果的动态轮播系统，结合了实时背景光影同步和字符解码动画。

## 🚀 效果预览

### 在线演示

👉 [点击此处访问预览地址](https://kogorou0105-bit.github.io/ArkView/)

---

## ✨ 核心特性

- **3D 交互视差 (Mouse Parallax)**：页面容器与主展示图会根据鼠标移动轨迹产生平滑的 3D 偏转，营造空间深度感。
- **动态主题变色**：UI 边框、发光特效及粒子系统会根据当前展示图片的主题色（如陈的赤红、莱茵生命的科技青）自动切换。
- **虚幻背景系统**：背景实时同步当前图片的极度模糊版本，并附带动态漂浮动画，增加视觉沉浸感。
- **字符解码特效**：切换信息时，编号、标题和描述文字具有类似终端指令加载的乱码解码动画效果。
- **赛博终端 UI**：集成扫描线、电子装饰件、粒子背景以及 Orbitron 科技感字体。

---

## 🛠️ 技术栈

- **构建工具**: [Parcel v2+](https://parceljs.org/)
- **样式**: SCSS (预处理器) + CSS Variables (动态主题控制)
- **脚本**: 原生 JavaScript (ES Modules)
- **动画库**: Particles.js (背景粒子)

---

## 💻 本地运行

**安装依赖**:

```bash
npm install
```

**启动开发服务器**:

```bash
npx parcel src/index.html
```

**构建生产版本**:

```bash
npx parcel build src/index.html
```

---

## 🔗 参考与鸣谢

- **灵感来源**: 本项目参考了 [ArknightsParallaxCarousel](https://github.com/hakadao/ArknightsParallaxCarousel) 的视觉设计逻辑。
- **素材来源**: 明日方舟 / Hypergryph (鹰角网络)。
