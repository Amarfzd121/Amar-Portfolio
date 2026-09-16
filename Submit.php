```php
<?php

// Allow JSON requests
header("Content-Type: application/json");

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method."
    ]);
    exit;
}


// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);


// Check data
if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "No data received."
    ]);
    exit;
}


// Get form values
$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$message = trim($data["message"] ?? "");


// Validate
if (empty($name) || empty($email) || empty($message)) {

    echo json_encode([
        "status" => "error",
        "message" => "Please fill all fields."
    ]);

    exit;
}


// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid email address."
    ]);

    exit;
}


// YOUR EMAIL
$to = "amarfzd12@gmail.com";


// Email subject
$subject = "New Contact Form Message from " . $name;


// Email body
$emailBody = "You received a new message from your website.\n\n";

$emailBody .= "Name: " . $name . "\n";

$emailBody .= "Email: " . $email . "\n\n";

$emailBody .= "Project Details:\n";

$emailBody .= $message . "\n";


// Email headers
$headers = "From: Website Contact Form <no-reply@yourwebsite.com>\r\n";

$headers .= "Reply-To: " . $email . "\r\n";

$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";


// Send email
if (mail($to, $subject, $emailBody, $headers)) {

    echo json_encode([
        "status" => "success",
        "message" => "Message sent successfully."
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Email could not be sent."
    ]);

}

?>
```
