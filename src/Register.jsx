import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabase";

function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
  return(
  <div className="auth-container">
    <div className="auth-card">
      <div className="auth-logo">✅ مهامي</div>
      <h2>انشاء حساب</h2>
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
          type="password"
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
  )
}

export default Register;

