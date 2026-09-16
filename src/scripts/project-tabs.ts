export function initProjectTabs() {
  const root = document.querySelector<HTMLElement>(".project-records");
  const tablist = root?.querySelector<HTMLElement>(".project-tabs");
  if (!root || !tablist || root.dataset.tabsReady) return;
  const tabs = [...tablist.querySelectorAll<HTMLAnchorElement>("a")];
  const panels = [...root.querySelectorAll<HTMLElement>(".project-panel")];
  root.dataset.tabsReady = "true";
  tablist.setAttribute("role", "tablist");
  tabs.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panels[index].id);
    panels[index].setAttribute("role", "tabpanel");
    panels[index].setAttribute("aria-labelledby", tab.id);
    panels[index].tabIndex = 0;
  });
  function select(index: number, updateHash = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (updateHash) history.replaceState(null, "", tabs[index].hash);
  }
  function fromHash() {
    const index = tabs.findIndex((tab) => tab.hash === location.hash);
    select(Math.max(index, 0));
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      select(index, true);
    });
    tab.addEventListener("keydown", (event) => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else if (event.key === " ") {
        event.preventDefault();
        select(index, true);
        return;
      } else return;
      event.preventDefault();
      select(next, true);
      tabs[next].focus();
    });
  });
  window.addEventListener("hashchange", fromHash);
  fromHash();
}
