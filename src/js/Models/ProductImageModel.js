function ProductImageModel(imageService) {
    
    this.init = function(imagesService) {
        this.ImagesService = imagesService;
        
        this.data = [
            {
                id: 1, 
                mainImg: this.ImagesService.getImage(400, 235, 321),
                imgs: [ 
                        this.ImagesService.getImage(401,120,107),
                        this.ImagesService.getImage(402,120,107),
                        this.ImagesService.getImage(403,120,107)
                ]
            }
        ];
    }

    this.getInfo = function(id) {
        return this.data.find(obj => obj.id === id);
    }
}