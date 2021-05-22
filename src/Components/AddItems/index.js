import React from 'react';

const AddItems = () => {
  return (
    <div style={{display: 'flex', justifyContent: "center", alignItems: 'center',}}>
    <div className="card" style={{width: '50%', height: '80vh', borderRadius: '4%'}}>
        <div style={{backgroundColor: '#b3b3b3', display: 'flex', justifyContent: 'center', paddingTop: 10, borderRadius: 10}}>
        <p style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: 'white', fontStyle: 'revert'}}>Add Items</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10,}}>
        <div className="card" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10,  width: '40%', borderRadius: 10, backgroundColor: '#b3b3b3'}}>
          <p style={{fontWeight: 'bold', fontStyle: 'revert', fontSize: 30,  color: 'white'}}>Include Some Details</p>
        </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>
        <form style={{width: '60%'}}>
          <div className="mb-3"> 
            <label className="form-label">Product Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Product Title"
              required
            />
          </div>

          <div className="mb-3"> 
            <label className="form-label">Product Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              required
            />
          </div>

          <p style={{margin: 0, padding: 0, paddingBottom: 8}}>Product Condition</p>
          <select className="form-select" aria-label="Default select example">
          <option value="1">Used</option>
          <option value="2">New</option>
          </select>

          <div className="mb-3"> 
            <label className="form-label" style={{paddingTop: 15}}>Product Image</label>
            <input
              type="file"
              className="form-control"
              placeholder="Price"
              required
            />
          </div>

          <p style={{margin: 0, padding: 0, paddingBottom: 8}}>Description</p>
          <div class="form-floating">
          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: 100}}></textarea>
          <label for="floatingTextarea2">Description</label>
          </div>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 15}}>
        <button type="submit" class="btn btn-primary">Post Now</button>
        </div>
      </form>
      </div>
  </div>
  </div>
  )
}

export default AddItems;