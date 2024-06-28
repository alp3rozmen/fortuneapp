import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography, Button, TablePagination, styled } from '@mui/material';
import dayjs from 'dayjs';
import CustomDialog from 'ui-component/CustomDialog';

const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;

const StyledTableContainer = styled(TableContainer)({
    marginBottom: '16px',
});

const StyledTypography = styled(Typography)({
    marginTop: '8px',
});


export default function DataTable({ title, rowHeaders, rowNames, rows, dialogChildrens , dialogButtons, deleteClick, handleUpdateClick }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (!rows.length || !rows[0][rowNames[0]]) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ mt: 0 }} variant="button">
                    {title} &nbsp; <br />

                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="button">
                            Veri Bulunamadı
                        </Typography>
                    </Box>
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <StyledTableContainer component={Paper}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#cecece' }}>
                    <StyledTypography variant="button">{title}</StyledTypography>
                </Box>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            {rowHeaders.map((name) => (
                                <TableCell key={name} align="center">{name}</TableCell>
                            ))}
                            <TableCell width={'175'} align="center">İşlemler</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {rowNames.map((name, i) => (
                                    <TableCell key={name} align="center">
                                        {iso8601Regex.test(row[name]) && dayjs(row[name]).isValid() && i !== 0 ? dayjs(row[name]).locale('tr').format('DD MMMM YYYY') : row[name]}
                                    </TableCell>
                                ))}
                                <TableCell width={'175'} align="center" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Button sx={{ mr: 1  }} onClick={() => deleteClick(row[rowNames[0]])} color='error' variant="outlined">Sil</Button>

                                    <CustomDialog buttons={dialogButtons} handleClickOpenOut={handleUpdateClick} params={{ ...row }} name={'Güncelle'}>
                                        {dialogChildrens}
                                    </CustomDialog>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Satır:"
                labelDisplayedRows={({ count }) => `Toplam: ${count}`}
            />
        </>
    );
}
