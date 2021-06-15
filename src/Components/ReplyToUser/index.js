import React,{useState} from 'react'
import firebase from "firebase/app";

const ReplyToUser = ({deleteCard, index, uid, pushKey, reply}) => {
  const [show, setShow] = useState(false);
  const [adminReply, setadminReply] = useState('');

  const handleReplyChange = (e) => {
    setadminReply(e.target.value)
  }

  const handleReplySubmit = (e) => {
    e.preventDefault()
    if(adminReply){
      firebase.database().ref(`/contactUs/${uid[index]}/${pushKey[index]}/`).update({adminReply: adminReply})
      setadminReply('')
      setShow(false)
    }
  }

  const handleCancel = (e) => {
      e.preventDefault()
      setadminReply('')
     setShow(false)
  }

    return (
        <div>
            <p style={{display: 'flex',}}>
                   <span style={{marginRight: 5}}> Your Reply : </span> 
                    {show ? (
                      <div style={{display: 'flex', marginTop: -5, justifyContent: 'space-evenly'}} >
                        <input placeholder="Enter your Reply" required value={adminReply} onChange={(e) => handleReplyChange(e)} style={{width: '50%'}} className="form-control" /> <button onClick={(e) => handleReplySubmit(e)} className="btn btn-outline-success">Save</button>
                        <button className="btn btn-outline-danger" onClick={(e) => handleCancel(e)}>Cancel</button>
                      </div>
                    ) : reply || 'Your message here'}
                  </p>
                     <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                  <button
                  disabled={reply}
                      className="btn btn-success"
                      style={{cursor: reply ? 'not-allowed' : ''}}
                      onClick={() => setShow(true)}
                    >
                     {reply ? 'Replyed' : 'Reply' } 
                    </button>
                    <button
                      onClick={(e) => deleteCard(e, index)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    </div>
        </div>
    )
}

export default ReplyToUser
