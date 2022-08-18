import PropTypes from 'prop-types';
import {
	TableCell,
	TableRow
} from '@mui/material';
import TransactionTotal from './TransactionTotal';

TransactionRows.propTypes = {
	month: PropTypes.string,
	data: PropTypes.array,
}

export default function TransactionRows(props) {
	const { month, data } = props;

	const totalAmount = data.map(item => item.amount).reduce((total, amount) => total + amount);
	const totalReward = data.map(item => item.reward).reduce((total, amount) => total + amount);

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
				<TransactionTotal
					title={`Total of ${month}`}
					style={{ color: '#808080' }}
					colSpan={3}
					amounts={[totalAmount, totalReward]} />
			</TableRow>
		</>
	)
}
