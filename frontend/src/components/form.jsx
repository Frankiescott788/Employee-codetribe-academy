import { Fragment, useState } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import { redirect, useNavigate } from 'react-router-dom'
import  Axios from "axios";

function Form() {

    const [name, setEmployeeName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [position, setPosition] = useState(null);
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();
    const [loading, setIsloading] = useState(false);
    const handle_submits = async () => {
        
        try { 
          setIsloading(true)
            const employee = {
                 name,
                 email,
                 phoneNumber,
                 position,
                 photo,
                 date : new Date().toString()
            };
           await Axios.post('http://localhost:8080/api/employees', employee, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
           });
           navigate('/')
          console.log(photo)
        } catch (error) {
            console.log(error)
        } finally {
          setIsloading(false)
        }
    }

  return (
    <Fragment>
      <div
        style={{
          marginTop: "150px",
        }}
      >
        <Container>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item lg={4}  sx={{
            // border : '1px solid #ced4da',
            padding : '25px', 
            borderRadius : '6px',
            boxShadow: "-5px 0px 16px 0px rgba(0,0,0,0.1)"
        }}>
              <TextField 
                label="Name and surname"
                fullWidth
                multiline
                required
                onChange={e => setEmployeeName(e.target.value)}
              />
              <TextField 
                label="Email Address"
                fullWidth
                multiline
                required
                sx={{
                    marginBlock : '15px'
                }}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField 
                label="Phone Number"
                fullWidth
                multiline
                required
                onChange={e => setPhoneNumber(e.target.value)}
              />
              <TextField 
                label="Position"
                fullWidth
                multiline
                required
                sx={{
                    marginBlock : '15px'
                }}
                onChange={e => setPosition(e.target.value)}
              />
              
              <input type="file" name="" id="" style={{
                marginBlock : '10px'
              }} onChange={e => {
                        setPhoto(e.target.files[0]);
                    }
                }
                  className="fileZone"
                  placeholder="gg"
                />
              <div className="submit-btn">
                <Button variant="contained" color="primary" disableElevation sx={{
                    paddingInline : '10em'
                }} onClick={handle_submits}> {loading ? 'Loading...' : 'Submit'} </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
}

export default Form;
