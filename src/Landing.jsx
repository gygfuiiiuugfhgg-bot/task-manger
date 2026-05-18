import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Landing() {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
 function toggleDark() {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  }
  return (
    <div className="div-dark">
      <button title={isDark ? "الوضع اليلي" : "الوضع النهاري"} className="dark-btn" onClick={toggleDark}>
  <i className={isDark ? "ti ti-sun" : "ti ti-moon"}></i>
</button>
    <div className="landing">
      <i className="ti ti-checks landing-logo"></i>
      <h1 className="landing-title">مرحباً بك في تطبيق <span>مهامي</span></h1>
      <p className="landing-desc">نظم مهامك اليومية، تابع انجازاتك، واحصل على مكافآت لما تخلص مهامك!</p>

      <div className="features">
        <div className="feature">
          <i className="ti ti-list-check"></i>
          <h3>نظم مهامك</h3>
          <p>رتب مهامك حسب الاولوية والتصنيف</p>
        </div>
        <div className="feature">
          <i className="ti ti-gift"></i>
          <h3>مكافآت</h3>
          <p>حدد مكافأتك لما تخلص مهمة</p>
        </div>
        <div className="feature">
          <i className="ti ti-chart-bar"></i>
          <h3>تتبع الانجاز</h3>
          <p>شوف كام مهمة خلصت النهارده</p>
        </div>
      </div>

      <button className="landing-btn" onClick={() => navigate("/Register")}>
        <i className="ti ti-rocket"></i> ابدأ دلوقتي
      </button>
    </div>
    </div>
  );
}

export default Landing;