import React from 'react';
import PropTypes from 'prop-types';

import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	CircularProgress,
	Modal,
	Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TransactionRows from './TransactionRows';
import TransactionTotal from './TransactionTotal';

import { getFullName } from '../service/helper';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	overflow: 'hidden'
};

Transaction.propTypes = {
	customerTransactions: PropTypes.object,
	customer: PropTypes.object,
	handleClose: PropTypes.func,
	title: PropTypes.string,
	loading: PropTypes.bool,
}

export default function Transaction(props) {
	const { loading, title, customer, handleClose, customerTransactions } = props;
	const { first_name, last_name, email } = customer;
	const { totalRewardPoints, totalAmount, transactions } = customerTransactions;

	return (
		<Modal
			open={true}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography variant='h5' component='div'>
					{title}
					<CloseIcon style={{ float: 'right' }} onClick={() => handleClose(false)} />
				</Typography>
				<hr />
				{loading && <CircularProgress style={{ margin: '0 auto' }} />}
				{!loading && <>
					<Typography variant='p' component='div'>
						Name: <b>{getFullName(first_name, last_name)}</b><br />
						Email: <b>{email}</b>
					</Typography>

					<Paper>
						<TableContainer sx={{ maxHeight: 550 }}>
							<Table stickyHeader aria-label='sticky table'>
								<TableHead>
									<TableRow>
										<TableCell>#</TableCell>
										<TableCell>Payment type</TableCell>
										<TableCell>Date</TableCell>
										<TableCell>Amount</TableCell>
										<TableCell>Reward</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{Object.keys(transactions).map(month =>
										<TransactionRows key={month} month={month} data={transactions[month]} />
									)}
									<TableRow>
										<TransactionTotal
											colSpan={4}
											title={`Total Amount in $`}
											amounts={[totalAmount]} />
									</TableRow>
									<TableRow>
										<TransactionTotal
											colSpan={4}
											title={`Total Rewards Points in $`}
											amounts={[totalRewardPoints]} />
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</>}
			</Box>
		</Modal>
	);
}


