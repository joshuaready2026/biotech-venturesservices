const BOOKING_URL = "https://calendly.com/YOUR-CALENDLY/15min"; // replace with your real link

// Set year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!expanded));
  mobileMenu.hidden = expanded;
});

mobileMenu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileMenu.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Booking links
document.getElementById("bookingLink").href = BOOKING_URL;

document.getElementById("goToBooking").addEventListener("click", () => {
  window.open(BOOKING_URL, "_blank", "noopener");
});

// Intake demo save
document.getElementById("intakeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  localStorage.setItem("bv_intake_demo", JSON.stringify(data));
  alert("Saved (demo). Now click Open booking.");
});

// Video (Jitsi embed)
let api = null;

function safeRoomName(raw) {
  return (raw || "").trim().replace(/[^a-zA-Z0-9-_]/g, "-").slice(0, 60) || "BV-NP-DEMO";
}

document.getElementById("startCall").addEventListener("click", () => {
  const room = safeRoomName(document.getElementById("roomName").value);
  const parentNode = document.getElementById("jitsiWrap");

  parentNode.innerHTML = "";
  if (api) { try { api.dispose(); } catch(_) {} api = null; }

  api = new JitsiMeetExternalAPI("meet.jit.si", {
    roomName: room,
    parentNode,
    width: "100%",
    height: 560,
    configOverwrite: { prejoinPageEnabled: true },
    interfaceConfigOverwrite: { DISABLE_JOIN_LEAVE_NOTIFICATIONS: true }
  });
});

document.getElementById("endCall").addEventListener("click", () => {
  const parentNode = document.getElementById("jitsiWrap");
  if (api) { try { api.dispose(); } catch(_) {} api = null; }
  parentNode.innerHTML = `<div class="video-placeholder">Call ended.</div>`;
});
