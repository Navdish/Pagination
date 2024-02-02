import { useState, useEffect, useCallback} from 'react';
import {useNavigate } from 'react-router-dom'
import './Home.css'
import axios from 'axios';
import {Link} from 'react-router-dom'

function Home() {
    // const obj = {
    //     name : String,
    //     email : String,
    //     password : String, 
    //     role : String,
    //     description : String,
    //     address : String
    // }
    const[page, setPage] = useState(1);
    const[users_num, setUsers_num] = useState(4);
    const[userData, setUserData] = useState();
    const[list_len, setList_len] = useState(Number);
    const[filterValue, setFilterValue] = useState("User");
    const[sortValue, setSortValue] = useState("");
    const[searchValue, setSearchValue] = useState("");
    
    const dropUser =useCallback( async(data) => {
        axios.delete(`http://localhost:8080/dropUser/${data}`);
        
    }, [])
    useEffect(()=> {
        async function users_func(){
            const Data = await users();
            Data&&setList_len(Data.length);
            Data&&setUserData(Data.data);
            console.log("..")
        }
        users_func();
    }, [page, users_num, list_len])

    
    const users = async() => axios.get("http://localhost:8080/users", {params : {
        page_num : page,
        users_num : users_num,
        filter_value : filterValue,
        sort_value : sortValue,
        
    }});
    const Update_details = async(data) => axios.put('http://localhost:8080/userUpdate', data)
    

    async function handleEdit(e, user){
        user.name = prompt("Enter name", user.name);
        user.email = prompt("Enter email", user.email);
        user.description = prompt("Description", user.description);
        user.address = prompt("Address", user.address);
        const update_response = await Update_details(user);
    }
    
    async function handleDelete(e, user){
        await dropUser(user._id);
        setList_len((list_len)=>list_len-1)
    }

    async function handleFilter(e) {
        setFilterValue(e.target.value);
    }
    return (
        <div className='home-container'>
            <div>
                <h1>Home page</h1>
                <label htmlFor=""></label>
                <select id='role-select' name="role-select" onClick={(e)=>handleFilter(e)}>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                {/* <input type="text" placeholder='Search' onChange={(e)=> setSearchValue(searchValue)}/> */}
                <select id='field-select' name="field-select" onClick={(e)=>handleFilter(e)}>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="description">Description</option>
                    <option value="address">Address</option>
                </select>
                {/* <ul className='home-list'>
                    {userData && userData.map((user)=>{
                        return(
                            <li className='list-items'>
                                <Link to ={`/user/${user._id}`}> {user.name}</Link>
                                <div className='list-btn'>
                                    <button onClick={(e)=> handleEdit(e, user)}>Edit</button>
                                    <button onClick={(e)=> handleDelete(e, user)}>Delete</button>
                                </div>
                                
                            </li>
                        )
                    })}
                </ul> */}
                <table>
                    <tr>
                        
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Description</th>
                        <th>Address</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {userData && userData.map((user)=> {
                        return(
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.description}</td>
                                <td>{user.address}</td>
                                <td><button onClick={(e)=> handleEdit(e, user)}>Edit</button></td>
                                <td><button onClick={(e)=> handleDelete(e, user)}>Delete</button></td>
                            </tr>
                            
                        )
                    })}
                </table>
            </div>
            <div>
                <input type="number" defaultValue={users_num} onChange={(e)=> setUsers_num(e.target.value)}></input>
                <div className='pagination-btn'>
                    <button onClick={(e)=> setPage(page-1)}>Previous</button>
                        {page}
                    <button onClick={(e)=> setPage(page+1)}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default Home;