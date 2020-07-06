import React from "react";

// props: onSearch, onClickReset

const formSearch = (props) =>{

    const onClickSearch = (e) =>{
        e.preventDefault();
        props.onSearch(e.target["searchTerm"].value);
    };

    const onClickReset = (e) =>{
        props.onClickReset();
    };

    return(
        <form onSubmit={onClickSearch}>
            <input name={"searchTerm"} type="text" placeholder="Search" aria-label="Search"/>
            <button type="submit" id={"searchFormBtn"}>Search</button>
            <button type={"reset"} id={"searchFormBtn"}
                    onClick={()=>{onClickReset()}}>Reset</button>
        </form>
    );

};

export default formSearch;