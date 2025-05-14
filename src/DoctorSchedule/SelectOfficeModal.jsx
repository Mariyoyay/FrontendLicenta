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

                {/*<h2 className="text-xl font-bold mb-4 text-center">*/}
                {/*    Select an Office*/}
                {/*</h2>*/}

                {/*{loading ? (*/}
                {/*    <p className="text-center text-gray-500">Loading...</p>*/}
                {/*) : (*/}
                {/*    <ul className="space-y-2 max-h-80 overflow-y-auto">*/}
                {/*        {offices.map((office) => (*/}
                {/*            <li*/}
                {/*                key={office.id}*/}
                {/*                className="bg-blue-100 hover:bg-blue-200 p-3 rounded cursor-pointer"*/}
                {/*                onClick={() => onSelect(office)}*/}
                {/*            >*/}
                {/*                <p className="font-semibold">Office {office.id} - {office.name}</p>*/}
                {/*                <p className="text-sm text-gray-600">{office.description}</p>*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*)}*/}
            </div>
        </div>
    );
}

export default SelectOfficeModal;