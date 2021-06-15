export default function StatsWidget(props) {
    return (
        <div className="mt-6">

            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300"/>
                </div>
                <div className="relative flex justify-start">
                    {props.first === "true" ? (
                        <span className="pr-3 text-lg bg-gray-800 font-medium text-white">{props.title}</span>
                    ) : (
                        <span className="pr-3 text-lg bg-white font-medium text-gray-800">{props.title}</span>
                    )}
                </div>
            </div>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {props.statsList.map((item) => (
                    <div key={item.name} className="px-4 py-5 bg-white shadow-lg rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
