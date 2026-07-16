window.addEventListener("load", () => {

  // convert <u> tags to recall spans
  document.querySelectorAll("u").forEach(el => {
    const span = document.createElement("span");
    span.classList.add("recall");
    span.innerHTML = el.innerHTML;
    el.replaceWith(span);
  });

  // click to reveal/hide
  document.querySelectorAll(".recall").forEach(el => {
    el.addEventListener("click", () => {
      el.classList.toggle("revealed");
    });
  });

  // guard against double injection
  if (document.querySelector(".recall-controls")) return;

  const controls = document.createElement("div");
  controls.classList.add("recall-controls");

  const show = document.createElement("button");
  show.innerText = "show all";

  const hide = document.createElement("button");
  hide.innerText = "hide all";

  show.onclick = () => {
    document.querySelectorAll(".recall")
      .forEach(el => el.classList.add("revealed"));
  };

  hide.onclick = () => {
    document.querySelectorAll(".recall")
      .forEach(el => el.classList.remove("revealed"));
  };

  controls.append(show, hide);

  const main = document.querySelector("main");
  if (main) main.prepend(controls);

});
