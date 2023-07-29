import { Box, Modal, Paper, styled } from "@mui/material";
import { Button } from "antd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTodo } from "../../context/toDoContext";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};
export default function UpdateListModel({ isOpen, handleClose, data }) {
  const { updateTodo,todos } = useTodo();
  return (
    <>
    {console.log("datas: ", data)}
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} overflow={"auto"}  maxHeight={"450px"}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Görev</StyledTableCell>
              <StyledTableCell align="center">Aciliyet</StyledTableCell>
              <StyledTableCell align="center">Durum</StyledTableCell>
              <StyledTableCell align="center">Başlangıç Tarihi</StyledTableCell>
              <StyledTableCell align="center">Bitiş Tarihi</StyledTableCell>
              <StyledTableCell align="center">Notlar</StyledTableCell>
              <StyledTableCell align="center">Sil</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => {
              return (
                <StyledTableRow key={todo.id}>
                  <StyledTableCell component="th" scope="row">
                    {todo.task}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {todo.urgancy}
                  </StyledTableCell>
                  <StyledTableCell align="center">{todo.case}</StyledTableCell>
                  <StyledTableCell align="center">
                    {todo.startDate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {todo.finishDate}
                  </StyledTableCell>
                  <StyledTableCell align="center">{todo.notes}</StyledTableCell>
                  <StyledTableCell align="center"> 
                    <Button
                      onClick={ (value) => {
    return(<Button onClick={handleOpen(value?.row)}>Düzenle</Button>)
  }}
                    >
                      Düzenle
                    </Button>
                    <Button onClick={() => removeTodo(todo.id)}>Sil</Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
            {console.log(todos)}
          </TableBody>
        </Table>
      </TableContainer>
        </Box>
      </Modal>
    </>
  );
}
