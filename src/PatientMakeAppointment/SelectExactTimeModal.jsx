import DatePicker, {registerLocale} from "react-datepicker";
import React, {useState} from "react";
import enGB from "date-fns/locale/en-GB";

function SelectExactTimeModal ({ startTime: initialStartTime, onSubmit, onExit }) {
    const [startTime, setStartTime] = useState(initialStartTime);

    registerLocale("en-GB", enGB);


    return (
        <div className="bg-white text-black p-6 rounded-xl shadow-xl space-y-6 relative">

            <button
                onClick={onExit}
                className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl font-bold"
                aria-label="Close modal"
            >
                &times;
            </button>

            <h2 className="text-center text-2xl font-bold text-gray-800">Select Exact Time</h2>

            <div className={`grid md:grid-cols-1 gap-6`}>
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                        <label className="font-medium">Time</label>
                        <DatePicker
                            selected={new Date(startTime)}
                            onChange={(date) => setStartTime(date.toLocaleString("sv-SE").replace(" ", "T"))}
                            showTimeSelect
                            dateFormat="PPPPp"
                            locale="en-GB"
                            className="w-auto min-w-[300px] px-4 py-2 bg-blue-100 rounded shadow focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="font-medium">Duration (min)</label>
                        <input value="30"
                               readOnly={true}
                               type="number"
                               className="bg-blue-100 text-black px-3 py-1 rounded"/>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t mt-4">
                <button
                    className="bg-green-600 text-black px-4 py-2 rounded hover:bg-gray-500 font-medium"
                    onClick={() => {
                        if (new Date(startTime) >= new Date())
                            onSubmit(startTime)
                        else
                            alert("You need to choose a date/time in the future")
                    }}
                >
                    Select Time
                </button>
            </div>
        </div>
    );
}

export default SelectExactTimeModal;