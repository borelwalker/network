import {TextField,Box, Stack ,Typography, Button, Link} from "@mui/material";
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"; 
import toast from "react-hot-toast";
import axios  from "axios"
import  {useNavigate} from "react-router-dom"


function Connexion() {
  useEffect(()=>{
  if(localStorage.getItem("utlisateur")){
      navigation("/")
    }
  })
  const{handleSubmit,register,formState: { errors} }= useForm();
  const navigation = useNavigate();
  const onSubmit= (data)=> {


    console.log(data);
    
      //ici on compare les address mails pour verifier que on ne entre pas deux utilisateurs 
      axios.get(`http://localhost:3001/utilisateurs?mailUtilisateur=${data.mailUtilisateur}&motDePasse${data.motDePasse}`)
           .then((res) => {
        if (res.data.length > 0) {
          //localStorage premet de garder les données dans le navigateur  
          localStorage.setItem("utilisateur",JSON.stringify(res.data[0]));
            toast.success("connexion réussie");
            navigation("/")
          }else{
            toast.error("les identifiants sont incorrects")
                   
          console.log(data,errors);
        }
      })

    }
  
  
  return (
    <Stack alignItems={"center"} justifyContent={"center"}
    width={"100%"} height={"100vh"}
    backgroundColor={"#f5f5f5"}>
      <Box width={400} sx={  {backgroundColor: "#fff", padding: 3,} }>
        <Typography variant="h5">connexion</Typography>
        <form style={{marginTop:4,}} onSubmit = { handleSubmit ( onSubmit )}>
          <Stack direction={"column"} gap={2}>

            
            <TextField id="filled-basic" label="veuiller saisir votre adresse mail " 
            variant="outlined"
            fullWidth
            size="small" 
            type="email"
            {...register("mailUtilisateur",{required:"veuiller saisir votre adresse mail",
            pattern:"^[a-zA-Z]+$,"
            })}/>
            <TextField id="filled-basic" label="veuiller saisir votre mots de passe " 
            variant="outlined"
            fullWidth
            size="small" 
            type="password"
            {...register("motDePasse",{required:"veuiller saisir un mots de passe",
              minLength:{value:6, message:"veuiller saisir un mot de passe de plus 6  caracteres" }
              })}/>
            
          </Stack>
          <Button variant="contained" sx={{marginTop:2,}} type="submit">connexion</Button>
          <Typography>voulez créer un compte ?<Link href="/inscription">cliquez ici</Link></Typography>
        </form>
      </Box>
    </Stack>
  )
}

export default Connexion