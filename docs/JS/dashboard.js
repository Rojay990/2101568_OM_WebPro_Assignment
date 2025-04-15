function showUserFrequency() {
    const data = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    const genderCount = { Male: 0, Female: 0 };
    const ageGroups = { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 };

    const currentYear = new Date().getFullYear();

    data.forEach(user => {
      if (user.gender === "Male" || user.gender === "male") genderCount.Male++;
      else if (user.gender === "Female" || user.gender === "female") genderCount.Female++;

      const age = currentYear -  new Date(user.dob).getFullYear();
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
    output.style.display = "none";
    

    invoices.forEach((inv, index) => {
      const invoiceSection = `
        <section class="invoice">
            <h2>Invoice</h2>
            <div class="invoice-Head-Details">
                <div>
                    <p><strong>Business Name:</strong> <span id="businessName">DollarLess Enterprise</span></p>
                    <p><strong>Address:</strong> <span id="businessAddress">123 Foodie Lane, Kingston, Jamaica</span></p>
                    <p><strong>Phone:</strong> <span id="businessPhone">(876) 555-LESS</span></p>
                    <p><strong>Email:</strong> <span id="businessEmail">info@DollarLessja.com</span></p>
                    <p><strong>Invoice #:</strong> <span id="invoiceNumber"></span></p>
                    <p><strong>Date:</strong> <span id="invoiceDate"></span></p>
                    <p><strong>Customer Name:</strong> <span id="customerName"></span></p>
                    <p><strong>Customer TRN:</strong> <span id="TRN"></span></p>
                    <p><strong>Customer Shipping Address:</strong> <span id="shippingAddress"></span></p>
                    <p><strong>Payment Method:</strong> <span id="paymentMethod"></span></p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="invoiceDetails">
                </tbody>
            </table>
        </section>
        `;
        document.body.insertAdjacentHTML('beforeend', invoiceSection);


            // Fill customer details
    document.getElementById("customerName").textContent = inv.customerName;
    document.getElementById("paymentMethod").textContent = inv.paymentMethod;
    document.getElementById("TRN").textContent = inv.trn; 
    document.getElementById("shippingAddress").textContent = inv.shippingAddress;

    const invoiceNumber = inv.invoiceNumber
    const invoiceDate = inv.invoiceDate;

    document.getElementById("invoiceNumber").textContent = invoiceNumber;
    document.getElementById("invoiceDate").textContent = invoiceDate;

    console.log("Invoice: ", inv);

    // Fill cart items into the invoice table
    const invoiceDetails = document.getElementById("invoiceDetails");
    inv.orderData.cart.forEach(item => {
        const row = document.createElement("tr");
        const total = (item.price * item.quantity).toFixed(2);
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${total}</td>
        `;
        invoiceDetails.appendChild(row);
    });

    // Summary rows: Subtotal, Tax, Shipping, Total
    const summaryData = [
        { label: "Subtotal", value: inv.orderData.subtotal },
        { label: "Tax", value: inv.orderData.tax },
        { label: "Shipping", value: inv.orderData.shipping },
        { label: "Grand Total", value: inv.orderData.total }
    ];

    summaryData.forEach(({ label, value }) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="3" style="text-align: right;"><strong>${label}</strong></td>
            <td><strong>$${parseFloat(value).toFixed(2)}</strong></td>
        `;
        invoiceDetails.appendChild(row);
    });
        
    });
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
