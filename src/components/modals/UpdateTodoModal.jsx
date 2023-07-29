import { Box, Modal } from '@mui/material'
import { Form, Formik } from 'formik';
import Input from '../form/input';
import RadioButton from '../form/radioButton';
import TextArea from '../form/textArea';
import { useTodo } from '../../context/toDoContext';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

export default function UpdateTodoModal({isOpen,handleClose,data}) {
    const {updateTodo}=useTodo();

  return (
    <>
    {console.log("mevcut data: ", data)}
       <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  sx={style} overflow={"auto"} maxHeight={"450px"}>
        <Formik
        initialValues={{
          task: data?.gorev ,
          urgancy: data?.aciliyet,
          case: data?.durum,
          startDate:data?.baslangic, // Varsayılan olarak şu anki tarih seçili olacak,
          finishDate: data?.bitis,
          notes: data?.notlar,
          accept: false,
        }}
        onSubmit={(values) => {//values formda girilen değerleri temsil eder
          updateTodo(data?.id,values)//burada güncellenecek olan satırın id sini alıyoruz ve values ile de yeni değerleri alıyoruz
          handleClose();
          console.log("şu an girilen değerler",values);
        }}
      >
        {() => (
          <Form className="formStyle">
            <Input defaultValue={"test"} type="text" label="Görev giriniz" name="task" />
            <RadioButton name="urgancy" 
              label="Aciliyet durumunu seçin"
              options={[
                { key: "dusuk", value: "Düşük" },
                { key: "orta", value: "Orta" },
                { key: "yuksek", value: "Yüksek" },
              ]}
            ></RadioButton>
            <RadioButton name="case"  
              label="İlerleme durumu seçin"
              options={[
                { key: "baslanmadi", value: "Başlanmadı" },
                { key: "suruyor", value: "Sürüyor" },
                { key: "tamamlandi", value: "Tamamlandı" },
              ]}
            ></RadioButton>
            <Input type="date" label="Başlangıç tarihi girin" name="startDate" />
            <Input type="date" label="Bitiş tarihi girin" name="finishDate" />
            <TextArea label="Notlar" name="notes"/><br/><br/>
           <div className="buttonStyle"><button type="submit">Kaydet</button>
           </div>
          </Form>
        )}
      </Formik>
        </Box>
      </Modal>
    </>
  )
}
