function showUserFrequency() {
    const data = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    const genderCount = { Male: 0, Female: 0 };
    const ageGroups = { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 };

    const currentYear = new Date().getFullYear();

    data.forEach(user => {
      if (user.gender === "Male") genderCount.Male++;
      else if (user.gender === "Female") genderCount.Female++;

      const age = currentYear - parseInt(user.yearOfBirth);
      if (age >= 18 && age <= 25) ageGroups["18-25"]++;
      else if (age <= 35) ageGroups["26-35"]++;
      else if (age <= 50) ageGroups["36-50"]++;
      else ageGroups["50+"]++;
    });

    const output = document.getElementById("output");
    output.innerHTML = `
      <h3>User Frequency</h3>
      <strong>Gender:</strong>
      <ul>
        <li>Male: ${genderCount.Male}</li>
        <li>Female: ${genderCount.Female}</li>
      </ul>
      <strong>Age Groups:</strong>
      <ul>
        <li>18–25: ${ageGroups["18-25"]}</li>
        <li>26–35: ${ageGroups["26-35"]}</li>
        <li>36–50: ${ageGroups["36-50"]}</li>
        <li>50+: ${ageGroups["50+"]}</li>
      </ul>
    `;
  }

  function showInvoices() {
    const invoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];

    const output = document.getElementById("output");
    if (invoices.length === 0) {
      output.innerHTML = "<h3>No invoices found.</h3>";
      return;
    }

    let html = "<h3>All Invoices</h3><ul>";
    invoices.forEach((inv, index) => {
      html += `<li>Invoice #${index + 1}: TRN - ${inv.trn} | Total - $${inv.total?.toFixed(2) || 0}</li>`;
    });
    html += "</ul>";
    output.innerHTML = html;
  }

  function getUserInvoices() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const invoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];

    if (!currentUser || !currentUser.trn) {
      alert("No logged-in user found.");
      return;
    }

    const userInvoices = invoices.filter(inv => inv.trn === currentUser.trn);

    const output = document.getElementById("output");
    if (userInvoices.length === 0) {
      output.innerHTML = `<h3>No invoices found for TRN: ${currentUser.trn}</h3>`;
      return;
    }

    let html = `<h3>Invoices for TRN: ${currentUser.trn}</h3><ul>`;
    userInvoices.forEach((inv, index) => {
      html += `<li>Invoice #${index + 1}: Total - $${inv.total?.toFixed(2) || 0}</li>`;
    });
    html += "</ul>";

    output.innerHTML = html;
  }