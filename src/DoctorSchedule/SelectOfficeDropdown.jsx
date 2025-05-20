import OfficeSelector from "./OfficeSelector.jsx";

function OfficeDropdown({ onSelect }) {
    return (
        <div className="absolute right-0 mt-2  bg-white border border-gray-300 rounded shadow z-50">
            <OfficeSelector onSelect={onSelect} />
        </div>
    );
}

export default OfficeDropdown;