import React from "react";

export default function Payment() {
  const payNow = () => {
    const handler = window.PaystackPop.setup({
      key: "YOUR_PAYSTACK_PUBLIC_KEY",
      email: "david03@gmail.com",
      amount: 5000, // ₦5000 = amount in kobo
      currency: "NGN",
      ref: "SASH_" + new Date().getTime(),

      callback: function (response) {
        alert("Payment successful! Reference: " + response.reference);

        // redirect after payment
        window.location.href = "/dashboard";
      },

      onClose: function () {
        alert("Transaction was cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <div style={styles.container}>
      <h1>SASH Learning Hub Payment Portal</h1>
      <p>Complete your school payment to activate your student access.</p>

      <div style={styles.card}>
        <h2>School Fee Payment</h2>
        <p>Amount: ₦5,000</p>

        <button style={styles.button} onClick={payNow}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    background: "#f5f7fa",
    minHeight: "100vh",
  },

  card: {
    background: "#fff",
    padding: "30px",
    width: "400px",
    margin: "30px auto",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },

  button: {
    background: "#1e4d7b",
    color: "#fff",
    padding: "12px 25px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};