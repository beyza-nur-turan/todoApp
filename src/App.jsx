
import TodoProvider from "./context/toDoContext"
import AppRouteList from './routes/AppRouteList';
import AuthProvider from "./context/AuthContext"
export default function App() {
  return (
    <AuthProvider>
    <TodoProvider>
      <AppRouteList/>
    </TodoProvider>
    </AuthProvider>
    
  );
}
