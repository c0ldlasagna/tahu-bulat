import {supabase} from './supabase';

const signUp = async(name:string,email:string,password:string) =>{
   const{data,error}= await supabase.auth.signUp(
    {
      email: email,
      password: password,
      options: {
        data: {
          display_name: name,
        }
      }
    }
  );
  if (error) {
    throw error;  // Throw error if there is any
  }

  return data;  // Return data if there is no error

}

const signIn = async(email:string,password:string) =>{
    const {data,error} = await supabase.auth.signInWithPassword(
    {
      email: email,
      password: password
    }
  );
  if (error) {
    throw error;  // Throw error if there is any
  }
  return data;  // Return data if there is no error
}

const signOut = async() =>{
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error;  // Throw error if there is any
    }
}
export {signUp,signIn,signOut};