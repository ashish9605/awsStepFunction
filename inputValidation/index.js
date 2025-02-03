exports.handler = async (event) => {
    try {
        if (!event.input) {
            throw new Error('Invalid input');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Input validated successfully', input: event.input }),
        };
    } catch (error) {
        throw new Error('Validation failed: ' + error.message);
    }
};
