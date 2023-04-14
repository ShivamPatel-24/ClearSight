$(document).ready(function () {
    $(".product-card").hover(
        function () {
            $(this).find(".carousel").carousel("cycle");
        },
        function () {
            $(this).find(".carousel").carousel("pause");
        }
    );

    
});


  
