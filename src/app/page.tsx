
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="h-screen w-screen center flex-col">
        <h1 className="text-2xl font-poppins font-bold">Welcome to Form - Build</h1>
        <h3 className="text-sm font-normal">A way to build and serves your form throughout the world!</h3>
        <Link href="/dashboard" >
         <button className="w-fit h-9 rounded-lg font-poppins font-500 bg-gradient-to-br from-orange-500 to-orange-300 text-sm px-3 py-2 my-4">Get Started</button>
        </Link>
      </div>
    </main>
  );
}
