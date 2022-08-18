import React, { useState, useEffect, useCallback } from 'react';

import List from './List';
import Transaction from './Transaction';

import {
	Box,
	Grid
} from '@mui/material';

import { CustomersList } from '../service/dummy'
import { getCustomerTransaction } from '../service/TransactionService';

function Index() {
	const [showCustomer, setShowCustomer] = useState(false);
	const [customer, setCustomer] = useState({});
	const [customerTransactions, setCustomerTransactions] = useState({});
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
	const getCustomer = useCallback(async (customerID) => {
		setTransactionLoading(true);
		setShowCustomer(true);
		const { customer, customerTransactions } = await getCustomerTransaction(customerList, customerID);
		setCustomer(customer);
		setCustomerTransactions(customerTransactions);
		setTransactionLoading(false);
	}, [customerList])

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
						customerTransactions={customerTransactions}
						loading={transactionLoading}
						handleClose={(state) => setShowCustomer(state)} />}
			</Grid>
		</Box>
	);
}

export default Index;