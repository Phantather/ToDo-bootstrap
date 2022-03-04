import React from 'react';
import styles from './listBlock.module.css'
import {AiFillTag} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import ListItem from "./ListItem";

const ListBlock = ({setCheckTags, status, tasks, setTasks, setModalShow, modalShow, setModalShowObj, setCheck}) => {

    const {actionDelete, list, item, itemLeft, itemRight,dateIcon, priority, priorityCircle, action, date } = styles;

    const  delTask = (id) =>{
        setTasks(tasks.filter((elem)=>{
         return id !== elem.id
        }))
    };

    const successHandler = (id) => {
        setTasks(tasks.map(( el ) => {
            if (el.id === id) {
                return {...el, success: !el.success, pending: !el.pending}
            } else {
                return el
            }
        }))
    };

    return (
       <ul className={list}>

           {tasks.filter((task) => {
               if (status === 'Pending') {
                   return task.pending
               } else if (status === 'Success') {
                   return task.success
               } else {
                   return task
               }
           }).map((task) => (

               <ListItem priority={priority} task={task} setModalShow={setModalShow} action={action} date={date}
               setCheck={setCheck} setCheckTags={setCheckTags} setModalShowObj={setModalShowObj} dateIcon={dateIcon}
               successHandler={successHandler} actionDelete={actionDelete} item={item} itemRight={itemRight} priorityCircle={priorityCircle}
               delTask={delTask} itemLeft={itemLeft}
               />

           ) )}

       </ul>
    );
};

export default ListBlock;