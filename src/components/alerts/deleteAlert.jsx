import Swal from "sweetalert2";
import { useTodo } from "../../context/toDoContext";

export default function DeleteAlert() {
    const{removeTodo}=useTodo()
    const removeAlert=(value)=>{//seçili değeri sildiren fonksiyon

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
          })
          .then((result) => {
            if (result.isConfirmed) {
              // "Delete" butonuna basıldığında
              removeTodo(value?.row?.id); // removeTodo fonksiyonunu çalıştır
              swalWithBootstrapButtons.fire("Silindi!", "Dosyanız silindi.", "success");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire("Kapatıldı", "Dosya güvende :)", "error");
            }
          });
       
      }
      return(removeAlert())
}
