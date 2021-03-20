const currentDate = new Date;
let dateSelected = currentDate.getFullYear() + '-' + (currentDate.getMonth()) + '-' + currentDate.getDate();

function updateDate(event) {
    event.preventDefault();
    dateSelected = $('#date-select').val();
    fetch();
}

function fetch() {
    $.ajax({
        url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
        method: 'GET',
        success: updateImages,
        data: {
            api_key: 'henBDa1fHwN7iODeAlbVnBeJrnPO2g0ht5XN4YKD',
            earth_date: dateSelected,
        }
    });
}

function updateImages(data) {
    $('#image-container').empty();
    let photos = data.photos;
    for (let photo of photos) {
        let child = $(document.createElement('img'));
        child.attr('src', photo.img_src);
        child.css({
            width: "250px",
            height: "250px",
            margin: "20px",
        });
        $('#image-container').append(child);
    }
}

fetch();
$('#date-select-btn').click(updateDate);
console.log("cycle end");