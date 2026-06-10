import Image from 'next/image'
import logo_image from '../public/semai-logo.svg'

export default function Navbar() {
    return (
       <nav>
            <div className='flex flex-col items-center justify-center pt-5 pb-5 drop-shadow-md shadow-slate-800'>
                <Image
                    src={logo_image}
                    width={150}
                    alt="Logo of the system"
                />
            </div>
        </nav>
    )
}