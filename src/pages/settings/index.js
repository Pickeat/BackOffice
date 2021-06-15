import {useState} from "react";
import NavBar from '../../components/navBar'
import PageContent from "../../components/pageContent";
import {KeyIcon, MailIcon, UserIcon} from "@heroicons/react/outline";
import InputForm from "../../components/inputForm";
import createUser from "../../api/auth/register";
import {toast} from "react-toastify";
import handleAxiosResponseError from "../../helpers/handleAxiosResponseError";

export default function Settings() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");

    const callSettingsRequest = (event) => {
        event.preventDefault()
        if (!username || !email ||!password || !repPassword) {
            toast.warning("Un ou plusieurs champ(s) est/sont vide(s)")
            return
        }
        if (password !== repPassword) {
            toast.error("Password mismatch")
            return
        }
        createUser(username, email, password).then((response) => {
            if (response.success) {
                toast.success("User Successfully Created");
            } else if (response.warning)
                toast.warning(response.warning)
        }).catch((error) => {
            toast.error(handleAxiosResponseError(error))
        });
    }
    return (
        <div>
            <NavBar/>
            <PageContent content={
                <form noValidate onSubmit={(e) => callSettingsRequest(e)}>
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
                                           placeholder={"New User"} setter={setUsername}
                                           icon={<UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>}/>
                                <InputForm title={"Email"} type={"email"} name={"email"} id={"email"}
                                           placeholder={"you@example.com"} setter={setEmail}
                                           icon={<MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>}/>
                                <InputForm title={"Password"} type={"password"} name={"password"} id={"password"}
                                           placeholder={"*****"} setter={setPassword}
                                           icon={<KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>}/>
                                <InputForm title={"Repeat Password"} type={"password"} name={"rep-password"}
                                           id={"rep-password"} placeholder={"*****"} setter={setRepPassword}
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
