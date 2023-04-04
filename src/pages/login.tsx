import { useAuthStore } from "@/stores/auth";
import { Client } from "@/types/client";
import { Response } from "@/types/general";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface LoginProps {
    response: Response<Client>
    token: string
}
  
export default function Login({response, token}:LoginProps) {
    const {setAuth} = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        // Sets the token and client data from the response to the client's auth store (stored locally)
        if (!response) return
        setAuth(token, response.data)
        router.push("/")
    }, [response])

    return (
        <div>
            login! <Link href="/payment">Payment page</Link>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<LoginProps> = async ({query}) => {
    try {
        if (typeof query.token !== 'string') throw new Error("Token is not string!")

        const check = await axios.get<Response<Client>>(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/client/auth/check`, {
            headers: {
                Authorization: `Bearer ${query.token}`
            }
        })

        return {
            props: {
                response: check.data,
                token: query.token,
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}