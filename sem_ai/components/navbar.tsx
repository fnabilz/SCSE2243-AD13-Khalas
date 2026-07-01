'use client'

import logo_image from '../public/semai-logo.svg'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/', },
  { name: 'Login', href: '/login', },
  { name: 'Contacts', href: '/contact-admin', },
]

function renderNav(currentPage: string) {

    return navItems.map((item, id) => {
        const pageName = item.name
        const pageRef = item.href

        return ( 
            <Link key={ id } href={ pageRef }  className={`px-4 py-5 hover:bg-blue-3 default:bg-blue-1 text-white ${ currentPage === pageRef ? 'border-b-5 border-blue-2' : 'border-b-0' }`}>
                { pageName }
            </Link>
        )
    })
}

export default function Navbar() {
    const pageName = usePathname()

    return (
       <div className='object-center shadow-md inline-flex h-18 w-screen bg-blue-1 z-10'>
            <nav className='flex font-medium'>
                <ul className='px-10 flex text-lg items-center w-screen'>
                    { renderNav(pageName) }
                </ul>
            </nav>
            <Image 
                className='h-18 absolute w-30 inset-x-0 mx-auto object-center'
                src={logo_image}
                alt="Logo of the system"
            />
            
        </div>
    )
}