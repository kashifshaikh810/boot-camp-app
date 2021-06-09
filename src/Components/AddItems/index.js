/* eslint-disable no-mixed-operators */
import React,{useState, useEffect} from 'react';
import firebase from 'firebase/app'
import {Storage} from '../firebase/index';

const AddItems = () => {
  const [productTitile, setProductTitile] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCondition, setProductCondition] = useState('');
  const [productImage, setProductImage] = useState('');
  const [yourLocation, setYourLocation] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const proTitile = (e) => {
    setProductTitile(e.target.value);
    setErr(false)
  }

  const proPrice = (e) => {
    setProductPrice(e.target.value);
    setErr(false)
  }

  const proCondition = (e) => {
    setProductCondition(e.target.value);
    setErr(false)
  }

  const location = (e) => {
    setYourLocation(e.target.value);
    setErr(false)
  }

  const descrip = (e) => {
    setDescription(e.target.value);
    setErr(false)
  }

  const proImage = async (e) => {
    setErr(false)
    Storage.ref('picture/' + e.target.files[0].name)
    .put(e.target.files[0])
    .then((snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      snapshot.ref.getDownloadURL().then((URL) => {
        setProductImage(URL)
      });
    });
  
  }

  useEffect(() => {
    setProductTitile('')
    setProductPrice('')
    setProductCondition('')
    setYourLocation('')
    setProductImage('')
    setDescription('')
    setErr(false)
    setShow(false)
  },[])

  const submitHandler = (e) => {
    e.preventDefault()
    if(productTitile && productPrice && productPrice && description && productCondition === 'New' || 'Used' ){
    let uid = firebase.auth()?.currentUser?.uid;
    firebase.database().ref(`/addItems/${uid}`).push({
      productTitile: productTitile,
      productPrice: productPrice,
      yourLocation: yourLocation,
      productCondition: productCondition,
      productImage: productImage,
      description: description,
    });
    setShow(true);
    setProductTitile('')
    setProductPrice('')
    setProductImage('')
    setYourLocation('')
    setDescription('')
  }else{
    setErr(true)
  }}

  return (
    <div style={{display: 'flex', justifyContent: "center", height: '92vh', backgroundColor: '#f2f2f2', marginBottom: 100}}>
    <div className="card" style={{width: '50%', height: '90vh', borderRadius: 25, 
                boxShadow: 'rgb(179 179 179) 0px 1px 20px 0px', 
              }}>
        <div style={{backgroundColor: '#b3b3b3', display: 'flex', justifyContent: 'center', paddingTop: 10, borderRadius: 10}}>
        <p style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: 'white', fontStyle: 'revert'}}>Add Items</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10, backgroundColor: '#f2f2f2'}}>
        <div className="card" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10,  width: '40%', borderRadius: 10, backgroundColor: '#b3b3b3'}}>
          <p style={{fontWeight: 'bold', fontStyle: 'revert', fontSize: 30,  color: 'white'}}>Include Some Details</p>
        </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 20, backgroundColor: '#f2f2f2'}}>
        <form style={{width: '60%'}} onSubmit={(e) => submitHandler(e)}>
          <div className="mb-3"> 
            <label className="form-label">Product Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Product Title"
              required
              value={productTitile}
              onChange={(e) => proTitile(e)}
            />
          </div>

          <div className="mb-3"> 
            <label className="form-label">Product Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              required
              value={productPrice}
              onChange={(e) => proPrice(e)}
            />
          </div>

          <div className="mb-3"> 
            <label className="form-label">Your Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Location"
              required
              value={yourLocation}
              onChange={(e) => location(e)}
            />
          </div>

          <p style={{margin: 0, padding: 0, paddingBottom: 8}}>Product Condition</p>
          <select required className="form-select" aria-label="Default select example"
          value={productCondition}
          onChange={(e) => proCondition(e)}
          >
          <option>Select</option>
          <option value="Used">Used</option>
          <option value="New">New</option>
          </select>

          <div className="mb-3"> 
            <label htmlFor="image" className="form-label" style={{paddingTop: 15}}>Product Image</label>
            <input
              type="file"
              name="file"
              className="form-control"
              required
              onChange={(e) => proImage(e)}
            />
          </div>

          <p style={{margin: 0, padding: 0, paddingBottom: 8}}>Description</p>
          <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: 100}}
          value={description}
          onChange={(e) => descrip(e)}
          ></textarea>
          <label htmlFor="floatingTextarea2">Description</label>
          </div>

       {show === true ? <> <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </symbol>
        </svg>
        <div className="alert alert-success d-flex align-items-center mt-2" role="alert">
          <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink href="#check-circle-fill"/></svg>
        <div>
        Congratulations Posting... Success !
       </div>
        </div> </> : null}

       {err === true ? <> <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
        </svg>
        <div className="alert alert-danger d-flex align-items-center mt-2" role="alert">
        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink href="#exclamation-triangle-fill"/></svg>
        <div>
          All Fiedls Are Required, Please fill the All Feilds.
        </div>
        </div> </> : null}

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10, marginBottom: 20}}>
        <button type="submit" className="btn btn-primary">Post Now</button>
        </div>
      </form>
      </div>
  </div>
  </div>
  )
}

export default AddItems;