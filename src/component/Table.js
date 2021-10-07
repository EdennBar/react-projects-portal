import { useMemo, useState } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import { useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { setProjects } from '../redux/actions/infoActions'
import { FaCaretSquareUp, FaCaretSquareDown } from "react-icons/fa";
import './table.css';
function useColumns() {
    const columns = useMemo(
        () => [
            {
                Header: "id",
                accessor: "id"
            },
            {
                Header: "name",
                accessor: "name"
            },
            {
                Header: "score",
                accessor: "score"
            },
            {
                Header: "durationInDays",
                accessor: "durationInDays"
            },
            {
                Header: "bugsCount",
                accessor: "bugsCount"
            },
            {
                Header: "madeDadeline",
                accessor: "madeDadeline"
            }
        ], []
    );

    return columns;
}

const Table = () => {

    const columns = useColumns();
    const data = useSelector((state) => state.allProjects.projects);
    const [filterInput, setFilterInput] = useState('')
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter

    } = useTable({ columns, data }, useFilters, useSortBy);

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("name", value);
        setFilterInput(value);
    };




    function madeDeadlinePercentile(projects){
        var madeDadelineCount = 0;
        var avgScore = 0;
        for(var project of projects){
            if(project.values.madeDadeline){
                madeDadelineCount+=1;
            }          
        }
        var deadline = ((madeDadelineCount/data.length)*100)
        if(deadline < 0.7){
            return <div style={{"backgroundColor":"red"}}>{deadline}%</div>
        }
        if(deadline > 0.9){
            return <div style={{"backgroundColor":"green"}}>{deadline}%</div>
        }        
    }

    function avgScore(projects){
        var madeDadelineCount = 0;
        var avgScore = 0;
        for(var project of projects){         
            avgScore += project.score;
        }
        return <div>Avg {avgScore/projects.length}</div>
    }

    return (
        <div>
        {madeDeadlinePercentile(rows)}
        {avgScore(data)}
        <Grid container>
            <Grid item xs={12} item sm={12} lg={12}>
        <div>
            <input
                value={filterInput}
                onChange={handleFilterChange}
                placeholder={"Search name"}
            />
            <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (

                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <FaCaretSquareDown />
                                            ) : (
                                                <FaCaretSquareUp />
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}                                           
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </Grid>
        </Grid>
        </div>
    );
}

export default Table;
