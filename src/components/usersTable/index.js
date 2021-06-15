/* This example requires Tailwind CSS v2.0+ */
import {toast} from "react-toastify";
import handleAxiosResponseError from "../../helpers/handleAxiosResponseError";
import {useEffect, useState} from "react";
import listUsers from "../../api/users/list";
import SearchBar from "../searchBar";

export default function UsersTable() {
    const [isBusy, setBusy] = useState(true);
    const [usersStatic, setUsersStatic] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const callListUsersRequest = () => {
        listUsers().then((response) => {
            if (response.success) {
                setUsers(response.success.users);
                setUsersStatic(response.success.users);
                setBusy(false);
            } else if (response.warning)
                toast.warning(response.warning);
        }).catch((error) => {
            toast.error(handleAxiosResponseError(error))
        });
    }

    const updateInput = async (input) => {
        const filtered = usersStatic.filter(user => {
            if (user.name)
                return user.name.toLowerCase().includes(input.toString().toLowerCase())
        })
        setSearchInput(input);
        setUsers(filtered);
    }

    useEffect(() => {
        callListUsersRequest();
    }, []);

    return (
        <div className="flex flex-col">
            {isBusy ? (<div> Loading...</div>) : (
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <SearchBar searchInput={searchInput} function={updateInput}/>
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Description
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Phone
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Gender
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Create At
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((person) => (
                                    <tr key={person.email}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {person.image === undefined ? (
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://app.pickeat.fr/static/media/wallpaper-login.730d275a.jpg"
                                                                 alt=""/>)
                                                        : (<img className="h-10 w-10 rounded-full"
                                                                src={"https://minio.pickeat.fr/minio/download/users/" + person.image + "?token="}
                                                                alt=""/>)}
                                                </div>
                                                <div className="ml-4">
                                                    <div
                                                        className="text-sm font-medium text-gray-900">{person.name}</div>
                                                    <div className="text-sm text-gray-500">{person.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{person.description}</div>
                                            <div className="text-sm text-gray-500">{person.department}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{person.phone_number}</div>
                                            <div className="text-sm text-gray-500">{person.language}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {person.status === "registered" ? (<span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                          {person.status}
                                      </span>) : (<span
                                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                          {person.status}
                                      </span>)}

                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.gender}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Intl.DateTimeFormat("fr-FR", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit"
                                        }).format(new Date(person.created_at))}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
