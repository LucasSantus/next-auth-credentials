export { default } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   const session = await getSession();

//   if (!session || !session.user)
//     return NextResponse.redirect(new URL("/sign-in", request.url));
// }

// See "Matching Paths" below to learn more
export const config = { matcher: ["/"] };
