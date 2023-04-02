import Link from "next/link";
import { useState } from "react";

export default function Payment() {
  const [selected, setSelected] = useState("card");

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
        <h1>Payment Methods</h1>
        <p>Choose your payment method below</p>
      </div>
      <div>
      <div
  className="accordion-item mb-4 rounded-2 shadow bg-body rounded"
  onClick={() => setSelected("credit")}
  style={{
    width: "362px", height: "82px", margin: "0 auto", 
    ...(selected === "credit" ? { borderColor: "black", border: "solid 1px" } : undefined)
  }}
>
<div className="card-body">
            <button
              type="button"
              className="btn btn-outline-hidden"
              data-bs-toggle="modal"
              data-bs-target="#basicModal"
              style={{ width: "100%", height: "82px" }}
            >
              <img
                src="/card.png"
                className="img-thumbnail"
                alt="..."
                width="50"
                height="50"
                style={{ border: 0 }}
              />
              Credit / Debit Card
            </button>
          </div>
          <div className="modal fade" id="basicModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Billing Info </h5>
                </div>
                <div className="modal-body">
                  <span>FULL NAME</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="John Doe"
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <span>BILLING ADDRESS</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <div className="row">
                    <div className="col">
                      <span>CITY</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="QUEZON CITY"
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                      />
                    </div>
                    <div className="col">
                      <span>ZIP CODE</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="1117"
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                      />
                    </div>
                  </div>
                  <span>COUNTRY</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="PHILIPPINES"
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#secondModal"
                    data-bs-dimiss="modal"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal" id="secondModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Credit Card Info </h5>
                </div>
                <div className="modal-body">
                  <span>CARDHOLDER'S NAME</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <span>CARD NUMBER</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <div className="row">
                    <div className="col">
                      <span>EXP. MONTH</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                      />
                    </div>
                    <div className="col">
                      <span>EXP. YEAR</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                      />
                    </div>
                  </div>
                  <span>CVC NUMBER</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#basicModal"
                    data-bs-dimiss="modal"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#thirdModal"
                    data-bs-dimiss="modal"
                  >
                    Done
                  </button>
                </div>   
              </div>
            </div>
          </div>
          <div className="modal" id="thirdModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Message Alert</h5>
                </div>
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                Your entered information has been saved. To verify, please select the Credit/Debit Card option
              </div>
              <div className="modal-footer">
                  <button
                   type="button"
                   className="btn btn-secondary"
                   data-bs-dismiss="modal"
                  >
                    Exit
                  </button>
                  </div>
                  </div>
                  </div>
                  </div>
        </div>
      </div>
      <div className="m-4 accordion" id="accordionExample">
        {/* Credit / Debit Card */}
        <div
          className="accordion-item mb-4 rounded-2 shadow bg-body rounded"
          onClick={() => setSelected("card")}
          style={
            selected === "card"
              ? { borderColor: "black", border: "solid 1px" }
              : undefined
          }
        >
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              <img
                src="/card.png"
                className="img-thumbnail"
                alt="..."
                width="50"
                height="50"
                style={{ border: 0 }}
              />
              Credit / Debit Card
            </button>
          </h2>

          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <span>Cardholder's Name</span>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
              <span>Card Number</span>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
              <div className="row">
                <div className="col">
                  <span>Exp. Month</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                </div>
                <div className="col">
                  <span>Exp. Year</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                </div>
              </div>
              <span>CVC Number</span>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
              
            </div>
          </div>
        </div>
        {/* Gcash */}
        <div
          className="accordion-item mb-4 rounded-2 shadow bg-body rounded"
          onClick={() => setSelected("gcash")}
          style={
            selected === "gcash"
              ? { borderColor: "black", border: "solid 1px" }
              : undefined
          }
        >
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <img
                src="/gcash.png"
                className="img-thumbnail"
                alt="..."
                width="50"
                height="50"
                style={{ border: 0 }}
              />
              Gcash
            </button>
          </h2>
        </div>

        {/* Maya */}
        <div
          className="accordion-item rounded-2 shadow bg-body rounded"
          onClick={() => setSelected("maya")}
          style={
            selected === "maya"
              ? { borderColor: "black", border: "solid 1px" }
              : undefined
          }
        >
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <img
                src="/maya.png"
                className="img-thumbnail"
                alt="..."
                width="50"
                height="50"
                style={{ border: 0 }}
              />
              Maya
            </button>
          </h2>
        </div>
      </div>

      <div className="m-4 d-grid gap-2">
        <div className="modal fade" id="basicModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Billing Info </h5>
              </div>
              <div className="modal-body">
                <span>FULL NAME</span>
                <input
                  type="readonly"
                  className="form-control"
                  placeholder="John Doe"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <span>BILLING ADDRESS</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <div className="row">
                  <div className="col">
                    <span>CITY</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="QUEZON CITY"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                    />
                  </div>
                  <div className="col">
                    <span>ZIP CODE</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1117"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                    />
                  </div>
                </div>
                <span>COUNTRY</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="PHILIPPINES"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#secondModal"
                  data-bs-dimiss="modal"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary p-3" type="button">
          Confirm Payment Method
        </button>
      </div>
    </div>
  );
}
