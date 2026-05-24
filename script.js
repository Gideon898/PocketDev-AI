body{
    margin:0;
    padding:0;
    background:#0f172a;
    font-family:Arial;
    color:white;
}

.app{
    width:90%;
    max-width:700px;
    margin:auto;
    margin-top:20px;
}

header{
    text-align:center;
    margin-bottom:20px;
}

#chatBox{
    background:#1e293b;
    height:500px;
    overflow-y:auto;
    border-radius:12px;
    padding:15px;
}

.message{
    padding:12px;
    margin:10px 0;
    border-radius:10px;
    max-width:80%;
    word-wrap:break-word;
}

.user{
    background:#38bdf8;
    margin-left:auto;
    text-align:right;
}

.bot{
    background:#334155;
    margin-right:auto;
}

.input-area{
    display:flex;
    gap:10px;
    margin-top:15px;
}

input{
    flex:1;
    padding:15px;
    border:none;
    border-radius:10px;
    outline:none;
    font-size:16px;
}

button{
    padding:15px 20px;
    border:none;
    border-radius:10px;
    background:#38bdf8;
    color:white;
    font-size:16px;
    cursor:pointer;
}

button:hover{
    opacity:0.9;
}
