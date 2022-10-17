const { map } = require("bluebird");

const mapperUserInformation = ( profile ) => {
	const {id_usuario,nombre,nivel,imagen} = profile;

	return {
		id:id_usuario,
		name: id_usuario,
		lastName: nombre,
		level: nivel,
		image: imagen
	}
}

const traslatePurchaseInfo = ( purchase ) => {
const {id_compra,titulo,precio,cantidad,fecha,imagen,vendedor,id_transaccion,id_envio} = purchase;

	return {
		purchase_id : id_compra,
		title: titulo,
		price: precio,
		quantity:cantidad,
		date: fecha,
		image: imagen,
		seller: vendedor,
		transaction_id:id_transaccion,
		send_id:id_envio
}
}

const mapperUserPurchase = ( purchases )=>{
	return purchases.data.map((purchase) => traslatePurchaseInfo(purchase));
}


const getUserInformation = async (parent, args, context) => {
	try {
		const { userId } = args;
		const userInformation = await context.services.profile.getUserInformation(userId);
		return mapperUserInformation(userInformation);
	} catch (err) {
		throw { err };
	}
};

const getUserPurchases = async (parent, args, context) => {
	try {
		const { userId } = args;
		const userInformation = await context.services.profile.getUserPurchases(userId);
		return mapperUserPurchase(userInformation);
	} catch (err) {
		throw { err };
	}
};

module.exports = {
	Query: { getUserInformation, getUserPurchases }
};
