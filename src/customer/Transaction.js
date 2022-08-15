import React from 'react';

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

import { getFullName } from './helper';

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

export default function Transaction(props) {
	const { loading, title, customer, handleClose } = props;
	const { first_name, last_name, email, transactions, totalRewardPoints, totalAmount } = customer;

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
										<TableRows month={month} data={transactions[month]} />
									)}
									<TableRow>
										<TableCell colSpan={4}>
											<strong>Total Amount in $</strong>
										</TableCell>
										<TableCell>
											<strong>{totalAmount.toFixed(2)}{'$'}</strong>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell colSpan={4}>
											<strong>Total Rewards Points in $</strong>
										</TableCell>
										<TableCell>
											<strong>{totalRewardPoints.toFixed(2)}{'$'}</strong>
										</TableCell>
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

const TableRows = (props) => {
	const { month, data } = props;

	return (
		<>
			<TableRow key={month} >
				<TableCell colSpan={5}><strong style={{ color: '#808080' }}>{month}</strong></TableCell>
			</TableRow>

			{data.map(item => (
				<TableRow key={item.id} style={{ color: '#808080' }}>
					<TableCell>{item.id}</TableCell>
					<TableCell>{item.type}</TableCell>
					<TableCell>{item.date}</TableCell>
					<TableCell>{item.amount.toFixed(2)}$</TableCell>
					<TableCell>{item.reward.toFixed(2)}$</TableCell>
				</TableRow>
			))}
			<TableRow>
				<TableCell colSpan={3}>
					<strong style={{ color: '#808080' }}>Total of {month}</strong>
				</TableCell>
				<TableCell>
					<strong style={{ color: '#808080' }}>{data.map(item => item.amount).reduce((total, amount) => total + amount).toFixed(2)}{'$'}</strong>
				</TableCell>
				<TableCell>
					<strong style={{ color: '#808080' }}>{data.map(item => item.reward).reduce((total, amount) => total + amount).toFixed(2)}{'$'}</strong>
				</TableCell>
			</TableRow>
		</>
	)
}
