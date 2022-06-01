import React,{useState,useEffect} from 'react'
import styles from './ShopList.module.css'
import {IoAddCircleSharp} from 'react-icons/io5'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import ModalComp from '../Modal/ModalComp'
import {Select,Popover} from 'antd'

import {useSelector,useDispatch} from 'react-redux'
import {deleteShop, filterByArea} from '../../redux/features/ShopSlice'

const {Option} = Select

function ShopList() {
    const dispatch = useDispatch()

    const [areaFilter,setAreaFilter] = useState(null)
    const [categoryFilter,setCategoryFilter] = useState(null)
    const [statusFilter,setStatusFilter] = useState(null)

    console.log({areaFilter},{categoryFilter},{statusFilter})
    
    let shops = useSelector((state) => {
        const all = state.shop.shops
        const filter =state.shop.filter

        if(areaFilter===null && categoryFilter===null && statusFilter===null){
            return all
        }
        else {
            if(areaFilter){
                return all.filter(item => item.area === areaFilter)
            }
            if(categoryFilter){
                return all.filter(item => item.category === categoryFilter)
            }
            if(statusFilter){
                if(statusFilter==='Open'){
                    const newDate = new Date()
                    return all.filter(item => newDate>item.openingDate && newDate<item.closingDate)
                }
            }
        }
    })
    console.log({shops})

    const [currentShop,setCurrentShop] = useState(null)
    const [openModal,setOpenModal] = useState(false)

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

    const handleDelete = (id) => {
        dispatch(deleteShop(id))
    }

    const handleEdit = (item) => {
        setCurrentShop(item)
        setOpenModal(true)
    }

    const handleAreaFilter = (e) => {
        setAreaFilter(e.target.value)
        //dispatch(filterByArea(e.target.value))
    }
    const handleCategoryFilter = (e) => {
        setCategoryFilter(e.target.value)
        //dispatch(filterByArea(e.target.value))
    }
    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value)
        //dispatch(filterByArea(e.target.value))
    }
    const removeFilters = () => {
        setAreaFilter(null)
        setCategoryFilter(null)
        setStatusFilter(null)
    }

    const content = (
        <>
            <div className={styles.menuItem} onClick={handleEdit}>
                <AiFillEdit className={styles.editIcon}/>
                <div>Update shop</div>
            </div>
            <div className={styles.menuItem} onClick={handleDelete}>
                <AiFillDelete className={styles.deleteIcon}/>
                <div>Delete shop</div>
            </div>
        </>
    )


  return (
    <div className={styles.shop}>

        <div className={styles.topContainer}>
            <div className={styles.headingContainer}>
                <div className={styles.title}>Shop-list</div>
                <IoAddCircleSharp onClick={()=>setOpenModal(true)} className={styles.addButton}/>
            </div>


            {/* filter */}
            <div className={styles.filterContainer}>
                <div className={styles.filters}>
                    <select onChange={handleAreaFilter} defaultValue="All" className={styles.filterItem} >
                        {/* <option value="All">All</option> */}
                        {
                            areas.map(item => {
                                return (
                                    <option key={item} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                    <select onChange={handleCategoryFilter} placeholder="Category" defaultValue="All" className={styles.filterItem} >
                        {/* <option value="All">All</option> */}
                        {
                            categories.map(item => {
                                return (
                                    <option key={item} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                    <select onChange={handleStatusFilter} placeholder="Open/Close" defaultValue="All" className={styles.filterItem} >
                        {/* <option value="All">All</option> */}
                        <option value="Open">Open</option>
                        <option value="Close">Close</option>
                    </select>
                </div>
                <button onClick={removeFilters}>remove filters</button>
            </div>
        </div>

        <div className={styles.shopList}>
            {
                shops && shops.length ?
                shops.map(item => {
                    return (
                        <div key={item.id} className={styles.shopItem}>
                            <div className={styles.shopInfo}>
                                <div  className={styles.shopName}>{item.name}</div>
                                <div className={styles.shopDetail}>
                                    Area: {item.area} <br/>
                                    Category: {item.category}
                                </div> 
                            </div>

                            <div>
                                <AiFillEdit onClick={()=>handleEdit(item)} className={styles.editIcon}/>
                                <AiFillDelete onClick={()=>handleDelete(item.id)} className={styles.deleteIcon}/>
                            </div>
                        </div>
                    )
                })
                :
                <div className={styles.noShops}>No shops in the list</div>
            }
        </div>

        {
            openModal &&
            <ModalComp currentShop={currentShop} setCurrentShop={setCurrentShop} setOpenModal={setOpenModal}/>
        }
    </div>
  )
}

export default ShopList