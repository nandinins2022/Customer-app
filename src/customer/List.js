import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Grid
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';

import { getFullName } from './helper';

export default function List(props) {
  const { title, data, loading, handleClick } = props;

  return (
    <>
      <Grid container spacing={1} style={{ paddingTop: '10px' }}>
        <Grid item >
          <PersonIcon fontSize={'large'} style={{ paddingTop: '5px' }} />
        </Grid>
        <Grid item >
          <Typography variant='h4' component='div'>
            <span>{title}</span>
          </Typography>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table aria-label='customet list table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Updated On</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && <TableRow>
              <TableCell colSpan={5} align='center' >
                <CircularProgress style={{ margin: '0 auto' }} />
              </TableCell>
            </TableRow>}
            {data.length > 0 && data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell component='th' scope='row'>
                  <span onClick={() => handleClick('view', row.id)}>{getFullName(row.first_name, row.last_name)}</span >
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone_number}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell><VisibilityIcon onClick={() => handleClick('name', row.id)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
