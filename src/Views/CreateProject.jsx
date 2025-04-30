import AddProjectForm from "../Components/CMS/AddProjectForm";
import { auth } from "../firebase";
import { signOut } from 'firebase/auth';

const CreateProject = () => {
    const handleLogout = () => {
        signOut(auth);
      };
    return(
       <>
        <h4>Create a Project</h4>
        <AddProjectForm/>
        <button onClick={handleLogout}>Logout</button>
       </>
    )
}
export default CreateProject;