import OfficeSelector from "./OfficeSelector.jsx";

function SelectOfficeModal({onSelect, onClose }) {

    return (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 shadow-2xl w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl font-bold"
                    aria-label="Close modal"
                >
                    &times;
                </button>


                <OfficeSelector onSelect={onSelect} />

            </div>
        </div>
    );
}

export default SelectOfficeModal;