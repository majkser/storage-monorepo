"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginRedirectButton() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/login")}
      className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4"
    >
      <Button variant="brand" size="lg">
        <span className="span">Login</span>
      </Button>
    </div>
  );
}
