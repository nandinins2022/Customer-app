

import { getRewards } from './helper';
import { TransactionList, Months } from './dummy';

/**
 * Get cutomer data from API by custoemr ID
 * @param {*} customerList 
 * @param {*} customerId 
 * @returns 
 */
export const getCustomerTransaction = (customerList, customerId) => {
	const customer = customerList.find(item => item.id === customerId);
	return new Promise(function (resolve, reject) {
		setTimeout(() => {

			const { totalReward, totalAmount, updatedTransaction } = getTransactionData();
			resolve({
				customer: customer,
				customerTransactions: {
					totalRewardPoints: totalReward,
					totalAmount: totalAmount,
					transactions: updatedTransaction
				}
			});
		}, 1000);
	});
}

const getTransactionData = () => {
	const { transactions, totalReward } = getRewards(TransactionList);

	// sort as per month
	const updatedTransaction = [];
	let totalAmount = 0;
	transactions.map(item => {
		const dateArray = item.date.split('/');
		const dateData = new Date(dateArray[2], dateArray[1], dateArray[0]);

		let month = Months[dateData.getMonth()];
		if (!updatedTransaction[month]) {
			updatedTransaction[month] = [];
		}
		updatedTransaction[month].push(item);
		totalAmount += item.amount;
		return item;
	})


	return { totalReward: totalReward, totalAmount: totalAmount, updatedTransaction: updatedTransaction }
}