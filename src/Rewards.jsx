import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Sidebar from "./Sidebar.jsx";

function Rewards() {
  const [rewards, setRewards] = useState([])
  const [title, setTitle] = useState("")

  useEffect(() => {
    async function getRewards() {
      const { data } = await supabase.from("rewards").select("*")
      if (data) setRewards(data)
    }
    getRewards()
  }, [])

  async function handleAdd(e) {
    e.preventDefault();
    const { data, error } = await supabase.from("rewards").insert([{ title: title }]).select()
    if (!error) {
      setRewards([...rewards, data[0]])
      setTitle("")
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from("rewards").delete().eq("id", id)
    if (!error) setRewards(rewards.filter(r => r.id !== id))
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h2 className="page-title">🎁 مكافآتي</h2>
        <div className="task-form">
          <input type="text" placeholder="اضف مكافأة جديدة" value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <button onClick={handleAdd}>اضافة</button>
        </div>
        {rewards.map(reward => (
          <div key={reward.id} className="task-card">
            <div className="task-info">
              <div className="task-name">🎁 {reward.title}</div>
            </div>
            <button className="delete-task" onClick={() => handleDelete(reward.id)}>
              <i className="ti ti-trash"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Rewards