"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

function Register() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, seterror] = useState<string | null>(null);


const router = useRouter()

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if( password === confirmPassword){
        seterror("your password does not match")
    }

    try {

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })

        const data = res.json()
        if(!res.ok){
            seterror("Registration Failed")
        }

        router.push("/login")


        
    } catch (error) {
        
    }
}


  return ( <div>Register</div>);
}

export default Register;
