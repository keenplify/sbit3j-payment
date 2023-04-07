import { useQuery } from "react-query";
import Link from "next/link";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { SubscriptionResponse } from "@/types/subscription";
import dayjs from "dayjs";

export default function Subscription() {
  const { token } = useAuthStore();

  async function fetchSubscriptions() {
    return await axios.get<SubscriptionResponse>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/global/subscription-products`,
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

        {data?.data.data.map((subscription, key) => (
          <div key={key}>
            {subscription.id}
            {dayjs(subscription.startAt).format("MMM D, YYYY h:mm A")}
          </div>
        ))}

        {/* <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search Subscription"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div> */}

        {/* <div className="form-floating">
          <p className="form-control-plaintext"></p>
          <label htmlFor="floatingEmptyPlaintextInput" className="text-success">
            Active
          </label>
        </div> */}

        <p className="text-success text-center">Active</p>

        <Card />
        {/* <div className="form-floating mb-3">
          <p className="form-control-plaintext"></p>
          <label htmlFor="floatingEmptyPlaintextInput">Expired</label>
        </div> */}

        <p className="text-center">Expired</p>

        <Card />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="card mb-3">
      <div className="row">
        <div className="col-3">
          <div className="form-floating">
            <h6 className="form-control-plaintext">BASIC</h6>
            <label htmlFor="floatingPlaintextInput" className="text-primary">
              Type
            </label>
          </div>
        </div>

        <div className="table-responsive mt-4">
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                <th scope="col">Start</th>
                <th scope="col">End</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            {data?.data.data.map((subscription, key) => (
              <tbody className="table-group-divider" key={key}>
                <tr>
                  <th scope="row">{subscription.title}</th>
                  <td>
                    <NumericFormat
                      value={subscription.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                      decimalScale={0}
                    />
                  </td>
                  <td>{dayjs(subscription.startAt).format("M/D/YYYY")}</td>
                  <td>{dayjs(subscription.endAt).format("M/D/YYYY")}</td>
                  <td>{subscription.isActive ? "Active" : "Inactive"}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
