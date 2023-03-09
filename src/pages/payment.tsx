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
                <button className="btn btn-primary p-3" type="button">
                    Add Payment Method
                </button>
            </div>
        </div>
    );
}
