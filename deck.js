// Slide navigation: scaling, keyboard / click, click-through steps, speaker notes.
(() => {
  const stage = document.getElementById("stage");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const counter = document.getElementById("counter");
  const progress = document.getElementById("progress");
  const notesPane = document.getElementById("notes-pane");
  const help = document.getElementById("help");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let index = 0;
  let stopAnim = null;

  const fit = () => {
    const scale = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
    stage.style.transform = `scale(${scale})`;
  };

  const steps = (slide) => Array.from(slide.querySelectorAll(".step"));

  const show = (next) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, next));
    if (stopAnim) { stopAnim(); stopAnim = null; }
    slides.forEach((s) => s.classList.remove("active", "in"));
    const slide = slides[clamped];
    steps(slide).forEach((el) => el.classList.remove("shown"));
    slide.classList.add("active");
    // force a reflow so .in restarts every CSS transition on re-entry
    void slide.offsetWidth;
    slide.classList.add("in");
    const anim = window.SlideAnims[slide.dataset.anim];
    if (anim) stopAnim = anim(slide, { reduced }) || null;
    index = clamped;
    counter.textContent = `${clamped + 1} / ${slides.length}`;
    progress.style.width = `${((clamped + 1) / slides.length) * 100}%`;
    const notes = slide.querySelector(".notes");
    notesPane.textContent = notes ? notes.textContent.trim() : "";
    if (location.hash !== `#${clamped + 1}`) history.replaceState(null, "", `#${clamped + 1}`);
  };

  const forward = () => {
    const pending = steps(slides[index]).find((el) => !el.classList.contains("shown"));
    if (pending) {
      pending.classList.add("shown");
      pending.dispatchEvent(new CustomEvent("step-shown", { bubbles: true }));
      return;
    }
    show(index + 1);
  };

  const back = () => {
    const shown = steps(slides[index]).filter((el) => el.classList.contains("shown"));
    if (shown.length) { shown[shown.length - 1].classList.remove("shown"); return; }
    show(index - 1);
  };

  document.addEventListener("keydown", (e) => {
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); forward(); }
    else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); back(); }
    else if (e.key === "Home") show(0);
    else if (e.key === "End") show(slides.length - 1);
    else if (e.key === "n" || e.key === "N") notesPane.classList.toggle("open");
    else if (e.key === "f" || e.key === "F") {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    } else if (e.key === "r" || e.key === "R") show(index);
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest(".notes-pane")) return;
    if (e.clientX < window.innerWidth * 0.25) back(); else forward();
  });

  window.addEventListener("resize", fit);
  window.addEventListener("hashchange", () => {
    const n = parseInt(location.hash.slice(1), 10);
    if (Number.isFinite(n) && n - 1 !== index) show(n - 1);
  });
  setTimeout(() => { help.style.opacity = "0"; }, 4000);

  fit();
  const fromHash = parseInt(location.hash.slice(1), 10);
  show(Number.isFinite(fromHash) ? fromHash - 1 : 0);
})();
