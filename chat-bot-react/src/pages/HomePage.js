import DeveloperHomePage from "./DeveloperHomePage";
import ManagerViewProjects from "./ManagerViewProjects";

export default function HomePage() {
    const user="Manager"

    return(
        <>
            {user === "Developer" ?
                <DeveloperHomePage/>
                :
                <ManagerViewProjects/>
            }
        </>
    );
};