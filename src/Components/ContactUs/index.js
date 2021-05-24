import React from 'react';

const ContactUs = () => {
  return (
  <div style={{display: 'flex', justifyContent: "center", alignItems: 'center',}}>
    <div className="card" style={{width: '50%', height: '80vh', borderRadius: '4%'}}>
        <div style={{backgroundColor: '#b3b3b3', display: 'flex', justifyContent: 'center', paddingTop: 10, borderRadius: 10}}>
        <p style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: 'white', fontStyle: 'revert'}}>Contact Us</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10,}}>
        <div className="card" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10,  width: '40%', borderRadius: 10, backgroundColor: '#b3b3b3'}}>
          <p style={{fontWeight: 'bold', fontStyle: 'revert', fontSize: 30,  color: 'white'}}>Contact With Admin</p>
        </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>
        <form style={{width: '60%'}}>
          <div className="mb-3"> 
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your First Name"
              required
            />
          </div>

          <div className="mb-3"> 
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Last Name"
              required
            />
          </div>

          <div className="mb-3"> 
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Your Email"
              required
            />
          </div>

          <p style={{margin: 0, padding: 0, paddingBottom: 8}}>Your Message</p>
          <div class="form-floating">
          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: 100}}></textarea>
          <label for="floatingTextarea2">Your Message</label>
          </div>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 15}}>
        <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
      </div>
  </div>
  </div>
  )
}

export default ContactUs;