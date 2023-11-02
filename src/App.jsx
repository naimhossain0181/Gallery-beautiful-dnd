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
      <DragDropContext  onDragEnd={onDragEnd} >
        <Droppable droppableId='DropBox'>
            {
              (provider)=>(
                <div className='drop-box' {...provider.droppableProps} ref={provider.innerRef}>
                    <img src={images[0]?.image} alt="" />
                    {provider.placeholder}

                </div>
              )
            }
        </Droppable>
        <Droppable droppableId="abc">
          {
            (provider)=>(
              <div className='grid-container' {...provider.droppableProps} ref={provider.innerRef}>
                  {
                    images?.slice(0).map((item,index)=>(
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                          {
                            (provider)=>(
                              <div className='grid-item' ref={provider.innerRef} {...provider.draggableProps} {...provider.dragHandleProps}>
                                <img src={item.image} alt="img" />
                              </div>
                            )
                          }
                      </Draggable>
                    ))
                  }
                  {provider.placeholder}
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;