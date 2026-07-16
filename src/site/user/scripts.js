window.addEventListener("load", () => {

  /* ============================================================
     1. CLOZE RECALL — convert <u> tags to interactive study boxes
     ============================================================ */

  document.querySelectorAll("u").forEach(el => {
    const span = document.createElement("span");
    span.classList.add("recall");
    span.innerHTML = el.innerHTML;
    el.replaceWith(span);
  });

  document.querySelectorAll(".recall").forEach(el => {
    el.addEventListener("click", () => {
      el.classList.toggle("revealed");
    });
  });

  if (document.querySelector(".recall-controls")) return;

  const controls = document.createElement("div");
  controls.classList.add("recall-controls");

  const show = document.createElement("button");
  show.innerText = "show all";
  const hide = document.createElement("button");
  hide.innerText = "hide all";

  show.onclick = () =>
    document.querySelectorAll(".recall").forEach(el => el.classList.add("revealed"));
  hide.onclick = () =>
    document.querySelectorAll(".recall").forEach(el => el.classList.remove("revealed"));

  controls.append(show, hide);
  const main = document.querySelector("main");
  if (main) main.prepend(controls);


  /* ============================================================
     2. RIGHT SIDEBAR — show on hover near right edge
     
     The right .sidebar uses a complex `left: calc(...)` from
     the base CSS. We leave its position alone and just toggle
     visibility via opacity + pointer-events.
     ============================================================ */

  const rightSidebar = document.querySelector(".sidebar");

  if (rightSidebar) {
    // Start hidden
    rightSidebar.style.opacity = "0";
    rightSidebar.style.pointerEvents = "none";
    rightSidebar.style.transition = "opacity 0.22s ease";

    // Invisible 20px strip at right edge
    const rightStrip = document.createElement("div");
    rightStrip.style.cssText = `
      position: fixed;
      right: 0;
      top: 0;
      width: 20px;
      height: 100vh;
      z-index: 12;
      background: transparent;
    `;
    document.body.appendChild(rightStrip);

    let rightHideTimer;

    function showRight() {
      clearTimeout(rightHideTimer);
      rightSidebar.style.opacity = "1";
      rightSidebar.style.pointerEvents = "auto";
    }

    function hideRight() {
      rightHideTimer = setTimeout(() => {
        rightSidebar.style.opacity = "0";
        rightSidebar.style.pointerEvents = "none";
      }, 300);
    }

    rightStrip.addEventListener("mouseenter", showRight);
    rightStrip.addEventListener("mouseleave", hideRight);
    rightSidebar.addEventListener("mouseenter", () => {
      clearTimeout(rightHideTimer);
      showRight();
    });
    rightSidebar.addEventListener("mouseleave", hideRight);
  }

});
