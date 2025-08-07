import Link from "next/link";
import { Button } from "./ui/button";

export default function UserNotLogedIn() {
  return (
    <div className="bg-black w-full h-screen text-white text-center flex flex-col items-center justify-center">
      <h1 className="h1">YOU MUST BE LOGED IN TO ACESS THIS PAGE</h1>
      <Link href="/login">
        <Button variant="secondary" size="lg" className="mt-4">
          LOGIN
        </Button>
      </Link>
    </div>
  );
}
