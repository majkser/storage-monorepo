import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-900/30 p-4 mb-4">
            <AlertCircle
              className="h-20 w-20 text-red-400"
              aria-hidden="true"
            />
          </div>
        </div>

        <h1 className="h1">Page not found 😢</h1>

        <p className="text-gray-300 p">
          The link you re trying to access has expired or doesn t exist. It
          might have been moved, deleted, or never existed in the first place.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button
            asChild
            variant="default"
            size="lg"
            className="gap-2 text-lg py-6 px-8"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 text-lg py-6 px-8"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
        <p>If you believe this is an error, please contact our support team.</p>
      </div>
    </div>
  );
}
