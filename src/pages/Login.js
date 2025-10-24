import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5050/api";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Attempting login...");
      const res = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("notesflow_token", data.token);
      console.log("Token stored, navigating to /notes");
      navigate("/notes");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Could not login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to continue to NotesFlow</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
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

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              placeholder="••••••••"
            />
          </div>

          <Link to="/forgot-password" style={styles.forgotPassword}>
            Forgot password?
          </Link>

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Create Account
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
  forgotPassword: {
    fontSize: "14px",
    color: "#6366f1",
    textDecoration: "none",
    alignSelf: "flex-end",
    marginTop: "-12px",
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
};

export default Login;
