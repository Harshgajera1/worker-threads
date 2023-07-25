const express = require('express')
const {Worker} = require('worker_threads')
const app = express()

app.get('/non-blocking', (req,res) =>{
    res.status(200).send('This page is non blocking')
})

app.get('/blocking', async (req,res) =>{
    // let count = 1
    // for(let i = 0; i<20000000000;i++){
    //     count++
    // }
    // res.status(200).send(`result is ${count}`)

    const worker = new Worker('./worker.js')

    worker.on('message', count => {
        res.status(200).send(`result is ${count}`)
    })

    worker.on('error', err => {
        res.status(200).send(`error occered--------------`,err)
    })
})


app.listen(8000,()=>{
    console.log("Server is running on port 8000")
})