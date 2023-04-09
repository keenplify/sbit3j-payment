import { Client } from "@/types/client";
import { Response } from "@/types/general";
import { LoginSchema, loginSchema } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post<Response<Client, "auth">>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/client/auth/login`,
        data
      );

      router.push({
        pathname: "/login",
        query: {
          token: response.data.access.token,
        },
      });
    } catch (error) {
      console.warn(error);
      toast.error("Unable to login. Please try again.");
    }
  });

  return (
    <div className="container mt-4">
      <div
        className="d-flex"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="d-flex justify-content-center align-items-center w-100">
          <form
            className="card card-white p-4 shadow-lg ml-auto"
            style={{
              minWidth: "25rem",
            }}
            onSubmit={onSubmit}
          >
            <h1>Login</h1>
            <p>Please login to use the payment solution</p>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                {...register("email")}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </div>
            <button type="submit" className="btn btn-primary my-2 w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
