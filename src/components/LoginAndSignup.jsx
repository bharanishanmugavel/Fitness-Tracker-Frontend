import React, { useState } from "react";
import axios from "axios";

const LoginAndSignup = ({ setUser }) => {
  const [currentTab, setCurrentTab] = useState("login");
  const [loginDetails, setLoginDetails] = useState({
    email: null,
    password: null,
  });

  const [signupDetails, setSignupDetails] = useState({
    email: null,
    name: null,
    password: null,
    confirmPassword: null,
  });

  const handleLogin = async () => {
    const userDetails = await axios.get(
      "https://fitness-tracker-backend-r90b.onrender.com/user?email=" + loginDetails.email
    );
    console.log(loginDetails,userDetails);
    if (loginDetails.password === userDetails.data.password) {
      setUser({ email: loginDetails.email });
      localStorage.setItem("email", loginDetails.email);
    } else {
      alert("User credentials invalid.")
    }
  };

  const handleSignup = async () => {
    const userDetails = await axios.post("https://fitness-tracker-backend-r90b.onrender.com/user", {
      email: signupDetails.email,
      name: signupDetails.name,
      password: signupDetails.password,
    });

    if (userDetails) {
      setUser({ email: signupDetails.email });
      
    }
  };

  return (
    <div className="background-img">
    <div > 
      <nav class="navbar bg-secondary"  data-bs-theme="dark">
  <div class="container-fluid">     
  <span className="title">Fitness-Tracker</span> 
      <span  onClick={() => setCurrentTab("login")}>Login</span>
      <span onClick={() => setCurrentTab("signup")}>Signup</span>
  </div>
</nav>
      {currentTab === "login" ? (
        <div className="row g-3 login">
         <div className="mb-3">
         <h1 className="login-title">Login</h1>
         <label for="Email" className="form-label">Email:</label>
         <input type="email" className="form-control" id="Email" placeholder="name@example.com"  required  onChange={(e) =>
              setLoginDetails({ ...loginDetails, email: e.target.value }) }/>
        </div>
        <div class="mb-3">    
        <label for="Password" className="form-label">Password:</label>
        <input type="password" className="form-control" id="password" placeholder="Enter Password" required  onChange={(e) =>
              setLoginDetails({ ...loginDetails, password: e.target.value }) }/>
        </div>      
        <button className="btn btn-primary" style={{width:"25%", marginLeft:"35%"}} onClick={handleLogin} >Login</button>
         </div>
      ) :
    //   signup
      (
        <div className="signup">
          <h1 className="signup-title">Signup</h1>

<div class="mb-3">    
        <label for="Name" className="form-label">Name:</label>
        <input type="text" className="form-control" id="Name" placeholder="Enter Name" required  onChange={(e) =>
              setSignupDetails({ ...signupDetails, name: e.target.value }) }/>
</div>
<div className="mb-3">
<label for="Email" className="form-label">Email:</label>
        <input type="email" className="form-control" id="Email" placeholder="name@example.com"  required  onChange={(e) =>
              setSignupDetails({ ...signupDetails, email: e.target.value }) }/>
</div>
<div className="mb-3">
<label for="Password" className="form-label">Password:</label>
        <input type="password" className="form-control" id="password" placeholder="Enter Password" required  onChange={(e) =>
              setSignupDetails({ ...signupDetails, password: e.target.value }) }/>
</div>
<div className="mb-3">
<label for="Re Enter Password" className="form-label">Re-Enter-Password:</label>
        <input type="password" className="form-control" id="password" placeholder=" Re Enter Password" required  onChange={(e) =>
              setLoginDetails({ ...loginDetails, reenterpassword: e.target.value }) }/>
   </div>  
<button className="btn btn-primary" style={{width:"30%", marginLeft:"35%",marginTop:'5%'}} onClick={handleSignup} >Signup</button>
</div>

        
      )}
    </div>
    </div>
  );
};
export default LoginAndSignup;