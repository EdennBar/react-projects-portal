

import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from 'axios';

import { setToken } from '../redux/actions/infoActions';


const useStyles = makeStyles((theme) => ({


    card: {
        maxWidth: 345,
        padding: 20,
    },
    media: {
        height: 140,
    },


}));
const Login = () => {
    const validEmail = new RegExp(
        "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}$"
    );
    const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const dispatch = useDispatch();

    const token = useSelector((state) => state);

    let history = useHistory();

    function sendInfo(e) {
        e.preventDefault();
        if(emailErr){
            return;
        }
        axios.post('https://private-052d6-testapi4528.apiary-mock.com/authenticate', { email, password }).then((response) => {
            console.log(response)
            dispatch(setToken(response.data))
            history.push("/info");
        })

    }
    console.log(token)

    const validate = () => {
        if (!email.match(validEmail)) {
            setEmailErr(true);
        }
        if (!validPassword.test(password)) {
            setPwdError(true);
        }
    };
    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}>


            <Card className={classes.card} elevation={10}>
                <form onSubmit={sendInfo}>
                    <Grid align='center'>
                        <Avatar style={{ backgroundColor: 'green' }}><LockOutlinedIcon></LockOutlinedIcon></Avatar>
                        <Typography variant="h5" style={{ marginTop: '20px' }}> Sign in</Typography>
                    </Grid>
                    <div>
                        <TextField
                            style={{ marginTop: '60px' }}
                            id="outlined-email-input"
                            label="Email"
                            type="email"
                            name="email"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <TextField
                        style={{ marginTop: '10px' }}
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        margin="dense"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" style={{ marginTop: '30px' }} fullWidth color="primary" type="submit" onClick={()=>validate()}>
                        LOGIN
                    </Button>
                    {emailErr && <p>Your email is invalid</p>}
                    {pwdError && <p>Your password is invalid</p>}
                </form>
            </Card>
        </Grid>
    );
}

export default Login;