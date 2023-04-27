import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import axios from "axios";
import { usePlanStore } from "../stores/plan";
import { useAuthStore } from "@/stores/auth";
import { SubscriptionProductResponse } from "@/types/subscription-product";
import { useQuery } from "react-query";
import Subscription from "./sub";
import { useRouter } from "next/router";
import Accordion from "react-bootstrap/Accordion";

export default function Plan() {
  const [selectedId, setSelectedId] = useState(1);
  const router = useRouter();
  const { token } = useAuthStore();

  async function fetchSubscriptions() {
    return await axios.get<SubscriptionProductResponse>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/global/subscription-products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  const { data } = useQuery("subscriptionProducts", fetchSubscriptions);

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

      <Accordion>
        {/* defaultActiveKey="0" for accordion open state*/}
        {data?.data.data.map((subscriptionProduct, key) => (
          <Accordion.Item eventKey={`${key}`} key={key}>
            <Accordion.Header>
              <button
                className={`accordion-button rounded-4 ${
                  selectedId === subscriptionProduct.id ? "show" : "collapsed"
                }`}
                type="button"
                onClick={() => {
                  setSelectedId(subscriptionProduct.id);
                }}
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
                    <h4>{subscriptionProduct.title}</h4>
                  </div>
                  <div
                    className="text-end pt-2"
                    style={{
                      margin: "0",
                    }}
                  >
                    <h5>{subscriptionProduct.price}</h5>
                    <p>{subscriptionProduct.duration}</p>
                  </div>
                </div>
              </button>
            </Accordion.Header>
            <Accordion.Body>
              {subscriptionProduct.description?.map((desc, descKey) => (
                <div key={descKey} className="d-flex">
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
                  <p className="ps-2">{desc}</p>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* BUTTON */}
      <div className="d-grid m-4">
        {
          <button
            className="btn btn-primary p-2 mt-2 rounded-4"
            type="submit"
            disabled={!selectedId}
            onClick={() => {
              router.push({
                pathname: "/payment",
                query: {
                  selectedId,
                },
              });
            }}
          >
            <span className="text-white"> GET STARTED </span>
          </button>
        }
        <p>Selected Button: {selectedId}</p>
      </div>
    </div>
  );
}
