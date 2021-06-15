export default function PageContent(props) {
    return (
        <div>
            <main className="-mt-32">
                <div className="max-w-8xl mx-auto pb-12 sm:px-6 lg:px-8">
                        {props.content}
                </div>
            </main>
        </div>
    )
}
