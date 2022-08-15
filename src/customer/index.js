import React, { useState, useEffect } from 'react';

import List from './List';
import Transaction from './Transaction';

import {
	Box,
	Grid
} from '@mui/material';

import { getRewards } from './helper';
import { CustomersList, TransactionList, Months } from './dummy'

function Index() {
	const [showCustomer, setShowCustomer] = useState(false);
	const [customer, setCustomer] = useState({});
	const [customerList, setCustomerList] = useState([]);
	const [tableLoading, setTableLoading] = useState(true);
	const [transactionLoading, setTransactionLoading] = useState(true);

	useEffect(() => {
		getCustomers();
	}, [])

	/**
	 * Get customer list from API
	 */
	const getCustomers = async () => {
		setTableLoading(true);
		const apiCall = new Promise(function (resolve, reject) {
			setTimeout(() => {
				resolve(CustomersList);
			}, 1000);
		});

		const data = await apiCall;

		setCustomerList(await data);
		setTableLoading(false);
	}

	/**
	 * Handle caolumn click
	 * @param {*} column 
	 * @param {*} data 
	 */
	const handleClick = (column, data) => {
		switch (column) {
			case "name":
				getCustomer(data);
				break;
			case "view":
				getCustomer(data);
				break;
			default:
				// Do nothing for other columns
				break;
		}
	}

	/**
	 * Set customer transaction values by customer ID
	 * @param {*} id 
	 */
	const getCustomer = async (id) => {
		setTransactionLoading(true);
		setShowCustomer(true);
		const customerTransaction = await getCustomerTransaction(id);
		setCustomer(customerTransaction);
		setTransactionLoading(false);
	}

	/**
	 * Get cutomer data from API by custoemr ID
	 * @param {*} id 
	 * @returns 
	 */
	const getCustomerTransaction = (id) => {
		const customer = customerList.find(item => item.id === id);

		return new Promise(function (resolve, reject) {
			setTimeout(() => {

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

				console.log("updatedTransaction >", updatedTransaction)
				resolve({
					...customer,
					totalRewardPoints: totalReward,
					totalAmount: totalAmount,
					transactions: updatedTransaction
				});
			}, 1000);
		});
	}

	return (
		<Box style={{ p: 4, }}>
			<Grid container spacing={2}>
				<Grid item md={11}>
					<List
						title={`Customers List`}
						data={customerList}
						loading={tableLoading}
						handleClick={handleClick} />
				</Grid>
				{showCustomer &&
					<Transaction
						title={`Transaction History`}
						customer={customer}
						loading={transactionLoading}
						handleClose={(state) => setShowCustomer(state)} />}
			</Grid>
		</Box>
	);
}

export default Index;