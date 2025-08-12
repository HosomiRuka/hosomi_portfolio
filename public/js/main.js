// 初回ロードだけローディングを出す（同じタブでは再表示しない）
window.addEventListener("load", () => {
  const spinner = document.querySelector(".c-loading");

  // 2回目以降（同タブ）は即非表示
  if (sessionStorage.getItem("seen_loading")) {
    spinner?.classList.add("loaded");
    return;
  }

  // 初回表示
  document.documentElement.classList.add("is-locked"); // スクロール固定
  setTimeout(() => {
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
