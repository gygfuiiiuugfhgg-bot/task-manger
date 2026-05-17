import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes("Invalid")) {
        setEmailMessage("الايميل او الباسورد غلط ❌");
      } else {
        setEmailMessage("حدث خطا، حاول تاني ❌");
      }
    } else {
      setSuccessMessage("تم تسجيل الدخول بنجاح ✅");
      setTimeout(() => navigate("/Tasks"), 2000);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">✅ مهامي</div>
        <h2>تسجيل الدخول</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="input-group">
          <input type="email" placeholder=" " value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailMessage("") }} />
          <label>البريد الالكتروني</label>
        </div>
        {emailMessage && <p className="error-message"><i className="ti ti-alert-circle"></i> {emailMessage}</p>}

        <div className="input-group">
          <input type={showPassword ? "text" : "password"} placeholder=" " value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordMessage("") }} />
          <label>كلمة السر</label>
          <i className={showPassword ? "ti ti-eye-off" : "ti ti-eye"}
            onClick={() => setShowPassword(!showPassword)}></i>
        </div>
        {passwordMessage && <p className="error-message"><i className="ti ti-alert-circle"></i> {passwordMessage}</p>}

        <button onClick={handleLogin}>تسجيل الدخول</button>
        <p className="auth-link">
          مش عندك حساب؟ <Link to="/">انشئ حساب</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;