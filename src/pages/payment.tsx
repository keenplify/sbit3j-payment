import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Payment() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const [data2, setData2] = useState("");

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

      <div className="m-4 accordion" id="accordionExample">
        {/* Credit / Debit Card */}
        <div>
          <div
            className="accordion-item mb-4 rounded-2 shadow bg-body rounded"
            onClick={() => setSelected("credit")}
            style={
              selected === "card"
                ? { borderColor: "black", border: "solid 1px" }
                : undefined
            }
          >
            <div className="card-body">
              <button
                type="button"
                className="accordion-button collapsed"
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
            <form
              onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
            >
              {/* Billing Info */}
              <div className="modal" id="basicModal">
                <div className="modal-dialog modal-dialog-centered">
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
                        {...register("fullName", { required: true })}
                      />
                      <span>BILLING ADDRESS</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        {...register("billingAddress", { required: true })}
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
                            {...register("city", { required: true })}
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
                            {...register("zipCode", { required: true })}
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
                        {...register("country", { required: true })}
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
                        type="submit"
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
            </form>

            <form
              onSubmit={handleSubmit((data2) =>
                setData2(JSON.stringify(data2))
              )}
            >
              {/* Credit Card info */}
              <div className="modal" id="secondModal">
                <div className="modal-dialog modal-dialog-centered">
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
                        {...register("cardHolder", { required: true })}
                      />
                      <span>CARD NUMBER</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        {...register("cardNumber", { required: true })}
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
                            {...register("expMonth", { required: true })}
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
                            {...register("expYear", { required: true })}
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
                        {...register("cvc", { required: true })}
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
                        type="submit"
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
            </form>
            {/* Confirmation message */}
            <div className="modal" id="thirdModal">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Message Alert</h5>
                  </div>
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    Your entered information has been saved. To verify, please
                    select the Credit/Debit Card option
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
        <button className="btn btn-primary p-3" type="button">
          Confirm Payment Method
        </button>
      </div>
      <div className="m-4 card">
        <p>{data}</p>
      </div>
      <div className="m-4 card">
        <p>{data2}</p>
      </div>
    </div>
  );
}
