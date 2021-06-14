/* This example requires Tailwind CSS v2.0+ */
import login from "../../api/auth/login";
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import handleAxiosResponseError from "../../helpers/handleAxiosResponseError";
import listAnnounces from "../../api/announces";
import {useEffect, useState} from "react";
import listUsers from "../../api/users/list";

let announces = []
export default function UsersTable() {
    const callListUsersRequest = (event) => {
        listUsers().then((response) => {
            if (response.success) {
                console.log(response.success);
                announces = response.success.users;
                setBusy(false);
            }
            else if (response.warning)
                toast.warning(response.warning);
        }).catch((error) => {
            toast.error(handleAxiosResponseError(error))
        });
    }
    const [isBusy, setBusy] = useState(true)

    useEffect(() => {
        callListUsersRequest();
    }, [announces]);

    return (
        <div className="flex flex-col">
            {isBusy ? (<div> flkqspoefq</div>) : (
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {announces.map((person) => (
                                <tr key={person.email}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full" src={"https://minio.pickeat.fr/minio/download/users/" + person.image + "?token="} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{person.name}</div>
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
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {person.status === "registered" ? (      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                          {person.status}
                                      </span>) : (      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                          {person.status}
                                      </span>)}

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.gender}</td>
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
