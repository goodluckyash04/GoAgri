import React, { useState ,useEffect, useRef} from 'react'

export default function EditAccount(props) {
    const [user,setUser]=useState([])
    const ref =useRef()
    const alluser=async ()=>{
        const response = await fetch(`/api/auth/users`, {
          method: "GET",
        });
        const json = await response.json();
        setUser(json)
      }
      const id=localStorage.getItem("userid")
      const [udetails, setDetails] = useState({
        name: "",
        age: "",
        address: "",
        email: "",
        gender: "",
      });
      const { name, age, address, email, gender } = udetails;
    const update =async (name,email,age,gender,address)=>{
        const response = await fetch(`/api/auth/editaccount/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem("token")
          },
          body: JSON.stringify({name,email,age,address,gender})
      });
      const json = await response.json()
      setUser(json)
    }
      const save=()=>{
        ref.current.click()
        update(name,email,age,gender,address)
        props.acdetail()
        props.alert("Account Updated","success")
      }
      const onChange=(e)=>{
        setDetails({...udetails,[e.target.name]:e.target.value})
      }
      useEffect(() => {
        alluser()
      }, []);  
      const click=()=>{
        setDetails({  name: props.detail.name,
        age: props.detail.age,
        address: props.detail.address,
        email: props.detail.email,
        gender: props.detail.gender
      })}
  return (
    <div>
         <button
    type="button"
    className="btn btn-warning "
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={click}
  >
    Edit Account
  </button>
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
          Edit Account
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
        <form className="container my-2 ">
      <div className="row justify-content-center">
        <div className="col-md-12 mt-2">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e)=>onChange(e)}
              required
              placeholder="Enter your Name*"
              
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>onChange(e)}
              required
              placeholder="Enter your Email*"
            />
          </div>
          <div className="row">
            <div className="col-6 align-self-center">
              <div className="mb-3">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                  onChange={(e)=>onChange(e)}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    onChange={(e)=>onChange(e)}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  name="age"
                  value={age}
                  maxLength={2}
              onChange={(e)=>onChange(e)}
                  placeholder="Enter your Age"             
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Enter Your Address"
              id="address"
              name="address"
              value={address}
              onChange={(e)=>onChange(e)}
              style={{ height: "100px" }}
            />
          </div>
        </div>
      </div>
    </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary d-none"
            ref={ref}
            data-bs-dismiss="modal" 
          >
            Close
          </button>
          <button type="button" className="btn btn-success"  onClick={save}>
            Save changes
          </button >
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}
