alert('sfd')
$("#clr").on('click',function(){
    ctx.clearRect(0, 0, 420, 420);
})



$('#analyze').on('click', function(){
    $.post('http://localhost:8000', {base64: canvas.toDataURL()})
})