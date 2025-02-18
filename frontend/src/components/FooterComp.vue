<template>
    <footer class="footer">
    <div class="footer-content">
        <div class="footer-column">
        <h3>About Us</h3>
        <p>Learn more about our company and mission.</p>
        </div>
        <div class="footer-column">
        <h3>Contact</h3>
        <p>Email: support@readyrecipes.com</p>
        <p>Phone: +123 456 7890</p>
        </div>
    <div class="footer-column">
        <h3>Follow Us</h3>
        <p>Facebook | Tik Tok | Instagram</p>
    </div>
    <div class="footer-column">
        <h3>Legal</h3>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
        <p>Return Policy</p>
        <p>Shopping & Delivery</p>
        <p>Enquiries Form</p>

    </div>
    </div>
    </footer>
    </template>
    
    <style scoped>
    .footer {
    position:fixed;
    background-color: #333;
    color: white;
    padding: 20px;
    width: 100%;
    bottom:0;
    }

    .footer-content {
    display: flex;
    justify-content: space-between;
    text-align: left;
    }

    .footer-column {
    flex: 1;
    margin: 0 10px;
    }

    .footer-column h3 {
    margin-bottom: 10px;
    font-size: 16px;
    text-decoration: underline;
    }

    .footer-column p {
    margin: 5px 0;
    font-size: 14px;
    }
    </style>
    