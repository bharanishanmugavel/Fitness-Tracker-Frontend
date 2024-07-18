import React, { useEffect, useState } from "react";
import axios from "axios";
import LoginAndSignup from "./LoginAndSignup";
import { Card } from 'antd';

const { Meta } = Card;

const SetGoal = ({ setGoal }) => {
  return (
    <div> 
      <h2 className="goal-select">Please Select Your Goal</h2>
      <div className="goalPage"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent:"space-evenly",
        
        }}>

<Card className="bg-light"
    hoverable
    style={{ width: 240 }}
    onClick={() => {
      setGoal("weightLoss");
      localStorage.setItem("goal", "weightLoss");
    }}>
     {<img className="img" alt="example" src="https://www.greatgreenwall.org/wp-content/uploads/2023/02/Weight-Loss-Statistics-1.jpg" />}
    <Meta className="meta" title="Weight Loss"  />
  </Card>

<Card className="bg-light"
    hoverable
    style={{ width: 240 }}
    onClick={() => {
      setGoal("weightGain");
      localStorage.setItem("goal", "weightGain");
    }}>
     {<img className="img" alt="example" src="https://www.steadfastnutrition.in/cdn/shop/articles/WhatsApp_Image_2023-11-02_at_17.38.25.jpg?v=1698927104" />}
    <Meta className="meta" title="Weight Gain"  />
  </Card>

  <Card className="bg-light"
    hoverable
    style={{ width: 240 }}
    onClick={() => {
      setGoal("muscleGain");
      localStorage.setItem("goal", "muscleGain");
    }}>
     {<img className="img" alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-8SfeflUCGQg7gky_desDgn5rCrtD3QR9g&s" />}
    <Meta className="meta" title="Muscle-Gain"  />
  </Card>
       
      </div>
    </div>
  );
};

const HomePage = ({ goal, setUser, email }) => {
  const [showAddRoutineForm, setShowAddRoutineForm] = useState(false);
  const[showIntakeForm, setShowIntakeForm]= useState(false);
  const [dailyRoutineData, setDailyRoutineData] = useState({
    type: null,
    intensity: null,
    duration: null,
    caloriesBurnt: null,
    date: null,
  });
  const [myRoutines, setMyRoutines] = useState([]);
  const [myIntakes, setMyIntakes] = useState([]);
  const [intake, setIntake] = useState({
    nutritionIntake: null,
meals: null,
calorieConsumption: null,
date: null
  });
  

  useEffect(() => {
    axios.get("https://fitness-tracker-backend-r90b.onrender.com/userWorkout?email="+email).then((response) => {
      const userDetails = response?.data;
      setMyRoutines(userDetails);
    });
    console.log("my routines",myRoutines)
  }, []);

  useEffect(() => {
    axios.get("https://fitness-tracker-backend-r90b.onrender.com/userFood?email="+email).then((response) => {
      const userDetails = response?.data;
      setMyIntakes(userDetails);
    });
    console.log("my intakes",myIntakes)
  }, []);

  const handleAddRoutine = async () => {
    const addRoutineRes = await axios.post(
      "https://fitness-tracker-backend-r90b.onrender.com/userWorkout",
      {...dailyRoutineData, email: email}
    );
    if (addRoutineRes) {
      setShowAddRoutineForm(false);
    }
  };
  const handleAddIntake = async () => {
    const addIntake = await axios.post(
      "https://fitness-tracker-backend-r90b.onrender.com/userFood",
      {...intake, email: email}
    );
    if (addIntake) {
      setShowIntakeForm(false);
    }
  };
  

  return (
    <div>
      <nav class="navbar bg-secondary"  data-bs-theme="dark">
  <div class="container-fluid">     
  <span className="title">Fitness-Tracker</span> 
      <span onClick={() => {
        localStorage.setItem("email", null);
        setUser({email: null})
      }}>Logout </span>
  </div>
</nav>
      {showAddRoutineForm ? (
        <div className="routine-form">
          <h2>Add My Daily Routine</h2>
          {/* Use DROPDOWN FOR BELOW TYPE */}

    
         <div className="mb-3">
          <select className="form" name="" id=""
          defaultValue="Running"
          onChange={(e) =>
              {
                console.log(e.target.value, '...................')
                setDailyRoutineData({ ...dailyRoutineData, type: e.target.value })
              }
            }>
            <option value="Running ">Running</option>
            <option value="jagging ">Jagging</option>
            <option value="Push-ups And Pull-Ups">Push-ups And Pull-Ups</option>
            <option value="Skipping ">Skipping</option>
            <option value=" Cycling">Cycling</option>
            <option value="Yoga">Yoga</option>
            <option value="Squats">Squats</option>
            
          </select>
          </div>
          <div  className="mb-3">
          <input className="form"
            placeholder="Enter intensity..."
            onChange={(e) =>
              setDailyRoutineData({
                ...dailyRoutineData,
                intensity: e.target.value,
              })
            }
          />
          </div>
          <div className="mb-3 ">
          <input className="form"
            placeholder="Enter duration..."
            onChange={(e) =>
              setDailyRoutineData({
                ...dailyRoutineData,
                duration: e.target.value,
              })
            }
          />
          </div>
          <div className="mb-3">
          <input className="form"
            placeholder="Enter calories burnt..."
            onChange={(e) =>
              setDailyRoutineData({
                ...dailyRoutineData,
                caloriesBurnt: e.target.value,
              })
            }
          />
          </div>
          <div className="mb-3">
          <input className="form"
            placeholder="Date in DD-MM-YYYY format..."
            onChange={(e) =>
              setDailyRoutineData({ ...dailyRoutineData, date: e.target.value })
            }
          />
          </div>
          <button className="btn btn-primary"  onClick={handleAddRoutine}>Add My Routine</button>
          <button className="btn btn-success" style={{marginLeft:'10px'}} onClick={() => setShowAddRoutineForm(false)}>
            Back to home page
          </button>
        </div>
      ) : (
        showIntakeForm ? (
          <div className="routine-form">
            <h2>Add My Daily Intake</h2>
      
            <div className="mb-3">
            <input className="form"
              placeholder="Enter Calorie consumption..."
              onChange={(e) =>
                setIntake({
                  ...intake,
                  calorieConsumption: e.target.value,
                })
              }
            />
            </div>
            <div className="mb-3">
            <input className="form"
              placeholder="Enter meals..."
              onChange={(e) =>
                setIntake({
                  ...intake,
                  meals: e.target.value,
                })
              }
            />
            </div>
            <div className="mb-3">
            <input className="form"
              placeholder="Enter nutritin intake..."
              onChange={(e) =>
                setIntake({
                  ...intake,
                  nutritionIntake: e.target.value,
                })
              }
            />
            </div>
            <div className="mb-3">
            <input className="form"
              placeholder="Date in DD-MM-YYYY format..."
              onChange={(e) =>
                setIntake({ ...intake, date: e.target.value })
              }
            />
            </div>
            <button className="btn btn-primary" style={{padding:'10px'}} onClick={handleAddIntake}>Add My Intake</button>
            <button className="btn btn-success" style={{padding:'10px', marginLeft:'10px'}} onClick={() => setShowIntakeForm(false)}>
              Back to home page
            </button>
          </div>
        ): <div>
          {goal === "weightLoss" && (
            <div className="goal">
              <h2 style={{color:'purple',fontWeight:'600'}}>Your Goal is Weight Loss</h2>
              <div className="weightloss">
              <h4 style={{fontWeight:'500',color:'darkblue'}}>Weight Loss Workouts below</h4>
              <div>
              <img className="weightloss-img" src="https://www.themanual.com/wp-content/uploads/sites/9/2022/02/how-will-your-workouts-be-formatted.jpg?fit=800%2C533&p=1" alt="" srcset="" />
              <img className=" weightloss-img" src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/12/Male_Treadmill_1296x728-header-1296x728.jpg?w=1155&h=1528" alt="" srcset="" />
               <img className="weightloss-img" src="https://www.healthifyme.com/blog/wp-content/uploads/2022/09/shutterstock_1903417396-1.jpg" alt="" srcset="" /> 
               <img className="weightloss-img" src="https://www.themanual.com/wp-content/uploads/sites/9/2021/11/push-ups.jpg?fit=800%2C800&p=1" alt="" srcset="" />
                </div>        
              <div className="list">
              <li >Walking</li>
              <li>Jogging</li>
              <li>Push-ups And Pull-ups</li>
              <li>Skipping</li>
              <li>Running</li>
              <li>Cycling</li>
              <li>Squats</li>
              <li>Yoga</li>
              </div>
              </div>
              <div className="weightloss">
               <h4 style={{fontWeight:'500',color:'darkblue'}}>Weight Loss Foods below</h4>
               <div>
                <img className="weightloss-img" src="https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/16:9/w_5803,h_3264,c_limit/RoastChicken_RECIPE_080420_37993.jpg" alt="" srcset="" />
                <img className="weightloss-img" src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2020/06/weight-loss-food-1591841023.jpg" alt="" srcset="" />
                <img className="weightloss-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3hvBYR4e7nKJ-Dba0Zd2PpYrUSIIr5cnXOA&s" alt="" />
                <img className="weightloss-img" src="https://www.lalpathlabs.com/blog/wp-content/uploads/2019/01/Fruits-and-Vegetables.jpg" alt="" srcset="" />
               </div>
               <div className="list">
                <li>Chicken</li>
                <li>Beans</li>
                <li>Soup</li>
                <li>Dark Chocolate</li>
                <li>Pureed Vegetables</li>
                <li>Nuts</li>
                <li>Apples And Grape Fruits</li>
               </div>
              
              </div>
              
            </div>
          )} 
              
          {goal === "weightGain" && <div className="goal">
              <h2 style={{color:'purple' , fontWeight:'600'}}>Your Goal is Weight Gain</h2>
              <div className="weightloss">
              <h4 style={{fontWeight:'500',color:'darkblue'}}>Weight Gain Workouts below</h4>
              <div>
              <img className="weightloss-img" src="https://blog.medibuddy.in/content/images/2018/02/weight-gain-centre-main.jpg" alt="" srcset="" />
              <img className=" weightloss-img" src="https://www.healthkart.com/connect/wp-content/uploads/2022/02/900x500_banner_HK-Connect_Weight-gain-exercises.jpg" alt="" srcset="" />
               <img className="weightloss-img" src="https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/02/1109-hammer-curl-biceps-abs.jpg?quality=86&strip=all" alt="" srcset="" /> 
               <img className="weightloss-img" src="https://hips.hearstapps.com/hmg-prod/images/bodybuild-royalty-free-image-1628162220.jpg?crop=1.00xw:1.00xh;0,0&resize=2048:*" alt="" srcset="" />
                </div>        
              <div className="list">
              <li >Squats</li>
              <li>Lunge</li>
              <li>Push-ups And Pull-ups</li>
              <li>Bench Press</li>
              <li>Bent-Over Row</li>
              <li>Deadlifts</li>
              </div>
              </div>
              <div className="weightgain">
               <h4 style={{fontWeight:'500',color:'darkblue'}}>Weight Gain Foods below</h4>
               <div>
                <img className="weightgain-img" src="https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2020/12/23175034/shutterstock_300219740-1.jpg" alt="" srcset="" />
                <img className="weightgain-img" src="https://c.ndtvimg.com/2022-02/5t22shbg_weight-gain-food_625x300_02_February_22.jpg?q=50" alt="" srcset="" />
                <img className="weightgain-img" src="https://media.post.rvohealth.io/wp-content/uploads/2020/09/high-calorie-vegan-foods-732x549-thumbnail-732x549.jpg" alt="" />
                <img className="weightgain-img" src="https://www.fastandup.in/nutrition-world/wp-content/uploads/2023/05/Best-Foods-TO-Gain-Weight.jpg" alt="" srcset="" />
               </div>
               <div className="list">
                <li>Milk</li>
                <li>Rice</li>
                <li>Dried Fruits</li>
                <li>Homemade protein smoothies</li>
                <li>Red Meat</li>
                <li>Fatty and Oily Fish</li>
                <li>Banana</li>
                <li>Whole Eggs</li>
                <li>Avacados</li>
               </div>
              
              </div>
              
            </div>}
          

          {goal === "muscleGain" && <div className="goal">
              <h2 style={{color:'purple' , fontWeight:'600'}}>Your Goal is Muscle Gain</h2>
              <div className="musclegain">
              <h4 style={{fontWeight:'500',color:'darkblue'}}>Muscle Gain Workouts below</h4>
              <div>
              <img className="musclegain-img" src="https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2020/01/Roelly-Winklar-Performing-Incline-Barbell-Bench-Press.jpg?quality=86&strip=all" alt="" srcset="" />
              <img className=" musclegain-img" src="https://i.insider.com/5fe0b6f8c910a400192e8a96?width=700" alt="" srcset="" />
               <img className="musclegain-img" src="https://www.health.com/thmb/dqUTTgNgfLBbUnQGzKYo7KNQ7pU=/2119x0/filters:no_upscale():max_bytes(150000):strip_icc()/BuildMuscleLoseFat-98e3bb453daf4049aeb72b3841ca2d0a.jpg" alt="" srcset="" /> 
               <img className="musclegain-img" src="https://www.dmoose.com/cdn/shop/articles/feature-image_87a28752-6da3-4be8-8814-d5221236136d.jpg?v=1676644951" alt="" srcset="" />
                </div>        
              <div className="list">
              <li >Bench Press</li>
              <li>Bicep curl</li>
              <li>Seated triceps press</li>
              <li>Squat</li>
              <li>Bent-Over row</li>
              <li>Pull-Down</li>
              <li>Hammer Curl</li>
              <li>Plank</li>
              </div>
              </div>
              <div className="musclegain">
               <h4 style={{fontWeight:'500',color:'darkblue'}}>Muscle Gain Foods below</h4>
               <div>
                <img className="musclegain-img" src="https://www.verywellfit.com/thmb/10xJ_udPst5PKt4-y1k2zH1L9zs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Muscle-Gain-Meal-PlanV2-2cb5a2b27d55421ab2c0e82c4bab3804.png" alt="" srcset="" />
                <img className="musclegain-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8RgHFaaYYLx5aMRbv6sHXcUBSv4IGgs4lXQ&s" alt="" srcset="" />
                <img className="musclegain-img" src="https://images.squarespace-cdn.com/content/v1/5fc6b5a15fa98a681f096903/a7f514d9-cfd6-48b2-8873-b7be1240f1ae/Pre-workout-meal-oatmeal-bowl.jpg" alt="" />
                <img className="musclegain-img" src="https://visbody.com/wp-content/uploads/2023/05/FOOD-2.webp" alt="" srcset="" />
               </div>
               <div className="list">
                <li>Eggs</li>
                <li>Salmon</li>
                <li>Chicken Breast</li>
                <li>Lean beef</li>
                <li>Soybeans</li>
                <li>Peanuts</li>
                <li>Milk</li>
                <li>Brown Rice</li>
               </div>
              
              </div>
              
            </div>}
            <button className="routine-button" style={{padding:'10px'}} onClick={() => setShowIntakeForm(true)}>
            Add Food Intake
          </button>
          <h2 style={{color:'darkblue',textAlign:'center',marginTop:'15px',fontWeight:'bolder'}}>My Food intake</h2>
          {myIntakes.length > 0  ? myIntakes.map((data) => {
            return (
              <div key={data.id} style={{padding:16, margin:20, border: "1px solid gray"}}>
                <div>
                
                <div>
                  <span>Nutrition Intake:</span>
                  <span>{data.nutritionIntake}</span>
                </div>
                  <span>Date:</span>
                  <span>{data.date}</span>
                </div>
                <div>
                  <span>Meals:</span>
                  <span>{data.meals}</span>
                </div>
                <div>
                  <span>Calorie Consumption:</span>
                  <span>{data.calorieConsumption}</span>
                </div>

              </div>
            );
          }) : <h2 style={{color:'purple',textAlign:'center',marginTop:'15px',fontWeight:'bolder'}}>No intake found</h2>}
          <button className="routine-button" style={{padding:'10px'}} onClick={() => setShowAddRoutineForm(true)}>
            Add My Today Routine
          </button>
          <h2 style={{color:'darkblue',textAlign:'center',marginTop:'15px',fontWeight:'bolder'}}>My Routines</h2>
          {myRoutines.length > 0  ? myRoutines.map((data) => {
            return (
              <div key={data.id} style={{padding:16, margin:16, border: "1px solid gray"}}>
                <div>
                
                <div>
                  <span>Workout Type:</span>
                  <span>{data.type}</span>
                </div>
                  <span>Date:</span>
                  <span>{data.date}</span>
                </div>
                <div>
                  <span>Workout Intensity:</span>
                  <span>{data.intensity}</span>
                </div>
                <div>
                  <span>Calories burnt:</span>
                  <span>{data.caloriesBurnt}</span>
                </div>
                <div>
                  <span>Workout Duration:</span>
                  <span>{data.duration}</span>
                </div>
               
              </div>
            );
          }) : <h2 style={{color:'purple',textAlign:'center',marginTop:'15px',fontWeight:'bolder'}}>No routines found</h2>}
        </div>
      )}
    </div>
  );
};

function LandingPage() {
  const loggedUser = localStorage.getItem("email");
  const loggedUserGoal = localStorage.getItem("goal");

  const [user, setUser] = useState({ email: loggedUser });
  const [goal, setGoal] = useState(loggedUserGoal);

  return user.email ? (
    goal ? (
      <HomePage goal={goal} setUser={setUser} email={loggedUser}/>
    ) : (
      <SetGoal setGoal={setGoal} />
    )
  ) : (
    <LoginAndSignup setUser={setUser} />
  );
}

export default LandingPage;