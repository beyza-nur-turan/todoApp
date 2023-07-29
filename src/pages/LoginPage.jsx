import { Form, Formik } from "formik";
import Input from "../components/form/input";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function RegisterPage(){
    const navigate = useNavigate()
    const{addUser,userList}=useAuth();
    const submit=()=>{
        Swal.fire(
          'İşlem Başarılı!',
          'Giriş Yapıldı',
          'success'
        )
      }
      const errorAlert=()=>{
        Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: 'Kullanıcı adı ya da şifre hatalı!!',
          })
      }
      const userController=(isim,sifre)=>{
        const foundUser=userList.find(user => user.userName===isim && user.userPassword===sifre)
        if(foundUser){
            setTimeout(() => {
                navigate("/")
              }, 1000);
              submit()
        }
        else if(!foundUser){
            errorAlert()
        }
        
      }
    return (
        <>
        <Formik
    initialValues={{
      userName:"",
      userPassword:"",
      
    }}
    onSubmit={(values) => {
      console.log("deger:",values);
      userController(values.userName,values.userPassword)
      
      console.log("şu an girilen değerler",values);
      
      
      
    }}
  >
    {() => (
      <Form className="formStyle">
        <Input type="text" label="Adınızı girin" name="userName" />
        <Input type="text" label="Şifrenizi girin" name="userPassword" />
        
       <div className="buttonStyle"><button type="submit">Giriş Yap</button>
       
       </div>
      </Form>
    )}
  </Formik>
        </>
    )
}