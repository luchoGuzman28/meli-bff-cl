const getShipment = async (parent, args, context) => {
	try {
		const { shipmentId } = args;
		const shipment = await context.services.shipment.getShipment(shipmentId)
		return shipment;
	} catch (err) {
		throw { err };
	}
};

module.exports = {
	Query: { getShipment }
};
