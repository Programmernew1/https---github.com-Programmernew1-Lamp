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
    //  }


    /*меню открытие и закрытие конец */


    /*меню перемещение наверх страницы начало */
    // window.onscroll = function() {
    //     let scrolled = window.pageYOffset;
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

            let testArray = data.servicesTabs;
            let inputPortfolio = `<option value="">All categories</option>`;
            for(let z in testArray){
                let a = `<option value="${z}">${testArray[z].nameTabs}</option>`;
                inputPortfolio += a;
            }
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

                let tt = `<div id="${linksNameTabs[k].number}" class="tabs-panel"> <p class="tabs-panel-text">${linksNameTabs[k].text} <a href="#">See more</a>  or <a href="">portfolio </a>  <img src="${linksNameTabs[k].img}" alt=""></p></div>`;
                testArr += tt;
                let tabLink = `<li class="tabs-item"><a class="tabs-item-a " href=#${linksNameTabs[k].number}>${linksNameTabs[k].nameTabs}</a> </li>`;
                testArr2 += tabLink;

                // let tt = `<p class="tabs-panel-text">${linksNameTabs[k][0]} <a href="">See more</a>  or <a href="">portfolio </a>  <img src="${linksNameTabs[k][1]}" alt=""></p>`;
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
            function renderSelectCards(data) {
                arrActiveValueCard = [];
                for( let k in data){
                    arrActiveValueCard.push(data[k]);
                    let content = `<div  class="portfolio-card-item item col-lg-5" style="background:url('${data[k].img}');" ><div class="card-item-content">
                        <h3>${data[k].h3}</h3>
                        <p>${data[k].p}
                            <span>${data[k].span}</span>
                        </p>
                    </div>
                </div> `
                portfolioCardContent += content;
                }
                console.log(arrActiveValueCard.length);
            }
            function pagginationCards(arr, current){
                // let currentShowValue = arr.length/current;
                let next = 1;
                let prev = 0;
                for(let i = prev; i < current * next; i++){
                    let content = `<div  class="portfolio-card-item item col-lg-5" style="background:url('${arr[i].img}');" ><div class="card-item-content">
                        <h3>${arr[i].h3}</h3>
                        <p>${arr[i].p}
                            <span>${arr[i].span}</span>
                        </p>
                    </div>
                 </div> `
                console.log(content);
                portfolioCardContent += content;
                }
                return portfolioCardContent;
            }
            renderSelectCards(portfolioCardItem);





            function sortCardPortfolio(arr){
                let newArr = []
                arr.forEach((e) => {
                    if (e.category == selectCat.options[selectCat.selectedIndex].innerHTML) {
                        newArr.push(e);
                    }
                });
                console.log(newArr.length);
                return newArr;
            }
            let selectCat = document.querySelector("select");
            selectCat.addEventListener("change",(event)=>{
                portfolioCardContent = "";
                // console.log(event.target.value);
                if(event.target.value == ""){
                  let cardsArr =  renderSelectCards(portfolioCardItem);
                    // portfoliCardContainer.innerHTML =  portfolioCardContent;
                    portfoliCardContainer.innerHTML = pagginationCards(cardsArr,4);   
                }else{
                    let cardsArr =  sortCardPortfolio(arrActiveValueCard);
                    // for( let k in cardsArr){ 
                    //     let content = `
                    //         <div class="portfolio-card-item item col-lg-5" style="background:url('${cardsArr[k].img}');" >
                    //             <div class="card-item-content">
                    //                 <h3>${cardsArr[k].h3}</h3>
                    //                 <p>${cardsArr[k].p}
                    //                     <span>${cardsArr[k].span}</span>
                    //                 </p>
                    //             </div>
                    //         </div>`
                    //     portfolioCardContent += content;                    
                    // }
                    portfoliCardContainer.innerHTML = pagginationCards(cardsArr,4);
                    console.log(  portfoliCardContainer.innerHTML);
                }  

                // portfoliCardContainer.innerHTML =  portfolioCardContent;
            });
            // portfoliCardContainer.innerHTML =  portfolioCardContent;

                // переключение секций начало

            // задать количество карточек для отображения (4), количество карточек разделить на 4 - значение номеров,
        
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
            let arrStr = [];
            for(let s of testSTR){
                
                arrStr.push(`<span class="span-js">${s}</span>`);

            
            }
            let STRFromArr =  arrStr.join();
            let STRFromArr2 = STRFromArr.replace(/[\.,%]/g, '');
            let n = document.querySelector(".scroling-more-p");
            n.innerHTML = STRFromArr2;
            let spanLetter = document.querySelectorAll('.span-js');


                // (function(){
                    // spanLetter.forEach( (e,i) => {
                



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
                    headerMenu.style.display = "none";
                    document.querySelector(".registration-wrap").style.display = "none";
                    document.querySelector(".search-button").style.display = "none";

                }else{
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
    }

    buttonFormContactUS.addEventListener("click",(el)=>{
        el.preventDefault();
        arrFormData = {
            name:document.formContactUs.name.value,
            email:document.formContactUs.email.value,
            text:document.formContactUs.text.value,
        };
    });

});