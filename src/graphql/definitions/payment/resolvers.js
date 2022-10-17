const getPayment = async (parent, args, context) => {
	try {
		const { paymentId } = args;
		const payment = await context.services.payment.getPayment(paymentId);
		return payment
	} catch (err) {
		throw { err };
	}
};

module.exports = {
	Query: { getPayment }
};
