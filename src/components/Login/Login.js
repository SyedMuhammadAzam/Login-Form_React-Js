import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const EmailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const PasswordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(EmailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(PasswordReducer, {
    value: "",
    isValid: null,
  });

  // useEffect(() => {
  //   console.log("EFFECT Running");

  //   return () => {
  //     console.log("EFFECT CLEANUP");
  //   };
  // });

  const { isValid: emailIsValid } = emailState;           //object destructuring = Extract properties from the 
  const { isValid: passwordIsValid } = passwordState;     // object and bind them into variables .....

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking Validity");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CleanUp");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   emailState.value.includes("@") && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;



// import React, {
//   useState,        for updation .....
//   useEffect,
//   useReducer,      for multiple states
//   useContext,      diract data flow rather than props
//   useRef,
// } from 'react';

// import Card from '../UI/Card/Card';
// import Button from '../UI/Button/Button';
// import AuthContext from '../../store/auth-context';
// import Input from '../UI/Input/Input';
// import classes from './Login.module.css';

// const emailReducer = (state, action) => {
//   if (action.type === 'USER_INPUT') {
//     return { value: action.val, isValid: action.val.includes('@') };
//   }
//   if (action.type === 'INPUT_BLUR') {
//     return { value: state.value, isValid: state.value.includes('@') };
//   }
//   return { value: '', isValid: false };
// };

// const passwordReducer = (state, action) => {
//   if (action.type === 'USER_INPUT') {
//     return { value: action.val, isValid: action.val.trim().length > 6 };
//   }
//   if (action.type === 'INPUT_BLUR') {
//     return { value: state.value, isValid: state.value.trim().length > 6 };
//   }
//   return { value: '', isValid: false };
// };

// const Login = (props) => {
//   // const [enteredEmail, setEnteredEmail] = useState('');
//   // const [emailIsValid, setEmailIsValid] = useState();
//   // const [enteredPassword, setEnteredPassword] = useState('');
//   // const [passwordIsValid, setPasswordIsValid] = useState();
//   const [formIsValid, setFormIsValid] = useState(false);

//   const [emailState, dispatchEmail] = useReducer(emailReducer, {
//     value: '',
//     isValid: null,
//   });
//   const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
//     value: '',
//     isValid: null,
//   });

//   const authCtx = useContext(AuthContext);

//   const emailInputRef = useRef();
//   const passwordInputRef = useRef();

//   useEffect(() => {
//     console.log('EFFECT RUNNING');

//     return () => {
//       console.log('EFFECT CLEANUP');
//     };
//   }, []);

//   const { isValid: emailIsValid } = emailState;
//   const { isValid: passwordIsValid } = passwordState;

//   useEffect(() => {
//     const identifier = setTimeout(() => {
//       console.log('Checking form validity!');
//       setFormIsValid(emailIsValid && passwordIsValid);
//     }, 500);

//     return () => {
//       console.log('CLEANUP');
//       clearTimeout(identifier);
//     };
//   }, [emailIsValid, passwordIsValid]);

//   const emailChangeHandler = (event) => {
//     dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

//     // setFormIsValid(
//     //   event.target.value.includes('@') && passwordState.isValid
//     // );
//   };

//   const passwordChangeHandler = (event) => {
//     dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

//     // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
//   };

//   const validateEmailHandler = () => {
//     dispatchEmail({ type: 'INPUT_BLUR' });
//   };

//   const validatePasswordHandler = () => {
//     dispatchPassword({ type: 'INPUT_BLUR' });
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     if (formIsValid) {
//       authCtx.onLogin(emailState.value, passwordState.value);
//     } else if (!emailIsValid) {
//       emailInputRef.current.focus();
//     } else {
//       passwordInputRef.current.focus();
//     }
//   };

//   return (
//     <Card className={classes.login}>
//       <form onSubmit={submitHandler}>
//         <Input
//           ref={emailInputRef}
//           id="email"
//           label="E-Mail"
//           type="email"
//           isValid={emailIsValid}
//           value={emailState.value}
//           onChange={emailChangeHandler}
//           onBlur={validateEmailHandler}
//         />
//         <Input
//           ref={passwordInputRef}
//           id="password"
//           label="Password"
//           type="password"
//           isValid={passwordIsValid}
//           value={passwordState.value}
//           onChange={passwordChangeHandler}
//           onBlur={validatePasswordHandler}
//         />
//         <div className={classes.actions}>
//           <Button type="submit" className={classes.btn}>
//             Login
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// };

// export default Login;