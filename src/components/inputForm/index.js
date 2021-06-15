export default function InputForm(props) {
    return (
        <div className="col-span-3 sm:col-span-2">
            <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                {props.title}
            </label>
            <div className="mt-1 rounded-md shadow-sm flex">
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {props.icon}
                    </div>
                    <input
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        onChange={event => props.setter(event.target.value)}
                        placeholder={props.placeholder}
                    />
                </div>
            </div>
        </div>
    )
}
