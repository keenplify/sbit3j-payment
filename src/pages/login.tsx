import { useAuthStore } from "@/stores/auth";
import { Client } from "@/types/client";
import { Response } from "@/types/general";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface LoginProps {
  response: Response<Client>;
  token: string;
}

export default function Login({ response, token }: LoginProps) {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    async function checkIfSubscribed() {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/client/subscriptions/current`,
          {
            headers: {
              Authorization: `Bearer ${router.query.token}`,
            },
          }
        );
        router.push("/subscription");
      } catch (error) {
        router.push("/plan");
      }
    }

    if (!response) return;
    setAuth(token, response.data);
    checkIfSubscribed();
  }, [response]);

  return <div>Please wait while we are redirecting you...</div>;
}

export const getServerSideProps: GetServerSideProps<LoginProps> = async ({
  query,
}) => {
  try {
    if (typeof query.token !== "string")
      throw new Error("Token is not string!");

    const check = await axios.get<Response<Client>>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/client/auth/check`,
      {
        headers: {
          Authorization: `Bearer ${query.token}`,
        },
      }
    );

    return {
      props: {
        response: check.data,
        token: query.token,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
