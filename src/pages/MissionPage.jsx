import {  Form, Formik } from "formik";
import Input from "../components/form/input";
import RadioButton from "../components/form/radioButton";
import TextArea from "../components/form/textArea";
import "../components/form/form.css";
import { useTodo } from "../context/toDoContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MissionPage() {
  const navigate=useNavigate()
  const getList=()=>{
    navigate("/list")
  }
  const getDatagrid=()=>{
    navigate("/datagrid")
  }
  const getRegister=()=>{
    navigate("/register")
  }
  const submit=()=>{
    Swal.fire(
      'Kaydedildi',
      'Görev başarıyla kaydedildi.',
      'success'
    )
  }

  const {addTodo}=useTodo();
  
  
  return (
    
    <div className="divStyle">
    
   
      <h1>YAPILACAK GÖREVLER</h1>
      <Formik
        initialValues={{
          task: "",
          urgancy: "",
          case: "",
          startDate: "", // Varsayılan olarak şu anki tarih seçili olacak,
          finishDate: "",
          notes: "",
          accept: false,
        }}
        onSubmit={(values) => {
          console.log(values);
          addTodo(values);
          submit();
          console.log("şu an girilen değerler",values);
          
          
          
        }}
      >
        {() => (
          <Form className="formStyle">
            <Input type="text" label="Görev giriniz" name="task" />
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
           <button onClick={getList}>Liste</button>
           <button onClick={getDatagrid}>DataGrid</button>
           <button onClick={getRegister}>Register</button></div>
          </Form>
        )}
      </Formik>
    </div>
  );
}


