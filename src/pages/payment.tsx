import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import validator from "validator";
import axios from "axios";
import { PAYMONGO_PUBLIC_KEY } from "../config/paymongo";
import { useRouter } from "next/router";
import { PaymongoPaymentMethodResponse } from "@/types/paymongo";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/auth";
import { SubscriptionInitializeResponse } from "@/types/subscription";
// @ts-expect-error No import types
import Cards from "zigu-react-credit-cards";

import "zigu-react-credit-cards/es/styles-compiled.css";
import { Client } from "@/types/client";

const schema = z.object({
  fullName: z.string().min(1, { message: "Required" }),
  line1: z.string().min(1, { message: "Required" }),
  line2: z.string().min(1, { message: "Required" }),
  city: z.string().min(1, { message: "Required" }),
  state: z.string().min(1, { message: "Required" }),
  postalCode: z
    .string()
    .min(4, { message: "Required" })
    .max(4, { message: "Must be 4 digits" }),
  country: z.string().min(1, { message: "Required" }),
  email: z.string().min(1, { message: "Required" }).email(),
  phone: z
    .string()
    .min(11, { message: "Required" })
    .max(11, { message: "Must be 11 digits" }),
  cardNumber: z
    .string()
    .min(1, { message: "Required" })
    .refine(validator.isCreditCard, {
      message: "A valid Card Number is Required",
    }),
  expMonth: z
    .string()
    .min(1, { message: "Required" })
    .refine((v) => {
      const month = Number.parseInt(v);
      if (month < 1) return false;
      if (month > 12) return false;
      return true;
    }, "Must be a valid month"),
  expYear: z
    .string()
    .min(1, { message: "Required" })
    .refine((v) => {
      const year = Number.parseInt(v);
      const currentYear = new Date().getFullYear();
      if (year < currentYear) return false;
      return true;
    }, "Must be a valid year"),
  cvc: z.string().min(3, { message: "Required" }),
});

type CardSchema = z.infer<typeof schema>;

export default function Payment() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get<Client>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/client/auth/check`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const { token, client } = useAuthStore();

  const {
    register,
    setValue,
    formState: { errors },
    watch,
    handleSubmit,
    trigger,
  } = useForm<CardSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      country: "PH",
      email: client?.email,
    },
  });

  const router = useRouter();

  const { selectedId: selectedProductId } = router.query;
  const [cardPage, setCardPage] = useState<number>();
  const [isCardSubmitting, setIsCardSubmitting] = useState(false);
  const [selected, setSelected] = useState<"card" | "gcash" | "maya">("card");
  const [paymentMethodResponse, setPaymentMethodResponse] =
    useState<PaymongoPaymentMethodResponse>();

  const { cardNumber, cvc, expMonth, expYear, fullName } = watch();
  const [cardFocused, setCardFocused] = useState("");

  useEffect(() => {
    if (!selectedProductId) {
      router.push("/plan");
    }
  }, [selectedProductId]);

  useEffect(() => {
    trigger();
  }, []);

  const submitCard = handleSubmit(
    async (data) => {
      setCardPage(undefined);
      setIsCardSubmitting(true);

      try {
        const result = await axios.post<PaymongoPaymentMethodResponse>(
          "https://api.paymongo.com/v1/payment_methods",
          {
            data: {
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
            },
          },
          {
            headers: {
              Authorization: `Basic ${btoa(PAYMONGO_PUBLIC_KEY)}`,
            },
          }
        );

        setPaymentMethodResponse(result.data);
      } catch (error) {
        console.warn(error);
        toast.error("Cannot create card");
      } finally {
        setIsCardSubmitting(false);
      }
    },
    (e) => {
      console.log("error", e);
    }
  );

  async function handleOnlinePayment(type: "gcash" | "paymaya") {
    try {
      setIsCardSubmitting(true);
      const result = await axios.post<PaymongoPaymentMethodResponse>(
        "https://api.paymongo.com/v1/payment_methods",
        {
          data: {
            attributes: {
              type,
            },
          },
        },
        {
          headers: {
            Authorization: `Basic ${btoa(PAYMONGO_PUBLIC_KEY)}`,
          },
        }
      );

      setPaymentMethodResponse(result.data);
    } catch (error) {
      console.warn(error);
      toast.error("Unable to use online payment");
    } finally {
      setIsCardSubmitting(false);
    }
  }

  async function handleConfirm() {
    try {
      const result = await axios.post<SubscriptionInitializeResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/client/subscriptions/initialize`,
        {
          subscriptionProductId: Number.parseInt(`${selectedProductId}`),
          paymentMethodId: paymentMethodResponse?.data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.redirect_url) {
        window.location.href = result.data.redirect_url;
      } else {
        toast.success("Payment Successful");
        router.push("/subscription");
      }
    } catch (error) {
      console.warn(error);
      toast.error("Cannot proceed to payment");
    }
  }

  return (
    <div>
      <div className="m-4">
        <Link href="/plan">
          <button
            type="button"
            className="btn-close1"
            aria-label="Close"
          ></button>
        </Link>
      </div>

      <div className="m-4">
        <h1>Payment Methods</h1>
        <p>Choose your payment method below</p>
        <hr />
      </div>

      <div className="m-4 accordion" id="accordionExample">
        {/* Credit / Debit Card */}

        <div>
          <div
            className="accordion-item mb-4 rounded-2 shadow bg-body rounded"
            onClick={() => setSelected("card")}
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

                {paymentMethodResponse?.data.attributes.type === "card"
                  ? `
                  Card Ending in ${paymentMethodResponse?.data.attributes.details?.last4}`
                  : "Credit / Debit Card"}
              </button>
            </div>

            <form onSubmit={submitCard}>
              {/* Billing Info */}
              {cardPage && cardPage > 0 && (
                <Modal show={true}>
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {cardPage === 1 ? "Billing Info" : "Credit Card Info"}
                    </h5>
                  </div>
                  <div
                    className="modal-body"
                    style={{
                      display: cardPage === 1 ? "block" : "none",
                    }}
                  >
                    <span>FULL NAME</span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      aria-label="fullName"
                      aria-describedby="billing"
                      {...register("fullName")}
                      required
                    />

                    {errors.fullName?.message && (
                      <p className="validationMessage">
                        {errors.fullName?.message}
                      </p>
                    )}
                    <div className="row">
                      <div className="col">
                        <span>EMAIL</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="@gmail.com"
                          aria-label="email"
                          aria-describedby="billing"
                          {...register("email")}
                        />
                        {errors.email?.message && (
                          <p className="validationMessage">
                            {errors.email?.message}
                          </p>
                        )}
                      </div>
                      <div className="col">
                        <span>PHONE NUMBER</span>
                        <input
                          type="tel"
                          maxLength={11}
                          className="form-control"
                          placeholder="09xxxxxxxxx"
                          aria-label="phone"
                          aria-describedby="billing"
                          {...register("phone")}
                        />
                        {errors.phone?.message && (
                          <p className="validationMessage">
                            {errors.phone?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <span>LINE 1</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Unit No. / Street"
                          aria-label="line1"
                          aria-describedby="address"
                          {...register("line1")}
                        />
                        {errors.line1?.message && (
                          <p className="validationMessage">
                            {errors.line1?.message}
                          </p>
                        )}
                      </div>
                      <div className="col">
                        <span>LINE 2</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Barangay"
                          aria-label="line2"
                          aria-describedby="address"
                          {...register("line2")}
                        />
                        {errors.line2?.message && (
                          <p className="validationMessage">
                            {errors.line2?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <span>CITY</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          aria-label="city"
                          aria-describedby="address"
                          {...register("city")}
                        />
                        {errors.city?.message && (
                          <p className="validationMessage">
                            {errors.city?.message}
                          </p>
                        )}
                      </div>
                      <div className="col">
                        <span>STATE/REGION</span>
                        <select className="form-select" {...register("state")}>
                          <option value="" disabled>
                            Select Region
                          </option>
                          <option value="Region I ">Region I </option>
                          <option value="Region II ">Region II </option>
                          <option value="Region III ">Region III </option>
                          <option value="Region IV‑A">Region IV‑A</option>
                          <option value="MIMAROPA ">MIMAROPA </option>
                          <option value="Region V ">Region V </option>
                          <option value="Region VI">Region VI</option>
                          <option value="Region VII">Region VII</option>
                          <option value="Region VIII">Region VIII</option>
                          <option value="Region IX ">Region IX </option>
                          <option value="Region X ">Region X </option>
                          <option value="Region XI">Region XI</option>
                          <option value="Region XII ">Region XII </option>
                          <option value="Region XIII ">Region XIII </option>
                          <option value="NCR ">NCR </option>
                          <option value="CAR ">CAR </option>
                          <option value="BARMM">BARMM</option>
                        </select>
                        {errors.state?.message && (
                          <p className="validationMessage">
                            {errors.state?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <span>POSTAL CODE</span>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder=""
                          aria-label="postalCode"
                          aria-describedby="address"
                          maxLength={4}
                          {...register("postalCode")}
                        />
                        {errors.postalCode?.message && (
                          <p className="validationMessage">
                            {errors.postalCode?.message}
                          </p>
                        )}
                      </div>
                      <div className="col">
                        <span>COUNTRY</span>
                        <input
                          type="text"
                          className="form-control"
                          aria-label="country"
                          aria-describedby="address"
                          readOnly
                          {...register("country")}
                        />
                        {/* {errors.country?.message && (
                          <p>{errors.country?.message}</p>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div
                    className="modal-body"
                    style={{
                      display: cardPage === 2 ? "block" : "none",
                    }}
                  >
                    <span>CARD NUMBER</span>
                    <input
                      type="tel"
                      maxLength={16}
                      className="form-control"
                      placeholder=""
                      aria-label="cardNumber"
                      aria-describedby="card"
                      {...register("cardNumber")}
                      onFocus={(event) => {
                        setCardFocused("number");
                      }}
                    />
                    {errors.cardNumber?.message && (
                      <p className="validationMessage">
                        {errors.cardNumber?.message}
                      </p>
                    )}
                    <div className="row mt-4">
                      <div className="col-4">
                        <span>EXP. MONTH</span>
                        <input
                          type="tel"
                          maxLength={2}
                          className="form-control"
                          placeholder="ex. 01 or 11"
                          aria-label="expMonth"
                          aria-describedby="card"
                          {...register("expMonth")}
                          onFocus={(event) => {
                            setCardFocused("expiry");
                          }}
                        />
                        {errors.expMonth?.message && (
                          <p className="validationMessage">
                            {errors.expMonth?.message}
                          </p>
                        )}
                      </div>
                      <div className="col-4">
                        <span>EXP. YEAR</span>
                        <input
                          type="tel"
                          maxLength={4}
                          className="form-control"
                          placeholder="ex. 2023"
                          aria-label="expYear"
                          aria-describedby="card"
                          {...register("expYear")}
                          onFocus={(event) => {
                            setCardFocused("number");
                          }}
                        />
                        {errors.expYear?.message && (
                          <p className="validationMessage">
                            {errors.expYear?.message}
                          </p>
                        )}
                      </div>
                      <div className="col-4">
                        <span>CVC NO.</span>
                        <input
                          type="tel"
                          maxLength={3}
                          className="form-control"
                          placeholder=""
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                          {...register("cvc")}
                          onFocus={(event) => {
                            setCardFocused("cvc");
                          }}
                        />
                        {errors.cvc?.message && (
                          <p className="validationMessage">
                            {errors.cvc?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div style={{ margin: "2em 0" }}>
                      <Cards
                        cvc={cvc ?? ""}
                        expiry={`${expMonth}/${expYear}`}
                        name={fullName ?? ""}
                        number={cardNumber ?? ""}
                        focused={cardFocused ?? ""}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    {cardPage === 1 ? (
                      <>
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
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </Modal>
              )}
            </form>
          </div>
        </div>

        {/* Gcash */}
        <div
          className="accordion-item mb-4 rounded-2 shadow bg-body rounded"
          onClick={() => {
            setSelected("gcash");
            handleOnlinePayment("gcash");
          }}
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
          onClick={() => {
            setSelected("maya");
            handleOnlinePayment("paymaya");
          }}
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
        <button
          className="btn btn-primary p-3"
          type="button"
          onClick={handleConfirm}
          disabled={
            !paymentMethodResponse || !selectedProductId || isCardSubmitting
          }
        >
          Confirm Payment Method
        </button>
      </div>
    </div>
  );
}
