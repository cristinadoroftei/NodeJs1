// console.log($)

$("#teleport-btn").click(() =>  {
   const inputLeft= $(".input-left").val();
   const inputRight =$(".input-right").val();
   
    const temp = inputRight;
    $(".input-right").val($(".input-left").val())
    $(".input-left").val(temp) 
   
})