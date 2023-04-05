import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import validator from "validator";
import axios from "axios";
import { PAYMONGO_PUBLIC_KEY } from "../config/paymongo";

const schema = z.object({
  fullName: z.string().min(1, { message: "Required" }),
  line1: z.string().min(1, { message: "Required" }),
  line2: z.string().min(1, { message: "Required" }),
  city: z.string().min(1, { message: "Required" }),
  state: z.string().min(1, { message: "Required" }),
  postalCode: z.string().min(1, { message: "Required" }),
  country: z.string().min(1, { message: "Required" }),
  email: z.string().email(),
  phone: z.string().min(1, { message: "Required" }),
  cardNumber: z
    .string()
    .min(1, { message: "Required" })
    .refine(validator.isCreditCard, { message: "sample sample" }),
  expMonth: z.string().min(1, { message: "Required" }),
  expYear: z.string().min(1, { message: "Required" }),
  cvc: z.string().min(1, { message: "Required" }),
});

type CardSchema = z.infer<typeof schema>;

export default function Payment() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm<CardSchema>({
    resolver: zodResolver(schema),
  });
  const [data, setData] = useState("");
  const [cardPage, setCardPage] = useState<number>();
  const [cardResults, setCardResults] = useState<CardSchema>();
  const [isCardSubmitting, setIsCardSubmitting] = useState(false);

  const [data2, setData2] = useState("");

  const [selected, setSelected] = useState("card");

  useEffect(() => {
    trigger();
  }, []);

  const submitCard = handleSubmit(
    async (data) => {
      setCardResults(data);
      setCardPage(undefined);
      setIsCardSubmitting(true);

      try {
        const result = await axios.post(
          "https://api.paymongo.com/v1/payment_methods",
          {
            attributes: {
              type: "card",
              details: {
                card_number: data.cardNumber,
                exp_month: Number.parseInt(data.expMonth),
                exp_year: Number.parseInt(data.expYear),
                cvc: data.cvc,
              },
              billing: {
                name: data.fullName,
                email: data.email,
                phone: data.phone,
              },
              address: {
                line1: data.line1,
                line2: data.line2,
                city: data.city,
                state: data.state,
                postal_code: data.postalCode,
                country: data.country,
              },
            },
          },
          {
            headers: {
              Authorization: `Basic ${PAYMONGO_PUBLIC_KEY}`,
            },
          }
        );

        console.log(result);
      } catch (error) {
      } finally {
        setIsCardSubmitting(false);
      }
    },
    (e) => {
      console.log("error", e);
    }
  );

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
                onClick={() => {
                  setCardPage(1);
                }}
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
            <form onSubmit={submitCard}>
              {/* Billing Info */}
              {cardPage && cardPage > 0 && (
                <Modal show={true}>
                  <>
                    <div className="modal-header">
                      <h5 className="modal-title">Billing Info </h5>
                    </div>
                    {cardPage === 1 ? (
                      <>
                        <div className="modal-body">
                          <span>FULL NAME</span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="John Doe"
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            {...register("fullName", { required: true })}
                            required
                          />
                          {errors.fullName?.message && (
                            <p>{errors.fullName?.message}</p>
                          )}
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
                              {errors.city?.message && (
                                <p>{errors.city?.message}</p>
                              )}
                            </div>
                            <div className="col">
                              <span>ZIP CODE</span>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="1117"
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                                {...register("postalCode")}
                              />
                              {errors.postalCode?.message && (
                                <p>{errors.postalCode?.message}</p>
                              )}
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
                          {errors.country?.message && (
                            <p>{errors.country?.message}</p>
                          )}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setCardPage(undefined)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={async () => {
                              await trigger(
                                ["fullName", "city", "postalCode", "country"],
                                { shouldFocus: true }
                              );

                              if (errors.fullName) return;
                              if (errors.city) return;
                              if (errors.postalCode) return;
                              if (errors.country) return;

                              setCardPage(2);
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </>
                    ) : cardPage === 2 ? (
                      <>
                        <div className="modal-header">
                          <h5 className="modal-title">Credit Card Info </h5>
                        </div>
                        <div className="modal-body">
                          <span>CARD NUMBER</span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            {...register("cardNumber", { required: true })}
                          />
                          {errors.cardNumber?.message && (
                            <p>{errors.cardNumber?.message}</p>
                          )}
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
                              {errors.expMonth?.message && (
                                <p>{errors.expMonth?.message}</p>
                              )}
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
                              {errors.expYear?.message && (
                                <p>{errors.expYear?.message}</p>
                              )}
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
                          {errors.cvc?.message && <p>{errors.cvc?.message}</p>}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setCardPage(1)}
                          >
                            Back
                          </button>

                          <button
                            className="btn btn-success"
                            onClick={submitCard}
                          >
                            Done
                          </button>
                        </div>
                      </>
                    ) : (
                      "No Page"
                    )}
                  </>
                </Modal>
              )}
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
