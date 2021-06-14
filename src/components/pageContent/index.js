export default function PageContent(props) {
    return (
        <div>
            <main className="-mt-32">
                <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                    {/* Replace with your content */}
                    <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                        {props.content}
                    </div>
                    {/* /End replace */}
                </div>
            </main>
        </div>
    )
}
