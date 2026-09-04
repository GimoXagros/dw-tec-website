let cleanup: (() => void) | undefined;
export function initNavigation() {
  cleanup?.();
  const header = document.querySelector<HTMLElement>(".site-header");
  const button = header?.querySelector<HTMLButtonElement>(".menu-button");
  const nav = header?.querySelector<HTMLElement>("#site-nav");
  if (!header || !button || !nav) return;
  const controller = new AbortController();
  const signal = controller.signal;
  const mobile = matchMedia("(max-width: 1023px)");
  const background = [
    document.querySelector<HTMLElement>("main"),
    document.querySelector<HTMLElement>("footer"),
    header.querySelector<HTMLElement>(".brand"),
  ];
  let open = false;
  const savedOverflow = document.body.style.overflow;
  const isEnglish = document.documentElement.lang === "en";
  const setMenu = (next: boolean, restoreFocus = false) => {
    open = next && mobile.matches;
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute(
      "aria-label",
      open ? (isEnglish ? "Close menu" : "메뉴 닫기") : isEnglish ? "Open menu" : "메뉴 열기",
    );
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : savedOverflow;
    background.forEach((element) => {
      if (element) element.inert = open;
    });
    if (restoreFocus) button.focus();
  };
  const items = header.querySelectorAll<HTMLElement>(".has-submenu");
  items.forEach((item) => {
    const toggle = item.querySelector<HTMLButtonElement>(".submenu-toggle");
    const set = (value: boolean) => {
      item.classList.toggle("submenu-open", value);
      toggle?.setAttribute("aria-expanded", String(value));
    };
    item.addEventListener(
      "mouseenter",
      () => {
        if (!mobile.matches) set(true);
      },
      { signal },
    );
    item.addEventListener(
      "mouseleave",
      () => {
        if (!item.contains(document.activeElement)) set(false);
      },
      { signal },
    );
    item.addEventListener(
      "focusin",
      (event) => {
        if (!mobile.matches && event.target !== toggle) set(true);
      },
      { signal },
    );
    item.addEventListener(
      "focusout",
      (event) => {
        if (!item.contains(event.relatedTarget as Node)) set(false);
      },
      { signal },
    );
    toggle?.addEventListener("click", () => set(toggle.getAttribute("aria-expanded") !== "true"), {
      signal,
    });
    item.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape" && !mobile.matches) {
          event.stopPropagation();
          (toggle ?? item.querySelector<HTMLAnchorElement>(".nav-item-top a"))?.focus();
          set(false);
        }
      },
      { signal },
    );
  });
  document.addEventListener(
    "pointerdown",
    (event) => {
      if (mobile.matches) return;
      items.forEach((item) => {
        if (item.contains(event.target as Node)) return;
        item.classList.remove("submenu-open");
        item
          .querySelector<HTMLButtonElement>(".submenu-toggle")
          ?.setAttribute("aria-expanded", "false");
      });
    },
    { signal },
  );
  button.addEventListener("click", () => setMenu(!open), { signal });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener(
      "click",
      () => {
        if (!link.matches("[data-language-link]")) setMenu(false);
      },
      { signal },
    ),
  );
  document.addEventListener(
    "keydown",
    (event) => {
      if (!open) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setMenu(false, true);
      }
      if (event.key !== "Tab") return;
      const controls = [button, ...nav.querySelectorAll<HTMLElement>("a,button")].filter(
        (el) => el.getClientRects().length > 0,
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    { signal },
  );
  mobile.addEventListener("change", () => setMenu(false), { signal });
  const sentinel = document.createElement("span");
  sentinel.className = "header-sentinel";
  sentinel.setAttribute("aria-hidden", "true");
  document.body.prepend(sentinel);
  const observer =
    typeof IntersectionObserver === "function"
      ? new IntersectionObserver(([entry]) =>
          header.classList.toggle("is-scrolled", !entry.isIntersecting),
        )
      : undefined;
  observer?.observe(sentinel);
  header.classList.add("nav-ready");
  cleanup = () => {
    setMenu(false);
    controller.abort();
    observer?.disconnect();
    sentinel.remove();
    header.classList.remove("nav-ready");
  };
}
