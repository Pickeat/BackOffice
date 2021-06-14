/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../../components/navBar";
import PageContent from "../../components/pageContent";
import UsersTable from "../../components/usersTable";

export default function Example() {
    return (
        <div>
            <NavBar/>
            <PageContent content={<UsersTable/>}/>
        </div>
    )
}
