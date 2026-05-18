import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Sidebar from "./Sidebar.jsx";
function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [taskCategory, setTaskCategory] = useState("دراسة");
  const [priority, setPriority] = useState("عالية");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("الكل")
  const [categoryFilter, setCategoryFilter] = useState("الكل")
  const [rewards, setRewards] = useState([])
  const [showReward, setShowReward] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [editId, setEditId] = useState(null)
  useEffect(() => {
    async function getData() {
      const { data: taskData } = await supabase.from("tasks").select("*");
      const {data : rewardData} = await supabase.from("rewards").select("*");
      if (taskData) setTasks(taskData);
      if (rewardData) setRewards(rewardData);

    }
    getData();
  }, []);

  async function handleAdd(e) {
      e.preventDefault();
      const { data, error} = await supabase.from("tasks").insert([{
        title: title,
      category: taskCategory,
      priority: priority,
      due_date: dueDate,
      completed: false
        }]).select()
    if (!error) {
      setTasks([...tasks, data[0]])
      setTitle("")
      setDueDate("")
      setTitle("")
      setTaskCategory("دراسة")
      setPriority("عالية")
      setShowForm(false)
    }
  }
 async function handleComplete(id, completed) {
    const {error} = await supabase.from("tasks").update({completed : !completed}).eq("id", id)
    if(!error) {
      setTasks(tasks.map(t => t.id === id ? { ...t, completed : !completed} : t ))
         if (!completed && rewards.length > 0) {
        const random = rewards[Math.floor(Math.random() * rewards.length)]
        setSelectedReward(random)
        setShowReward(true)
      }
    }  
}
    async function handleDelete(id) {
    const { error } = await supabase.from("tasks").delete().eq("id", id)
    if (!error) setTasks(tasks.filter(t => t.id !== id))
  }
  const  filtered = tasks.filter( t =>{
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "الكل" ? true : filter === "منجزة" ? t.completed : t.priority === filter
    const matchCategory = categoryFilter === "الكل" ? true : t.category === categoryFilter
    return matchSearch && matchFilter && matchCategory

  })
   function handleeditclick(task) {
    setEditId(task.id)
    setTitle(task.title);
    setPriority(task.priority);
    setDueDate(task.due_date);
   setTaskCategory(task.category);
  }
   async function handelupdata() {
    const {error} = await supabase.from("tasks").update({
           title,
      category: taskCategory,
      priority, 
      due_date: dueDate
    }).eq("id", editId)
    if(!error) {
      setTasks(tasks.map(t => t.id === editId ? { ...t, title, category:taskCategory, priority, due_date:dueDate  } : t ))
      setEditId(null)
          setTitle("")
      setDueDate("")
      setTitle("")
      setTaskCategory("دراسة")
      setPriority("عالية")
    }
  }
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <div className="tasks-header">
          <h2 className="page-title">كل المهام</h2>
          <button className="add-btn" onClick={() => setShowForm(!showForm)}>
            + اضافة مهمة
          </button>
        </div>
        {showForm && (
          <div  className="task-form">
          <input type="text"placeholder="اسم المهمه"value={title}onChange={(e) => setTitle(e.target.value)}/>
          <select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)}>
          <option>دراسه</option>
          <option>عمل</option>
          <option>شخصي</option>
          <option>اخرى</option>
          </select>
           <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>عالية</option>
          <option>متوسطة</option>
          <option>منخفضة</option>
          </select>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
             <button onClick={handleAdd}>اضافة</button>
          </div>
        )}
              <input className="search" placeholder="🔍 ابحث عن مهمة..."
          value={search} onChange={(e) => setSearch(e.target.value)} />
             <div className="filters">
         {["الكل", "عالية", "متوسطة", "منخفضة", "منجزة"].map(f => (
            <div key={f} className={filter === f ? "filter active" : "filter"}
              onClick={() => setFilter(f)}>{f}</div>
          ))}
        </div>
          <div className="category-filters">
            {["الكل", "دراسة", "عمل", "شخصي", "اخرى"].map( c =>(
            <div key={c} className={categoryFilter === c ? "filter active" : "filter"}
              onClick={() => setCategoryFilter(c)}>{c}</div>
            ))}
          </div>
            {/* tasks */}
            {filtered.map((task) => (
             <div key={task.id} className={`task-card ${task.priority === "عاليه" ? "high" : task.priority === "متوسطه" ? "medium" : "low" } ${task.completed ? "done" : ""} `}>
              <div className="task-check" onClick={() => handleComplete(task.id, task.completed)}>
               {task.completed && "✓"}
             </div>
              <div className="task-info">
                <div className="task-name">{task.title}</div>
                <div className="task-meta">
                  <span className="task-tag">{task.category}</span>
                 <span className={`priority ${task.priority === "عالية" ? "high" : task.priority === "متوسطة" ? "medium" : "low"}`}>{task.priority}</span>
                 {task.due_date && <span className="task-date">📅 {task.due_date}</span>}
                </div>
              </div>
             <button className="btn-edit" onClick={() => handleeditclick(task) }>
              <i title="تعديل" className="ti ti-pencil"></i></button>
                 <button className="delete-task" onClick={() => handleDelete(task.id)}>
               <i title="حذف" className="ti ti-trash"></i>
             </button>
             </div> 
            ))}
            {editId && (
              <div className="task-form">
          <input type="text"placeholder="اسم المهمه"value={title}onChange={(e) => setTitle(e.target.value)}/>
            <select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)}>
          <option>دراسه</option>
          <option>عمل</option>
          <option>شخصي</option>
          <option>اخرى</option>
          </select>
           <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>عالية</option>
          <option>متوسطة</option>
          <option>منخفضة</option>
          </select>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
             <button className="btn-sav" onClick={handelupdata}>حفظ</button>
             <button className="btn-cancel" onClick={() => setEditId(null)}>الغاء</button>
              </div>
            )}
                 {showReward && selectedReward && (
          <div className="reward-overlay">
            <div className="reward-popup">
              <h3 className="title-Reward">🎉 أحسنت! أكملت المهمة</h3>
              <p>{selectedReward.title}</p>
              <button onClick={() => setShowReward(false)}>حسناً!</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Tasks;





















