import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest): NextResponse {
    if (process.env.API_ROUTES_ENABLED !== 'true' || process.env.API_KEY !== request.nextUrl.searchParams.get('key')) {
        return new NextResponse(null, { status: 403 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*'],
};
