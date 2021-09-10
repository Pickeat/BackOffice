import {useState} from "react";
import {toast} from "react-toastify";
import editAnnouce from "../../api/announces/edit";
import handleAxiosResponseError from "../../helpers/handleAxiosResponseError";

export default function EditAnnounces(props) {
    const [announceTitle, setAnnounceTitle] = useState(props.person.title);
    const [announceDescription, setAnnounceDescription] = useState(props.person.description);
    const [announceLabel, setAnnounceLabel] = useState(props.person.label);
    const [announceStatus, setAnnounceStatus] = useState(props.person.status);

    const callLoginRequest = (event) => {
        props.person.title = announceTitle;
        props.person.label = announceLabel;
        props.person.description = announceDescription
        props.person.status = announceStatus

        editAnnouce(props.person).then((response) => {
            if (response.success) {
                toast.success("Informations mises à jour");
            } else if (response.warning)
                toast.warning(response.warning)
        }).catch((error) => {
            toast.error(handleAxiosResponseError(error))
        });
        event.preventDefault()
    }

    return (
        <form noValidate className="space-y-8 divide-y divide-gray-200" onSubmit={(e) => callLoginRequest(e)}>
            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Produits</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Ces informations seront affichées publiquement faites donc attention à ce que vous partagez.
                        </p>
                    </div>
                </div>

                <div className="pt-8">
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                Titre
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="first-name"
                                    defaultValue={props.person.title}
                                    onChange={(event => setAnnounceTitle(event.target.value))}
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <div className="mt-1">
                                <input
                                    id="phone_number"
                                    name="phone_number"
                                    defaultValue={props.person.description}
                                    onChange={(event => setAnnounceDescription(event.target.value))}
                                    type="phone_number"
                                    autoComplete="phone_number"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Labels
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    defaultValue={props.person.label}
                                    onChange={(event => setAnnounceLabel(event.target.value))}
                                    type="email"
                                    autoComplete="email"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <div className="mt-1">
                                <select
                                    id="status"
                                    name="status"
                                    autoComplete="status"
                                    defaultValue={props.person.status}
                                    onChange={(event => setAnnounceStatus(event.target.value))}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option>Reserved</option>
                                    <option>Confirmed</option>
                                    <option>Confirmed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Anuler
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sauvegarder
                    </button>
                </div>
            </div>
        </form>
    )
}
