import Link from "next/link";
export default function Home() {
    return (
        <>
            <p
                style={{
                    color: "green",
                }}
            >
                <b>Server URL:</b> {process.env.NEXT_PUBLIC_SERVER_URL}
                <Link href="/login">Login</Link>
            </p>
        </>
    );
}
