import React, {useEffect, useState} from 'react'
import './style.css'
import StatusBlock from "./components/StatusBlock/StatusBlock";
import FormBlock from "./components/FormBlock/FormBlock";
import ListBlock from "./components/ListBlock/ListBlock";
import {MdDelete} from 'react-icons/md';
import MyVerticallyCenteredModal from "./components/Popup/Popup";


function App() {
    const [modalShow, setModalShow] = useState(false); // Это статус открытия моего попап
    const [check, setCheck] = useState(''); // Приоритет в попап

    const [checkTags, setCheckTags] = useState([]);

    const [isTitleChange, setIsTitleChange] = useState(false);
    const [isDescription,setIsDescription] = useState(false);
    const [action, setAction] = useState('');
    const [modalShowObj, setModalShowObj] = useState({ // объект который я показываю в попап
        success: null,
        pending: null ,
        date: null,
        title: '',
        description : '',
        priority: '',
        tags: [],
        id: null
    });

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title : 'Сходить в кино',
            date: 'jul 19' ,
            priority: 'Medium',
            success: false,
            pending: true ,
            tags: ['Home'],
            description: 'sdasdad   '
        }
    ]); // вся наша коллекция
    const [status, setStatus] = useState('Total'); // статус отображения коллекции
    useEffect(()=> {
        setTasks(JSON.parse(localStorage.getItem('tasks')))
    },[]);
    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks))
    },[tasks]);


  return (
    <div className="App">
        <div className="container">
            <div className='App__content'>
                <h1 className='App__title'>TODO-LIST</h1>
                <StatusBlock tasks={tasks} setStatus={setStatus}/>
                <FormBlock setTasks={setTasks} tasks={tasks}/>
                {
                    tasks.length === 0 && status === 'Total'  ? <p>Список задач пуст</p>
                            : tasks.filter(el=>el.pending).length === 0 && status === 'Pending'?
                        <p>Список ожидающих задач пуст</p>
                        : tasks.filter(el=>el.success).length === 0 && status === 'Success' ?
                            <p>Список выполненных задач пуст</p>
                            :
                            <>
                                <ListBlock setCheckTags={setCheckTags} setCheck={setCheck} setModalShowObj={setModalShowObj} modalShow={modalShow} setModalShow={setModalShow} status={status} setTasks={setTasks} tasks={tasks} setStatus={setStatus}/>
                                <p className='App__clear' onClick={() =>  setTasks([])}>
                                    Clear ALL
                                    <MdDelete/>
                                </p>
                            </>
                }
            </div>
        </div>

        <MyVerticallyCenteredModal
            tasks={tasks}
            setTasks={setTasks}
            modalShowObj={modalShowObj}
            check={check}
            setCheck={setCheck}
            checkTags={checkTags}
            setCheckTags={setCheckTags}
            show={modalShow}
            isTitleChange={isTitleChange}
            setIsTitleChange={setIsTitleChange}
            isDescription={isDescription}
            setIsDescription={setIsDescription}
            action={action}
            setAction={setAction}
            onHide={() =>{
                setModalShow(false);
                setIsTitleChange(false);
                setIsDescription(false);
                setAction('')
            }}
        />
    </div>
  );
}

export default App;
