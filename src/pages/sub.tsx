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
      <div className="container">
		<div>Row 1, Col 1</div>
		<div>Row 1, Col 2</div>
		<div>Row 1, Col 3</div>
		<div>Row 1, Col 4</div>
		<div>Row 2, Col 1</div>
		<div>Row 2, Col 2</div>
		<div>Row 2, Col 3</div>
		<div>Row 2, Col 4</div>
		<div>Row 3, Col 1</div>
		<div>Row 3, Col 2</div>
		<div>Row 3, Col 3</div>
		<div>Row 3, Col 4</div>
		<div>Row 4, Col 1</div>
		<div>Row 4, Col 2</div>
		<div>Row 4, Col 3</div>
		<div>Row 4, Col 4</div>
	</div>
      <div className="Expired">
        <div>EXPIRED</div>
      </div>
        
</div>
  );
}
