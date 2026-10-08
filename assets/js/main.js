/* ==========================================================================
   Ferrocare — interaction layer
   Progressive enhancement. Every page is fully readable without this file.
   ========================================================================== */
(function () {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Minimal inline icons for elements injected at runtime.
  const ICONS = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  };
  const iconsSvg = (n) => ICONS[n] || "";

  /* ---------------------------------------------------------------- header */
  const header = $("#siteHeader");
  if (header) {
    const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------ mobile nav */
  const burger = $("#burger");
  const drawer = $("#drawer");
  if (burger && drawer) {
    let open = false;
    const setOpen = (next) => {
      open = next;
      document.body.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open) {
        drawer.hidden = false;
        // next frame so the transition runs
        requestAnimationFrame(() => drawer.style.opacity = "");
      } else {
        drawer.style.opacity = "";
        window.setTimeout(() => { if (!open) drawer.hidden = true; }, 300);
      }
    };
    burger.addEventListener("click", () => setOpen(!open));
    $$("a", drawer).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && open) { setOpen(false); burger.focus(); }
    });
    // Close if the viewport grows past the drawer breakpoint
    window.matchMedia("(min-width: 1081px)").addEventListener("change", (e) => {
      if (e.matches && open) setOpen(false);
    });
  }

  /* -------------------------------------------------------- scroll reveals */
  const reveals = $$("[data-reveal]");
  if (reveals.length) {
    const show = (el) => el.classList.add("is-in");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(show);
    } else {
      // 1. Anything already in (or just above) the viewport is revealed on the
      //    first frames, so above-the-fold content never waits on the observer.
      const vh = window.innerHeight || 800;
      const inView = reveals.filter((el) => el.getBoundingClientRect().top < vh * 1.05);
      requestAnimationFrame(() => requestAnimationFrame(() => inView.forEach(show)));

      // 2. The observer handles everything below the fold.
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { show(entry.target); io.unobserve(entry.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
      reveals.forEach((el) => { if (!el.classList.contains("is-in")) io.observe(el); });

      // 3. Safety net. If anything at all goes wrong — observer never fires,
      //    layout shifts, the page is printed — content is never left hidden.
      window.setTimeout(() => reveals.forEach(show), 2500);
      window.addEventListener("beforeprint", () => reveals.forEach(show));
      window.addEventListener("pagehide", () => reveals.forEach(show));
    }
  }

  /* ------------------------------------------- animated milestone timeline */
  const tl = $("#timeline");
  if (tl) {
    const items = $$("[data-tl]", tl);
    const fill = $("#railFill", tl);

    // Nodes and cards arrive individually as they reach the viewport.
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      if (fill) fill.style.height = "100%";
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -14% 0px", threshold: 0.18 });
      items.forEach((el) => io.observe(el));

      // The rail fills in proportion to how far the timeline has scrolled past.
      let ticking = false;
      const drawRail = () => {
        ticking = false;
        const rect = tl.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const start = vh * 0.72;                     // fill begins as the top arrives
        const travelled = start - rect.top;
        const span = rect.height - vh * 0.28;
        const pct = Math.max(0, Math.min(1, travelled / Math.max(span, 1)));
        if (fill) fill.style.height = (pct * 100).toFixed(2) + "%";
      };
      const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(drawRail); } };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      drawRail();

      // Never leave the rail empty if the section is already on screen.
      window.setTimeout(drawRail, 400);
    }
  }

  /* ----------------------------------------------------------- count-up */
  const counters = $$("[data-count]");
  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      if (Number.isNaN(target)) return;
      const duration = 1500;
      const start = performance.now();
      const from = 0;
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.round(from + (target - from) * eased);
        el.textContent = value >= 1000 ? value.toLocaleString("en-IN") : String(value);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { animate(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ------------------------------------------------- ISO cleanliness gauge */
  const gauge = $("#isoGauge");
  if (gauge) {
    const needle = $("#gaugeNeedle", gauge);
    const arc = $("#gaugeArcFill", gauge);
    const code = $("#gaugeCode", gauge);
    const cap = $("#gaugeCaption", gauge);
    // Arc length of the semicircle above (r = 132): pi * 132
    const ARC = Math.PI * 132;
    if (arc) arc.setAttribute("stroke-dasharray", ARC.toFixed(1));

    const states = [
      { t: -90, code: "21/19/16", cap: "UNTREATED HYDRAULIC OIL", p: 0.04 },
      { t: -18, code: "19/17/14", cap: "AFTER MECHANICAL FILTRATION", p: 0.46 },
      { t:  60, code: "16/14/11", cap: "AFTER ELECTROSTATIC CLEANING", p: 0.96 },
    ];
    let idx = 0, timer = null;

    const paint = (st) => {
      if (needle) needle.style.transform = `rotate(${st.t}deg)`;
      if (arc) arc.setAttribute("stroke-dashoffset", (ARC * (1 - st.p)).toFixed(1));
      if (code) code.textContent = st.code;
      if (cap) cap.textContent = st.cap;
    };
    const step = () => { idx = (idx + 1) % states.length; paint(states[idx]); };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      paint(states[2]);
    } else {
      paint(states[0]);
      const gio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (timer) return;
            timer = window.setInterval(step, 2600);
          } else if (timer) {
            window.clearInterval(timer); timer = null;
          }
        });
      }, { threshold: 0.35 });
      gio.observe(gauge);
    }
  }

  /* ---------------------------------------------- find-your-machine selector */
  const sel = $("#selector");
  if (sel) {
    // The lookup payload is a sibling of #selector, not a child — query globally.
    const payload = document.getElementById("selectorData");
    const data = JSON.parse(payload ? payload.textContent : "{}");
    const out = $("#selectorResult", sel);
    const state = { fluid: null, problem: null };

    const readUI = () => {
      $$(".selector__opts", sel).forEach((grp) => {
        const on = $(".opt.is-on", grp);
        if (on) state[grp.dataset.group] = on.dataset.val;
      });
    };

    const render = () => {
      readUI();
      // The lookup is nested by fluid, then by contamination type.
      const hit = data[state.fluid] && data[state.fluid][state.problem];
      if (!out) return;
      if (!hit || !hit.length) {
        out.innerHTML = `<p class="selector__empty">${iconsSvg("search")}No single family covers that combination — tell us the duty point and we will size it. <a class="link-arrow" href="contact.html">Ask an engineer</a></p>`;
        return;
      }
      out.innerHTML = hit.map((h, i) => `
        <div class="match" style="animation-delay:${i * 70}ms">
          <div class="match__thumb"><img src="assets/img/${h.img}" alt="" loading="lazy" decoding="async"></div>
          <div class="match__body">
            <strong>${h.name}</strong>
            <span>${h.why}</span>
            <div class="match__why">${h.tags.map((t) => `<em>${t}</em>`).join("")}</div>
          </div>
          <a class="btn btn--ghost btn--sm" href="${h.href}">View ${iconsSvg("arrow")}</a>
        </div>`).join("");
    };

    $$(".selector__opts", sel).forEach((grp) => {
      grp.addEventListener("click", (e) => {
        const btn = e.target.closest(".opt");
        if (!btn) return;
        $$(".opt", grp).forEach((b) => b.classList.remove("is-on"));
        btn.classList.add("is-on");
        render();
      });
    });
    render();
  }

  /* ------------------------------------------------------------- accordion */
  $$(".acc__item").forEach((item) => {
    const btn = $(".acc__btn", item);
    const panel = $(".acc__panel", item);
    if (!btn || !panel) return;

    if (item.classList.contains("is-open")) {
      panel.style.height = "auto";
      btn.setAttribute("aria-expanded", "true");
    }

    btn.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) {
        panel.style.height = panel.scrollHeight + "px";
        const done = () => { panel.style.height = "auto"; panel.removeEventListener("transitionend", done); };
        panel.addEventListener("transitionend", done);
      } else {
        panel.style.height = panel.scrollHeight + "px";
        requestAnimationFrame(() => { panel.style.height = "0px"; });
      }
    });
  });

  /* ------------------------------------------------------- product filters */
  const grid = $("#productGrid");
  if (grid) {
    const cards = $$(".pcard-wrap", grid);
    const buttons = $$(".filter");
    const search = $("#productSearch");
    const countEl = $("#resultCount");
    const emptyEl = $("#noResults");
    let activeFilter = "all";

    const apply = () => {
      const q = (search?.value || "").trim().toLowerCase();
      let shown = 0;

      cards.forEach((card) => {
        const matchesFilter = activeFilter === "all" || card.dataset.family === activeFilter;
        const haystack = card.dataset.search || "";
        const matchesQuery = !q || haystack.includes(q);
        const visible = matchesFilter && matchesQuery;
        card.classList.toggle("is-hidden", !visible);
        if (visible) {
          shown++;
          const inner = $("[data-reveal]", card);
          if (inner) inner.classList.add("is-in");
        }
      });

      const total = Number(grid.dataset.totalModels || 0);
      if (countEl) {
        countEl.textContent = q || activeFilter !== "all"
          ? `Showing ${shown} of ${families.length} families · ${total} models in catalogue`
          : `Showing ${families.length} families · ${total} models`;
      }
      if (emptyEl) emptyEl.classList.toggle("is-hidden", shown !== 0);
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        activeFilter = btn.dataset.filter;
        apply();
      });
    });

    let debounce;
    search?.addEventListener("input", () => {
      clearTimeout(debounce);
      debounce = setTimeout(apply, 140);
    });
    apply();
  }

  /* ------------------------------------------------------- enquiry form */
  const form = $("#enquiryForm");

  /* Build a mailto: fallback so an enquiry is never lost if the relay is
     unreachable — blocked network, ad-blocker, or the service being down. */
  const mailtoFallback = (fields) => {
    const to = form.dataset.recipient || "info@ferrocare.com";
    const subject = form.dataset.subject || "Website enquiry";
    const body = Object.entries(fields)
      .filter(([k]) => !k.startsWith("_"))
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (form) {
    const success = $("#formSuccess");
    const error = $("#formError");
    const errorDetail = $("#formErrorDetail");
    const mailtoLink = $("#formMailto");
    const submitBtn = $('button[type="submit"]', form);
    const originalLabel = submitBtn ? submitBtn.innerHTML : "Send enquiry";

    // Carry the page and any presets into the payload
    const pageField = $('input[name="page"]', form);
    if (pageField) pageField.value = window.location.pathname + window.location.search;

    const preset = new URLSearchParams(window.location.search);
    const presetWhat = preset.get("product") || preset.get("service");
    if (presetWhat) {
      const msg = $("#f-msg");
      const interest = $("#f-interest");
      if (msg && !msg.value) {
        msg.value = `I would like a quotation for: ${presetWhat}.\n\nFluid type / viscosity:\nReservoir volume (L):\nRequired flow rate or treatment time:\nContamination observed:`;
      }
      if (interest) {
        const hit = Array.from(interest.options)
          .find((o) => presetWhat.toLowerCase().includes(o.text.toLowerCase().split(" ")[0]));
        if (hit) interest.value = hit.value;
      }
      window.setTimeout(() => $("#f-name")?.focus({ preventScroll: true }), 400);
    }

    const setBusy = (busy) => {
      if (!submitBtn) return;
      submitBtn.disabled = busy;
      submitBtn.style.opacity = busy ? ".7" : "";
      submitBtn.style.cursor = busy ? "progress" : "";
      submitBtn.innerHTML = busy
        ? "Sending…"
        : originalLabel;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (success) success.hidden = true;
      if (error) error.hidden = true;

      // Honeypot — a filled hidden field means a bot. Silently accept and drop.
      const honey = $('input[name="_honey"]', form);
      if (honey && honey.value.trim()) {
        if (success) success.hidden = false;
        return;
      }

      const required = $$("[required]", form);
      let firstBad = null;
      required.forEach((el) => {
        const bad = !el.value.trim() ||
          (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
        el.setAttribute("aria-invalid", String(bad));
        el.style.borderColor = bad ? "#c0392b" : "";
        if (bad && !firstBad) firstBad = el;
      });
      if (firstBad) {
        firstBad.focus();
        firstBad.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      delete data._honey;
      if (data.email) data._replyto = data.email;

      setBusy(true);
      try {
        const res = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json().catch(() => ({}));
        if (payload && payload.success === "false") throw new Error("relay rejected");

        form.reset();
        if (success) {
          success.hidden = false;
          success.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
        }
      } catch (err) {
        if (mailtoLink) mailtoLink.href = mailtoFallback(data);
        if (errorDetail) {
          errorDetail.textContent =
            "The form service could not be reached from this network. Use the button below and your email app will open with everything already filled in.";
        }
        if (error) {
          error.hidden = false;
          error.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
        }
      } finally {
        setBusy(false);
      }
    });
  }
})();
