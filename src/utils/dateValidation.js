export const isValidateBirthdate = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();

    if (selectedDate > today) {
        return 'The birth date must be earlier than today.';
    }

    return true;
};