const output = document.getElementById("output");
const para = document.getElementById("main-message");

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
    para.style.display = "none";
    output.innerHTML = "";
    

    invoices.forEach((inv, index) => {
      const invoiceSection = `
      <hr>
        <section class="invoice">
                <div>
                    <p><strong>Business Name:</strong> <span id="businessName${index}">DollarLess Enterprise</span></p>
                    <p><strong>Address:</strong> <span id="businessAddress${index}">123 Foodie Lane, Kingston, Jamaica</span></p>
                    <p><strong>Phone:</strong> <span id="businessPhone${index}">(876) 555-LESS</span></p>
                    <p><strong>Email:</strong> <span id="businessEmail${index}">info@DollarLessja.com</span></p>
                    <p><strong>Invoice #:</strong> <span id="invoiceNumber${index}"></span></p>
                    <p><strong>Date:</strong> <span id="invoiceDate${index}"></span></p>
                    <p><strong>Customer Name:</strong> <span id="customerName${index}"></span></p>
                    <p><strong>Customer TRN:</strong> <span id="TRN${index}"></span></p>
                    <p><strong>Customer Shipping Address:</strong> <span id="shippingAddress${index}"></span></p>
                    <p><strong>Payment Method:</strong> <span id="paymentMethod${index}"></span></p>
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
                <tbody id="invoiceDetails${index}">
                </tbody>
            </table>
        </section>
        `;
        output.insertAdjacentHTML("beforeend", invoiceSection);


            // Fill customer details
    document.getElementById("customerName" + index).textContent = inv.customerName;
    document.getElementById("paymentMethod" + index).textContent = inv.paymentMethod;
    document.getElementById("TRN" + index).textContent = inv.trn; 
    document.getElementById("shippingAddress"+ index).textContent = inv.shippingAddress;

    const invoiceNumber = inv.invoiceNumber
    const invoiceDate = inv.invoiceDate;

    document.getElementById("invoiceNumber" + index).textContent = invoiceNumber;
    document.getElementById("invoiceDate" + index).textContent = invoiceDate;

    console.log("Invoice: ", inv);

    // Fill cart items into the invoice table
    const invoiceDetails = document.getElementById("invoiceDetails"+ index);
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

    const enterTRN = window.prompt( "Please enter your TRN number to view invoices (000-000-000) ");

    const invoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];

    if (!currentUser || !currentUser.trn) {
      alert("No logged-in user found.");
      return;
    }

    const matchingInvoices = invoices.filter(inv => inv.trn === enterTRN);

    if (matchingInvoices.length === 0) {
      para.innerHTML = "No invoices found for TRN: " + enterTRN;
    } else {
      output.innerHTML = "";
      matchingInvoices.forEach((inv, index) => {

        const invoiceSection = `
      <hr>
        <section class="invoice">
                <div>
                    <p><strong>Business Name:</strong> <span id="businessName${index}">DollarLess Enterprise</span></p>
                    <p><strong>Address:</strong> <span id="businessAddress${index}">123 Foodie Lane, Kingston, Jamaica</span></p>
                    <p><strong>Phone:</strong> <span id="businessPhone${index}">(876) 555-LESS</span></p>
                    <p><strong>Email:</strong> <span id="businessEmail${index}">info@DollarLessja.com</span></p>
                    <p><strong>Invoice #:</strong> <span id="invoiceNumber${index}"></span></p>
                    <p><strong>Date:</strong> <span id="invoiceDate${index}"></span></p>
                    <p><strong>Customer Name:</strong> <span id="customerName${index}"></span></p>
                    <p><strong>Customer TRN:</strong> <span id="TRN${index}"></span></p>
                    <p><strong>Customer Shipping Address:</strong> <span id="shippingAddress${index}"></span></p>
                    <p><strong>Payment Method:</strong> <span id="paymentMethod${index}"></span></p>
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
                <tbody id="invoiceDetails${index}">
                </tbody>
            </table>
        </section>
        `;
        output.insertAdjacentHTML("beforeend", invoiceSection);


            // Fill customer details
    document.getElementById("customerName" + index).textContent = inv.customerName;
    document.getElementById("paymentMethod" + index).textContent = inv.paymentMethod;
    document.getElementById("TRN" + index).textContent = inv.trn; 
    document.getElementById("shippingAddress"+ index).textContent = inv.shippingAddress;

    const invoiceNumber = inv.invoiceNumber
    const invoiceDate = inv.invoiceDate;

    document.getElementById("invoiceNumber" + index).textContent = invoiceNumber;
    document.getElementById("invoiceDate" + index).textContent = invoiceDate;

    console.log("Invoice: ", inv);

    // Fill cart items into the invoice table
    const invoiceDetails = document.getElementById("invoiceDetails"+ index);
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
  }
