import React from 'react'

const Footer = () => {
    return (
        <div style={{position:"fixed", bottom:0, width:"100vw"}}>
         <div>
                <div className="card" style={{height: '8vh', backgroundColor: '#b3b3b3',}}>
                    <p style={{fontSize: 35, fontStyle: 'revert', fontWeight: 'bold', textAlign: 'center', color: '#f1f1f1'}}>Boot Camp App All Right Reserved Since © 2021</p>
                </div>
            </div> 
        </div>
    )
}

export default Footer;
