// JSON можно читать только по HTTP протоколу, чтение файла не предусмотренно в целях безопастности!!!

  



document.addEventListener('DOMContentLoaded', function(){


    /* плавный скрол якорных ссылок*/ 
 // const plavnScrollVseSsil = document.querySelectorAll('a[href^= "#"]');
 // for(let link of plavnScrollVseSsil){
//     link.addEventListener('click',function (el){
//         el.preventDefault();
//         const id = link.getAttribute('href');
//         document.querySelector(id).scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//         });
//     });
// }

/* конец скрола якорных ссылок*/ 

/*меню открытие и закрытие начало */


 let header_1 = document.querySelector('.burger-menu-wrap');
 let menuUl = document.querySelector('.burger-menu-ul');
 let nav = document.querySelector('.nav');
//  header_1.addEventListener('click', event =>{
//     if(event.target.className === 'burger'){
//         menuUl.classList.add('js-visible');
//     }

//  });

//  nav.addEventListener('click', function(){
//     menuUl.classList.remove('js-visible');
//  });




 header_1.addEventListener('click',function(e){

   
    if(!menuUl.classList.contains('js-visible')){
        if(e.target.closest('.burger') ){
            menuUl.classList.toggle('js-visible');
            return;
        }
    }
    if(e.target.className === 'nav-link' || e.target.className === 'img-close-menu') {
        menuUl.classList.toggle('js-visible');
        return;
    }

},true);




// ТАБЫ

// active-panel
//ТАБЫ


//  if (menuUl.classList.contains('js-visible')){
//     //console.log('est');
//  }


/*меню открытие и закрытие конец */


/*меню перемещение наверх страницы начало */
// window.onscroll = function() {
//     let scrolled = window.pageYOffset;
//     console.log( 'Позиция скрола: '+scrolled  );
// };
/*меню перемещение наверх страницы конец */



(async () => {
    let portfoliCardContainer = document.querySelector('.portfolio-card-wrap');
    let selectPortfolio = document.getElementById('select-portfolio');
    let burgerLink = document.querySelector(".burger-menu-ul");
    let burgerLinkLaptop = document.querySelector(".burger-menu-ul-laptop");
    let footerLinkNav = document.querySelector(".footer-nav");
    let tabsContainer = document.querySelector('.tabs');
    let response = await fetch('data.json');
    if (response.ok) {

        let data = await response.json(); // получаем ответ в формате JSON
        //  console.log(data.burgerLinks); 

        let testArray = data.servicesTabs;
        let inputPortfolio = `<option value="">All categories</option>`;
        for(let z in testArray){
            let a = `<option value="${z}">${testArray[z].nameTabs}</option>`;
            inputPortfolio += a;
        }
        

        //   console.log(testArray);
        selectPortfolio.innerHTML = inputPortfolio; // Перезаписываем значение тэга <select class="select" name="portfolio" id="select-portfolio"> в HTML разметке

      // ссылки в хедер начало
        let linksJson = data.burgerLinks;
        let linksFromJsonText = `<img class='img-close-menu' src='./img/menu-close.png' alt=''>`;
        let linksFromJsonTextLaptop = "";
 
        for(let j in linksJson){
            let a = `<li><a class="nav-link" href="${linksJson[j]}">${j}</a></li>`;
            linksFromJsonText += a;
            linksFromJsonTextLaptop += a;

        }
        burgerLink.innerHTML = `${linksFromJsonText}`;
        burgerLinkLaptop.innerHTML = `${linksFromJsonTextLaptop}`;
        footerLinkNav.innerHTML = `${linksFromJsonTextLaptop}`;
 
        //  let arrFromJson = [];
        // for (let key in linksJson) {
        //   let a = `<li><a class="nav-link" href="${linksJson[key]}">${key}</a></li>`;
        //   arrFromJson.push(a); 
        // }
        // console.log(arrFromJson);

        // burgerLink1.innerHTML = arrFromJson[0];
        // burgerLink.forEach(function(el, i) {
        //    el.innerHTML = `${arrFromJson[i]}`;
        // });
        // burgerLinkLaptop.forEach(function(el,i){
        //     el.innerHTML = `${arrFromJson[i]}`;
        // })



        // ссылки в хедер конец

        
        // табы section-services JSON начало

        let allTabs = document.querySelector('.tabs-content-wrap');



        let linksNameTabs = data.servicesTabs;


        let testArr = "" ;
        let testArr2 = "";
        for(k in linksNameTabs){
            // console.log(linksNameTabs[k].text);

            let tt = `<div id="${linksNameTabs[k].number}" class="tabs-panel"> <p class="tabs-panel-text">${linksNameTabs[k].text} <a href="#">See more</a>  or <a href="">portfolio </a>  <img src="${linksNameTabs[k].img}" alt=""></p></div>`;
            testArr += tt;
            let tabLink = `<li class="tabs-item"><a class="tabs-item-a " href=#${linksNameTabs[k].number}>${linksNameTabs[k].nameTabs}</a> </li>`;
            testArr2 += tabLink;



            // let tt = `<p class="tabs-panel-text">${linksNameTabs[k][0]} <a href="">See more</a>  or <a href="">portfolio </a>  <img src="${linksNameTabs[k][1]}" alt=""></p>`;
            //  console.log(testArr);
            // console.log(linksNameTabs[k][0]);
            // console.log(linksNameTabs[k][1]);
            //  testArr.push(tt);
            //  testArr2.push(tabLink);

        }


        tabsContainer.innerHTML = testArr2;
        allTabs.innerHTML = testArr;

        // табы section-services JSON конец

        //section portfolio card json начало
        let portfolioCardItem = data.portfolioCardItem;
        let arrActiveValueCard = [];
    
        let portfolioCardContent = "";
        for( let k in portfolioCardItem){
            arrActiveValueCard.push(portfolioCardItem[k]);


            let content = `<div  class="portfolio-card-item item col-lg-5" style="background:url('${portfolioCardItem[k].img}');" ><div class="card-item-content">
                <h3>${portfolioCardItem[k].h3}</h3>
                <p>${portfolioCardItem[k].p}
                    <span>${portfolioCardItem[k].span}</span>
                </p>
            </div>
          </div> `
         portfolioCardContent += content;
   
           
        
        }
        console.log(arrActiveValueCard);
        function sortArr(arr){
           arr.filter(function(e){
            console.log(e.category);
            console.log(selectCat.options[selectCat.selectedIndex].innerHTML);
           return e.category == selectCat.options[selectCat.selectedIndex].innerHTML;

            })
            console.log(arr);
            return arr
        }

        let selectCat = document.querySelector("select");
        selectCat.addEventListener("change",(event)=>{
            portfolioCardContent = "";
            let quantityCurrentCard = 0 ;
          let a =  sortArr(arrActiveValueCard);
            console.log(a);
            for( let k in portfolioCardItem){

              if(selectCat.options[selectCat.selectedIndex].innerHTML === portfolioCardItem[k].category){
                quantityCurrentCard++;
                // let x = portfolioCardItem[k].category;
                let content = `<div  class="portfolio-card-item item col-lg-5" style="background:url('${portfolioCardItem[k].img}');" ><div class="card-item-content">
                <h3>${portfolioCardItem[k].h3}</h3>
                <p>${portfolioCardItem[k].p}
                    <span>${portfolioCardItem[k].span}</span>
                </p>
               </div>
               </div> `
               portfolioCardContent += content;

               let paginationWrap = document.querySelector(".paggination-wrap");
               console.log(paginationWrap);
              }
            }


            portfoliCardContainer.innerHTML =  portfolioCardContent;

            // console.log(selectCat.options[selectCat.selectedIndex].innerHTML);
            
            // console.log(event.target);
        });
  


        portfoliCardContainer.innerHTML =  portfolioCardContent;

            // переключение секций начало

    // задать количество карточек для отображения (4), количество карточек разделить на 4 - значение номеров,
    
    // console.log(quantityCurrentCard);
    let quantityCardShow = 4;
    let quantityNumber = quantityCardShow/4;

    // переключение секций конец


        let contentSTR = `<h2 id="feedbacks" class="feedbacksH2">feedbacks</h2>`;
         data.feedbacks.map(function(el){
            contentSTR +=   ` <div class="background-img" style="  background: url('${el.img}') no-repeat 72px 10px/ 100px 100px;">
            <p> ${el.text}
                <span class="feedback-autor">${el.author}</span>
            </p>
          </div> `
        
        });
        document.querySelector(".containerFeedbacksJS").innerHTML = contentSTR;

        // <h2 id="feedbacks" class="feedbacksH2">feedbacks</h2>




          


        //section portfolio card json конец


        // ТАБЫ JS начало
        // let tabs = document.querySelector('.tabs');
        // console.log(tabs.classList.contains('col-lg-4'));
        // let tabsItemA = document.querySelector('.tabs-item-a');
        // tabsItemA.classList.add('active-tab');




        // tabs.addEventListener("click",function(event){
        //     if(event.target.classList.contains('active-tab')){
        //         return;
        //     }
        //     else{
        //         event.target.classList.add('active-tab');
        //     }
        // });
        // console.log(linksNameTabs.staus);
        // if(linksNameTabs.status = true && tabs.classList.contains('active-tab')){
            


        // }
       let tabsitema = document.querySelectorAll('.tabs-item-a');
       tabsitema.forEach(el => {
        el.addEventListener('click',function(e){
            e.preventDefault();  //убирает поведение по умолчанию
            const id = e.target.getAttribute('href').substring(1); // убираем первый элемент у строки


            document.querySelectorAll('.tabs-item-a').forEach(el =>{
                el.classList.remove('active-tab');
            });
            document.querySelectorAll('.tabs-panel').forEach(el =>{
                el.classList.remove('active-panel');
            });
            el.classList.add('active-tab');
             document.getElementById(id).classList.add('active-panel');
        })
       });

       document.querySelector('.tabs-item-a').click(); // имитируем клик





        // ТАБЫ JS конец


        //зацикленный текст движение начало

        let arrovText = document.querySelector(".scroling-more img");
        let arrovTextProperty = window.getComputedStyle(arrovText);   // получить css свойства элемента
        let arrovTextPropertyValue = Number(arrovTextProperty.top.slice(0,-2)); // строку преобразуем в число 




        function move(){

            let z = 41;
            let b = false;
            setInterval(()=>{
                if(z>=41 && z<=50 && b == false){
                    z++;
                    if(z == 50){
                        b = true;
                    }

                }else{
                    z--;
                    if(z == 41){
                        b = false;
                    }
                   

                }
                arrovText.style.top = `${z}px`;
                
            },80)
        }
         move();

    

       
        //  scroling-more. Выбрать один символ из строки. Увеличить размер символа.Выбрать следующий и тоже увеличть.Увеличение должно происходить последовательно.
        // зациклить эту анимацию.

        let testSTR = document.querySelector(".scroling-more-p").innerHTML;
         //console.log(testSTR);

        let arrStr = [];
        for(let s of testSTR){
            
            arrStr.push(`<span class="span-js">${s}</span>`);

          
        }
         let STRFromArr =  arrStr.join();
         //console.log(STRFromArr);
         let STRFromArr2 = STRFromArr.replace(/[\.,%]/g, '');
          //console.log(STRFromArr2);
  

        let n = document.querySelector(".scroling-more-p");
        //console.log(n);
        n.innerHTML = STRFromArr2;
        //console.log(n.innerHTML);
        //console.log(typeof(n));
        let spanLetter = document.querySelectorAll('.span-js');
        //console.log(spanLetter[2]);


            // (function(){
                // spanLetter.forEach( (e,i) => {
                //     ////console.log(i);
            



                // });
                // setTimeout(() => {
                //     for(let i = 0 ; i<= spanLetter.length;i++){
                //         spanLetter[i].classList.toggle("js-animation");
                //     }
                // }, 1000);
                // setTimeout(() => {
                //     for(let i = 0 ; i<= spanLetter.length;i++){
                //         spanLetter[i].classList.toggle("js-animation");
                //     }
                // }, 1000);

                // let set1 =  setTimeout(function setTimeout1()  {
                //     e.classList.toggle("js-animation");
                //     set1 = setTimeout( setTimeout1,i*1500);
                // }, i*1000);
            // })();



            // setInterval(() => {
            //     setTimeout(() => {
            //         e.style.fontSize = "16px";
            //     }, 1000);
            //     setTimeout(() => {
            //         e.style.fontSize = "20px";
            //     }, 2000);

            // }, 1000);
         
       

        


        //     //console.log(n);



        function atimationText(el){

            el.style.webkitTransition =  "opacity" + "1s";

        }
     

   
    //   move();
     // зацикленный текст конец

    //хэдер скрол исчезание-появление начало

  
    let headerMenu = document.querySelector(".burger-menu-ul-laptop");
    let body = document.querySelector(".body_1");
    let scrollPrev = 0;
 
    

    window.addEventListener("scroll",()=>{

        let scrolled = window.pageYOffset;

        if(scrolled>100 && scrolled > scrollPrev){
            // //console.log("aaa");
            headerMenu.style.display = "none";
            document.querySelector(".registration-wrap").style.display = "none";
            document.querySelector(".search-button").style.display = "none";

        }else{
            // //console.log("bbb");
            headerMenu.style.display = "flex";
            document.querySelector(".registration-wrap").style.display = "flex";
            document.querySelector(".search-button").style.display = "block";
        }

        scrollPrev = scrolled;
    });









}
})();

let arrFormData = {};
let buttonFormContactUS =  document.querySelector(".wrap-button");
 
function sendDateForm(){


     arrFormData = {
        name:document.formContactUs.name.value,
        email:document.formContactUs.email.value,
        text:document.formContactUs.text.value,
    };
    console.log(arrFormData);
}

buttonFormContactUS.addEventListener("click",(el)=>{
    el.preventDefault();
    arrFormData = {
        name:document.formContactUs.name.value,
        email:document.formContactUs.email.value,
        text:document.formContactUs.text.value,
    };
    console.log(arrFormData);
});

});