import React, { useEffect, useState } from 'react';
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd'
import './App.css'
import data from '../db.json'
const App = () => {
  const [images,setImages]=useState([])
  const reorder=(list,startIndex,endIndex)=>{
      const result = Array.from(list)
      const [remove]= result.splice(startIndex,1)
      result.splice(endIndex,0,remove)
      return result
  }
  useEffect(()=>{
    setImages(data)
  },[])

  const onDragEnd=(result)=>{
    if(!result.destination){
      return;
    }
    
    const reorderItems =reorder(images,result.source.index,result.destination.index)
    console.log(reorderItems)
    setImages(reorderItems)
  }
  return (
    <div >
      <DragDropContext  onDragEnd={onDragEnd}  >
        <div className='grid-container'>
        {
          images?.map((item,index)=>(
              <Droppable droppableId={item.id} key={item.id} >
                {
                  (dropablePovider,snapshot)=>(
                      <div className='grid-item' ref={dropablePovider.innerRef} {...dropablePovider.droppableProps}>
                        <Draggable draggableId={item.id} index={index} >
                          {
                            (dragablePovider,snapshot)=>(
                              <div className='placeholder' ref={dragablePovider.innerRef} {...dragablePovider.draggableProps} {...dragablePovider.dragHandleProps}>
                                  <img src={item.image} alt="img" />
                              </div>
                  )
                          }
                        </Draggable>
                        {
                          dropablePovider.placeholder
                         
                        }
                      </div>
                  )
                }

              </Droppable>
          ))
        }
        </div>
       
      </DragDropContext>
    </div>
  );
};

export default App;