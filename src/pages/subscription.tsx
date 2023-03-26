import Link from "next/link";
export default function Subscription() {

  return (
    
 
    <div>
      <div className="close-button"></div>
      <h1>Subscription</h1>
      <div className="Sub">
        <i className="fa fa-search" aria-hidden="true"></i>
        <input type="text" placeholder="Search Subscriptions..." />
      </div>

      <div className="Active">
        <div>ACTIVE</div>
      </div>
    
      <div className="table">
  <div className="row blue">
    <div className="cell">Type</div>
    <div className="cell">Cost/Length</div>
    <div className="cell">Start</div>
    <div className="cell">End</div>
  </div>
  <div className="row">
    <div className="cell1">BASIC</div>
    <div className="cell4">₱500/MONTHLY</div>
    <div className="cell">Feb. 20, 2023</div>
    <div className="cell">March 20, 2023</div>
  </div>
</div>
   

      <div className="Expired">
        <div>EXPIRED</div>
      </div>
      <div className="table">
  <div className="row blue">
    <div className="cell">Type</div>
    <div className="cell">Cost/Length</div>
    <div className="cell">Start</div>
    <div className="cell">End</div>
  </div>
  <div className="row">
    <div className="cell1">BASIC</div>
    <div className="cell4">₱500/MONTHLY</div>
    <div className="cell">Feb. 20, 2023</div>
    <div className="cell">March 20, 2023</div>
  </div>
</div>
<br></br>
<div className="table">
  <div className="row blue">
    <div className="cell">Type</div>
    <div className="cell">Cost/Length</div>
    <div className="cell">Start</div>
    <div className="cell">End</div>
  </div>
  <div className="row">
    <div className="cell2">GOLD</div>
    <div className="cell4">₱1500/ANNUAL</div>
    <div className="cell">Feb. 20, 2023</div>
    <div className="cell">March 20, 2023</div>
  </div>
</div>
<br></br>

<div className="table">
  <div className="row blue">
    <div className="cell">Type</div>
    <div className="cell">Cost/Length</div>
    <div className="cell">Start</div>
    <div className="cell">End</div>
  </div>
  <div className="row">
    <div className="cell1">BASIC</div>
    <div className="cell4">₱500/MONTHLY</div>
    <div className="cell">Feb. 20, 2023</div>
    <div className="cell">March 20, 2023</div>
  </div>
</div>

<br></br>
<div className="table">
  <div className="row blue">
    <div className="cell">Type</div>
    <div className="cell">Cost/Length</div>
    <div className="cell">Start</div>
    <div className="cell">End</div>
  </div>
  <div className="row">
    <div className="cell3">PLUS+</div>
    <div className="cell4">₱1000/BIANNUAL</div>
    <div className="cell">Feb. 20, 2023</div>
    <div className="cell">March 20, 2023</div>
  </div>
  
</div>
   </div>
  );
}
