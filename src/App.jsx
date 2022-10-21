import './App.css'
import Home from './pages/Home/Home'
import { ConfigProvider } from "antd";
import en_GB from "antd/locale/en_GB";

function App() {
  return (
    <ConfigProvider locale={en_GB}>
      <Home />
    </ConfigProvider>
  )
}

export default App
