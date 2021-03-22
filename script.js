let imageContainer = $('#image-container');
const currentDate = new Date;
let dateSelected = currentDate.getFullYear() + '-' + (currentDate.getMonth()) + '-' + currentDate.getDate();
let pageNo = 1;

const prevBtn = $('#prev');
const nextBtn = $('#next');

function updateButtons(photos) {
    if (pageNo == 1) {
        prevBtn.attr('disabled', 'true');
        nextBtn.removeAttr('disabled');
    } else if (photos.length == 0) {
        prevBtn.removeAttr('disabled');
        nextBtn.attr('disabled', 'true');
    } else {
        prevBtn.removeAttr('disabled');
        nextBtn.removeAttr('disabled');
    }
}

function updateImages(data) {
    let photos = data.photos;
    updateButtons(photos);
    if (photos.length == 0) {
        alert("No more image to show");
    } else {
        imageContainer.empty();
        for (let photo of photos) {
            imageContainer.append(`<img src=${photo.img_src} alt=${photo.id}>`);
        }
    }
}

function fetch() {
    $.ajax({
        url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
        method: 'GET',
        success: updateImages,
        data: {
            api_key: 'henBDa1fHwN7iODeAlbVnBeJrnPO2g0ht5XN4YKD',
            earth_date: dateSelected,
            page: pageNo,
        }
    });
}

function updateDate(event) {
    event.preventDefault();
    dateSelected = $('#date-select').val();
    fetch();
}

fetch();
$('#date-select-btn').click(updateDate);

nextBtn.click(function() {
    pageNo++;
    fetch();
});

prevBtn.click(function() {
    pageNo--;
    fetch();
});

$('#jump-btn').click(function() {
    let jumpTo = $('#jump-page').val();
    if (jumpTo == "") {
        alert('add a page number to jump to');
        return;
    }
    pageNo = jumpTo;
    fetch();
});