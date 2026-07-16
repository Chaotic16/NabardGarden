window.addEventListener("load", () => {

  /* ============================================================
     1. CLOZE RECALL — convert <u> tags to interactive boxes
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

  /* Guard against double injection (e.g. Turbolinks / SPA nav) */
  if (document.querySelector(".recall-controls")) return;

  /* Show All / Hide All buttons */
  const controls = document.createElement("div");
  controls.classList.add("recall-controls");

  const show = document.createElement("button");
  show.innerText = "show all";

  const hide = document.createElement("button");
  hide.innerText = "hide all";

  show.onclick = () => {
    document.querySelectorAll(".recall").forEach(el => el.classList.add("revealed"));
  };

  hide.onclick = () => {
    document.querySelectorAll(".recall").forEach(el => el.classList.remove("revealed"));
  };

  controls.append(show, hide);

  const main = document.querySelector("main");
  if (main) main.prepend(controls);


  /* ============================================================
     2. LEFT SIDEBAR HOVER TRIGGER
     Injects an invisible 14px strip at the left edge.
     Hovering it slides in the file tree sidebar.
     ============================================================ */

  const filetree = document.querySelector(".filetree-wrapper");

  if (filetree) {
    /* Create the invisible left-edge trigger strip */
    const leftTrigger = document.createElement("div");
    leftTrigger.id = "sidebar-left-trigger";
    leftTrigger.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 14px;
      height: 100vh;
      z-index: 201;
      cursor: pointer;
      background: transparent;
    `;
    document.body.appendChild(leftTrigger);

    let sidebarOpen = false;
    let hideTimeout;

    function showSidebar() {
      clearTimeout(hideTimeout);
      filetree.style.left = "0px";
      filetree.style.boxShadow = "4px 0 28px rgba(0,0,0,0.55)";
      sidebarOpen = true;
    }

    function hideSidebar() {
      hideTimeout = setTimeout(() => {
        filetree.style.left = "-240px";
        filetree.style.boxShadow = "none";
        sidebarOpen = false;
      }, 280);  /* delay so cursor can move from trigger to sidebar */
    }

    leftTrigger.addEventListener("mouseenter", showSidebar);
    filetree.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);
      showSidebar();
    });
    filetree.addEventListener("mouseleave", hideSidebar);
    leftTrigger.addEventListener("mouseleave", hideSidebar);

    /* Mobile: tap trigger strip to toggle */
    leftTrigger.addEventListener("click", () => {
      sidebarOpen ? hideSidebar() : showSidebar();
    });
  }


  /* ============================================================
     3. RIGHT SIDEBAR HOVER TRIGGER (graph / TOC / backlinks)
     Injects an invisible 14px strip at the right edge.
     ============================================================ */

  const rightSidebar = document.querySelector(".sidebar");

  if (rightSidebar) {
    const rightTrigger = document.createElement("div");
    rightTrigger.id = "sidebar-right-trigger";
    rightTrigger.style.cssText = `
      position: fixed;
      right: 0;
      top: 0;
      width: 14px;
      height: 100vh;
      z-index: 151;
      cursor: pointer;
      background: transparent;
    `;
    document.body.appendChild(rightTrigger);

    let rightOpen = false;
    let rightHideTimeout;

    function showRight() {
      clearTimeout(rightHideTimeout);
      rightSidebar.style.right = "0px";
      rightSidebar.style.boxShadow = "-4px 0 28px rgba(0,0,0,0.55)";
      rightOpen = true;
    }

    function hideRight() {
      rightHideTimeout = setTimeout(() => {
        rightSidebar.style.right = "-300px";
        rightSidebar.style.boxShadow = "none";
        rightOpen = false;
      }, 280);
    }

    rightTrigger.addEventListener("mouseenter", showRight);
    rightSidebar.addEventListener("mouseenter", () => {
      clearTimeout(rightHideTimeout);
      showRight();
    });
    rightSidebar.addEventListener("mouseleave", hideRight);
    rightTrigger.addEventListener("mouseleave", hideRight);

    rightTrigger.addEventListener("click", () => {
      rightOpen ? hideRight() : showRight();
    });
  }

});
