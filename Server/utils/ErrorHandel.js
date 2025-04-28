const handleMongooseError = (error) => {
    let errors = {};
    if (error.code === 11000) {
        const key = Object.keys(error.keyValue)[0];
        errors[key] = `${key} already exists. Please use a different value.`;
    }
    if (error.errors) {
        for (const field in error.errors) {
            errors[field] = error.errors[field].message;
        }
    }
    return errors;
};

module.exports = { handleMongooseError };
