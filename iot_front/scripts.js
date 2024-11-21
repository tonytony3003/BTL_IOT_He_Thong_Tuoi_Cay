document.addEventListener("DOMContentLoaded", () => {
    const userTable = document.getElementById("userTable").querySelector("tbody");
    const accessTable = document.getElementById("accessTable").querySelector("tbody");
    const addUserModal = document.getElementById("addUserModal");
    const closeModal = document.querySelector(".close");
    const addUserForm = document.getElementById("addUserForm");
  
    // Fetch Users from Backend
    async function fetchUsers() {
      const response = await fetch("/api/users");
      const users = await response.json();
      userTable.innerHTML = "";
      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user._id}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button onclick="deleteUser('${user._id}')">Delete</button>
            <button onclick="editUser('${user._id}')">Edit</button>
          </td>
        `;
        userTable.appendChild(row);
      });
    }
  
    // Fetch Access Control Data
    async function fetchAccessControl() {
      const response = await fetch("/api/device-access");
      const data = await response.json();
      accessTable.innerHTML = "";
      data.forEach((entry) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.userId}</td>
          <td>${entry.deviceStatus}</td>
          <td>
            <button onclick="revokeAccess('${entry.userId}')">Revoke</button>
          </td>
        `;
        accessTable.appendChild(row);
      });
    }
  
    // Open Add User Modal
    document.getElementById("addUserBtn").addEventListener("click", () => {
      addUserModal.style.display = "flex";
    });
  
    // Close Modal
    closeModal.addEventListener("click", () => {
      addUserModal.style.display = "none";
    });
  
    // Add User
    addUserForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(addUserForm);
      const data = Object.fromEntries(formData.entries());
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      addUserModal.style.display = "none";
      fetchUsers();
    });
  
    // Initial Data Fetch
    fetchUsers();
    fetchAccessControl();
  });
  