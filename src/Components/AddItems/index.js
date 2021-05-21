import React from 'react';

const AddItems = () => {
  return (
    <div>
        <div style={{backgroundColor: '#b3b3b3', display: 'flex', justifyContent: 'center', paddingTop: 10}}>
        <p style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: 'white', fontStyle: 'revert'}}>Add Items</p>
        </div>
        <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Product Name </label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Tittle</label>
          <input type="text" class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="text" class="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
  </div>
  )
}

export default AddItems;