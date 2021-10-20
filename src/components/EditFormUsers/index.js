import {useState} from "react";
import edit from "../../api/auth/edit";
import UpdateUserPicture from "../../api/auth/updateUserPicture";
import {toast} from "react-toastify";
import handleAxiosResponseError from "../../helpers/handleAxiosResponseError";
import { FilePicker } from 'react-file-picker'

export default function EditFormUsers(props) {
    const [personName, setPersonName] = useState(props.person.name);
    const [personPhone, setPersonPhone] = useState(props.person.phone_number);
    const [personEmail, setPersonEmail] = useState(props.person.email);
    const [personAge, setPersonAge] = useState(props.person.age);
    const [personLanguage, setPersonLanguage] = useState(props.person.language);
    const [personStatus, setPersonStatus] = useState( props.person.status);
    const [personLevel, setPersonLevel] = useState(props.person.level );
    const [personNote, setPersonNote] = useState(props.person.note);
    const [personXp, setPersonXp] = useState(props.person.leveling_points);
    const [personDescription, setPersonDescription] = useState(props.person.description);

    const callUpdateUserPicture = (FileObject, id) => {
        UpdateUserPicture(FileObject, id).then((response) => {
            if (response.success) {
                toast.success("Informations mises à jour");
            } else if (response.warning)
                toast.warning(response.warning)
        }).catch((error) => {
            toast.error(handleAxiosResponseError(error))
        });
    }

    const callLoginRequest = (event) => {
        props.person.name = personName;
        props.person.email = personEmail;
        props.person.phone_number = personPhone
        props.person.age = personAge
        props.person.language = personLanguage
        props.person.leveling_points = personXp
        props.person.level = personLevel
        props.person.status = personStatus
        props.person.note = personNote
        props.person.description = personDescription

        edit(props.person).then((response) => {
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Ces informations seront affichées publiquement ; faites donc attention à ce que vous partagez.
                        </p>
                    </div>
                </div>

                <div className="pt-8">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Informations personnelles</h3>
                        <p className="mt-1 text-sm text-gray-500">Utilisez une adresse permanente où l'utilisateur peut recevoir du courrier.</p>
                    </div>
                    <FilePicker
                      extensions={['jpg', 'jpeg', 'png']}
                      onChange={FileObject => callUpdateUserPicture(FileObject, props.person._id)}
                      onError={errMsg => (toast.error(errMsg))}
                        >
                        <div className="flex-shrink-0 h-20 w-20">
                            {props.person.image === undefined ? (
                                <img className="h-20 w-20 rounded-full"
                                     src="https://app.pickeat.fr/static/media/wallpaper-login.730d275a.jpg"
                                     alt=""/>)
                              : (<img className="h-20 w-20 rounded-full"
                                      src={"https://minio.pickeat.fr/minio/download/users/" + props.person.image + "?token="}
                                      alt=""/>)}
                        </div>
                    </FilePicker>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                Nom
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="first-name"
                                    defaultValue={props.person.name}
                                    onChange={(event => setPersonName(event.target.value))}
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                Langue/Région
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="language"
                                    defaultValue={props.person.language}
                                    onChange={(event => setPersonLanguage(event.target.value))}
                                    id="language"
                                    autoComplete="language"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Téléphone
                            </label>
                            <div className="mt-1">
                                <input
                                    id="phone_number"
                                    name="phone_number"
                                    defaultValue={props.person.phone_number}
                                    onChange={(event => setPersonPhone(event.target.value))}
                                    type="phone_number"
                                    autoComplete="phone_number"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                               Addresse email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    defaultValue={props.person.email}
                                    onChange={(event => setPersonEmail(event.target.value))}
                                    type="email"
                                    autoComplete="email"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <div className="mt-1">
                                <input
                                    id="description"
                                    name="description"
                                    defaultValue={props.person.description}
                                    onChange={(event => setPersonDescription(event.target.value))}
                                    type="description"
                                    autoComplete="description"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                               Status
                            </label>
                            <div className="mt-1">
                                <select
                                    id="status"
                                    name="status"
                                    autoComplete="status"
                                    defaultValue={props.person.status}
                                    onChange={(event => setPersonStatus(event.target.value))}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option>Registered</option>
                                    <option>Confirmed</option>
                                </select>
                            </div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mt-3">
                                Niveau
                            </label>
                            <div className="mt-1">
                                <select
                                    id="level"
                                    name="level"
                                    autoComplete="level"
                                    defaultValue={props.person.level}
                                    onChange={(event => setPersonLevel(event.target.value))}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option>Beginner</option>
                                    <option>used_to</option>
                                    <option>confirmed</option>
                                    <option>expert</option>
                                    <option>ambassador</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                Age
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="Age"
                                    id="Age"
                                    defaultValue={props.person.age}
                                    onChange={(event => setPersonAge(event.target.value))}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                Note
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="note"
                                    id="note"
                                    defaultValue={props.person.note}
                                    onChange={(event => setPersonNote(event.target.value))}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                                Xp
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="leveling_points"
                                    id="leveling_pointsip"
                                    autoComplete="leveling_points"
                                    defaultValue={props.person.leveling_points}
                                    onChange={(event => setPersonXp(event.target.value))}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
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
