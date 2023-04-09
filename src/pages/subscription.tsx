import { useQuery } from "react-query";
import Link from "next/link";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { SubscriptionResponse } from "@/types/subscription";
import dayjs from "dayjs";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { BsArrowRepeat, BsPlusLg } from "react-icons/bs";

export default function Subscription() {
  const { token } = useAuthStore();

  async function fetchSubscriptions() {
    return await axios.get<SubscriptionResponse>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/client/subscriptions/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  const { data, refetch } = useQuery("subscriptions", fetchSubscriptions);

  // https://day.js.org/docs/en/display/format#docsNav

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
        <hr />

        <div style={{ textAlign: "right" }}>
          <button
            className="btn btn-primary me-2"
            type="submit"
            onClick={() => refetch()}
          >
            <BsArrowRepeat
              style={{
                padding: 0,
                fontSize: 25,
              }}
            />
          </button>

          <Link href="/plan" className="btn btn-primary me-2">
            <BsPlusLg
              style={{
                padding: 0,
                fontSize: 25,
              }}
            />
          </Link>
        </div>

        <div className="table-responsive mt-3">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                <th scope="col">End</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.data.map((subscription, key) => (
                <tr
                  key={key}
                  className={
                    subscription.isActive ? "text-dark" : "text-secondary"
                  }
                >
                  <th scope="row">{subscription.subscriptionProduct.title}</th>
                  <td>
                    <NumericFormat
                      value={subscription.subscriptionProduct.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                      decimalScale={0}
                    />
                  </td>
                  <td>{dayjs(subscription.endAt).format("M/D/YYYY")}</td>
                  <td
                    className={
                      subscription.isActive
                        ? "badge text-bg-success"
                        : "badge text-bg-danger"
                    }
                    style={{ marginTop: 5, marginBottom: 5 }}
                  >
                    {subscription.isActive ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
