// let searchForm = document.querySelector('.search-form');

// document.querySelector('#search-btn').onclick = () =>{
//     searchForm.classList.toggle('active');
//     shoppingCart.classList.remove('active');
//     loginForm.classList.remove('active');
//     navbar.classList.remove('active');
// }

// let shoppingCart = document.querySelector('.shopping-cart');

// document.querySelector('#cart-btn').onclick = () =>{
//     shoppingCart.classList.toggle('active');
//     searchForm.classList.remove('active');
//     loginForm.classList.remove('active');
//     navbar.classList.remove('active');
// }

// let loginForm = document.querySelector('.login-form');

// document.querySelector('#login-btn').onclick = () =>{
//     loginForm.classList.toggle('active');
//     searchForm.classList.remove('active');
//     shoppingCart.classList.remove('active');
//     navbar.classList.remove('active');
// }

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

// window.onscroll = () =>{
//     searchForm.classList.remove('active');
//     shoppingCart.classList.remove('active');
//     loginForm.classList.remove('active');
//     navbar.classList.remove('active');
// }

// var swiper = new Swiper(".product-slider", {
//     loop:true,
//     spaceBetween: 20,
//     autoplay: {
//         delay: 7500,
//         disableOnInteraction: false,
//     },
//     centeredSlides: true,
//     breakpoints: {
//       0: {
//         slidesPerView: 1,
//       },
//       768: {
//         slidesPerView: 2,
//       },
//       1020: {
//         slidesPerView: 3,
//       },
//     },
// });

// var swiper = new Swiper(".review-slider", {
//     loop:true,
//     spaceBetween: 20,
//     autoplay: {
//         delay: 7500,
//         disableOnInteraction: false,
//     },
//     centeredSlides: true,
//     breakpoints: {
//       0: {
//         slidesPerView: 1,
//       },
//       768: {
//         slidesPerView: 2,
//       },
//       1020: {
//         slidesPerView: 3,
//       },
//     },
// });


/* javascript jadwal shalat*/
var date = new Date();

var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = year + "-" + month + "-" + day;

// function getJadwalShalat(kota, namaKota){
//     fetch('https://api.banghasan.com/sholat/format/json/jadwal/kota/'+kota+'/tanggal/'+today)
//     .then(response => response.json())
//     .then(data => {
//         const jadwal = data.jadwal.data;
//         document.getElementById("dt").value = today;
//         document.getElementById("imsak").value = jadwal.imsak;
//         document.getElementById("subuh").value = jadwal.subuh;
//         document.getElementById("terbit").value = jadwal.terbit;
//         document.getElementById("dzuhur").value = jadwal.dzuhur;
//         document.getElementById("ashar").value = jadwal.ashar;
//         document.getElementById("maghrib").value = jadwal.maghrib;
//         document.getElementById("isya").value = jadwal.isya;  
//         document.getElementById("judulKota").innerHTML = "<span>"+namaKota+"</span>"; 
//     });
// }

// getJadwalShalat(667, 'Jakarta');

// function gantiKota(value){
//     fetch('https://api.banghasan.com/sholat/format/json/kota/nama/' + value)
//     .then(response => response.json())
//     .then(data => {
//         getJadwalShalat(data.kota[0].id, value);
//         console.log(data);
//     })
// }

const tampilKota = document.querySelector(".judul-kota");
tampilKota.textContent = localStorage.judulkota;

function getJadwalShalat(){
    fetch('https://api.banghasan.com/sholat/format/json/jadwal/kota/'+parseInt(localStorage.idkota)+'/tanggal/'+today)
    .then(response => response.json())
    .then(data => {
        const jadwal = data.jadwal.data;
        document.getElementById("dt").value = today;
        document.getElementById("imsak").value = jadwal.imsak;
        document.getElementById("subuh").value = jadwal.subuh;
        document.getElementById("terbit").value = jadwal.terbit;
        document.getElementById("dzuhur").value = jadwal.dzuhur;
        document.getElementById("ashar").value = jadwal.ashar;
        document.getElementById("maghrib").value = jadwal.maghrib;
        document.getElementById("isya").value = jadwal.isya; 
        document.getElementById("dhuha").value = jadwal.dhuha;
    });
}

getJadwalShalat();

const inputSearch = document.querySelector('.input-search'); 
const cardList = document.querySelector('.card-list');

inputSearch.addEventListener('keyup', function(){
    const valueSearch = inputSearch.value.length;

    if (valueSearch > 0){
        cardList.classList.remove("hidden-list");

        fetch('https://api.banghasan.com/sholat/format/json/kota')
        .then(response => response.json())
        .then(response => {
            // console.log(data);
            const kota = response.kota;
            let listKota = '';
            kota.forEach(k => {
                listKota += `<a href="#" data-idkota="${k.id} id="nama-kota" class="list-group-item list-group-item-action">${k.nama}</a>`
            });
            const namaKota = document.querySelector('.card-list');
            namaKota.innerHTML = listKota;
    
            const isikota = document.querySelectorAll('.list-group-item');
            isikota.forEach(kota => {

                const filterText = inputSearch.value.toLowerCase();
                const itemText = kota.firstChild.textContent.toLowerCase();

                if(itemText.indexOf(filterText) != -1 ){
                    kota.setAttribute("style", "display: block");
                }else{
                    kota.setAttribute("style", "display: none !important");
                }

                kota.addEventListener('click', function (){
                const idkota = this.dataset.idkota; 
                const judulkota= this.textContent; 
                window.localStorage.setItem('idkota', idkota); 
                window.localStorage.setItem('judulkota', judulkota);
                namaKota.classList.add('hidden-list'); 
                inputSearch.value = '';
                location.reload();
                });
            });
            // console.log(namaKota);
        });

    }else{
        cardList.classList.add("hidden-list");
    }
})


const menuToggle = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');
menuToggle.onclick = function(){
    menuToggle.classList.toggle('active')
    navigation.classList.toggle('active')
}