import {toast} from "react-toastify";
import handleAxiosResponseError from "../../helpers/handleAxiosResponseError";
import {useEffect, useState} from "react";
import listAnnounces from "../../api/announces";

export default function AnnouncesTable() {
    const [announces, setAnnounces] = useState([])
    const callListAnnouncesRequest = () => {
        listAnnounces().then((response) => {
            if (response.success) {
                setAnnounces(response.success.products);
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
        callListAnnouncesRequest();
    }, []);

    return (
        <div className="flex flex-col">
            {isBusy ? (<div> Loading...</div>) : (
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
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Role
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {announces.map((person) => (
                                <tr key={person._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full" src={"https://minio.pickeat.fr/minio/download/products/" + person.image + "?token="} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{person.title}</div>
                                                <div className="text-sm text-gray-500">{person.labels}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{person.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {person.status === "available" ? (      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                          {person.status}
                                      </span>) : (person.status === "waiting-for-reservation") ?  (      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                          {person.status}
                                      </span>) : (person.status === "noted") ? (<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                          {person.status}
                                      </span>) : (person.status === "given") ? (<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                          {person.status}
                                      </span>) : (<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                          {person.status}
                                      </span>)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.role}</td>
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
