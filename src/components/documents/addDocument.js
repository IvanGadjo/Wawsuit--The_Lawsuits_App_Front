import React, {useState} from "react";
import {Link, withRouter} from "react-router-dom";
import { useForm } from 'react-hook-form';
import withAuth from '../auth/withAuth';
import Header from '../../components/header';


// props: theCaseId, allCases, courts, loggedInEmployee, onUploadDocument


const AddDocument = (props) =>{

    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const [selectedFile, setSelectedFile] = useState({});
    const [selectedOption, setSelectedOption] = useState(props.courts[0].id);
    const [fileType, setFileType] = useState("application/pdf");



    const findNameOfCase = () =>{
        const name = props.allCases.find(c => c.id == props.theCaseId);
        return <span>{name.name}</span>;
    };

    const handleOptionChange = (e) =>{
        // this.setState({
        //     selectedOption: e.target.value
        // })
        setSelectedOption(e.target.value);
    };

    const onFileChangeHandler = (e) =>{
        e.preventDefault();
        // this.setState({
        //     selectedFile: e.target.files[0]
        // })
        setSelectedFile(e.target.files[0]);
    };

    const showNotPdfMessage = () =>{
      if (fileType == 'application/pdf'){
          return <p/>
      }
      else {
          return <p>The document must be in pdf format!</p>
      }
    };

    // callback on <Header>
    const logOut = () => {
        props.history.replace('/');     // pri klik na logout redirect na login
    }



    const onFormSubmit = (data) =>{
        //data.preventDefault();

        //console.log(selectedFile);

        setFileType(selectedFile.type);


        if (selectedFile.type == 'application/pdf') {

            const formData = new FormData();

            formData.append("file", selectedFile);
            const otherParams = {
                "archiveNumber": data.doc_archiveNum,
                "isInput": data.doc_isInput,
                "documentDate": data.doc_date,
                "employeeId": props.loggedInEmployee.id,
                "courtId": selectedOption,
                "caseId": props.theCaseId
            };

            //console.log(otherParams)
            //new Response(formData).text().then(console.log)


            props.onUploadDoc(formData, otherParams);

            props.history.push('/cases');
        }
    };

    return(
          <div className={"container-fluid"}>
              
              <Header onLogOut={logOut}
                        loggedInEmployee={props.loggedInEmployee}/>

              <h3>Add a document to the {findNameOfCase()} case:</h3>


              <form onSubmit={handleSubmit(onFormSubmit)}>

                  <label htmlFor={'upload-file'} className={"smallText"}>Upload new document:</label><br/>
                  <input type={'file'} name={'upload_file'} onChange={onFileChangeHandler}
                         ref={register({
                             required: true
                         })}/>
                  {errors.upload_file && errors.upload_file.type === "required" &&
                  <p className={"validationErrorText"}>You must choose a file to upload</p>}
                  {showNotPdfMessage()}
                  <br/><br/>

                  <label htmlFor={"doc_archiveNum"} className={"smallText"}>Archive number:</label><br/>
                  <input type={"text"} name={"doc_archiveNum"}
                         ref={register({
                             required: true,
                             pattern:{
                                 value: /^[0-9]*$/,
                             }
                         })}/>
                  {errors.doc_archiveNum && errors.doc_archiveNum.type === "required" &&
                  <p className={"validationErrorText"}>Archive number is required!</p>}
                  {errors.doc_archiveNum && errors.doc_archiveNum.type === "pattern" &&
                  <p className={"validationErrorText"}>Must only contain numbers!</p>}
                  <br/>

                  <input type={"checkbox"} name={"doc_isInput"}
                         ref={register()}/>
                  Is this document an input document to our company?
                  <br/><br/>

                  <label htmlFor="doc_date" className={"smallText"}>New input date:</label>
                  <div>
                      <input type="date" name={"doc_date"} id="doc_date_id"
                             ref={register({
                                 required: true
                             })}/>
                      {errors.doc_date && <p className={"validationErrorText"}>Date is required!</p>}
                  </div>
                  <br/><br/>

                  {props.courts.map((c,kluc) =>
                      <div key={kluc}>
                          <input type={"radio"}
                              //id={c.id}
                                 name={"court"}
                                 value={c.id}
                                 onChange={handleOptionChange}
                          />

                          <label htmlFor={"court"}>{c.name}</label>
                      </div>
                  )}

                  <button type={'submit'} className={"btn"} id={"button"}>Submit</button>
                  <Link to={"/cases"}>
                    <button className={"btn"} id={"button"} >Cancel</button>
                  </Link>
              </form>
          </div>
    );

};

export default withRouter(withAuth(AddDocument));