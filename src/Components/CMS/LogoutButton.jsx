import { auth } from "../../firebase";
import { signOut } from 'firebase/auth';
const LogoutButton = () => {
    const handleLogout = () => {
        signOut(auth);
      };
    return(
       <>
        <button onClick={handleLogout} className='log-out-btn bg-danger text-md px-12 py-3'>Logout</button>
       </>
    )
}
export default LogoutButton; 