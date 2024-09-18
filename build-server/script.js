const {exec} = require('child_process');
const path = require('path');
const fs = require('fs');
const {S3Client , PutObjectCommand}=require("@aws-sdk/client-s3");
const mime = require('mime-types');

const S3Client = new S3Client({
    region:'',
    Credentials:{
        accesskeyId :'',
        secretAccessKey:''
    }
})
 const project_ID = process.env.project_ID;

async function init (){
    const outDirPath= path.join(__dirname,'output')
    const p = exec(`cd ${outDirPath} && npm install && npm run build`)
    p.on('data',()=>{
     console.log(data.toString());
    })
    p.on('error',(err)=>{
        console.error(err);
    })
    p.on('close',async()=>{
     const distFolderPath = path.join(__dirname,'output','dist');
     const distFolderContent= fs.readdirSync(distFolderPath,{recursive:true});
      
     for(const filePath of distFolderContent){
        if(fs.lstatSync(filepath).isDirectory()) continue;
        console.log('uploading',filePath)
         const command = new PutObjectCommand({
            Bucket:'',
            key:`__output/${project_ID}/${filePath}`,
            Body:fs.createReadStream(filePath),
            ContentType:mime.lookup(filePath)
         })
         
         await S3Client.send(command);
         
      }
        console.log("Done");
    })
}