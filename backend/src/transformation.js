// try to pass data between js and python
// Ref: https://www.youtube.com/watch?v=lSAFVMaaH-w&ab_channel=ApesinCapes

const spawner = require('child_process').spawn

// string
// const data_to_pass_in = 'Send this to python script.'

// array
const data_to_pass_in = ['Send this to python script.']

console.log('Data to sent to python script:',data_to_pass_in)

const python_process = spawner('python',['../../Transformation/python.py',JSON.stringify(data_to_pass_in)])

python_process.stdout.on('data',(data)=>{
    console.log('Data received from python script:', JSON.parse(data.toString()))
})

// Ref: https://dataanalyticsireland.ie/2021/12/13/how-to-pass-a-javascript-variable-to-python-using-json/
// $.ajax({
//     url:"/test",
//     type:"POST",
//     contentType: "application/json",
//     data: JSON.stringify(data_to_pass_in)});