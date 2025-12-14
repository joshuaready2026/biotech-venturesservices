const BOOKING_URL = "https://calendly.com/YOUR-CALENDLY/15min"; // replace with your real link

// footer year
document.getElementById("year").textContent = new Date().getFullYear();

// booking links
document.getElementById("bookingLink").href = BOOKING_URL;
document.getElementById("goToBooking").addEventListener("click", () => {
  window.open(BOOKING_URL, "_blank", "noopener");
});

// intake demo save
document.getElementById("intakeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  localStorage.setItem("bv_intake_demo", JSON.stringify(data));
  alert("Saved (demo). Now click Open booking calendar.");
});

// category pill switching (Henry-style)
const catButtons = document.querySelectorAll(".cat");
const heroMini = document.getElementById("heroMini");

const content = {
  weight: {
    title: "Weight Management",
    points: [
      "• Monthly care plan + check-ins",
      "• Video visits from home",
      "• Out-of-pocket: $499–$599/month"
    ]
  },
  whrt: {
    title: "Women’s HRT",
    points: [
      "• Symptom-focused monthly plan",
      "• Video visits from home",
      "• Typical: $99–$149/month"
    ]
  },
  trt: {
    title: "Testosterone",
    points: [
      "• Ongoing monthly management",
      "• Video visits from home",
      "• Typical: $149–$199/month"
    ]
  },
  ed: {
    title: "Erectile Dysfunction",
    points: [
      "• Quick intake + simple plan",
      "• Discreet monthly support",
      "• Typical: $49–$99/month"
    ]
  }
};

catButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    catButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const key = btn.dataset.cat;
    const c = content[key];

    heroMini.innerHTML = `
      <div class="mini-title">${c.title}</div>
      <div class="mini-points">
        ${c.points.map(p => `<div class="mini-point">${p}</div>`).join("")}
      </div>
    `;
  });
});

// Video (Jitsi demo)
let api = null;
function safeRoomName(raw) {
  return (raw || "").trim().replace(/[^a-zA-Z0-9-_]/g, "-").slice(0, 60) || "BV-DEMO-001";
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
