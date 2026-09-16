fetch("submit.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {

    if (data.status === "success") {

        msg.style.display = "block";
        msg.style.color = "#4ade80";
        msg.textContent =
            "Thank you! Your message has been sent successfully.";

        document.getElementById("contactForm").reset();

    } else {

        msg.style.display = "block";
        msg.style.color = "#f87171";

        // This will now show the REAL PHP error
        msg.textContent = data.message;

    }

})
.catch(error => {

    console.error(error);

    msg.style.display = "block";
    msg.style.color = "#f87171";

    msg.textContent =
        "Server connection error. Please try again.";

});
