import Image from 'next/image'
import Link from 'next/link'
import logo_image from '../public/semai-logo.svg'

export default function Navbar() {
    return (
       <div className='object-center py-3 shadow-md inline-flex h-21 w-screen'>
            <nav className='flex font-medium'>
                <ul className='px-10 flex gap-2 text-lg items-center w-screen'>
                    <li><Link href='/'
                        className='rounded-xl p-4 hover:bg-blue-3 default:bg-blue-1 text-white'
                        >Home</Link></li>
                    <li><Link href='/login'
                        className='rounded-xl p-4 hover:bg-blue-3 default:bg-blue-1 text-white'
                        >Login</Link></li>
                    <li><Link href='/contact-admin'
                        className='rounded-xl p-4 hover:bg-blue-3 default:bg-blue-1 text-white'
                        >Contacts</Link></li>
                   
                    <li><Link href=''></Link></li>
                </ul>
            </nav>
            <Image 
                className='h-15 absolute w-37 inset-x-0 mx-auto'
                src={logo_image}
                alt="Logo of the system"
            />
            
        </div>
    )
}