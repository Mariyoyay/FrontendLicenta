const Roles = {
    ADMIN: {
        code: 'ROLE_ADMIN',
        beautiful: 'Admin',
    },
    DOCTOR: {
        code: 'ROLE_DOCTOR',
        beautiful: 'Doctor',
    },
    EMPLOYEE: {
        code: 'ROLE_EMPLOYEE',
        beautiful: 'Employee',
    },
    PATIENT: {
        code: 'ROLE_PATIENT',
        beautiful: 'Patient',
    },
};

Roles.all = [Roles.PATIENT, Roles.EMPLOYEE, Roles.DOCTOR, Roles.ADMIN];
export { Roles };