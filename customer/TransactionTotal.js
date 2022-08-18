import PropTypes from 'prop-types';
import {
    TableCell
} from '@mui/material';

import { convertToAmount } from '../service/helper';

TransactionTotal.propTypes = {
    title: PropTypes.string,
    amounts: PropTypes.array,
    colSpanPropTypes: PropTypes.number,
    style: PropTypes.object
}

export default function TransactionTotal(props) {
    let { title, amounts, colSpan, style } = props;

    return (
        <>
            <TableCell colSpan={colSpan}>
                <strong>{title}</strong>
            </TableCell>
            {amounts.map((amount, index) => (<TableCell key={index} style={style ? style : {}}>
                <strong>{convertToAmount(amount)}</strong>
            </TableCell>))}
        </>
    )
}
