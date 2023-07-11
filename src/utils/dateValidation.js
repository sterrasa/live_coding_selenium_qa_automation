export const isValidateBirthdate = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();

    if (selectedDate > today) {
        return 'The birth date must be earlier than today.';
    }

    return true;
};


export const getTomorrowDate = () => {
    const today = new Date().toLocaleDateString();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toLocaleDateString();
}
