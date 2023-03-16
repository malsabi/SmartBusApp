class InputValidation
{
    validateEmail(email) 
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};
export default new InputValidation();