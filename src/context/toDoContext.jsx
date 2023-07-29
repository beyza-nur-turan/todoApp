import { createContext, useContext, useEffect, useRef, useState } from "react";
const toDoContext = createContext();
const Provider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const todoList = useRef([]);
  //bu fonksiyon localstorage den verileri alarak todos u günceller
  //dependency boş verildiği için sayfa yenilendiğinde bir kez çalışacak demektir
  useEffect(() => {
    const lastTodos = JSON.parse(localStorage.getItem("todos"));
    if (lastTodos) {
      setTodos(lastTodos);
    }

  }, []);
  useEffect(() => {
    //todos a her yeni eleman eklendiğinde çalışır
    console.log("güncel todo listesi: ", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  //öncelikle listeye eleman eklemek için addTodo adında bir fonksiyon tanımlıyoruz. Ardından buna newTodo adında bir parametre veriyoruz.
  //Ekleyeceğimiz değişkeni buradan ekleyeceğiz. Random id atıyoruz bu sayede elemanlarımız benzersiz olacak. Ardından setTodos ile todos listemi set etmem gerekiyor.
  //çünkü yeni değerler eklendi. bunu yaparken bir dizi taginin içinde yapmalıyım çünküm bir array döndürüyoruz. Önceki elemanları eklemsi için öncelikle "...todos "
  // deyip sonra ",newTodo" diyoruz. Burada "[...todos, { ...newTodo, id }]" bu ifadenin sonundaki id yi kısa yoldan ekleyebilmiş olduk.
  // Ardından localstorage me todos u stringe dönüştürüp kaydediyorum.

  const addTodo = (newTodo) => {
    //newTodo dediğimiz yeni eklediğimiz değerler
    console.log("newTodo: ", newTodo);
    const id = Math.random().toString(36).substring(7);
    // const todoNew = {...newTodo,id:id}
    const newList = [...todos, { ...newTodo, id }]
    //todoList.current = [...todos, { ...newTodo, id }]
    setTodos(newList); //id yi newtodo ya ekledik
    localStorage.setItem("todos", JSON.stringify(newList));
  };

  const updateTodo = (id, updatedTodo) => {//id:güncellenecek olan görevin kimliği olacak
    //updateTodo da güncellenecek olan görevin bilgileri için oluşturulan parametre
    const currentTodos = todos?.map((todo) => {
      if (todo.id === id) {//eşleşme olursa güncellenmiş todo ile bir nesne oluşturulur yani updatedTodo currenttodos a eklenir diyebiliriz
        return {...updatedTodo,id};
      } else {
        return todo; //eğer eşleşme olmazsa todo doğrudan donsürülüp currentTodo ya eklenir
      }
    });
    console.log("current: ",currentTodos);
    setTodos(currentTodos);
  };

  // Bir todo'nun tamamlandığını işaretlemek için bu işlevi kullanacağız yani yapıldıysa bitti gibisinden
  // const toggleTodo=(id)=>{
  //     setTodos((prevTodos)=>
  //     prevTodos.map((todo) =>
  //     todo.id === id ? { ...todo, completed: !todo.completed }:todo ))}
  //Bir todo'yu kaldırmak için bu işlevi kullanacağız
  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const data = { todos, setTodos, addTodo, removeTodo, updateTodo };
  return <toDoContext.Provider value={data}>{children}</toDoContext.Provider>;
};
export const useTodo = () => useContext(toDoContext);
export default Provider;
