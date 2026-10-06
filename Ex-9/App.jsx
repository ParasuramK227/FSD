import React, { useState } from "react";
function App() {
    const [signupUser, setSignupUser] = useState("");
    const [signupPass, setSignupPass] = useState("");
    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [dashboardMsg, setDashboardMsg] = useState("");
    const handleSignup = async () => {
        const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: signupUser, password: signupPass }),
            credentials: "include"
        });
        const data = await res.json();
        alert(data.message);
    };
    const handleLogin = async () => {
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: loginUser, password: loginPass }),
            credentials: "include"
        });
        const data = await res.json();
        alert(data.message);
    };
    const handleDashboard = async () => {
        const res = await fetch("http://localhost:5000/dashboard", {
            method: "GET",
            credentials: "include"
        });
        const data = await res.json();
        setDashboardMsg(data.message);
    };
    const handleLogout = async () => {
        const res = await fetch("http://localhost:5000/logout", {
            method: "POST",
            credentials: "include"
        });
        const data = await res.json();
        alert(data.message);
        setDashboardMsg("");
    };
    return (
        <div style={{ margin: "20px", fontFamily: "Arial" }}>
            <h2>Signup</h2>
            <input type="text" placeholder="Username" value={signupUser} onChange={(e) => setSignupUser(e.target.value)} />
            <input type="password" placeholder="Password" value={signupPass} onChange={(e) => setSignupPass(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} />
            <input type="password" placeholder="Password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <h2>Dashboard</h2>
            <button onClick={handleDashboard}>View Dashboard</button>
            <p>{dashboardMsg}</p>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
export default App;