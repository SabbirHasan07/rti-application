export const Pagination = ({ currentPage, setCurrentPage, totalPages }) => (
    <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${page === currentPage ? 'bg-[#008037] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
                {page}
            </button>
        ))}
    </div>
);
