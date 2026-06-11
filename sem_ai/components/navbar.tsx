import Image from 'next/image'
import Link from 'next/link'
import logo_image from '../public/semai-logo.svg'

export default function Navbar() {
    return (
       <div className='object-center py-3 shadow-md inline-flex bg-background'>
            <nav className='ml-10 flex font-medium'>
                <ul className='w-2xl flex gap-8 text-lg items-center'>
                    <li className=''><Link href='/'>Home</Link></li>
                    <li className=''><Link href='/login'>Login</Link></li>
                    <li className=''><Link href='/contacts'>Contacts</Link></li>
                    <Image 
                        className='mx-auto'
                        src={logo_image}
                        width={150}
                        alt="Logo of the system"
                    />
                    <li><Link href=''></Link></li>
                </ul>
            </nav>
            
        </div>
    )
}