import Link from "next/link";
import LinkButton from "./components/LinkButton";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-emerald-950 font-medium text-lg">
      <div className="flex flex-col justify-around items-center w-1/2 h-1/4 text-orange-900 bg-orange-400 p-4 rounded-3xl">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">
          <LinkButton text="HOME" path="/" />
        </Link>
      </div>
    </div>
  );
}
