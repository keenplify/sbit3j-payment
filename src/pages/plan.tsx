import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { usePlanStore } from "../stores/plan";

export default function Plan() {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { setSelectedId, selectedId } = usePlanStore();

  const checkButtons1 = () => {
    const buttons = document.querySelectorAll("button[aria-expanded]");
    for (let button of buttons) {
      if (button.getAttribute("aria-expanded") === "true") {
        setIsSubmitDisabled(false);
        setSelectedId(1);
        return;
      }
    }
    setIsSubmitDisabled(true);
  };

  const checkButtons2 = () => {
    const buttons = document.querySelectorAll("button[aria-expanded]");
    for (let button of buttons) {
      if (button.getAttribute("aria-expanded") === "true") {
        setIsSubmitDisabled(false);
        setSelectedId(2);
        return;
      }
    }
    setIsSubmitDisabled(true);
  };

  const checkButtons3 = () => {
    const buttons = document.querySelectorAll("button[aria-expanded]");
    for (let button of buttons) {
      if (button.getAttribute("aria-expanded") === "true") {
        setIsSubmitDisabled(false);
        setSelectedId(3);
        return;
      }
    }
    setIsSubmitDisabled(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div>
          <img
            src="\Header.png"
            style={{
              width: "100vw",
              height: "50vh",
            }}
          />
        </div>
        <div className="text-center position-absolute">
          <h1
            style={{
              fontSize: "40px",
              color: "white",
              paddingTop: "100px",
            }}
          >
            Choose Your Subscription Plan
          </h1>
        </div>
      </div>
      <div
        className="accordion "
        id="accordionExample"
        style={{
          margin: "0",
          padding: "0",
        }}
      >
        {/* Basic */}
        <div
          className="accordion-item m-4 bg-body rounded-4"
          style={{
            boxShadow: "10px 10px 10px #c1c1c1",
          }}
        >
          <h5 className="accordion-header " id="headingOne">
            <button
              className="accordion-button collapsed rounded-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-controls="collapseOne"
              onClick={checkButtons1}
              value="basic"
              style={{
                padding: 0,
                margin: 0,
                background: "#eeeeee",
              }}
            >
              <div
                className="container"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontStyle: "italic",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <h4>BASIC</h4>
                </div>
                <div
                  className="text-end pt-2"
                  style={{
                    margin: "0",
                  }}
                >
                  <h5>P500</h5>
                  <p>MONTHLY</p>
                </div>
              </div>
            </button>
          </h5>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">Unlimited access to yoga classes</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">24/7 Gym access</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">Use of locker & showers</p>
              </div>
            </div>
          </div>
        </div>
        {/* Plus */}
        <div
          className="accordion-item m-4 bg-body rounded-4"
          style={{
            boxShadow: "10px 10px 10px #c1c1c1",
          }}
        >
          <h5 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed rounded-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-controls="collapseTwo"
              //onClick={handleRadioChange2}
              value="plus"
              onClick={checkButtons2}
              style={{
                padding: 0,
                background: "#eeeeee",
              }}
            >
              <div
                className="container"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontStyle: "italic",
                  }}
                >
                  <h4>PLUS+</h4>
                </div>
                <div className="text-end pt-2">
                  <h5>P1000</h5>
                  <p>BIANNUAL</p>
                </div>
              </div>
            </button>
          </h5>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">Unlimited access to yoga classes</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">24/7 Gym access</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">Use of locker & showers</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">Weekday pool access</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">your mom</p>
              </div>
            </div>
          </div>
        </div>
        {/* Gold */}
        <div
          className="accordion-item m-4 bg-body rounded rounded-4"
          style={{
            boxShadow: "10px 10px 10px #c1c1c1",
          }}
        >
          <h5 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed rounded-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-controls="collapseThree"
              onClick={checkButtons3}
              value="gold"
              style={{
                padding: 0,
                background: "#eeeeee",
              }}
            >
              <div
                className="container"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontStyle: "italic",
                    color: "#bca244",
                  }}
                >
                  <h4>GOLD</h4>
                </div>
                <div className="text-end pt-2 m-0">
                  <h5>P1500</h5>
                  <p>ANNUAL</p>
                </div>
              </div>
            </button>
          </h5>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">Unlimited access to yoga classes</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">24/7 Gym access</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">Use of locker & showers</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">Access pool 7 days a week</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">12% off on all store products</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">Free gym t-shirt</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">your mom</p>
              </div>
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="blue"
                  className="bi bi-check-circle-fill mt-1 ms-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p className="ps-2">your mom</p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-grid m-4">
          {
            <button
              className="btn btn-primary p-2 mt-2 rounded-4"
              type="submit"
              disabled={isSubmitDisabled}
            >
              <Link href="/payment">
                {" "}
                <span className="text-white"> GET STARTED </span>
              </Link>
            </button>
          }
          <p>Selected Button: {selectedId}</p>
        </div>
      </div>
    </div>
  );
}
