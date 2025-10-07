// 初回ロードだけローディングを出す（同じタブでは再表示しない）
window.addEventListener("load", () => {
  const spinner = document.querySelector(".c-loading");

  // 2回目以降（同タブ）は即非表示
  if (sessionStorage.getItem("seen_loading")) {
    spinner?.classList.add("loaded");
    return;
  }

  // 初回表示
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    document.body.style.overflow = "auto";
    document.documentElement.classList.remove("is-locked");
    spinner?.classList.add("loaded");
    sessionStorage.setItem("seen_loading", "1");
  }, 2500);
});

// header
const btn = document.querySelector(".l-header__hamburger");
const nav = document.querySelector(".l-header__sp-nav");
const links = document.querySelectorAll(".l-header__sp-link");

btn.addEventListener("click", () => {
  btn.classList.toggle("is-open-hamburger");
  nav.classList.toggle("is-open-nav");
});

// 各リンクをクリックしたらメニューを閉じる
links.forEach((link) => {
  link.addEventListener("click", () => {
    btn.classList.remove("is-open-hamburger");
    nav.classList.remove("is-open-nav");
  });
});

// feadin
(() => {
  const targets = document.querySelectorAll(".c-fade");
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-inview");
        obs.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  targets.forEach((el) => io.observe(el));
})();

(() => {
  const header = document.querySelector(".l-header");
  const kv = document.querySelector(".p-kv");
  if (!header || !kv) return;

  const io = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle("is-past-kv", entry.intersectionRatio === 0);
    },
    { threshold: 0 }
  );

  io.observe(kv);
})();

// マウスストーカー
const cursor = document.getElementById("cursor");
const follower = document.getElementById("follower");
const allLinks = document.getElementsByClassName("p-works__link");

const pos = { x: 0, y: 0 }; // カーソルの座標
const mouse = { x: 0, y: 0 }; // マウスカーソルの座標
const speed = 0.5; // 0.01〜1 数値が大きいほど早い

// カーソルとフォロワーの座標を設定
const cursorSetX = gsap.quickSetter(cursor, "x", "px");
const cursorSetY = gsap.quickSetter(cursor, "y", "px");
const followerSetX = gsap.quickSetter(follower, "x", "px");
const followerSetY = gsap.quickSetter(follower, "y", "px");

// マウスカーソル座標を取得
document.addEventListener("mousemove", (e) => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});

// レンダリング
gsap.ticker.add(() => {
  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;

  cursorSetX(pos.x);
  cursorSetY(pos.y);
  followerSetX(pos.x);
  followerSetY(pos.y);
});
