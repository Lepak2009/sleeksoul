const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

const end = Date.now() + 10 * 60 * 60 * 1000 + 32 * 60 * 1000 + 48 * 1000;

const tick = () => {
  let left = Math.max(0, end - Date.now());
  const hours = Math.floor(left / 3600000);
  left %= 3600000;
  const minutes = Math.floor(left / 60000);
  const seconds = Math.floor(left / 1000) % 60;

  document.querySelectorAll("#hours").forEach((element) => {
    element.textContent = String(hours).padStart(2, "0");
  });
  document.querySelectorAll("#minutes").forEach((element) => {
    element.textContent = String(minutes).padStart(2, "0");
  });
  document.querySelectorAll("#seconds").forEach((element) => {
    element.textContent = String(seconds).padStart(2, "0");
  });
};

tick();
setInterval(tick, 1000);

document.querySelectorAll(".phone-input").forEach((input) => {
  input.addEventListener("input", (event) => {
    let value = event.target.value
      .replace(/\D/g, "")
      .replace(/^8/, "998")
      .slice(0, 12);

    if (value.startsWith("998")) {
      value = `+998 ${value
        .slice(3)
        .replace(/(\d{2})(\d{3})(\d{2})(\d{2}).*/, "$1 $2 $3 $4")
        .trim()}`;
    }

    event.target.value = value;
  });
});

document.querySelectorAll("[data-order-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector(".toast").classList.add("show");
    form.reset();

    setTimeout(() => {
      document.querySelector(".toast").classList.remove("show");
    }, 4500);
  });
});

document.querySelector("#fixed-order-button").addEventListener("click", () => {
  document.querySelector("#order-form").scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
});
