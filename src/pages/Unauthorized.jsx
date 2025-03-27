const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
            <h1 className="mb-4 text-4xl font-bold text-red-600">403 - Unauthorized</h1>
            <p className="mb-6 text-lg text-gray-700">
                You do not have permission to view this page.
            </p>
            <a
                href="/"
                className="px-6 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
                Go to Home
            </a>
        </div>
    );
};

export default Unauthorized;
