var map;
var MarcadorHospital = [];
var MarcadorBairro = [];
var infoWindow;
var locationSelect;


// funcao para inicializar o mapa
function initMap() {
    var mapOptions = {
      center: {lat:-12.7050, lng:-38.3234},
      zoom: 14,
      styles: [{
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ff0000'}]
        },
        {
        featureType: 'administrative',
        stylers: [{saturation: -80}]
        },
        {
        featureType: 'poi.attraction',
        stylers: [{visibility: 'off'}]
        },

        {
        featureType: 'poi.business',
        stylers: [{visibility: 'off'}]
        },
        
        {
        featureType: 'poi.government',
        stylers: [{visibility: 'off'}]
        },

        {
        featureType: 'poi.park',
        stylers: [{visibility: 'off'}]
        },

        {
        featureType: 'poi.place_of_worship',
        stylers: [{visibility: 'off'}]
        },

        {
        featureType: 'poi.school',
        stylers: [{visibility: 'off'}]
        },

        {
        featureType: 'poi.sports_complex',
        stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'poi.medical',
          stylers: [{visibility: 'off'}]
          },
      ]
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    addMarker();
    addMarkerBairro();
    mostrarNoticias();

    infoWindow = new google.maps.InfoWindow();

}


// ADICIONAR MARCADOR DOS HOSPITAIS
function addMarker() {

  // ICONE DO HOSPITAL
  var icons = {
    hospital: {
      icon: 'http://maps.google.com/mapfiles/kml/pal3/icon21.png'
      }
  };


  // PARA CADA HOSPITAL NO BANCO DE DADOS
  hospitais.forEach(function(hospital, index){
    
    // PEGAR A LAT E LNG
    var latlng = new google.maps.LatLng(
      hospital.coordenadas.latitude,
      hospital.coordenadas.longitude)

    // PEGAR NOME, ENDERECO E TIPO
    var name = hospital.nome;
    var address = hospital.endereco[2];
    var type = 'hospital';

    // COLOCAR O MARPADOR NO MAPA COM O ICONE
    var marcador = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: icons[type].icon
    });

    // ALIMENTAR A LISTA MarcadorHospital COM CADA UM
    MarcadorHospital.push(marcador);

    // COLOCAR INFO WINDOW
    var html = "<b>" + name + "</b> <br/>" + address;
    google.maps.event.addListener(marcador, 'click', function(){
      
    infoWindow.setContent(html);
    infoWindow.open(map, marcador);
    
    }) 

  })

}

//COLOCAR NO MAPA ---------------------------------------------
function setMapOnAll(map) {

  for (var i = 0; i < MarcadorHospital.length; i++) {
    MarcadorHospital[i].setMap(map);
    
  }
}
// ------------------------------------------------------------

// LIMPAR MARCADORES ------------------------------------------
function clearMarkers() {
  setMapOnAll(null);
}
// ------------------------------------------------------------

// MOSTRAR MARCADORES -----------------------------------------
function showMarkers() {  
  setMapOnAll(map);
}
// ------------------------------------------------------------

function addMarkerBairro() {

  // ICONE DOS BAIRRO
  var icons = {
    bairro: {
      icon: 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png'
      }
  };


  // PARA CADA HOSPITAL NO BANCO DE DADOS
  bairros.forEach(function(bairro, index){
    
    // PEGAR A LAT E LNG
    var latlng = new google.maps.LatLng(
      bairro.coordenadas.latitude,
      bairro.coordenadas.longitude)

    // PEGAR NOME, ENDERECO E TIPO
    var name = bairro.nome;
    var type = 'bairro';
    var dado = bairro.confirmados

    // COLOCAR O MARPADOR NO MAPA COM O ICONE
    var marcador = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: icons[type].icon,
    });

    // ALIMENTAR A LISTA MarcadorHospital COM CADA UM
    MarcadorBairro.push(marcador);

    // COLOCAR INFO WINDOW
    var html = "<b>" + name + "</b> <br/>" + 'Casos Confirmados = ' + dado + "</b> <br/>" + '';
    google.maps.event.addListener(marcador, 'click', function(){
      
    infoWindow.setContent(html);
    infoWindow.open(map, marcador);
    
    }) 

  })

}

// OCULTAR BAIRROS
function setMapOnAllBairro(map) {

  for (var i = 0; i < MarcadorBairro.length; i++) {
    MarcadorBairro[i].setMap(map);
    
  }
}
// ------------------------------------------------------------

// LIMPAR MARCADORES ------------------------------------------
function clearMarkersBairro() {
  setMapOnAllBairro(null);
}
// ------------------------------------------------------------

// MOSTRAR MARCADORES -----------------------------------------
function showMarkersBairro() {  
  setMapOnAllBairro(map);
}






// funcao para a lista de noticias

function mostrarNoticias() {

  var noticiasHtml = '';

  noticias.forEach(function(noticia, index){

    var noticia_titulo = noticia.titulo;
    var noticia_data = noticia.data;
    var noticia_texo = noticia.texto;
    var noticia_fonte = noticia.fonte;
    var noticia_url = noticia.url


    noticiasHtml += `
      <div class="noticias-conteudo">

                      <div class="noticias-background">

                          <div class="noticias-textos-conteudo">

                              <div class="noticia-titulo">${noticia_titulo}</div>
                              <div class="noticia-data-texto">${noticia_data}</div>    
                              <div class="noticia-texto">${noticia_texo}</div>
                              <a href="${noticia_url}" target="_blank" class="noticia-fonte-texto">${noticia_fonte}</a>

                          </div>

                      </div>
                  </div>
    `
  })

  document.querySelector('.box-noticias-listagem').innerHTML = noticiasHtml;

}

/*ANIMAÇÃO do box de informações!*/
const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate'; 

function animeScroll() {
  const windowTop = ((window.pageYOffset * 2) / 4);
  target.forEach(function(element) {
    if((windowTop) > element.offsetTop){
      element.classList.add(animationClass);
    } else {
      element.classList.remove(animationClass);
    }
  })
}

animeScroll ();
if (target.length) {
  window.addEventListener('scroll', function() {
    animeScroll();
  })
}


