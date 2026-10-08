/* ==========================================================================
   Ferrocare — interaction layer
   Progressive enhancement. Every page is fully readable without this file.
   ========================================================================== */
(function () {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  if (form) {
    // Pre-fill from ?product= or ?service= so "Enquire" links carry context
    const params = new URLSearchParams(window.location.search);
    const preset = params.get("product") || params.get("service");
    if (preset) {
      const msg = $("#f-msg");
      const interest = $("#f-interest");
      if (msg && !msg.value) {
        msg.value = `I would like a quotation for: ${preset}.\n\nFluid type / viscosity:\nReservoir volume (L):\nRequired flow rate or treatment time:\nContamination observed:`;
      }
      if (interest) {
        const match = Array.from(interest.options).find((o) => preset.toLowerCase().includes(o.text.toLowerCase().split(" ")[0]));
        if (match) interest.value = match.value;
      }
      // Move focus to the first empty required field for a fast start
      window.setTimeout(() => $("#f-name")?.focus({ preventScroll: true }), 400);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const required = $$("[required]", form);
      let firstBad = null;
      required.forEach((el) => {
        const bad = !el.value.trim() || (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
        el.setAttribute("aria-invalid", String(bad));
        el.style.borderColor = bad ? "#c0392b" : "";
        if (bad && !firstBad) firstBad = el;
      });
      if (firstBad) {
        firstBad.focus();
        firstBad.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
        return;
      }
      const success = $("#formSuccess");
      if (success) {
        success.classList.add("is-shown");
        success.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
      }
      form.reset();
    });
  }
})();
