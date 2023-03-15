import Link from "next/link";
import { useState } from "react";

export default function Plan() {
    const [selected, setSelected] = useState("");
    return (
        <div>
            <div className="d-flex position-relative">
                <div>
                    <img
                        src="\Header.png"
                        style={{
                            width: "412px",
                        }}
                    />
                </div>
                <div className="text-center position-absolute">
                    <h1
                        style={{
                            fontSize: "40px",
                            color: "white",
                            paddingTop: "75px",
                        }}
                    >
                        Choose Your Subscription Plan
                    </h1>
                </div>
            </div>
            <div className="accordion " id="accordionExample">
                {/* Basic */}
                <div className="accordion-item m-4 shadow bg-body rounded-4">
                    <h2 className="accordion-header " id="headingOne">
                        <button
                            className="accordion-button rounded-4"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="false"
                            aria-controls="collapseOne"
                            onClick={() => setSelected("basic")}
                            style={
                                selected === "basic"
                                    ? {
                                          borderColor: "black",
                                          border: "solid 1px",
                                          content: "",
                                      }
                                    : undefined
                            }
                        >
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h2
                                        style={{
                                            paddingRight: "67px",
                                            paddingTop: "20px",
                                        }}
                                    >
                                        BASIC
                                    </h2>
                                </div>
                                <div className="text-end pt-1">
                                    <h2>P500</h2>
                                    <p>MONTHLY SUBSCRIPTION</p>
                                </div>
                            </div>
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <strong>
                                This is the first item's accordion body.
                            </strong>{" "}
                            It is shown by default, until the collapse plugin
                            adds the appropriate classNamees that we use to
                            style each element. These classNamees control the
                            overall appearance, as well as the showing and
                            hiding via CSS transitions. You can modify any of
                            this with custom CSS or overriding our default
                            variables. It's also worth noting that just about
                            any HTML can go within the{" "}
                            <code>.accordion-body</code>, though the transition
                            does limit overflow.
                        </div>
                    </div>
                </div>
                {/* Plus */}
                <div className="accordion-item m-4 shadow bg-body rounded-4">
                    <h2 className="accordion-header" id="headingTwo">
                        <button
                            className="accordion-button collapsed rounded-4"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                            onClick={() => setSelected("plus")}
                            style={
                                selected === "plus"
                                    ? {
                                          borderColor: "black",
                                          border: "solid 1px",
                                      }
                                    : undefined
                            }
                        >
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h2
                                        style={{
                                            paddingRight: "152px",
                                            marginTop: "20px",
                                        }}
                                    >
                                        PLUS+
                                    </h2>
                                </div>
                                <div className="text-end pt-1">
                                    <h2>P1000</h2>
                                    <p>HALF A YEAR</p>
                                </div>
                            </div>
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <strong>
                                This is the second item's accordion body.
                            </strong>{" "}
                            It is hidden by default, until the collapse plugin
                            adds the appropriate classNamees that we use to
                            style each element. These classNamees control the
                            overall appearance, as well as the showing and
                            hiding via CSS transitions. You can modify any of
                            this with custom CSS or overriding our default
                            variables. It's also worth noting that just about
                            any HTML can go within the{" "}
                            <code>.accordion-body</code>, though the transition
                            does limit overflow.
                        </div>
                    </div>
                </div>
                {/* Gold */}
                <div className="accordion-item m-4 shadow bg-body rounded rounded-4">
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button collapsed rounded-4"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                            onClick={() => setSelected("gold")}
                            style={
                                selected === "gold"
                                    ? {
                                          borderColor: "black",
                                          border: "solid 1px",
                                      }
                                    : undefined
                            }
                        >
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h2
                                        style={{
                                            paddingRight: "190px",
                                            marginTop: "20px",
                                        }}
                                    >
                                        GOLD
                                    </h2>
                                </div>
                                <div className="text-end pt-1">
                                    <h2>P1500</h2>
                                    <p>ANNUAL</p>
                                </div>
                            </div>
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <strong>
                                This is the third item's accordion body.
                            </strong>{" "}
                            It is hidden by default, until the collapse plugin
                            adds the appropriate classNamees that we use to
                            style each element. These classNamees control the
                            overall appearance, as well as the showing and
                            hiding via CSS transitions. You can modify any of
                            this with custom CSS or overriding our default
                            variables. It's also worth noting that just about
                            any HTML can go within the{" "}
                            <code>.accordion-body</code>, though the transition
                            does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="d-grid m-4 pb-3">
                    <button className="btn btn-primary  p-3" type="button">
                        GET STARTED
                    </button>
                </div>
            </div>
        </div>
    );
}
