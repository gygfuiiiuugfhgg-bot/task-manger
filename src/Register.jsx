import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabase";
// import Sidebar from "./Sidebar.jsx";

function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  async function handelsign(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      if (error.message.includes("already registered")) {
        setEmailMessage("الايميل ده مسجل من قبل");
      } else if (error.message.includes("password")) {
        setPasswordMessage("كلمه السر يجب ان تكون 7 احرف على الاقل");
      }
    } else {
      setSuccessMessage("تم انشاء الحساب بنجاح");
      setTimeout(() => {
        navigate("/Tasks");
      }, 2000);
    }
  }
    function toggleDark() {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  }

  return(
    <div className="div-dark">
      <button title={isDark ? "الوضع اليلي" : "الوضع النهاري"} className="dark-btn" onClick={toggleDark}>
  <i className={isDark ? "ti ti-sun" : "ti ti-moon"}></i>
</button>
  <div className="auth-container">
    <div className="auth-card">
      <div className="auth-logo"><i className="ti ti-checklist"></i> مهامي</div>
      <h2 className="auth-title">انشاء حساب</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="input-group">
        <input
          type="email"
          value={email}
          placeholder=" "
          
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>البريد الالكتروني</label>
      </div>
        {emailMessage && (
          <p className="error-message"><i className="ti ti-alert-circle"></i> {emailMessage}</p>)}
      
      <div className="input-group">
        <input
              type={showPassword ? "text" : "password"}
          value={password}
          placeholder=" "
          onChange={(e) => setPassword(e.target.value)}
        />
          <label>كلمة السر</label>
                <i className={showPassword ? "ti ti-eye-off" : "ti ti-eye"}
            onClick={() => setShowPassword(!showPassword)}></i>
      </div>
        {passwordMessage && <p className="error-message"><i className="ti ti-alert-circle"></i> {passwordMessage}</p>}
      <button onClick={handelsign}>انشاء</button>
      <p className="auth-link"> 
          عندك حساب؟ <Link to="/Login">تسجيل الدخول</Link>
      </p>
     </div> 
  </div>
    </div>

  )
}

export default Register;

