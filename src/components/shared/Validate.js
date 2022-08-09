export const Validate = (data,type)=>{
    const errors={};

    if(!data.email){
        errors.email="Enter your email"
    }else if(!/\S+@\S+\.\S+/.test(data.email)){
        errors.email = "Email address is invalid"
    }else{
        delete errors.email
    }

    if(!data.password){
        errors.password = "Enter your password";
    }else if (data.password.length<6){
        errors.password="Password need to be 6 character or more";
    }else{
        delete errors.password;
    }
    

    if(type === "SignUp"){

        if(!data.name.trim()){
            errors.name ="Enter your name"
        }else{
            delete errors.name;
        }


        if(!data.confirmPassword){
            errors.confirmPassword="Confirm your password"
        }else if(data.confirmPassword !== data.password){
            errors.confirmPassword = "Password do not Match"
        }else{
            delete errors.confirmPassword;
        }
    }
    return errors;
}