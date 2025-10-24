import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5050/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${apiBase}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Request failed");

      setMessage("Password reset instructions have been sent to your email");
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || "Could not process request");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.subtitle}>
          Enter your email address and we'll send you instructions to reset your
          password
        </p>

        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.success}>{message}</div>}

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
                placeholder="your@email.com"
              />
            </div>

            <button type="submit" style={styles.button}>
              Send Reset Instructions
            </button>
          </form>
        ) : (
          <div style={styles.messageBox}>
            <p>Check your email for the reset instructions.</p>
            <p>
              If you don't receive an email within a few minutes, check your
              spam folder.
            </p>
          </div>
        )}

        <p style={styles.footer}>
          Remember your password?{" "}
          <Link to="/login" style={styles.link}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg, #f6f9fc 0%, #eef2f8 100%)",
    padding: "20px",
  },
  formCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "24px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500",
  },
  input: {
    padding: "12px 16px",
    fontSize: "14px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    padding: "12px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff",
    background: "linear-gradient(90deg,#667eea,#764ba2)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  footer: {
    marginTop: "24px",
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
  },
  link: {
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: "500",
  },
  error: {
    padding: "12px",
    background: "#fef2f2",
    color: "#dc2626",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "16px",
  },
  success: {
    padding: "12px",
    background: "#f0fdf4",
    color: "#16a34a",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "16px",
  },
  messageBox: {
    textAlign: "center",
    color: "#374151",
    fontSize: "14px",
    lineHeight: "1.6",
    marginBottom: "24px",
  },
};

export default ForgotPassword;
