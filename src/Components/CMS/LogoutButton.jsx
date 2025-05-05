import { BoxArrowRight } from "react-bootstrap-icons";
import { auth } from "../../firebase";
import { signOut } from 'firebase/auth';
const LogoutButton = () => {
    const handleLogout = () => {
        signOut(auth);
      };
    return(
       <>
        <button onClick={handleLogout} className='log-out-btn bg-danger text-md px-5 px-md-12 py-3'><BoxArrowRight className="text-2xl d-block d-md-none"/><span className="d-none d-md-block">Logout</span></button>
       </>
    )
}
export default LogoutButton; 