import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
export default function DataTable({title, rowHeaders , rowNames, rows}) {
  
    if (rows[0][rowNames[0]] === undefined || rows[0][rowNames[0]] === null) {
        return (
          <Typography sx={{ mt: 0  }} variant="button">{title} &nbsp; <br/> <Typography sx={{ mt: 0, textAlign: 'center', alignSelf: 'center'  }} variant="button">Veri Bulunamadı</Typography></Typography>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Typography sx={{ mt: 1 }} variant="button">{title}</Typography>
            <Table color='primary' size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {rowHeaders.map((name) => (
                            <TableCell key={name} align="right">{name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row , index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {rowNames.map((name , index) => (
                                dayjs(row[name]).isValid() && index !== 0 ? <TableCell key={name} align="right">{dayjs(row[name]).format('DD MM YYYY')}</TableCell> :
                                <TableCell key={name} align="right">{row[name]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
