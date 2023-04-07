// import Link from "next/link";
// export default function Subscription() {

//   return (

//     <div>
//       <div className="close-button"></div>
//       <h1>Subscription</h1>
//       <div className="Sub">
//         <i className="fa fa-search" aria-hidden="true"></i>
//         <input type="text" placeholder="Search Subscriptions..." />
//       </div>

//       <div className="Active">
//         <div>ACTIVE</div>
//       </div>

//       <div className="table">
//   <div className="row blue">
//     <div className="cell">Type</div>
//     <div className="cell">Cost/Length</div>
//     <div className="cell">Start</div>
//     <div className="cell">End</div>
//   </div>
//   <div className="row">
//     <div className="cell1">BASIC</div>
//     <div className="cell4">₱500/MONTHLY</div>
//     <div className="cell">Feb. 20, 2023</div>
//     <div className="cell">March 20, 2023</div>
//   </div>
// </div>

//       <div className="Expired">
//         <div>EXPIRED</div>
//       </div>
//       <div className="table">
//   <div className="row blue">
//     <div className="cell">Type</div>
//     <div className="cell">Cost/Length</div>
//     <div className="cell">Start</div>
//     <div className="cell">End</div>
//   </div>
//   <div className="row">
//     <div className="cell1">BASIC</div>
//     <div className="cell4">₱500/MONTHLY</div>
//     <div className="cell">Feb. 20, 2023</div>
//     <div className="cell">March 20, 2023</div>
//   </div>
// </div>
// <br></br>
// <div className="table">
//   <div className="row blue">
//     <div className="cell">Type</div>
//     <div className="cell">Cost/Length</div>
//     <div className="cell">Start</div>
//     <div className="cell">End</div>
//   </div>
//   <div className="row">
//     <div className="cell2">GOLD</div>
//     <div className="cell4">₱1500/ANNUAL</div>
//     <div className="cell">Feb. 20, 2023</div>
//     <div className="cell">March 20, 2023</div>
//   </div>
// </div>
// <br></br>

// <div className="table">
//   <div className="row blue">
//     <div className="cell">Type</div>
//     <div className="cell">Cost/Length</div>
//     <div className="cell">Start</div>
//     <div className="cell">End</div>
//   </div>
//   <div className="row">
//     <div className="cell1">BASIC</div>
//     <div className="cell4">₱500/MONTHLY</div>
//     <div className="cell">Feb. 20, 2023</div>
//     <div className="cell">March 20, 2023</div>
//   </div>
// </div>

// <br></br>
// <div className="table">
//   <div className="row blue">
//     <div className="cell">Type</div>
//     <div className="cell">Cost/Length</div>
//     <div className="cell">Start</div>
//     <div className="cell">End</div>
//   </div>
//   <div className="row">
//     <div className="cell3">PLUS+</div>
//     <div className="cell4">₱1000/BIANNUAL</div>
//     <div className="cell">Feb. 20, 2023</div>
//     <div className="cell">March 20, 2023</div>
//   </div>
// </div>
//    </div>
//   );
// }

// import Link from "next/link";
// import { useState } from "react";

// export default function Payment() {
//   const [selected, setSelected] = useState("card");
//   return (
//     <div>
//       <div className="m-4">
//         <Link href="/login">
//           <button
//             type="button"
//             className="btn-close"
//             aria-label="Close"
//           ></button>
//         </Link>
//       </div>

//       <div className="m-4">
//         <h1>Subscription</h1>

//         <div className="input-group mb-3">
//           <span className="input-group-text" id="basic-addon1">
//             @
//           </span>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search Subscription"
//             aria-label="Username"
//             aria-describedby="basic-addon1"
//           />
//         </div>

//         {/* <div className="form-floating">
//           <p className="form-control-plaintext"></p>
//           <label htmlFor="floatingEmptyPlaintextInput" className="text-success">
//             Active
//           </label>
//         </div> */}

//         <p className="text-success text-center">Active</p>
//         <div className="card mb-3">
//           <div className="row">
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* <div className="form-floating mb-3">
//           <p className="form-control-plaintext"></p>
//           <label htmlFor="floatingEmptyPlaintextInput">Expired</label>
//         </div> */}

//         <p className="text-center">Expired</p>
//         <div className="card mb-3">
//           <div className="row">
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="card mb-3">
//           <div className="row">
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="card mb-3">
//           <div className="row">
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="card mb-3">
//           <div className="row">
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//             <div className="col-3">
//               <div className="form-floating">
//                 <h6 className="form-control-plaintext">BASIC</h6>
//                 <label
//                   htmlFor="floatingPlaintextInput"
//                   className="text-primary"
//                 >
//                   Type
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";

export default function Subscription() {
  return (
    <div>
      <div className="m-4">
        <Link href="/login">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </Link>
      </div>

      <div className="m-4">
        <h1>Subscription</h1>

        {/* <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search Subscription"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div> */}

        {/* <div className="form-floating">
          <p className="form-control-plaintext"></p>
          <label htmlFor="floatingEmptyPlaintextInput" className="text-success">
            Active
          </label>
        </div> */}

        <p className="text-success text-center">Active</p>

        <Card />
        {/* <div className="form-floating mb-3">
          <p className="form-control-plaintext"></p>
          <label htmlFor="floatingEmptyPlaintextInput">Expired</label>
        </div> */}

        <p className="text-center">Expired</p>

        <Card />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="card mb-3">
      <div className="row">
        <div className="col-3">
          <div className="form-floating">
            <h6 className="form-control-plaintext">BASIC</h6>
            <label htmlFor="floatingPlaintextInput" className="text-primary">
              Type
            </label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <h6 className="form-control-plaintext">P500</h6>
            <label htmlFor="floatingPlaintextInput" className="text-primary">
              Cost
            </label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <h6 className="form-control-plaintext">03/30</h6>
            <label htmlFor="floatingPlaintextInput" className="text-primary">
              Start
            </label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <h6 className="form-control-plaintext">04/30</h6>
            <label htmlFor="floatingPlaintextInput" className="text-primary">
              End
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
