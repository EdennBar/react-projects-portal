import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from '../redux/actions/infoActions';
import ProjectsTable from './Table';
const Info = () => {

    const token = useSelector((state) => state.allProjects.token)
    const dispatch = useDispatch();
    console.log(token)

    const fetchProjects = async () => {
        const response = await axios.get('https://private-052d6-testapi4528.apiary-mock.com/info', { headers: { 'Berear': token } }).catch((err) => {
            console.log("Err", err)
        })
        dispatch(setProjects(response.data))
    }

    useEffect(() => {
        fetchProjects();
    }, []);


    return (
        <div>
            <ProjectsTable></ProjectsTable>
        </div>
    );
}

export default Info;