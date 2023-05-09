"use client"; // this is a client component 👈🏽
import {db, storage} from '../firease'
import {useRef, useState} from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import styles from './admin.module.css'


export default function Admin() {
    const data = useRef<any>()
    const [img, setImg] = useState<string>();
    const [lock, setLock] = useState<boolean>();
    function loadData(e: any) {
        e.preventDefault()
        if(data.current[0].value.length < 5 || 
            data.current[1].value.length < 5 ||
            data.current[2].value.length < 20 ||
            data.current[1].value.length < 3 

            ) return alert('Fill Form Correctly');

        if(img == undefined) {
            alert('Upload FIle')
            return
        }
        else {
            // fileUpload(e)
            // if(data.current[0].length < 5 || data.current[1].length < 5) return alert('Fill Form')
           
            let formData = {
                "productName": data.current[0].value,
                "productType": data.current[1].value,
                "desciption": data.current[2].value,
                "amount": data.current[3].value,
                "image": img
            }
            storeToFb(formData)
            
            data.current.reset();
        }
        
    }

    async function storeToFb(newData: object) {
        if (lock) return alert('Waiting For File Uplaod....')
        try {
            const docRef = await addDoc(collection(db, "products"), newData);
            console.log("Document written with ID: ", docRef.id);
            alert('Product Added')
          } catch (e) {
            console.error("Error adding document: ", e);
            alert('something went wrong')

          }
          
    }


    async function fileUpload(e: any) {
        setLock(true);
        let file = e.target.files[0]
        const fileRef = ref(storage, `images/${file.name}`);
        try {
            const snapshot = await uploadBytes(fileRef, file);
            console.log('File uploaded successfully:', snapshot);
          } catch (error) {
            console.error('Error uploading file:', error);
          }
          const downloadURL = await getDownloadURL(fileRef);
          if(downloadURL.length > 1) {
            setImg(downloadURL);
            setLock(false)

          }
          else {
            alert('fileUpload Failed')
          }
          console.log(downloadURL);
        //   return
        
    }



    return(
        <>
            <h1 className={styles.text}>Product Add Section</h1>
      <form ref={data} className={styles.customform}>
        <input type="text" name="ProductName" placeholder='Product Name' required/>
        <input type="text" name="ProductType" placeholder='Product Type' required/>
        <textarea placeholder='Description'/>
        <input type="number" name="Amount" placeholder='Amount INR'  required={true}/>
        <input type="file" onChange={(e) => fileUpload(e)}/>
        {
            lock ? <input type='button' value={'FileUploading'} disabled/> 
            : <input type="button" name='submit' value={"Add Product"} onClick={(e) => loadData(e)}/>
        }
      </form>
    
      
        </>
    )
}