//1. yöntem: commonJs ve bunu kullanıcam
const express = require('express')

//2. yöntem: module
//import express from 'express'

const {engine} = require('express-handlebars')//html parçala yönet işevli kazandırıyor

const expressSession = require('express-session') //cookie'leri bilgisayrda saklar tarayıcıda degil

const fileUpload = require('express-fileupload')//kullanıcıdan veri gönderilirken(resim gibi) kullanılır

const dotenv = require('dotenv') // gizli bilgileri içinde tutuyor(anahtar şifre)

const path = require('path') //default olarak gelen bir paket, kendı yazdıgımız harici js kodlarını erişim saglamk ıcın kullandıgımız metot


const dbs = require(path.join(__dirname , 'dbs.js'))

const crypto =  require('crypto')

const SECRET_VALUE = process.env.SECRET_VALUE || 'myBlog'

const PORT = process.env.PORT || 5000
const API_URL = process.env.API_URL || 'http://127.0.0.1:5000'





//DB Connect
dbs()



//baslangıç ayarları 
dotenv.config()
const app = express()

//degiskenler
const time = 1000*60*30



//şablon motorumuzun bulundugu alan

app.engine('handlebars' , engine())
app.set('view engine' , 'handlebars' )
app.set('view',path.join(__dirname , 'views'))


//middleware arayazılım
app.use(express.json())
app.use(fileUpload())
app.use(expressSession({ 
    secret : SECRET_VALUE,
    resave : false,
    saveUninitialized:true,
    cookie:{path:'/',httpOnly:true,secure:false, maxAge:time}
}))

app.use(express.static(path.join(__dirname,'public')))

app.listen(PORT,()=>{
    console.log(`Server is running ${API_URL}`)
})

 //app.get() // tarayıcıdan sunucuya gonderilen istek html sayfası doner
//app.post() // tarayıcıdan sunucya atılan ıstek , sunucuya veri ekleme yapılır
//app.delete() // tarayıcıdan suncuya atılan silme isteği, sunucuda silme işlemleri yapılır
//app.put() // tarayıcıdan atılan guncelleme istekleri , sunucudan veri tabanında guncelleme yapılır


