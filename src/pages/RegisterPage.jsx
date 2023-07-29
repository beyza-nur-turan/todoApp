import { Form, Formik } from "formik";
import Input from "../components/form/input";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function RegisterPage(){
    const navigate=useNavigate()
    const getLogin=()=>{
        navigate("/login")
    }
    const{addUser}=useAuth();
    const submit=()=>{
        Swal.fire(
          'Kaydedildi',
          'Kullanıcı başarılı bir şekilde kaydedildi.',
          'success'
        )
      }
    return (
        <>
        <Formik
    initialValues={{
      userName:"",
      userSurname:"",
      userPhone:"",
      userMail:"",
      userPassword:""
    }}
    onSubmit={(values) => {
      console.log("deger:",values);
      addUser(values);
      submit();
      console.log("şu an girilen değerler",values);
      
      
      
    }}
  >
    {() => (
      <Form className="formStyle">
        <Input type="text" label="Adınızı girin" name="userName" />
        <Input type="text" label="Soyadınızı girin" name="userSurname" />
        <Input type="text" label="Telefon numaranızı girin" name="userPhone" />
        <Input type="text" label="E-Mailinizi girin" name="userMail" />
        <Input type="text" label="Şifrenizi girin" name="userPassword" />
        
       <div className="buttonStyle"><button type="submit">Kaydet</button>
       
       </div>
      </Form>
    )}
  </Formik>
  Daha önce kayıt yaptırdınız mı?<button onClick={getLogin}>Giriş Yap</button>
        </>
    )
}