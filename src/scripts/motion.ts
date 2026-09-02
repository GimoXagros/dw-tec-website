let cleanup: (() => void) | undefined;
export function initMotion() {
  cleanup?.();
  const controller = new AbortController();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
  let observer: IntersectionObserver | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const revealAll = () => {
    elements.forEach((el) => {
      el.classList.remove("reveal-pending");
      el.classList.add("is-visible");
    });
    observer?.disconnect();
  };
  const onReduce = () => {
    if (reduce.matches) {
      revealAll();
      document.documentElement.classList.remove("motion-ready");
    }
  };
  try {
    if (reduce.matches || typeof IntersectionObserver !== "function") {
      revealAll();
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        // Initial observer notifications prove the enhancement is working.
        if (timer) clearTimeout(timer);
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.remove("reveal-pending");
          el.classList.add("is-visible");
          observer?.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -24px 0px" },
    );
    // Read all geometry before writing styles/classes to avoid repeated layout work.
    const initialTops = elements.map((el) => el.getBoundingClientRect().top);
    elements.forEach((el, index) => {
      const delay = Number(
        el.dataset.revealDelay ||
          (el.parentElement?.hasAttribute("data-reveal-group") ? (index % 3) * 70 : 0),
      );
      el.style.setProperty("--reveal-delay", `${Math.min(210, Math.max(0, delay))}ms`);
      if (initialTops[index] < innerHeight - 24) el.classList.add("is-visible");
      else {
        el.classList.add("reveal-pending");
        observer?.observe(el);
      }
      el.addEventListener(
        "focusin",
        () => {
          el.classList.remove("reveal-pending");
          el.classList.add("is-visible");
        },
        { once: true, signal: controller.signal },
      );
    });
    document.documentElement.classList.add("motion-ready");
    // If the observer never starts, fail open instead of hiding content.
    timer = setTimeout(revealAll, 4500);
    reduce.addEventListener("change", onReduce);
  } catch {
    revealAll();
    document.documentElement.classList.remove("motion-ready");
  }
  cleanup = () => {
    controller.abort();
    revealAll();
    if (timer) clearTimeout(timer);
    reduce.removeEventListener("change", onReduce);
    document.documentElement.classList.remove("motion-ready");
  };
}
