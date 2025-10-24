import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:10000/api";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const res = await fetch(`${apiBase}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text(); // read raw response
      let data;
      try {
        data = JSON.parse(text); // try parse as JSON
      } catch {
        console.error("Expected JSON, got:", text);
        throw new Error("Server returned invalid response");
      }

      if (!res.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("notesflow_token", data.token);
      navigate("/notes");
    } catch (err) {
      setError(err.message || "Could not register");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join NotesFlow and start taking notes</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleRegister} style={styles.form}>
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

          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
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
};

export default Register;
