function submitForm() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let eventName = document.getElementById("event").value.trim();

    // Simple Validation
    if (name === "") return showError("Name cannot be empty");
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/))
        return showError("Invalid email format");
    if (!mobile.match(/^[0-9]{10}$/))
        return showError("Mobile number must be 10 digits");
    if (eventName === "") return showError("Event name cannot be empty");

    // Clear error
    document.getElementById("errorMsg").innerText = "";

    // Send Data to Node.js
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name,
            email: email,
            mobile: mobile,
            event: eventName
        })
    })
    .then(res => res.text())
    .then(msg => {
        document.getElementById("successMsg").innerText = msg;
    });
}

function showError(msg) {
    document.getElementById("errorMsg").innerText = msg;
}
