import { useState } from "react";
import { supabase } from "./supabase";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);
  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  function toggleDark() {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  }

  return (
    <div  className={isOpen ? "sidebar" : "sidebar closed"}>
      <div className="sidebar-header">
        {isOpen && <h2 className="sidebar-logo"><i className="ti ti-checklist"></i> مهامي</h2>}
        <button title="القائمه"  className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <i className="ti ti-layout-sidebar-right"></i>
        </button>
      </div>

      <Link title="كل المهام" className={location.pathname === "/Tasks" ? "nav-item active" : "nav-item"} to="/Tasks">
        <i className="ti ti-list"></i>
        {isOpen && <span className="nav-label">كل المهام</span>}
      </Link>

      <div className="nav-divider"></div>

      <Link title="مكافآتي" className={location.pathname === "/Rewards" ? "nav-item active" : "nav-item"} to="/Rewards">
        <i className="ti ti-gift"></i>
        {isOpen && <span className="nav-label">مكافآتي</span>}
      </Link>

      <div className="nav-divider"></div>

      <div className="dark-toggle" onClick={toggleDark}>
        <i  title={isDark ? "الوضع اليلي" : "الوضع النهاري"} className={isDark ? "ti ti-sun" : "ti ti-moon"}></i>
        {isOpen && <span  className="nav-label">{isDark ? "الوضع النهاري" : "الوضع الليلي"}</span>}
        {isOpen && <button  title={isDark ? "الوضع اليلي" : "الوضع النهاري"} className={isDark ? "toggle on" : "toggle"}></button>}
      </div>

      <div title="تسجيل الخروج" className="nav-item logout" onClick={handleLogout}>
        <i className="ti ti-logout"></i>
        {isOpen && <span className="nav-label">تسجيل الخروج</span>}
      </div>
    </div>
  )
}

export default Sidebar