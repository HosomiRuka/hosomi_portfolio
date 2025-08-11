// ローディング
window.onload = function () {
  const spinner = document.querySelector(".c-loading");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    document.body.style.overflow = "auto";
    spinner.classList.add("loaded");
  }, 2500);
};

// header
const btn = document.querySelector(".l-header__hamburger");
const nav = document.querySelector(".l-header__sp-nav");

btn.addEventListener("click", () => {
  btn.classList.toggle("is-open-hamburger");
  nav.classList.toggle("is-open-nav");
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

// .p-kvを超えたら .l-header に .is-past-kv を付与
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
