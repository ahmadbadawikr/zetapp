import MaxWidthWrapper from "./MaxWidthWrapper"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { ArrowRight } from "lucide-react"

const Navbar = () => {
    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-slate-200">
                    <Link 
                        href='/' 
                        className="flex z-40 font-semibold">
                        <span>zetapp.</span>
                    </Link>
                    
                    {/** to do: add mobile navbar **/}

                    <div className="hidden items-center space-x-4 sm:flex">
                        <>
                            <Link 
                                href='/pricing' 
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm'
                                })}>
                                Pricing
                            </Link>
                            <LoginLink
                                // href='/login' 
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm'
                                })}>
                                Sign In
                            </LoginLink>
                            <RegisterLink
                                // href='/register' 
                                className={buttonVariants({
                                    size: 'sm'
                                })}>
                                Get Started <ArrowRight className="ml-1.5 "></ArrowRight>
                            </RegisterLink>

                        </>
                    </div>

                </div>
            </MaxWidthWrapper>
        </nav>
    )
}
export default Navbar