import React from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const username = useSelector((state) => state.authentication_user.username);
    const logout = () => {
        localStorage.clear();
        console.log("log outt")
        dispatch(
          set_Authentication({
            name: null,
            isAuthenticated: false,
          })
        );
        navigate("/");
      };
  return (
      <div className='bg-slate-400'> 

      <header
      className="fixed bg-slate-400 inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
    <div className="px-4">
        <div className="flex items-center justify-between">
            <div className="flex shrink-0">
            {/* <a aria-current="page" className="flex items-center" href="/"> */}
            <FontAwesomeIcon icon={faUserCircle} className="h-7 w-auto" />
            <p className="sr-only">Website Title</p>
            <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    href="/">{username}</a>
        

            </div>
            <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                <a aria-current="page"
                    className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    href="home">Home</a>
                <a aria-current="page"
                    className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    href="room">My room</a>
                    
                
            </div>
            
            <div className="flex items-center justify-end gap-3">
                <a
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href="/"
                    onClick={logout}
                >
                    Log out
                </a>
            </div>
        </div>
    </div>
</header>
      
</div>
  
  )
}

export default Header
