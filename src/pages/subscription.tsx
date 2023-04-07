import { useQuery } from 'react-query'
import Link from "next/link";
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { SubscriptionResponse } from '@/types/subscription';
import dayjs from 'dayjs';

export default function Subscription() {
  const { token } = useAuthStore()

  async function fetchSubscriptions() {
    return await axios.get<SubscriptionResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/client/subscriptions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  const { data } = useQuery('subscriptions', fetchSubscriptions)

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

        {
          data?.data.data.map((subscription, key) => (
            <div key={key}>
              {subscription.id}
              {dayjs(subscription.startAt).format('MMM D, YYYY h:mm A')}
            </div>
          ))
        }

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
        <div className="col-3">
          <div className="form-floating">
            <h6 className="form-control-plaintext">P500</h6>
            <label htmlFor="floatingPlaintextInput" className="text-primary">
              Cost
            </label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <h6 className="form-control-plaintext">03/30</h6>
            <label htmlFor="floatingPlaintextInput" className="text-primary">
              Start
            </label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <h6 className="form-control-plaintext">04/30</h6>
            <label htmlFor="floatingPlaintextInput" className="text-primary">
              End
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
