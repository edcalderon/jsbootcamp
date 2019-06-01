function RandomImagesService() {
    this.getImage = function (id, width, height) {
        return `https://picsum.photos/id/${id}/${width}/${height}`;
    }
}