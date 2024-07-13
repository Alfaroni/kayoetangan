// MenuToggle
const toggleOpen = document.querySelectorAll("[data-toggle]");
const toggleClose = document.querySelectorAll("[data-toggle-close]");
if(toggleOpen){
    toggleOpen.forEach((item) => {
        item.addEventListener('click', function(e) {
            item.classList.toggle('is-active');
            const attr = item.getAttribute('data-toggle');
            if(item.classList.contains('is-active')){
                document.body.classList.add('overflow-hidden');
                document.querySelector('[data-toggle-open="'+ attr +'"]').classList.add('open');
            }else{
                document.body.classList.remove('overflow-hidden');
                document.querySelector('[data-toggle-open="'+ attr +'"]').classList.remove('open');
            }
        });
    });
    
    toggleClose.forEach((item) => {
        item.addEventListener('click', function(e) {
            document.body.classList.remove('overflow-hidden');
            document.querySelector('[data-toggle].is-active')?.classList.remove('is-active');
            document.querySelector('[data-toggle-open].open')?.classList.remove('open');
            e.preventDefault();
        });
    });

}

// Observe
const scrollRoot = document.querySelector('[data-scroller]')
const sections = document.querySelectorAll('[data-section]');
const menuItems = document.querySelectorAll('[data-section-menu]');
let options = {
    threshold: 0.5
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const section = entry.target.dataset.section;
            const menuItem = document.querySelector("[data-section-menu="+ section +"]");

            document.body.setAttribute('data-theme', section)
            if(menuItem) {
                menuItems.forEach((item) => {
                    item.parentNode.classList.remove('is-active');
                });
                menuItem.parentNode.classList.add('is-active');
            }
            entry.target.classList.add('is-visible')

        }else{
            entry.target.classList.remove('is-visible')
        }
    });
}, options);
sections.forEach((section) => {
    observer.observe(section);
});
menuItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        const target = document.querySelector("section[data-section="+ item.getAttribute('data-section-menu') +"]");
        target.scrollIntoView({ behavior: 'smooth' });
        document.body.classList.remove('overflow-hidden');
        document.querySelector('[data-toggle].is-active')?.classList.remove('is-active');
        document.querySelector('[data-toggle-open].open')?.classList.remove('open');
        e.preventDefault();
    });
});

scrollRoot.addEventListener('scroll', function(){localStorage.setItem("scrollY", scrollRoot.scrollTop);})
if(localStorage.getItem("scrollY")) {
    scrollRoot.scrollTo({ top: parseInt(localStorage.getItem("scrollY")), left: 0, behavior: "instant",});
}

//Dropdown
const dropdownButton = document.querySelectorAll('[data-dropdown]');
const dropdownMenuList = document.querySelectorAll('[data-dropdown-open=dropdown-states] li');
if(dropdownButton){
    dropdownButton.forEach((item) => {
        item.addEventListener('click', function(e) {
            const attr = item.getAttribute('data-dropdown');
            document.querySelector('[data-dropdown-open="'+ attr +'"]').classList.toggle('open');
        });
    });
    dropdownMenuList.forEach((item) => {
        item.addEventListener('click', function(e) {
            item.closest('.dropdown-content').previousElementSibling.querySelector('.flag').innerHTML = item.querySelector('.flag').innerHTML 
            item.closest('.dropdown-content').previousElementSibling.querySelector('.name').innerHTML = item.dataset.value
            item.closest('.dropdown-content').classList.remove('open')
        });
    });
}

//Tab 
const tabLinks = document.querySelectorAll('[data-tab]');
const tabContent = document.querySelectorAll('[data-tab-item]');
tabLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        const targetTab = document.querySelector('[data-tab-item="'+ link.dataset.tab +'"]');
        link.closest('.section-container-tab').querySelector('.active').classList.remove('active')
        tabContent.forEach((pane) => {
            pane.classList.remove('open');
        });
        targetTab.classList.add('open');
        link.parentNode.classList.add('active')
    });
});

//swiper.home
const swiperHeadline = new Swiper(".swiper--headline",{
    loop: "infinite",
    effect: "fade",
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    // custom pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (i, className) {
            return `
                <button class="${className}">
                    <svg class="progress" width="41" height="41">
                        <circle class="circle circle-bg" r="20" cx="20.5" cy="20.5"></circle>
                        <circle class="circle circle-origin" r="20" cx="20.5" cy="20.5"></circle>
                    </svg>
                    <span>${('0'+(i + 1)).slice(-2)}</span>
                </button>
            `;
        }
    }
});

//swiper.gallery
var swiperGallery = new Swiper(".swiper--gallery", {
    slidesPerView: 'auto',
    spaceBetween: 16,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    breakpoints: {
        1536: {
            slidesPerView: 3,
        }
    }
});

//swiper.photo
var swiperGallery = new Swiper(".swiper--photo", {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
});

//leaflet.map
/*
* L.TileLayer.Grayscale is a regular tilelayer with grayscale makeover.
*/
L.TileLayer.Grayscale = L.TileLayer.extend({
    options: {
        quotaRed: 21,
        quotaGreen: 71,
        quotaBlue: 8,
        quotaDividerTune: 0,
        quotaDivider: function() {
            return this.quotaRed + this.quotaGreen + this.quotaBlue + this.quotaDividerTune;
        }
    },

    initialize: function (url, options) {
        options.crossOrigin = true;
        L.TileLayer.prototype.initialize.call(this, url, options);

        this.on('tileload', function(e) {
            this._makeGrayscale(e.tile);
        });
    },

    _createTile: function () {
        var tile = L.TileLayer.prototype._createTile.call(this);
        tile.crossOrigin = "Anonymous";
        return tile;
    },

    _makeGrayscale: function (img) {
        if (img.getAttribute('data-grayscaled'))
            return;

        img.crossOrigin = '';
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pix = imgd.data;
        for (var i = 0, n = pix.length; i < n; i += 4) {
            pix[i] = pix[i + 1] = pix[i + 2] = (this.options.quotaRed * pix[i] + this.options.quotaGreen * pix[i + 1] + this.options.quotaBlue * pix[i + 2]) / this.options.quotaDivider();
        }
        ctx.putImageData(imgd, 0, 0);
        img.setAttribute('data-grayscaled', true);
        img.src = canvas.toDataURL();
    }
});

L.tileLayer.grayscale = function (url, options) {
    return new L.TileLayer.Grayscale(url, options);
};


//Create Custom Heritage Maps
const map = L.map('map', { scrollWheelZoom: false, }).setView([-7.9802627,112.6291692], 16);
const LeafIcon =  L.icon({
    iconUrl: 'assets/images/map-pin.png',
    iconSize: [40, 40],
    iconAnchor: [20, 70],
});
const customPopup = "<a href='https://maps.app.goo.gl/VVvazToKfTQ7MHFFA' target='_blank'> Kajoetangan <br>Heritage Village </a>";
const customOptions = {
    offset: [84, 0],
    minWidth: '120',
    className: 'custom',
    closeButton: false
}

L.tileLayer.grayscale('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);
L.marker([-7.9802627,112.6291692], {icon: LeafIcon}).addTo(map).bindPopup(customPopup,customOptions).openPopup();

localStorage.setItem('loader', 'true')
if(localStorage.getItem('loader') === 'true'){
    document.querySelector(".loader").style.display = "none";
}