import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTodo } from "../context/toDoContext";
import { Button } from "@mui/material";
import { MdArrowBack } from "react-icons/md";
import "../components/form/form.css";
import { useState } from "react";
import UpdateTodoModal from "../components/modals/UpdateTodoModal";

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

export default function MissionList() {
  // Burada "export default" yerine sadece "export" kullanın
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const { todos, removeTodo } = useTodo();
  // const renderTable=()=>{
  //   return todos.map((todo)=>({

  //   }))
  // }
  const handleUpdateOpen=() => setOpen(()=>true)

  const handleOpen = (data) => {
    console.log("datadenemesi:", data);
    setSelected(()=>{
     return { task: data.task,
      urgancy: data.urgancy,
      case: data.case,
      startDate: data.startDate,
      finishDate: data.finishDate,
      notes: data.notes,
      id:data.id}
    });
    handleUpdateOpen()
    // setOpen(()=>true);
  };

  const handleClose = () => setOpen(false);

  const goBack = () => {
    window.history.back();
  };
  return (
    <>
      <MdArrowBack onClick={goBack} />
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
              <StyledTableCell align="center">Aksiyonlar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log("sontodolist:", todos)}
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
                    <Button onClick={() => handleOpen(todo)}>Düzenle</Button>
                    <Button onClick={() => removeTodo(todo.id)}>Sil</Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateTodoModal
        data={selected}
        handleClose={handleClose}
        isOpen={open}
      />
    </>
  );
}
