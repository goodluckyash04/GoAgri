import React from 'react'

export default function Alert(props) {
  const capital=(word)=>{
        // let b=word.toLowerCase()
      return word.charAt(0).toUpperCase()+ word.slice(1).toLowerCase()
        // return cap+b.slice(1);
            
  }
    return (
      <div style={{height:"10px"}}>
        {props.alert &&
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capital(props.alert.type)}!! </strong> {props.alert.msg}.
      </div>}
      </div>
  )
}
