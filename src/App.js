import logo from "./logo.svg";
import "./App.css";
import "./css/TableComp.css";
import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import { Header } from "./component/header";
// import {Table} from "bootstrap"
function App() {
  const [data, setData] = useState();
  const [selected, setSelected] = useState();
  const [condition, setCondition] = useState(false);
  const [inp, setInp] = useState();
  const[isClicked,setIsClicked]=useState(false)
  const [filterData, setFilterData] = useState();
  // const [projects, setProjects] = useState([]);

  // async function getCities(db) {
  //   const citiesCol = collection(db, 'employee');
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map(doc => doc.data());
  //   return cityList;
  // }
  // console.log(getCities(db))

  useEffect(() => {
    const refData = ref(database, "Employee");
    onValue(refData, (snapshot) => {
      let record = [];
      snapshot.forEach((childSnap) => {
        // console.log(childSnap.val())
        let keyName = childSnap.key;
        let data = childSnap.val();
        record.push({ [keyName]: data });
      });
      setData(record);
    });
  }, []);
  let employees = [];
  for (let i = 1; i <= 15; i++) {
    const empData = data?.find((emp) => emp[`emp${i}`]);
    if (empData) {
      employees.push(empData[`emp${i}`]);
    } else {
      // If employee data is not available, you can push a default object
      employees.push({
        address: "",
        emailid: "",
        empId: i,
        mobile: "",
        name: "",
      });
    }
  }
  const handleClick = (val) => {
    setCondition(true);
    let emp = filterData.slice(0, val);
    setSelected(emp);
  };

  const handleChange = (e) => {
      if(!e.target.value){
        setFilterData(employees)
      }
    setInp(e.target.value);
   
  };
  const handleSearch=()=>{
         
    let filtered = employees.filter(
      (ele) => inp == ele.address || inp == ele.name
    );
    // if(filterData == undefined){
    //   setFilterData(employees)
    // }
    setFilterData(filtered);
    setIsClicked(true)
  }
  return (
    <div>
      <Header />
      <div >
        <div className="search">
        <div style={{display:"flex"}}>
          <input type="text" value={inp} onChange={handleChange} className="input"/>
          <button onClick={handleSearch}>Search</button>
        </div>  
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              sort by rows
            </button>

            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  onClick={() => handleClick(5)}
                >
                  5
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  onClick={() => handleClick(10)}
                >
                  10
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  onClick={() => handleClick(15)}
                >
                  15
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="App">
        <table class="table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Email Id</th>
              <th> Mobile</th>
              <th>Address</th>
              <th> Emp Id</th>
            </tr>
          </thead>
          <tbody>
            {condition
              ? selected &&
                selected.length > 0 &&
                selected?.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td>{ele.name}</td>
                      <td>{ele.emailid}</td>
                      <td>{ele.mobile}</td>
                      <td>{ele.name}</td>
                      <td>{ele.empid}</td>
                    </tr>
                  );
                })
              : isClicked
              ? filterData &&
                filterData.length > 0 &&
                filterData?.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td>{ele.address}</td>
                      <td>{ele.emailid}</td>
                      <td>{ele.mobile}</td>
                      <td>{ele.name}</td>
                      <td>{ele.empid}</td>
                    </tr>
                  );
                })
              : employees?.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td>{ele.address}</td>
                      <td>{ele.emailid}</td>
                      <td>{ele.mobile}</td>
                      <td>{ele.name}</td>
                      <td>{ele.empid}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
