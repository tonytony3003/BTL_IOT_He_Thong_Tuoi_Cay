const serverUrl = "http://localhost:3000"; // Replace <YOUR_SERVER_IP> with your server IP

document.addEventListener("DOMContentLoaded", () => {
  const authSection = document.getElementById("auth");
  const dashboardSection = document.getElementById("dashboard");
  const loginForm = document.getElementById("login-form");
  const showRegisterBtn = document.getElementById("show-register");
  const toggleModeBtn = document.getElementById("toggle-mode");
  const togglePumpBtn = document.getElementById("toggle-pump");
  const logoutBtn = document.getElementById("logout");

  let currentUser = null;

  // Login handler
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${serverUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      currentUser = username;
      loadDashboard();
    } else {
      alert("Invalid login credentials");
    }
  });

  // Load dashboard
  async function loadDashboard() {
    authSection.style.display = "none";
    dashboardSection.style.display = "block";
    document.getElementById("welcome-msg").innerText = `Welcome, ${currentUser}`;

    // Fetch mode and pump status
    const modeRes = await fetch(`${serverUrl}/api/control`);
    const mode = await modeRes.text();
    document.getElementById("mode").innerText = mode;

    const pumpRes = await fetch(`${serverUrl}/api/pump`);
    const pump = await pumpRes.text();
    document.getElementById("pump-status").innerText = pump;

    // Fetch statistics
    const statsRes = await fetch(`${serverUrl}/api/statistics`);
    const stats = await statsRes.json();
    renderChart(stats);

    // Fetch history
    const historyRes = await fetch(`${serverUrl}/api/history?username=${currentUser}`);
    const history = await historyRes.json();
    renderHistory(history);
  }

  // Render chart
  function renderChart(data) {
    const ctx = document.getElementById("moisture-chart").getContext("2d");
    const chartData = {
      labels: data.map((d) => new Date(d.timestamp).toLocaleTimeString()),
      datasets: [
        {
          label: "Soil Moisture",
          data: data.map((d) => d.soilMoisture),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
    new Chart(ctx, { type: "line", data: chartData });
  }

  // Render history
  function renderHistory(history) {
    const historyList = document.getElementById("history");
    historyList.innerHTML = history
      .map(
        (item) =>
          `<li>${item.action} - ${new Date(item.timestamp).toLocaleString()}</li>`
      )
      .join("");
  }

  // Logout handler
  logoutBtn.addEventListener("click", () => {
    currentUser = null;
    authSection.style.display = "block";
    dashboardSection.style.display = "none";
  });
});
