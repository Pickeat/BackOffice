import NavBar from '../../components/navBar'
import PageContent from "../../components/pageContent";
import {KeyIcon, MailIcon, UserIcon} from "@heroicons/react/outline";
import InputForm from "../../components/inputForm";

export default function Settings() {

    return (
        <div>
            <NavBar/>
            <PageContent content={
                <form action="#" method="POST">
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Create New BO users</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Here ONLY admin can create new users for the back office
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <InputForm title={"Username"} type={"text"} name={"username"} id={"username"}
                                           placeholder={"New User"}
                                           icon={<UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>}/>
                                <InputForm title={"Email"} type={"email"} name={"email"} id={"email"}
                                           placeholder={"you@example.com"}
                                           icon={<MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>}/>
                                <InputForm title={"Password"} type={"password"} name={"password"} id={"password"}
                                           placeholder={"*****"}
                                           icon={<KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>}/>
                                <InputForm title={"Repeat Password"} type={"password"} name={"rep-password"}
                                           id={"rep-password"} placeholder={"*****"}
                                           icon={<KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>}/>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create User
                            </button>
                        </div>
                    </div>
                </form>
            }/>
        </div>
    )
}
