import { authMiddleware  } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware ({
    publicRoutes: ['/site',
    '/api/uploadthing',],
    async beforeAuth(auth, req) {},
    async afterAuth(auth, req) {
        const url = req.nextUrl
        const seachParams = url.searchParams.toString()
        let hostname = req.headers

        const pathWithSeachParams = `${url.pathname}${seachParams.length>0?`?${seachParams}`: ''}`


        const customSubDomain = hostname.get('host')?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`).filter(Boolean)[0];

        if(customSubDomain){
            return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSeachParams}`, req.url))
        }
        if(url.pathname === '/sign-in' || url.pathname === "/sign-up"){
            return NextResponse.redirect(new URL(`/agency/sign-in`, req.url))
        }
        if(url.pathname==="/" || url.pathname === "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN){
            return NextResponse.rewrite(new URL('/site', req.url))
        }
        if(url.pathname.startsWith('/agency')|| url.pathname.startsWith("/subaccount")){
            return NextResponse.rewrite(new URL (`${pathWithSeachParams}`, req.url))
        }
    },

});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)',
    ],
};
