import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button } from '@mui/material';
import dayjs from 'dayjs';

// ISO 8601 tarih formatını kontrol eden regex
const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;

export default function DataTable({title, rowHeaders , rowNames, rows, deleteClick , updateClick }) {
    
    if (rows[0][rowNames[0]] === undefined || rows[0][rowNames[0]] === null) {
        return (
          <Typography sx={{ mt: 0  }} variant="button">{title} &nbsp; <br/> <Typography sx={{ mt: 0, textAlign: 'center', alignSelf: 'center'  }} variant="button">Veri Bulunamadı</Typography></Typography>
        )
    }

    return (
        <TableContainer fullWidth component={Paper}>
            <Typography sx={{ mt: 1 }} variant="button">{title}</Typography>
            <Table  color='primary' size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {rowHeaders.map((name) => (
                            <TableCell key={name} align="right">{name}</TableCell>
                        ))}
                         <TableCell align="right">Sil</TableCell>
                         <TableCell align="right">Güncelle</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {rows.map((row , index) => (
                        row[rowNames[0]] &&
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {rowNames.map((name , index) => (
                                iso8601Regex.test(row[name]) && dayjs(row[name]).isValid('YYYY-MM-DD') && index !== 0 ? <TableCell key={name} align="right">{dayjs(row[name]).locale('tr').format('DD MMMM YYYY')}</TableCell> :
                                <TableCell key={name} align="right">{row[name]}</TableCell>
                                
                            ))}
                            
                            {/* id null ise çoklu render ediyordu */}
                            
                            <TableCell align="right">
                              <Button onClick={() => deleteClick(row[rowNames[0]])}  id={row[rowNames[0]]} size='small' color='error' sx={{ mt: 1 }} variant="contained">Sil</Button>
                            </TableCell>

                           
                            <TableCell align="right">
                              <Button onClick={() => updateClick(row[rowNames[0]])} id={row[rowNames[0]]} size='small' color='warning' sx={{ mt: 1 }} variant="contained">Güncelle</Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
