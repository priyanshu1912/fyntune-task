import React,{useState,useEffect} from 'react'
import styles from './ModalComp.module.css'
import {IoCloseOutline} from 'react-icons/io5'
import { v4 as uuid } from 'uuid';

import {useDispatch} from 'react-redux'
import {addShop,updateShop} from '../../redux/features/ShopSlice'

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    name: yup.string().required(),
    area: yup.string().required(),
    category: yup.string().required(),
    openingDate: yup.string().required(),
    closingDate: yup.string().required(),
  });





function ModalComp({setOpenModal,currentShop,setCurrentShop}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch()

    const [data,setData] = useState({
        id: uuid(),
        name: null,
        area: null,
        category: null,
        openingDate: null,
        closingDate: null
    })

    useEffect(()=>{
        if(currentShop){
            setData({
                id: currentShop.id,
                name: currentShop.name,
                area: currentShop.area,
                category: currentShop.category
            })
        }
    },[currentShop])

    const submitForm = () => {
        
        console.log({data})
        {
            currentShop ?
            dispatch(updateShop(data))
            :
            dispatch(addShop(data))
        }
        setOpenModal(false)
        setData({
            name:'',
            area:'',
            category:''
        })
        setCurrentShop(null)
    }

    console.log({data})

    const areas = [
        'Thane',
        'Pune',
        'Mumbai', 
        'Suburban',
        'Nashik',
        'Nagpur',
        'Ahmednagar',
        'Solapur'
    ]

    const categories = [
        'Grocery',
        'Butcher',
        'Baker',
        'Chemist',
        'Stationery shop'
    ]

    const closeModal = () => {
        setOpenModal(false)
        setCurrentShop(null)
    }

  return (
      <div className={styles.modal}>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
            <div className={styles.newShop}>
                <div className={styles.title}>
                    {
                        currentShop ? <>Update shop</> : <>New shop</>
                    }
                </div>
                <IoCloseOutline onClick={closeModal} className={styles.closeButton}/>
            </div>

            <div className={styles.fields}>
                <div>
                    <input {...register("name")} placeholder="Enter name" type="text" 
                    value={data.name} className={styles.select}
                    onChange={(e)=>setData({...data,name: e.target.value})}/>
                    {
                        errors.name?.message ?
                        <div className={styles.errorMessage}>{errors.name?.message}</div>
                        : 
                        null
                    }
                </div>
                
                <div>
                    <select {...register("area")} value={data.area} 
                    className={styles.select} onChange={e=>setData({...data,area:e.target.value})} >
                        <option value="" disabled selected>Select area</option>
                        {
                            areas.map(item => {
                                return (
                                    <option key={item} value={item}>{item}</option>
                                )
                            })
                        }
                    </select> 
                    {
                        errors.area?.message ?
                        <div className={styles.errorMessage}>{errors.area?.message}</div>
                        : 
                        null
                    }
                </div>

                <div>
                <select {...register("category")} defaultValue={data.category} value={data.category} 
                className={styles.select} onChange={e=>setData({...data,category:e.target.value})} >
                    <option value="" disabled selected>Select category</option>
                    {
                        categories.map(item => {
                            return (
                                <option key={item} value={item}>{item}</option>
                            )
                        })
                    }
                </select>
                {
                    errors.category?.message ?
                    <div className={styles.errorMessage}>{errors.category?.message}</div>
                    : 
                    null
                }
                </div>

                <div>
                    <input {...register("openingDate")} type="date" value={data.openingDate} placeholder='Opening date' 
                    className={styles.select} onChange={e=>setData({...data,openingDate:e.target.value})}  />
                    {
                        errors.openingDate?.message ?
                        <div className={styles.errorMessage}>{errors.openingDate?.message}</div>
                        : 
                        null
                    }
                </div>

                <div>
                    <input {...register("closingDate")} type="date" value={data.closingDate}
                    placeholder='Closing date' className={styles.select} onChange={e=>setData({...data,closingDate:e.target.value})} />
                    {
                        errors.closingDate?.message ?
                        <div className={styles.errorMessage}>{errors.closingDate?.message}</div>
                        : 
                        null
                    }
                </div>
            </div>

            {
                currentShop ?
                <button type='submit' className={styles.addButton}>Update</button>
                :
                <button type='submit' className={styles.addButton}>Add shop</button>
            }
        </form>
    </div>
  )
}

export default ModalComp