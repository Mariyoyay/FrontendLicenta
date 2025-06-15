import {useState} from "react";

const MIN_LENGTH = 8;
const REQUIREMENTS = [
    {
        chars: 'abcdefghijklmnopqrstuvwxyz',
        message: 'At least one lowercase letter'
    },
    {
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        message: 'At least one uppercase letter'
    },
    {
        chars: '0123456789',
        message: 'At least one number'
    },
    {
        chars: '!@#$%^&*()-_=+[]{};:,.<>/?|',
        message: 'At least one special character'
    }
];

function PasswordInput({onChange, className, placeholder}) {

    const [error, setError] = useState([`Password must be at least ${MIN_LENGTH} characters long`]);



    const validatePassword = (password) => {
        if (password.length < MIN_LENGTH) {
            return `Password must be at least ${MIN_LENGTH} characters long`;
        }

        for (const req of REQUIREMENTS) {
            if (![...req.chars].some(c => password.includes(c))) {
                return req.message;
            }
        }

        return null;
    };

    const handleChange = (e) => {
        const password = e.target.value;
        const errorMessage = validatePassword(password);

        setError(errorMessage);
        onChange({...e,
            isValid: !errorMessage
        });
    };

    return (
        <div>
            <input
                onChange={handleChange}
                type="password"
                id="password"
                placeholder={placeholder || "••••••••"}
                required
                className={`${className} ${error ? 'border-red-500' : ''}`}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
            {!error && (
                <p className="text-green-500 text-sm mt-1">Password meets all requirements</p>
            )}
        </div>
    );
}

export default PasswordInput;