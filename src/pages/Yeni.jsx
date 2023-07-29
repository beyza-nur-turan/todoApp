import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useTodo } from "../context/toDoContext";
import { MdArrowBack } from "react-icons/md";
import { Button } from "@mui/material";
import { useState } from "react";
import UpdateTodoModal from "../components/modals/UpdateTodoModal";
import Swal from "sweetalert2";
export default function DataGridDemo() {
  const { todos, removeTodo } = useTodo();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  const handleOpen = (data) => {//modal ı açmak için kullanılır
    //şuan data değerimde düzenlemek için seçmiş olduğum data mevcut
    setSelected(data);
    setOpen(true);
    console.log("datagriddeneme:",data)
  };
  const handleClose = () => setOpen(false);//modal ı kapatmak için
  const removeAlert = (value) => {
    //seçili değeri sildiren fonksiyon

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Silmek istediğinize emin misiniz?",
        text: "Bunu geri alamazsınız!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Evet, Sil!",
        cancelButtonText: "Hayır, Kapat!",
        reverseButtons: true,
        toast: true,
        width: "25rem",
        padding: "1rem",
      })
      .then((result) => {
        if (result.isConfirmed) {
          removeTodo(value?.row?.id); // removeTodo fonksiyonunu çalıştır
          swalWithBootstrapButtons.fire(
            "Silindi!",
            "Dosyanız silindi.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Kapatıldı",
            "Dosya güvende :)",
            "error"
          );
        }
      });
  };
  const goBack = () => {
    window.history.back();
  };

  const columns = [
    { field: "id", headerName: "id", width: 90 },
    {
      field: "gorev",
      headerName: "Görev ",
      width: 150,
      editable: true,
    },
    {
      field: "aciliyet",
      headerName: "Aciliyet ",
      width: 100,
      editable: true,
    },
    {
      field: " durum",
      headerName: "Durum ",
      width: 100,
      editable: true,
    },
    {
      field: "baslangic",
      headerName: "Başlangıç Tarihi",
      width: 120,
      editable: true,
    },
    {
      field: "bitis",
      headerName: "Bitiş Tarihi",
      width: 120,
    },
    {
      field: "notlar",
      headerName: "Notlar",
      width: 150,
      editable: true,
    },
    {
      field: "duzenle",
      headerName: "Düzenle",
      width: 90,
      renderCell: (value) => {
        return (
          <Button color="info" onClick={() => handleOpen(value?.row)}>
            Düzenle
          </Button>
        );
      },
    },
    {
      field: "sil",
      headerName: "Sil",
      width: 90,
      renderCell: (data) => {
        return (
          <Button color="error" onClick={() => removeAlert(data)}>
            Sil
          </Button>
        );
      },
    },
    
  ];
  const rows = todos.map((todo) => ({
    id: todo.id,
    gorev: todo.task,
    aciliyet: todo.urgancy,
    durum: todo.case,
    baslangic: todo.startDate,
    bitis: todo.finishDate,
    notlar: todo.notes,
  }));
  return (
    
   
      <>
        <MdArrowBack onClick={goBack} />
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
        <UpdateTodoModal
          data={selected}
          handleClose={handleClose}
          isOpen={open}
        />
      </>
  
    
  );
}
