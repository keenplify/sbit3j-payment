import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
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

const schema = z.object({
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
  });

  const router = useRouter();

  const { selectedId: selectedProductId } = router.query;
  const [isCardSubmitting, setIsCardSubmitting] = useState(false);
  const [selected, setSelected] = useState<"card" | "gcash" | "maya">("card");
  const [paymentMethodResponse, setPaymentMethodResponse] =
    useState<PaymongoPaymentMethodResponse>();

  const { cardNumber, cvc, expMonth, expYear } = watch();
  const [cardFocused, setCardFocused] = useState("");

  useEffect(() => {
    if (!selectedProductId) {
      router.push("/plan");
    }
  }, [selectedProductId]);

  useEffect(() => {
    trigger();
  }, []);

  const fullName = `${client?.firstName ?? ""} ${client?.middleName ?? ""} ${
    client?.lastName ?? ""
  }`;

  const submitCard = handleSubmit(
    async (data) => {
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
                  name: fullName,
                  email: client?.email,
                  phone: client?.phone,
                  address: {
                    line1: client?.line1,
                    line2: client?.line2,
                    city: client?.city,
                    state: client?.state,
                    postal_code: client?.postalCode,
                    country: "PH",
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
        setShowCardModal(false);
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
      setShowCardModal(false);
    } catch (error) {
      console.warn(error);
      toast.error("Unable to use online payment");
    } finally {
      setIsCardSubmitting(false);
    }
  }

  async function handleConfirm() {
    try {
      setIsCardSubmitting(true);
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
      setIsCardSubmitting(false);
      console.warn(error);
      toast.error("Cannot proceed to payment");
    }
  }

  const [showCardModal, setShowCardModal] = useState(false);

  const handleClose = () => setShowCardModal(false);

  const handleShow = () => setShowCardModal(true);

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
                style={{ width: "100%", height: "82px" }}
                onClick={() => {
                  setSelected("card");
                  handleShow();
                }}
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

            <Form onSubmit={submitCard}>
              {/* Billing Info */}
              <Modal show={showCardModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Credit Card Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                      expiry={`${expMonth ?? ""}/${expYear ?? ""}`}
                      name={fullName ?? ""}
                      number={cardNumber ?? ""}
                      focused={cardFocused ?? ""}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="success" onClick={submitCard}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </Form>
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
