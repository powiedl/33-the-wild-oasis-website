import { NextResponse } from "next/server";

// mit diesen beiden Zeilen tauscht man den Namen von auth auf middleware - weil die Middleware eben so heißen muss
import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};

/* "sinnloses Beispiel"
export function middleware(request) {
  console.log(request);

  return NextResponse.redirect(new URL("/about", request.url));
}

export const config = {
  matcher: ["/account", "/cabins"],
};

*/
