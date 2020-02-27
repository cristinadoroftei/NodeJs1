$(document).ready(function() {
  //1. Change the body tag so that everything on the page is centered.
  //json: key, value
  $("body").css("text-align", "center");

  //2. Change the text of "Old title" to "New title".
  $("#title h2").text("New title");

  //3. Change the background color of the subtitle box to any color you like.
  $(".subtitle-box").css("background-color", "#b36b7f")

  //4. Make sure that the temp-subtitle isn't displayed without actually removing the element from DOM. Hint: ZGlzcGxheTogbm9uZQ==
  $(".temp").hide()

  //5. Put a dashed border box of any pixel width around any div that has the class "reason"
 // $("div.reason").css("border-style", "dashed")
 $('div[class*="reason"]').css("border-style", "dashed")

 //6. Change the li's inside of the ordered list to be bold. Hint: RGlyZWN0IGNoaWxkIHNlbGVjdG9ycw== 
 $('ol li').css('font-weight','bold')

 //7. Change the last li to be underlined.  Hint: cHNldWRvIHNlbGVjdG9ycw==
 //The :last-child selector allows you to target the last element directly inside its containing element.
 // It is defined in the CSS Selectors Level 3 spec as a “structural pseudo-class”, 
 //meaning it is used to style content based on its relationship with parent and sibling content.
 $("ol li:last-child").css("text-decoration", "underline");

 //8. Change the second li element to have a line through it. 
$("ol li:nth-child(2)").css("text-decoration", "line-through")
});

//9: Change all the elements inside of the second-list to italics in one query. Hint: VGhlIGNoaWxkcmVuIHNlbGVjdG9yLiBBbmQgbXVsdGlwbGUgc2VsZWN0b3I=
$(".second-list li").css('font-style', 'italic')

//10. Change the span font size in the unordered list to be half as small. Using em is better than pixels. Why is that? 
$(".second-list span").css('font-size', '50%')

//11. Remove the first label element in the unused box.
$(".unused-box label:eq(0)").remove()

//12. Add a paragraph that says "Second Sentence".
$( ".unused-box" ).append( "<p>Second Sentence</p>" );

//13. After finishing 12 add a paragraph before it that says "First Sentence".
$( ".unused-box p:eq(0)").attr('id','second-sentence')
$("<p>First sentence</p>").insertBefore("#second-sentence");

//14. You can finally change the class name of unused-box to used-box.
$(".unused-box").attr('class', 'used-box')

//15. You know what. Let's additionally add a class name on the box called used-boxed-clicked. Every time the box is clicked it should toggle this class (add if not there or remove if there).
//Toggle between adding and removing the "main" class name
$('.used-box').click(function(){
    $(this).toggleClass('used-boxed-clicked')
})

//16. On mousing over the submit-button add a title property that says "You're ready to click." Remove the text when the mouse isn't over the button anymore.
$("#submit-button").mouseover(function(){
    $(this).text("You're ready to click");
  });
  $("#submit-button").mouseout(function(){
    $(this).text("Click");
  });

//17. On mouse click add a reason to the ordered list. The reason should start from Reason 4 and count up after every click.
// (function(){
//     let count = 4
//     $(document).click(function () {           

//         let selectedVal = 'Reason '+ count
      
//         $('#first-list').append('<li>'+selectedVal+'</li>')
//       count ++
//       }); 
// })()

// function countClicks(){
//     let count = $("")
//     $(document).click(function () {           

//         let selectedVal = 'Reason '+ count
      
//         $('#first-list').append('<li>'+selectedVal+'</li>')
//       count ++
//       }); 
// }

// countClicks()

$("#submit-button").click(() => {
    const count = $("first-list").length;
    $("#first-list").append(`<li>Reason ${count + 1}</li>`)
})

//18. Console log the parent div when the button is clicked using a direct reference to the button inside of the event handler scope. Hint: JCh0aGlzKS5wYXJlbnQoKTs=
$('#submit-button').click(() => {
    console.log($('#submit-button').parent())
})

//19. Extra challenge: Style the website until you think it looks good.

//21. Figure out how to animate the border of the box from exercise 5 like a "neon sign". You are allowed to use code snippets found online but you are required to understand what each thing does to your element. 