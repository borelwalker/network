import {TextField,Box, Stack ,Typography, Button, } from "@mui/material";
import React from 'react'
import { useForm } from "react-hook-form"; 
import toast from "react-hot-toast";
import axios  from "axios"
import  {useNavigate} from "react-router-dom"


function Inscription() {
  const{handleSubmit,register,formState: { errors} }= useForm();
  const navigation = useNavigate();
  const onSubmit= (data)=> {
    console.log(data);
    
    if(data.motDePasse !== data.motDePasseConfirmation ){
      toast.error("entrer  le bon mot de passe ")
    }else{
      //ici on compare les address mails pour verifier que on ne entre pas deux utilisateurs 
      axios.get(`http://localhost:3001/utilisateurs?mailUtilisateur=${data.mailUtilisateur}`)
           .then((res) => {
        if (res.data.length > 0) {
          toast.error("il existe deja un utilisateur du meme address ")
        }else{
          
          axios
          .post("http://localhost:3001/utilisateurs", data)
          .then((res)=>{
            console.log(res);
            
            toast.success( 'Inscription reussie' );

            navigation("/Connexion")
            
          }).catch((err)=>{
            console.log(err);
            toast.error("une erreur est survenue")
            
          })
          console.log(data,errors);
        
        }
      })

    }
  }
  
  return (
    <Stack alignItems={"center"} justifyContent={"center"}
    width={"100%"} height={"100vh"}
    backgroundColor={"#f5f5f5"}>
      <Box width={400} sx={  {backgroundColor: "#fff", padding: 3,} }>
        <Typography variant="h5">inscription</Typography>
        <form style={{marginTop:4,}} onSubmit = { handleSubmit ( onSubmit )}>
          <Stack direction={"column"} gap={2}>

            <TextField id="filled-basic" label="veuiller saisir votre nom " 
            variant="outlined"
            fullWidth
            size="small" 
            {...register("nomUtilisateur",{required:"veuiller saisir un nom",
            minLength:{value:5, message:"veuiller saisir un nom de plus de 5 caracteres" }
            })}/>
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
            <TextField id="filled-basic" label="veuiller confirmer le mots de passe " 
            variant="outlined"
            fullWidth
            size="small" 
            type="password"
            {...register("motDePasseConfirmation",{required:"veuiller confimer le mot de passe",
              minLength:{value:6, message:"veuiller saisir un mot de passe de plus 6  caracteres" }
              })}/>
          </Stack>
          <Button variant="contained" sx={{marginTop:2,}} type="submit">inscription</Button>
            
        </form>
      </Box>
    </Stack>
  )
}

export default Inscription