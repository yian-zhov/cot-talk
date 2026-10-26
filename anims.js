// Per-slide animations. Each entry receives (slide, { reduced }) and returns a stop function.
(() => {
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  // Collects timers and frames so leaving a slide stops everything it started.
  const scheduler = () => {
    const timers = new Set();
    let frame = 0;
    let alive = true;
    return {
      after(ms, fn) { const id = setTimeout(() => { timers.delete(id); if (alive) fn(); }, ms); timers.add(id); },
      loop(fn) { const tick = (t) => { if (!alive) return; fn(t); frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); },
      stop() { alive = false; timers.forEach(clearTimeout); cancelAnimationFrame(frame); },
    };
  };

  const shuffled = (n, seed) => {
    const order = Array.from({ length: n }, (_, i) => i);
    let s = seed;
    const rand = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    return order.map((v) => [rand(), v]).sort((a, b) => a[0] - b[0]).map((p) => p[1]);
  };

  const title = (slide, { reduced }) => {
    const sch = scheduler();
    const box = slide.querySelector(".decay");
    const sentence = "Okay, the professor says (C). But the table gives 12, so let me check again... the answer is (B).";
    box.innerHTML = Array.from(sentence).map((ch) => (ch === " " ? " " : `<span>${ch}</span>`)).join("");
    const spans = Array.from(box.children);

    const canvas = slide.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1600; canvas.height = 900;
    const pts = Array.from({ length: 70 }, (_, i) => ({
      x: (i * 397) % 1600, y: (i * 211) % 900,
      vx: ((i % 7) - 3) * 0.06, vy: ((i % 5) - 2) * 0.06,
    }));
    const warm = css("--hidden");
    const draw = () => {
      ctx.clearRect(0, 0, 1600, 900);
      pts.forEach((p) => {
        p.x = (p.x + p.vx + 1600) % 1600; p.y = (p.y + p.vy + 900) % 900;
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 170) {
            ctx.strokeStyle = `rgba(255,180,84,${0.12 * (1 - d / 170)})`;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      }
      ctx.fillStyle = warm;
      pts.forEach((p) => { ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 7); ctx.fill(); });
      ctx.globalAlpha = 1;
    };

    if (reduced) { draw(); return sch.stop; }
    sch.loop(draw);
    shuffled(spans.length, 7).forEach((k, rank) => {
      const at = 2200 + rank * 45;
      sch.after(at, () => { spans[k].textContent = "·"; spans[k].classList.add("dot"); });
      sch.after(at + 1600, () => spans[k].classList.add("gone"));
    });
    return sch.stop;
  };

  const bet = (slide, { reduced }) => {
    const sch = scheduler();
    const box = slide.querySelector("#bet-trace");
    const lines = [
      "Okay: boiling point of water at 3,000 m?",
      "Lower pressure, so it boils below 100 °C.",
      "Hmm, wait. Is (A) 100 °C? Then (A) is wrong.",
      "Let me re-check: about 90 °C at that height.",
      "So the answer is (C).",
    ];
    box.innerHTML = "";
    if (reduced) {
      box.innerHTML = lines.map((t) => `<span class="ln">${t}</span>`).join("");
      return sch.stop;
    }
    let t = 700;
    lines.forEach((text) => {
      const ln = document.createElement("span");
      ln.className = "ln";
      sch.after(t, () => {
        box.querySelectorAll(".ln").forEach((el) => el.classList.remove("scan"));
        ln.classList.add("scan");
        box.appendChild(ln);
      });
      Array.from(text).forEach((ch, i) => {
        sch.after(t + 30 * i, () => { ln.textContent = text.slice(0, i + 1); });
      });
      t += 30 * text.length + 500;
    });
    sch.after(t, () => box.querySelectorAll(".ln").forEach((el) => el.classList.remove("scan")));
    return sch.stop;
  };

  const hack = (slide, { reduced }) => {
    const sch = scheduler();
    const box = slide.querySelector("#hack-thought");
    const plain = "…we could fudge this by making verify() always return true. ";
    const loud = "Let's hack.";
    const render = (n) => {
      const a = plain.slice(0, n);
      const b = n > plain.length ? `<mark>${loud.slice(0, n - plain.length)}</mark>` : "";
      box.innerHTML = `${a}${b}<span class="caret"></span>`;
    };
    const total = plain.length + loud.length;
    if (reduced) { render(total); return sch.stop; }
    render(0);
    let t = 600;
    for (let i = 1; i <= total; i++) {
      t += i > plain.length ? 110 : 38;
      sch.after(t, () => render(i));
    }
    return sch.stop;
  };

  const chen = (slide, { reduced }) => {
    const sch = scheduler();
    const grid = slide.querySelector("#chen-grid");
    grid.innerHTML = "<i></i>".repeat(100);
    const dots = Array.from(grid.children);
    const said = new Set(shuffled(100, 11).slice(0, 18));
    if (reduced) {
      dots.forEach((d, i) => d.classList.add("on", ...(said.has(i) ? ["said"] : [])));
      return sch.stop;
    }
    shuffled(100, 3).forEach((k, rank) => sch.after(500 + rank * 14, () => dots[k].classList.add("on")));
    Array.from(said).forEach((k, rank) => sch.after(2600 + rank * 90, () => dots[k].classList.add("said")));
    return sch.stop;
  };

  const dots = (slide, { reduced }) => {
    const sch = scheduler();
    const canvas = slide.querySelector("#dots-canvas");
    const ctx = canvas.getContext("2d");
    const W = 760, H = 470;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    const words = ["4", "+", "9", "=", "?", "so", "13", "is", "odd", "…", "ans", ":"];
    const n = words.length;
    const xs = words.map((_, i) => 50 + i * ((W - 100) / (n - 1)));
    const layers = [330, 260, 190, 120];
    const read = css("--read"), warm = css("--hidden"), line = css("--line"), muted = css("--muted");
    const start = performance.now();

    const frame = (now) => {
      const t = reduced ? 1e9 : now - start;
      const morph = Math.min(1, Math.max(0, (t - 1200) / 1400));
      ctx.clearRect(0, 0, W, H);
      layers.forEach((y, li) => {
        ctx.strokeStyle = line; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(30, y); ctx.lineTo(W - 30, y); ctx.stroke();
        ctx.fillStyle = muted; ctx.font = "13px JetBrains Mono, monospace";
        ctx.fillText(`layer ${li + 1}`, 34, y - 8);
      });
      xs.forEach((x, i) => {
        const swapped = morph * n > i;
        ctx.fillStyle = "rgba(18,24,38,1)"; ctx.strokeStyle = swapped ? warm : read;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(x - 24, 380, 48, 44, 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = swapped ? warm : read; ctx.font = "18px JetBrains Mono, monospace"; ctx.textAlign = "center";
        ctx.fillText(swapped ? "." : words[i], x, 408);
        layers.forEach((y, li) => {
          const phase = ((t / 900 + i * 0.13 + li * 0.25) % 1);
          ctx.globalAlpha = 0.25 + 0.75 * Math.sin(phase * Math.PI);
          ctx.fillStyle = warm;
          ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill();
          if (li < layers.length - 1) {
            ctx.globalAlpha = 0.12; ctx.strokeStyle = warm;
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(xs[Math.min(n - 1, i + 1)], layers[li + 1]); ctx.stroke();
          }
        });
        ctx.globalAlpha = 1;
      });
      const answerGlow = 0.5 + 0.5 * Math.sin(t / 400);
      ctx.fillStyle = read; ctx.globalAlpha = 0.6 + 0.4 * answerGlow;
      ctx.beginPath(); ctx.arc(W - 70, 60, 22, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
      ctx.fillStyle = "#07090e"; ctx.font = "600 16px JetBrains Mono, monospace";
      ctx.fillText("yes", W - 70, 66);
      ctx.fillStyle = muted; ctx.textAlign = "left"; ctx.font = "14px JetBrains Mono, monospace";
      ctx.fillText("the visible text is empty; the compute is not", 30, 452);
    };
    if (reduced) { frame(0); return sch.stop; }
    sch.loop(frame);
    return sch.stop;
  };

  window.SlideAnims = { title, bet, hack, chen, dots };
})();
