exports.handler = async (event) => {
    try {
        // Add order call here
        if (!event.orderDetails) {
            throw new Error('Order details are missing');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Order confirmed', orderId: event.orderId }),
        };
    } catch (error) {
        throw new Error('Order confirmation failed: ' + error.message);
    }
};
