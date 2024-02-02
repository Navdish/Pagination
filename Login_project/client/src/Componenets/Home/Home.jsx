import { useState, useEffect, useCallback} from 'react';
import {useNavigate } from 'react-router-dom'
import './Home.css'
import axios from 'axios';
import {Link} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';

function Home() {
    
    const[page, setPage] = useState(1);
    const[users_num, setUsers_num] = useState(4);
    const[userData, setUserData] = useState();
    const[list_len, setList_len] = useState(Number);
    const[filterValue, setFilterValue] = useState("All");
    const[sortValue, setSortValue] = useState("name");
    const[searchValue, setSearchValue] = useState("");
    const[flag, setFlag] = useState(true);
    const [newUser, setNewUser] = useState({});
    
    const dropUser =useCallback( async(data) => {
        axios.delete(`http://localhost:8080/dropUser/${data}`);
        
    }, [])
    useEffect(()=> {
        async function users_func(){
            const Data = await users();
            Data&&setList_len(Data.length);
            Data&&setUserData(Data.data);
            console.log(userData);
        }
        users_func();
    }, [page, users_num, list_len, searchValue, sortValue, filterValue, flag])

    
    const users = async() => axios.get("http://localhost:8080/users", {params : {
        page_num : page,
        users_num : users_num,
        filter_value : filterValue,
        sort_value : sortValue,
        search : searchValue
    }});
    const Update_details = async(data) => axios.put('http://localhost:8080/userUpdate', data)
    

    async function handleEdit(e, user, key){
        
        const row = document.getElementsByClassName('row')[key];
        row.classList.toggle('none');
        const edit_row = document.getElementsByClassName('edit-row')[key];
        edit_row.classList.toggle('none');
        console.log(user);
        await Update_details(user);
        setNewUser({});
        setFlag(!flag);
    }

    async function handleEdit2(e, user, key){
        
        setNewUser(user)
        const row = document.getElementsByClassName('row')[key];
        row.classList.toggle('none');
        const edit_row = document.getElementsByClassName('edit-row')[key];
        edit_row.classList.toggle('none');
    }
    
    async function handleDelete(e, user){
        await dropUser(user._id);
        setList_len((list_len)=>list_len-1)
    }

    function handleFilter(e) {
        console.log(e.target.value);
        setFilterValue(e.target.value);
    }

    function handleSort(e) {
        console.log(e.target.value);
        setSortValue(e.target.value);
    }

    
    function handleUser(e, user){
        console.log(newUser)
        setNewUser({...user, [e.target.name] : e.target.value});
    }
    return (
        <div className='main-body'>
        <div className='home-container'>
            <div className='home-div'>
                <div className='topbar'>
                    <div className='top-left'>
                        <p className='heading'>Users</p>
                    </div>

                    <div className='top-right'>
                        <label htmlFor="role-select">Filter by - </label>
                        <select id='role-select'  name="role-select"  onClick={(e)=>handleFilter(e)}>
                            <option value="All" >All</option>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <input type="text" placeholder='Search'  onChange={(e)=> {setSearchValue(e.target.value)}}/>
                        <label htmlFor="field-select">Sort by - </label>
                        <select id='field-select'  name="field-select"  onClick={(e)=>handleSort(e)}>
                            <option value="name" >Name</option>
                            <option value="email">Email</option>
                            <option value="description">Description</option>
                            <option value="address">Address</option>
                        </select>
                    </div>
                </div>
                
                <table className='home-table'>
                        <tr className='table-header'>
                            <th> FULL NAME</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>DESCRIPTION</th>
                            <th>ADDRESS</th>
                            <th>EDIT</th>
                            <th>DELETE</th>
                        </tr>
                    
                    
                    {userData && userData.map((user, key)=> {
                        console.log(userData)
                        return(
                            <>
                            
                            <tr className='row'>
                                <td><Link to ={`/user/${user._id}`}> {user.name}</Link></td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.description}</td>
                                <td>{user.address}</td>
                                <td><EditIcon onClick={(e)=> {handleEdit2(e, user, key)}}/></td>
                                <td><button onClick={(e)=> handleDelete(e, user)}>Delete</button></td>
                            </tr>
                            <tr className='edit-row none'>
                                <td><input type="text" name="name" value={newUser.name} onChange={(e)=> handleUser(e, user)}/></td>
                                <td><input type="text" name="email" value={newUser.email} onChange={(e)=> handleUser(e, user)} /></td>
                                <td>
                                    <select name="role" onClick={(e)=>handleUser(e)}>
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </td>
                                <td><input type="text" name="description" value={newUser.description} onChange={(e)=> handleUser(e, user)}/></td>
                                <td><input type="text" name="address" value={newUser.address} onChange={(e)=> handleUser(e, user)}/></td>
                                <td><EditIcon onClick={(e)=> {  handleEdit(e, newUser, key); }} /></td>
                                <td><button disabled>Delete</button></td>
                            </tr>
                            </>
                        )
                    })}
                </table>
            </div>
            <div className='lowerbar'>
                <div className='lower-left'>
                    <p>Showing :</p>
                    <input type="number" defaultValue={users_num} onChange={(e)=> setUsers_num(e.target.value)}></input>
                </div>
                <div className='pagination-btn'>
                    <button onClick={(e)=> setPage(page-1)} disabled={page === 1}>Prev</button>
                        <p className='page-num'>{page}</p>
                    <button onClick={(e)=> setPage(page+1)}>Next</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Home;

/* <ul className='home-list'>
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
                </ul> */